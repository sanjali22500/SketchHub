<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include("connection.php");

// Get the data from the frontend request
$data = json_decode(file_get_contents("php://input"), true);

// Extract user and payment details
$user_id = $data['user_id'] ?? null;
$payment_method = $data['payment_method'] ?? null;
$txn_id = $data['txn_id'] ?? null;
$product_id = $data['product_id'] ?? null; // Only available in Buy Now
$total_amount = $data['total_amount'] ?? null; // Only available in Buy Now
$quantity = $data['quantity'] ?? 1; // Default quantity 1

if (!$user_id || !$payment_method || !$txn_id) {
    echo json_encode(["success" => false, "error" => "Missing required fields"]);
    exit;
}

$status = ($payment_method === "UPI") ? "Paid" : "Pending"; // Order status

$order_inserted = 0;

if ($product_id && $total_amount) {
    // --- Buy Now Logic ---
    $insert_order = $conn->prepare("
        INSERT INTO orders (user_id, product_id, quantity, total_amount, payment_method, txn_id, status, order_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    ");

    if ($insert_order) {
        $insert_order->bind_param("iiissss", $user_id, $product_id, $quantity, $total_amount, $payment_method, $txn_id, $status);
        if ($insert_order->execute()) {
            $order_inserted++;
        }
        $insert_order->close();
    }

} else {
    // --- Cart Order Logic ---
    $cart_query = "
        SELECT 
            c.user_id, 
            c.product_id, 
            c.quantity, 
            i.price, 
            i.disc_price
        FROM cart c
        JOIN images_path i ON c.product_id = i.id
        WHERE c.user_id = ?
    ";

    $stmt = $conn->prepare($cart_query);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode(["success" => false, "error" => "No items found in cart"]);
        exit;
    }

    // Loop through all cart items and insert orders
    while ($row = $result->fetch_assoc()) {
        $product_id = $row['product_id'];
        $quantity = $row['quantity'];
        $price = $row['disc_price'] ?? $row['price'];
        $total = $price * $quantity;

        $insert_order = $conn->prepare("
            INSERT INTO orders (user_id, product_id, quantity, total_amount, payment_method, txn_id, status, order_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
        ");

        if ($insert_order) {
            $insert_order->bind_param("iiissss", $user_id, $product_id, $quantity, $total, $payment_method, $txn_id, $status);
            if ($insert_order->execute()) {
                $order_inserted++;
            }
            $insert_order->close();
        }
    }

    // Clear the cart after placing the order if the order is successfully placed
    if ($order_inserted > 0) {
        $clear_cart = $conn->prepare("DELETE FROM cart WHERE user_id = ?");
        $clear_cart->bind_param("i", $user_id);
        $clear_cart->execute();
        $clear_cart->close();
    }
}

echo json_encode([
    "success" => $order_inserted > 0,
    "message" => $order_inserted > 0
        ? "$order_inserted order(s) placed successfully" . ($product_id ? "" : " and cart cleared.")
        : "Failed to place order."
]);

$conn->close();
?>

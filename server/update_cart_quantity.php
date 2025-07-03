<?php
include("connection.php");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Get raw input data
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['cart_id']) || !isset($data['quantity'])) {
    echo json_encode(["success" => false, "message" => "Missing cart_id or quantity"]);
    exit();
}

$cart_id = intval($data['cart_id']);
$quantity = intval($data['quantity']);

// Step 1: Get product stock
$stockQuery = $conn->prepare("
    SELECT i.stock 
    FROM images_path i 
    JOIN cart c ON i.id = c.product_id 
    WHERE c.cart_id = ?
");

$stockQuery->bind_param("i", $cart_id);
$stockQuery->execute();
$stockResult = $stockQuery->get_result();

if ($stockResult->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "Cart item not found"]);
    exit();
}

$row = $stockResult->fetch_assoc();
$stock = $row['stock'];

// Step 2: Only update if within stock limit
if ($quantity <= $stock) {
    $stmt = $conn->prepare("UPDATE cart SET quantity = ?, updated_at = NOW() WHERE cart_id = ?");
    $stmt->bind_param("ii", $quantity, $cart_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Update failed"]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Exceeds available stock"]);
}

$stockQuery->close();
$conn->close();
?>

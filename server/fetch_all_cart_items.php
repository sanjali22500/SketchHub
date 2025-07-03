<?php
include("connection.php");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Query to fetch all cart items for admin with product and user details
$sql = "SELECT 
            c.cart_id,
            c.user_id,
            c.product_id,
            c.quantity,
            i.price,
            i.disc_price,
            i.image_name AS product_name,
            i.image_path,
            u.name AS user_name
        FROM cart c
        JOIN images_path i ON c.product_id = i.id
        JOIN users u ON c.user_id = u.id
        ORDER BY c.cart_id DESC";

$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Query failed: " . $conn->error
    ]);
    exit;
}

$cartItems = [];

while ($row = $result->fetch_assoc()) {
    $cartItems[] = $row;
}

echo json_encode([
    "status" => "success",
    "items" => $cartItems
]);

$conn->close();
?>

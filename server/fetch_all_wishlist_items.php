<?php
include("connection.php");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Query to fetch all wishlist items for admin with product and user details
$sql = "SELECT 
            w.id AS wishlist_id,
            w.user_id,
            w.product_id,
            i.price,
            i.disc_price,
            i.image_name AS product_name, 
            i.image_path AS image_path,
            u.name AS user_name
        FROM wishlist w
        JOIN images_path i ON w.product_id = i.id
        JOIN users u ON w.user_id = u.id
        ORDER BY w.id DESC";

$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Query failed: " . $conn->error
    ]);
    exit;
}

$wishlistItems = [];

while ($row = $result->fetch_assoc()) {
    $wishlistItems[] = $row;
}

echo json_encode([
    "status" => "success",
    "items" => $wishlistItems
]);

$conn->close();
?>

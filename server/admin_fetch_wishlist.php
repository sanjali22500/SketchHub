<?php
include("connection.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

// If you’re not doing session login, don’t use session_start() or $_SESSION check
// session_start(); 

// Fetch wishlist items with user and product info
$sql = "SELECT w.id, w.user_id, w.product_id, w.created_at, w.updated_at
        FROM wishlist w
        INNER JOIN users u ON w.user_id = u.id
        INNER JOIN images_path i ON w.id = i.id
        ORDER BY w.id DESC";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Query failed: " . $conn->error]);
    exit();
}

$stmt->execute();
$result = $stmt->get_result();
$wishlistItems = [];

while ($row = $result->fetch_assoc()) {
    $wishlistItems[] = $row;
}

echo json_encode($wishlistItems);

$stmt->close();
$conn->close();
?>

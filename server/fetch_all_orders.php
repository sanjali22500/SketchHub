<?php
include("connection.php");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check if user_id is passed (for user-specific fetch)
$userFilter = "";
$params = [];

if (isset($_GET['user_id']) && is_numeric($_GET['user_id'])) {
    $userFilter = "WHERE o.user_id = ?";
    $params[] = $_GET['user_id'];
}

// Build query (filter only if user_id is passed)
$sql = "SELECT 
            o.order_id,
            o.user_id,
            o.payment_method,
            o.total_amount,
            o.order_date,
            o.txn_id,
            o.status,
            i.image_path AS product_image,
            i.image_name AS product_name,
            u.name AS user_name
        FROM orders o
        JOIN images_path i ON o.product_id = i.id
        JOIN users u ON o.user_id = u.id
        $userFilter
        ORDER BY o.order_id DESC";

$stmt = $conn->prepare($sql);

// Bind user_id parameter only if filtering
if (!empty($params)) {
    $stmt->bind_param("i", $params[0]);
}

$stmt->execute();
$result = $stmt->get_result();

$orders = [];

while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

echo json_encode([
    "status" => "success",
    "orders" => $orders
]);

$conn->close();
?>

<?php
session_start(); // Important: Start session
include 'connection.php';

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];

    $query = "SELECT o.order_id, o.total_amount, o.payment_method, o.order_date, o.txn_id,
                     i.name AS sketch_name, o.status
              FROM orders o
              JOIN images_path i ON o.product_id = i.id
              WHERE o.user_id = $user_id ORDER BY o.order_date DESC";

    $result = mysqli_query($conn, $query);
    $orders = [];

    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $orders[] = $row;
        }
        echo json_encode(['success' => true, 'orders' => $orders]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Query failed']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
}
?>

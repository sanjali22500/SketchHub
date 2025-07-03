<?php
header("Content-Type: application/json");
ini_set('display_errors', 1);
error_reporting(E_ALL);

include "connection.php";

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Check if all required fields are present
if (
    isset($data['order_id']) &&
    isset($data['user_id']) &&
    isset($data['product_id']) &&
    isset($data['payment_method']) &&
    isset($data['total_amount']) &&
    isset($data['order_date']) &&
    isset($data['status']) &&
    isset($data['txn_id'])
) {
    // Sanitize and assign values
    $order_id = intval($data['order_id']);
    $user_id = intval($data['user_id']);
    $product_id = intval($data['product_id']);
    $payment_method = $data['payment_method'];
    $total_amount = floatval($data['total_amount']);
    $order_date = $data['order_date'];
    $status = $data['status'];
    $txn_id = $data['txn_id'];

    // Prepare and bind
    $stmt = $conn->prepare("
        UPDATE orders 
        SET 
            user_id = ?, 
            product_id = ?, 
            payment_method = ?, 
            total_amount = ?, 
            order_date = ?, 
            status = ?, 
            txn_id = ? 
        WHERE order_id = ?
    ");

    if ($stmt === false) {
        echo json_encode(["success" => false, "message" => "Prepare failed: " . $conn->error]);
        exit;
    }

    $stmt->bind_param("iisdsssi", $user_id, $product_id, $payment_method, $total_amount, $order_date, $status, $txn_id, $order_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Order updated successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Database error: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Missing required fields."]);
}
?>

<?php
include('connection.php');

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Get raw input data
$data = json_decode(file_get_contents("php://input"), true);

// Log the received data to ensure it's received correctly
file_put_contents('debug.log', "Received Data: " . json_encode($data) . "\n", FILE_APPEND);

// Validate the required fields
if (!isset($data['order_id']) || !isset($data['status'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid input: order_id or status is missing']);
    exit();
}

// Sanitize the inputs
$order_id = (int) $data['order_id'];
$status = trim($data['status']);

// Log the received data
file_put_contents('debug.log', "Received order_id: $order_id, status: $status\n", FILE_APPEND);

// Validate inputs again after sanitization
if ($order_id <= 0 || empty($status)) {
    echo json_encode(['success' => false, 'message' => 'Invalid input: order_id or status is missing']);
    exit();
}

// Prepare SQL query to update the order status
$sql = "UPDATE orders SET status = ? WHERE order_id = ?";
$stmt = $conn->prepare($sql);

// Check if the statement is prepared correctly
if ($stmt === false) {
    echo json_encode(['success' => false, 'message' => 'Error preparing the SQL query']);
    exit();
}

// Bind parameters for the SQL query
$stmt->bind_param("si", $status, $order_id);

// Execute the query and handle success or failure
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Order status updated successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error updating order status']);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>

<?php
include("connection.php");
header("Content-Type: application/json");

// Debugging enabled
ini_set('display_errors', 1);
error_reporting(E_ALL);

$input = json_decode(file_get_contents("php://input"), true);

// Check if cart_id is present
if (!isset($input['cart_id'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "cart_id is missing"]);
    exit();
}

$cart_id = intval($input['cart_id']);

$sql = "DELETE FROM cart WHERE cart_id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Failed to prepare statement"]);
    exit();
}

$stmt->bind_param("i", $cart_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Delete failed"]);
}

$stmt->close();
$conn->close();
?>

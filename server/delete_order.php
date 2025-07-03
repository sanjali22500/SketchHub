<?php
header("Content-Type: application/json");
include "connection.php";

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    $order_id = $data['id'];

    $stmt = $conn->prepare("DELETE FROM orders WHERE order_id = ?");
    $stmt->bind_param("i", $order_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Order deleted successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to delete order."]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Order ID not provided."]);
}
?>

<?php
// Include database connection file
include 'connection.php'; // Make sure this is correct

header("Content-Type: application/json");

// Debugging enabled
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Get JSON input data
$input = json_decode(file_get_contents("php://input"), true);

// Check if product_id and user_id are provided
if (!isset($input['product_id']) || !isset($input['user_id'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "product_id or user_id is missing"]);
    exit();
}

// Get values from the request body
$product_id = intval($input['product_id']);
$user_id = intval($input['user_id']);

// Prepare the SQL query to delete the item from the wishlist
$query = "DELETE FROM wishlist WHERE product_id = ? AND user_id = ?";

// Initialize the database connection
try {
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ii', $product_id, $user_id); // Bind parameters

    // Execute the query
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Item removed from wishlist"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to remove item from wishlist"]);
    }
} catch (Exception $e) {
    // Handle any database connection errors
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}

$stmt->close();
$conn->close();
?>

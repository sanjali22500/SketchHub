<?php
// Enable error reporting (for debugging only)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
include("connection.php");

// Read JSON input from React
$data = json_decode(file_get_contents("php://input"), true);

// Log the incoming data for debugging
file_put_contents('php://stderr', print_r($data, TRUE)); // Log to error log

// Validate required fields
if (!isset($data['user_id'], $data['product_id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields"]);
    exit();
}

// Extract the data
$user_id = $data['user_id'];
$product_id = $data['product_id'];

// Prepare the insert query
$stmt = $conn->prepare("INSERT INTO wishlist (user_id, product_id, created_at, updated_at) VALUES (?, ?, NOW(), NOW())");

if ($stmt) {
    // Bind parameters (user_id, product_id)
    $stmt->bind_param("ii", $user_id, $product_id);

    // Execute the query and check for success
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Item added to wishlist"]);
    } else {
        // Log SQL error
        file_put_contents('php://stderr', "Error executing query: " . $stmt->error . "\n");
        http_response_code(500);
        echo json_encode(["error" => "Failed to add to wishlist"]);
    }
    $stmt->close();
} else {
    // Log error if the statement couldn't be prepared
    file_put_contents('php://stderr', "Error preparing statement: " . $conn->error . "\n");
    http_response_code(500);
    echo json_encode(["error" => "Failed to prepare statement"]);
}

$conn->close();
?>

<?php
include("connection.php");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check if user_id is provided
if (!isset($_GET['user_id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing user_id"]);
    exit();
}

$user_id = intval($_GET['user_id']);

// Update query to fetch wishlist items instead of cart items
$sql = "SELECT * 
        FROM images_path 
        LEFT JOIN wishlist ON images_path.id = wishlist.product_id 
        WHERE wishlist.user_id = ?";

// Prepare the statement
$stmt = $conn->prepare($sql);

// Check if the statement is prepared successfully
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Prepare failed: " . $conn->error]);
    exit();
}

// Bind the user_id parameter to the prepared statement
$stmt->bind_param("i", $user_id);

// Execute the query
$stmt->execute();
$result = $stmt->get_result();

// Initialize an empty array to hold the wishlist items
$wishlistItems = [];

// Fetch the results and store them in the wishlistItems array
while ($row = $result->fetch_assoc()) {
    $wishlistItems[] = $row;
}

// Return the wishlist items as a JSON response
echo json_encode($wishlistItems);

// Close the statement and connection
$stmt->close();
$conn->close();
?>

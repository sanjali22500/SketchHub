<?php
// Allow CORS and set response headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Show all PHP errors during development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

include("connection.php");

// Check for POST and valid ID
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['id'])) {
    // Get raw input data
    $id = $_POST['id'];

    // Get image path for deletion
    $fetchStmt = $conn->prepare("SELECT image_path FROM images_path WHERE id = ?");
    $fetchStmt->bind_param("i", $id);
    $fetchStmt->execute();
    $result = $fetchStmt->get_result();
    $row = $result->fetch_assoc();
    $imagePath = $row ? $row['image_path'] : null;
    $fetchStmt->close();

    // Delete from DB
    $stmt = $conn->prepare("DELETE FROM images_path WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        // Delete image from server
        if ($imagePath && file_exists($imagePath)) {
            unlink($imagePath); // Remove the file from server
        }

        echo json_encode(["status" => "success", "message" => "Product deleted"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to delete product: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}

$conn->close();
?>

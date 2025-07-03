<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

include("connection.php"); // Include DB connection

$response = [];

// Get user ID from the request (GET method)
$user_id = $_GET['id'] ?? null;

if ($user_id) {
    // Fetch user details for a specific user by ID
    $sql = "SELECT id, name, email, phone, role, created_at, profile_pic FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);  // Use integer binding for the user ID
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result && $result->num_rows > 0) {
        // Successfully found the user
        $user = $result->fetch_assoc();
        $response = [
            "status" => "success",
            "user" => $user
        ];
    } else {
        // User not found
        $response = [
            "status" => "error",
            "message" => "User not found"
        ];
    }

    $stmt->close();
} else {
    // User ID is missing
    $response = [
        "status" => "error",
        "message" => "User ID is missing"
    ];
}

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

$conn->close();
?>

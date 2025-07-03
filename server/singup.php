<?php
// Hide all PHP warnings/notices from output (so JSON stays clean)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include "connection.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get inputs
    $name = $_POST["name"] ?? '';
    $email = $_POST["email"] ?? '';
    $phone = $_POST["phone"] ?? '';  // Added phone number
    $password_raw = $_POST["password"] ?? '';
    $confirm_password = $_POST["confirmPassword"] ?? '';  // Confirm password
    $role = "user";

    // Validation
    if (empty($name) || empty($email) || empty($password_raw) || empty($confirm_password) || empty($phone)) {
        echo json_encode(["status" => "error", "message" => "Please fill all fields"]);
        exit();
    }

    // Check if password matches confirm password
    if ($password_raw !== $confirm_password) {
        echo json_encode(["status" => "error", "message" => "Passwords do not match"]);
        exit();
    }

    // Hash the password
    $password = password_hash($password_raw, PASSWORD_BCRYPT);

    // Prepare the SQL query
    $stmt = $conn->prepare("INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)");
    if (!$stmt) {
        echo json_encode(["status" => "error", "message" => "Prepare failed: " . $conn->error]);
        exit();
    }

    // Bind parameters
    $stmt->bind_param("sssss", $name, $email, $password, $phone, $role);

    // Execute the statement
    $executed = $stmt->execute();

    if ($executed) {
        echo json_encode(["status" => "success", "message" => "Signup successful"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Signup failed: " . $stmt->error]);
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}
?>

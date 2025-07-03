<?php


include 'connection.php'; // Database connection

session_start(); // Start the session at the top to ensure it works

// Clear existing session if the user is already logged in
if (isset($_SESSION['user_id'])) {
    session_unset();
    session_destroy();
}

// Check if email and password exist in POST data
$email = isset($_POST['email']) ? $_POST['email'] : null;
$password = isset($_POST['password']) ? $_POST['password'] : null;

if (!$email || !$password) {
    echo json_encode(["status" => "error", "message" => "Email and Password are required"]);
    exit();
}

$query = "SELECT id, name, email, password, role, profile_pic FROM users WHERE email = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    
    if (password_verify($password, $user['password'])) {
        
        // Successful login
        $_SESSION['user_id'] = $user['id'];
        // var_dump($_SESSION['user_id']);
        $_SESSION['role'] = $user['role'];
        $_SESSION['name'] = $user['name'];

        // Log session details for debugging
        error_log("Session started for user ID: " . $_SESSION['user_id']);

        // Remove password before sending back to client
        unset($user['password']);

        echo json_encode([
            "status" => "success",
            "role" => $user['role'],
            "redirect" => $user['role'] === 'admin' ? "/admindashboard" : "/userdashboard",
            "user" => $user // Include the user object
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid password"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "User not found"]);
}

// var_dump $_SESSION['user_id'];
$stmt->close();
$conn->close();
?>

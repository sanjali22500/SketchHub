<?php
include 'connection.php'; // Your database connection file

// Admin details

// ✅ Hash the password
$hashed_password = password_hash($password, PASSWORD_BCRYPT);

// ✅ Check if admin already exists
$checkQuery = "SELECT id FROM users WHERE email = ?";
$stmtCheck = $conn->prepare($checkQuery);
$stmtCheck->bind_param("s", $email);
$stmtCheck->execute();
$stmtCheck->store_result();

if ($stmtCheck->num_rows > 0) {
    echo "Admin already exists!";
} else {
    // ✅ Insert admin with hashed password
    $query = "INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssss", $name, $email, $hashed_password, $role);

    if ($stmt->execute()) {
        echo "Admin inserted successfully!";
    } else {
        echo "Error: " . $conn->error;
    }
    $stmt->close();
}

$stmtCheck->close();
$conn->close();
?>
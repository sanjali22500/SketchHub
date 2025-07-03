<?php
header("Content-Type: application/json");
include("connection.php");

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$id = $_POST['id'] ?? null;
$name = $_POST['name'] ?? null;
$email = $_POST['email'] ?? null;
$role = $_POST['role'] ?? null;
$phone = $_POST['phone'] ?? null;
$address = $_POST['address'] ?? null;

if (!$id || !$name || !$email || !$role || !$phone || !$address) {
    echo json_encode(["status" => "error", "message" => "Missing fields"]);
    exit;
}

$profile_pic_name = null;

// Handle profile picture upload
if (isset($_FILES['profile_pic']) && $_FILES['profile_pic']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = "../uploads/";

    // Ensure the upload directory exists
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $fileTmpPath = $_FILES['profile_pic']['tmp_name'];
    $fileName = basename($_FILES['profile_pic']['name']);
    $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    // Validate file extension (Allow only image files)
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    if (!in_array($fileExtension, $allowedExtensions)) {
        echo json_encode(["status" => "error", "message" => "Invalid file type. Only jpg, jpeg, png, and gif are allowed."]);
        exit;
    }

    // Generate unique file name to avoid conflicts
    $newFileName = uniqid("profile_", true) . "." . $fileExtension;
    $destPath = $uploadDir . $newFileName;

    // Move uploaded file to the destination folder
    if (move_uploaded_file($fileTmpPath, $destPath)) {
        $profile_pic_name = $newFileName;
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to upload profile picture"]);
        exit;
    }
}

// Update user information in the database
if ($profile_pic_name) {
    $sql = "UPDATE users SET name = ?, email = ?, role = ?, phone = ?, profile_pic = ?, address = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssi", $name, $email, $role, $phone, $profile_pic_name, $address, $id);
} else {
    $sql = "UPDATE users SET name = ?, email = ?, role = ?, phone = ?, address = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssi", $name, $email, $role, $phone, $address, $id);
}

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "User updated successfully",
        "profile_pic" => $profile_pic_name
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update user: " . $conn->error]);
}

$stmt->close();
$conn->close();
?>

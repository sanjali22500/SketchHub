<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

include("connection.php");

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['id'])) {
    $id = $_POST['id'];

    // Step 1: Get the current profile_pic
    $stmt = $conn->prepare("SELECT profile_pic FROM users WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->bind_result($profilePic);
    $stmt->fetch();
    $stmt->close();

    if ($profilePic) {
        $filePath = "../uploads/" . $profilePic;

        // Step 2: Delete file if exists
        if (file_exists($filePath)) {
            unlink($filePath);
        }

        // Step 3: Update database
        $stmt = $conn->prepare("UPDATE users SET profile_pic = NULL WHERE id = ?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Profile picture removed"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to update database"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "No profile picture found"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}

$conn->close();
?>

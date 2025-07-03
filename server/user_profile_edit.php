<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

include("connection.php");

$response = [];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = $_POST["id"];
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $role = $_POST["role"];
    $profile_pic = $_POST["profile_pic"];


    $profilePicName = null;

    // Check if profile picture is uploaded
    if (isset($_FILES["profile_pic"])) {
        $uploadDir = "../uploads/";
        $originalName = basename($_FILES["profile_pic"]["name"]);
        $uniqueName = time() . "_" . preg_replace("/[^a-zA-Z0-9.]/", "_", $originalName);
        $uploadPath = $uploadDir . $uniqueName;

        if (move_uploaded_file($_FILES["profile_pic"]["tmp_name"], $uploadPath)) {
            $profilePicName = $uniqueName;

            // Optional: delete the old profile pic (if you want to avoid orphan files)
            $stmtOld = $conn->prepare("SELECT profile_pic FROM users WHERE id = ?");
            $stmtOld->bind_param("i", $id);
            $stmtOld->execute();
            $stmtOld->bind_result($oldPic);
            $stmtOld->fetch();
            $stmtOld->close();

            if ($oldPic && file_exists($uploadDir . $oldPic)) {
                unlink($uploadDir . $oldPic);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to upload file."]);
            exit;
        }
    }

    // Update user in the database
    if ($profilePicName) {
        $stmt = $conn->prepare("UPDATE users SET name=?, email=?, phone=?, role=?, profile_pic=? WHERE id=?");
        $stmt->bind_param("sssssi", $name, $email, $phone, $role, $profilePicName, $id);
    } else {
        $stmt = $conn->prepare("UPDATE users SET name=?, email=?, phone=?, role=? WHERE id=?");
        $stmt->bind_param("ssssi", $name, $email, $phone, $role, $id);
    }

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "profile_pic" => $profilePicName]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to update user."]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}

$conn->close();
?>

<?php
include 'connection.php';
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
    $role = htmlspecialchars(trim($_POST['role']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $address = htmlspecialchars(trim($_POST['address']));
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

    if (!$email) {
        echo json_encode(["status" => "error", "message" => "Invalid email"]);
        exit;
    }

    $profilePicPath = "";
    if (isset($_FILES['profile_pic']) && $_FILES['profile_pic']['error'] == 0) {
        $check = getimagesize($_FILES["profile_pic"]["tmp_name"]);
        if ($check === false) {
            echo json_encode(["status" => "error", "message" => "Uploaded file is not a valid image."]);
            exit;
        }

        $targetDir = "uploads/profile_pics/";
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        $fileExt = pathinfo($_FILES['profile_pic']['name'], PATHINFO_EXTENSION);
        $fileName = uniqid("profile_", true) . "." . $fileExt;
        $targetFile = $targetDir . $fileName;

        if (move_uploaded_file($_FILES["profile_pic"]["tmp_name"], $targetFile)) {
            $profilePicPath = $targetFile;
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to upload image."]);
            exit;
        }
    }

    $stmt = $conn->prepare("INSERT INTO users (name, email, role, phone, address, password, profile_pic) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $name, $email, $role, $phone, $address, $password, $profilePicPath);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "id" => $stmt->insert_id, "profile_pic" => $profilePicPath]);
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
    }

    $stmt->close();
    $conn->close();
}
?>

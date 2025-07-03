<?php
session_start();

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Check login
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User not authenticated"]);
    exit;
}

$user_id = $_SESSION['user_id'];

// DB Connection
$conn = new mysqli("localhost", "root", "", "project_6bca");
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed"]));
}

// Handle upload
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['image'])) {
        echo json_encode(["status" => "error", "message" => "No image uploaded"]);
        exit;
    }

    $image = $_FILES['image'];
    $name = $_POST['name'] ?? '';
    $price = $_POST['price'] ?? NULL;
    $disc_price = $_POST['discount_price'] ?? NULL;

    $target_dir = "Images/";
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0777, true);
    }

    $image_name = uniqid() . "_" . basename($image["name"]);
    $target_file = $target_dir . $image_name;

    if (move_uploaded_file($image["tmp_name"], $target_file)) {
        $stmt = $conn->prepare("INSERT INTO images_path (image_name, image_path, price, disc_price, user_id) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("ssdii", $image_name, $target_file, $price, $disc_price, $user_id);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Sketch uploaded successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Database insert failed"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to move uploaded file"]);
    }

    $conn->close();
}
?>

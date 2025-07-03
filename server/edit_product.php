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

// Collect POST data
$id = $_POST['id'] ?? null;
$name = $_POST['name'] ?? null;
$price = $_POST['price'] ?? null;
$disc_price = $_POST['disc_price'] ?? null;

// Validate required fields
if (!$id || !$name || !$price || !$disc_price) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

$image_name = null;

// Handle image upload if available
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = "../uploads/";

    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $tmpPath = $_FILES['image']['tmp_name'];
    $originalName = basename($_FILES['image']['name']);
    $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

    $allowedExt = ['jpg', 'jpeg', 'png', 'gif'];
    if (!in_array($extension, $allowedExt)) {
        echo json_encode(["status" => "error", "message" => "Invalid image format"]);
        exit;
    }

    $image_name = uniqid("product_", true) . "." . $extension;
    $destination = $uploadDir . $image_name;

    if (!move_uploaded_file($tmpPath, $destination)) {
        echo json_encode(["status" => "error", "message" => "Image upload failed"]);
        exit;
    }
}

// Prepare SQL with or without image update
if ($image_name) {
    $sql = "UPDATE images_path SET name = ?, price = ?, disc_price = ?, image = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sddsi", $name, $price, $disc_price, $image_name, $id);
} else {
    $sql = "UPDATE images_path SET name = ?, price = ?, disc_price = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sddi", $name, $price, $disc_price, $id);
}

// Execute and respond
if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "Product updated successfully",
        "image" => $image_name
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update product"]);
}

$stmt->close();
$conn->close();
?>

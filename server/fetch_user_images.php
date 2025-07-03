<?php
session_start();

include "connection.php";

// Ensure session user is set
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "User not logged in"]);
    exit();
}

$user_id = $_SESSION['user_id'];

$sql = "SELECT i.*, u.name AS uploader_name 
        FROM images_path i
        JOIN users u ON i.user_id = u.id
        WHERE i.user_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = [
        "id" => $row["id"],
        "name" => $row["image_name"],
        "price" => $row["price"],
        "disc_price" => $row["disc_price"],
        "path" => $row["image_path"],
        "uploader_name" => $row["uploader_name"]
    ];
}

echo json_encode($data);
$stmt->close();
$conn->close();
?>

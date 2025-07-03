<?php
include 'Connection.php';

// Clear any unwanted output
ob_clean();

// Updated query with JOIN to get uploader name
$sql = "SELECT i.*, u.name AS uploader_name 
        FROM images_path i
        LEFT JOIN users u ON i.add_by = u.id";

$result = $conn->query($sql);

// Check for query errors
if (!$result) {
    echo json_encode(["error" => "Database query failed: " . $conn->error]);
    exit();
}

$images = [];
while ($row = $result->fetch_assoc()) {
    $images[] = [
        "id" => $row["id"],
        "price" => $row["price"],
        "disc_price" => $row["disc_price"],
        "name" => $row["image_name"],
        "path" => $row["image_path"],
        "add_by" => $row["add_by"],
        "uploader_name" => $row["uploader_name"],
        "stock" => $row["stock"]
    ];
}

// Return clean JSON response
echo json_encode($images);
$conn->close();

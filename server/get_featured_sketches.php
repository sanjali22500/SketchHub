<?php
include 'Connection.php';

// Clear any unwanted output
ob_clean();

// SQL query to fetch only the featured sketches
$sql = "SELECT i.*, u.name AS uploader_name 
        FROM images_path i
        LEFT JOIN users u ON i.add_by = u.id
        WHERE i.is_featured = 1"; // Ensure this column exists in your table

$result = $conn->query($sql);

// Check for query errors
if (!$result) {
    echo json_encode(["error" => "Database query failed: " . $conn->error]);
    exit();
}

$featured_images = [];
while ($row = $result->fetch_assoc()) {
    $featured_images[] = [
        "id" => $row["id"],
        "price" => $row["price"],
        "disc_price" => $row["disc_price"],
        "name" => $row["image_name"],
        "path" => $row["image_path"],
        "uploader_name" => $row["uploader_name"],
        "stock" => $row["stock"],
        "is_featured" => $row["is_featured"]
    ];
}

// Return clean JSON response
echo json_encode($featured_images);
$conn->close();
?>

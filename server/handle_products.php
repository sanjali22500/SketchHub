<?php
ini_set('display_errors', 1);  // Enable error display
error_reporting(E_ALL);  // Report all errors
header("Content-Type: application/json"); // Ensure JSON response

include __DIR__ . "/connection.php";  // Include the database connection

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $action = $_POST['action'] ?? ''; // Get the action (upload, edit, delete)

    switch ($action) {
        case 'upload':
            // Check if all required fields are provided
            if (isset($_FILES["image"], $_POST["name"], $_POST["price"], $_POST["disc_price"], $_POST["stock"])) {

                // Sanitize and validate inputs
                $name = $conn->real_escape_string(trim($_POST['name']));
                $price = floatval($_POST['price']);
                $disc_price = floatval($_POST['disc_price']);
                $stock = intval($_POST['stock']);
                $add_by = $_POST['user_id']; // Default user ID for testing
                
                if (!$name || !$price || !$disc_price || !$stock) {
                    echo json_encode(["status" => "error", "message" => "All fields are required."]);
                    exit;
                }

                // Handle image upload
                $targetDir = __DIR__ . "/Images/";
                if (!is_dir($targetDir)) {
                    mkdir($targetDir, 0777, true);
                }

                $imageName = basename($_FILES["image"]["name"]);
                $targetFilePath = $targetDir . $imageName;

                // Check for file upload errors
                if ($_FILES["image"]["error"] !== UPLOAD_ERR_OK || !move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
                    echo json_encode(["status" => "error", "message" => "Error uploading file."]);
                    exit;
                }

                // Insert product data into the database
                $imagePath = "Images/" . $imageName;
                $sql = "INSERT INTO images_path (image_name, image_path, price, disc_price, stock, add_by)
                        VALUES ('$name', '$imagePath', '$price', '$disc_price', '$stock', '$add_by')";

                // Execute the SQL query and return response
                if ($conn->query($sql) === TRUE) {
                    echo json_encode(["status" => "success", "message" => "Product uploaded successfully."]);
                } else {
                    echo json_encode(["status" => "error", "message" => "Database error: " . $conn->error]);
                }
            } else {
                echo json_encode(["status" => "error", "message" => "Missing required fields or file."]);
            }
            break;

        case 'edit':
            // Check if all required fields are provided for editing
            if (isset($_POST["id"], $_POST["name"], $_POST["price"], $_POST["disc_price"], $_POST["stock"])) {
                $id = intval($_POST["id"]);
                $name = $conn->real_escape_string(trim($_POST['name']));
                $price = floatval($_POST['price']);
                $disc_price = floatval($_POST['disc_price']);
                $stock = intval($_POST['stock']);
                $imagePath = '';

                if ($_FILES["image"]["error"] === UPLOAD_ERR_OK) {
                    $imageName = basename($_FILES["image"]["name"]);
                    $targetDir = __DIR__ . "/Images/";
                    $targetFilePath = $targetDir . $imageName;

                    if (!move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
                        echo json_encode(["status" => "error", "message" => "Error uploading new image."]);
                        exit;
                    }

                    $imagePath = "Images/" . $imageName;
                } else {
                    // If no new image is uploaded, keep the existing image
                    $imagePath = $_POST['image_path'];
                }

                // Update product data in the database
                $sql = "UPDATE images_path SET image_name='$name', image_path='$imagePath', price='$price', disc_price='$disc_price', stock='$stock'
                        WHERE id=$id";

                if ($conn->query($sql) === TRUE) {
                    echo json_encode(["status" => "success", "message" => "Product updated successfully."]);
                } else {
                    echo json_encode(["status" => "error", "message" => "Database error: " . $conn->error]);
                }
            } else {
                echo json_encode(["status" => "error", "message" => "Missing required fields for editing."]);
            }
            break;

        case 'delete':
            // Check if product ID is provided for deletion
            if (isset($_POST["id"]) && is_numeric($_POST["id"])) {
                $id = intval($_POST["id"]);

                // Check if the product exists
                $checkSql = "SELECT * FROM images_path WHERE id = $id";
                $checkResult = $conn->query($checkSql);

                if ($checkResult && $checkResult->num_rows > 0) {
                    // Proceed with deleting the product
                    $deleteSql = "DELETE FROM images_path WHERE id = $id";

                    if ($conn->query($deleteSql) === TRUE) {
                        echo json_encode(["status" => "success", "message" => "Product deleted successfully."]);
                    } else {
                        echo json_encode(["status" => "error", "message" => "Database error during deletion: " . $conn->error]);
                    }
                } else {
                    echo json_encode(["status" => "error", "message" => "Product not found with the provided ID."]);
                }
            } else {
                echo json_encode(["status" => "error", "message" => "Invalid or missing ID for deletion."]);
            }
            break;

        default:
            echo json_encode(["status" => "error", "message" => "Invalid action."]);
            break;
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

$conn->close();
?>

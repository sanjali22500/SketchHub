<?php

include_once('cros.php');

// Disable HTML errors in production
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(0);

// Database details
$host = "localhost";
$user = "root";
$pwd = "";
$db = "sketchhub";

// Establish connection
$conn = mysqli_connect($host, $user, $pwd, $db);

if (!$conn) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed: " . mysqli_connect_error()
    ]);
    exit();
}
?>

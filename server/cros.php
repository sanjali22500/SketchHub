<?php
// Allow cross-origin requests from localhost:5173 (your React app)
// Enable CORS
header("Access-Control-Allow-Origin: *"); // Allows all origins, replace '*' with specific origin if necessary
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With"); // Allow specific headers

// Handle OPTIONS request (preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Rest of your code


// Your existing PHP code for handling the add to cart logic
?>

<?php

include("connection.php"); // DB connection file

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}


$response = [];

// Get user ID from the session or from request (GET method)
$user_id = $_GET['id'] ?? null;

if ($user_id) {
    // Fetch user details for a specific user by ID
    $query = "SELECT id, name, email, phone, address, role, profile_pic, created_at FROM users WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result && $result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Fetch total uploads count
        $count_query = "SELECT COUNT(*) AS total_uploads FROM images_path WHERE add_by = ?";
        $count_stmt = $conn->prepare($count_query);
        $count_stmt->bind_param("i", $user_id);
        $count_stmt->execute();
        $count_result = $count_stmt->get_result();
        $count_data = $count_result->fetch_assoc();
        $user['total_uploads'] = $count_data['total_uploads'] ?? 0;
        $count_stmt->close();

        // Fetch recent 3 sketches with more info
        $recent_query = "SELECT image_name, image_path, price, disc_price FROM images_path WHERE add_by = ? ORDER BY added DESC LIMIT 3";
        $recent_stmt = $conn->prepare($recent_query);
        $recent_stmt->bind_param("i", $user_id);
        $recent_stmt->execute();
        $recent_result = $recent_stmt->get_result();
        $recent_uploads = [];
        while ($row = $recent_result->fetch_assoc()) {
            $recent_uploads[] = [
                "name" => $row['image_name'],
                "path" => $row['image_path'],
                "price" => $row['price'],
                "disc_price" => $row['disc_price']
            ];
        }
        $user['recent_uploads'] = $recent_uploads;
        $recent_stmt->close();

        $response = [
            "status" => "success",
            "user" => $user
        ];
    } else {
        $response = [
            "status" => "error",
            "message" => "User not found"
        ];
    }

    $stmt->close();
}
else {
    // Fetch all users
    $sql = "SELECT id, name, email, role, created_at, phone, address FROM users";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $users = [];
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }

        $response = [
            "status" => "success",
            "users" => $users
        ];
    } else {
        $response = [
            "status" => "error",
            "message" => "No users found"
        ];
    }
}

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

$conn->close();
?>

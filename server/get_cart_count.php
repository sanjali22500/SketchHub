<?php
include 'connection.php'; 

$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

if ($user_id > 0) {
    $stmt = $conn->prepare("SELECT COUNT(*) AS count FROM cart WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result && $row = $result->fetch_assoc()) {
        echo json_encode(["count" => $row['count']]);
    } else {
        echo json_encode(["count" => 0]);
    }

    $stmt->close();
} else {
    echo json_encode(["count" => 0]);
}

$conn->close();
?>

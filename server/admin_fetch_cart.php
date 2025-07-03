<?php
include 'connection.php.php';

$sql = "SELECT 
          c.cart_id, 
          u.name AS user_name, 
          i.name AS product_name, 
          i.path, 
          i.price, 
          i.disc_price, 
          c.quantity 
        FROM cart c
        JOIN users u ON c.user_id = u.id
        JOIN images_path i ON c.product_id = i.id";

$result = mysqli_query($conn, $sql);
$data = [];

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    echo json_encode(["success" => true, "items" => $data]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to fetch cart items"]);
}
?>

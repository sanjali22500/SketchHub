<?php
session_start();
if (!isset($_SESSION["user_id"])) {
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit;
}
echo json_encode(["status" => "success", "role" => $_SESSION["role"]]);
?>
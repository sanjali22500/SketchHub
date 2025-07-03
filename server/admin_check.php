<?php
session_start();
if ($_SESSION["role"] !== "admin") {
    echo json_encode(["status" => "error", "message" => "Access denied"]);
    exit;
}
?>
<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/SMTP.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'sanjali22500@gmail.com'; // Replace with your email
    $mail->Password = 'sbfdofbxfioynvic';   // Use 16-char app password
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom($_POST['email'], $_POST['first_name']);
    $mail->addAddress('sanjali22500@gmail.com'); // Where you want to receive it

    $mail->Subject = $_POST['subject'];
    $mail->Body = "Message from: " . $_POST['first_name'] . " " . $_POST['last_name'] .
                  "\nEmail: " . $_POST['email'] .
                  "\nPhone: " . $_POST['number'] .
                  "\n\nMessage:\n" . $_POST['review'];

    $mail->send();

    echo json_encode(["status" => "success"]);
} catch (Exception $e) {
    echo json_encode(["status" => "failed", "error" => $mail->ErrorInfo]);
}

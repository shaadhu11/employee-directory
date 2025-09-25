<?php
$host = "localhost";
$user = "root";   // change if your MySQL user is different
$pass = "9483";       // add password if required
$db   = "employee_directory";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>


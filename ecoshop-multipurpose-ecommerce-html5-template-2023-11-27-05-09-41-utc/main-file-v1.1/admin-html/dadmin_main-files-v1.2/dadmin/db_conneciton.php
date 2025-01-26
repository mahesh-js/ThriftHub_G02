<?php
// Database credentials
$servername = "localhost";  // Use "localhost" for XAMPP
$username = "root";         // Default XAMPP username
$password = "";             // Default XAMPP password (leave empty)
$database = "thrifthub";    // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Connection successful
?>

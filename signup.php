<?php
$servername = "localhost";
$username = "root"; // Replace with your MySQL username
$password = ""; // Replace with your MySQL password
$dbname = "thrighthub";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // Generate a verification token
    $verificationToken = bin2hex(random_bytes(16));

    // Insert new user
    $stmt = $conn->prepare("INSERT INTO users (username, email, password, verification_token) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $username, $email, $password, $verificationToken);

    if ($stmt->execute()) {
        // Send verification email
        $mailOptions = [
            'from' => 'your-email@gmail.com',
            'to' => $email,
            'subject' => 'Verify Your Email',
            'text' => "Click the link to verify your email: http://localhost/verify-email?token=$verificationToken"
        ];

        // Use PHPMailer or any other library to send the email
        // For simplicity, we're just echoing the message here
        echo "Verification email sent. Please check your inbox.";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
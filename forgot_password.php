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
    $email = $_POST['email'];

    $stmt = $conn->prepare("SELECT id, email FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Generate a reset token
        $resetToken = bin2hex(random_bytes(16));

        // Update the user's reset token
        $updateStmt = $conn->prepare("UPDATE users SET reset_token = ? WHERE id = ?");
        $updateStmt->bind_param("si", $resetToken, $user['id']);
        $updateStmt->execute();

        // Send reset email
        $mailOptions = [
            'from' => 'your-email@gmail.com',
            'to' => $email,
            'subject' => 'Password Reset Request',
            'text' => "You requested a password reset. Click the link to reset your password: http://localhost/reset-password?token=$resetToken"
        ];

        // Use PHPMailer or any other library to send the email
        // For simplicity, we're just echoing the message here
        echo "Reset email sent. Please check your inbox.";
    } else {
        echo "User not found.";
    }

    $stmt->close();
    $updateStmt->close();
}

$conn->close();
?>
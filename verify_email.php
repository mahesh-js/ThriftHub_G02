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

if (isset($_GET['token'])) {
    $token = $_GET['token'];

    $stmt = $conn->prepare("SELECT id, verified, verification_token FROM users WHERE verification_token = ?");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (!$user['verified']) {
            // Verify the user
            $updateStmt = $conn->prepare("UPDATE users SET verified = TRUE, verification_token = NULL WHERE id = ?");
            $updateStmt->bind_param("i", $user['id']);
            $updateStmt->execute();

            echo "Email verified successfully.";
        } else {
            echo "Email already verified.";
        }
    } else {
        echo "Invalid or expired token.";
    }

    $stmt->close();
    $updateStmt->close();
} else {
    echo "Token not provided.";
}

$conn->close();
?>
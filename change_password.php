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
    $currentPassword = $_POST['currentPassword'];
    $newPassword = password_hash($_POST['newPassword'], PASSWORD_DEFAULT);

    $stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($currentPassword, $user['password'])) {
            // Update the user's password
            $updateStmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
            $updateStmt->bind_param("si", $newPassword, $user['id']);
            $updateStmt->execute();

            echo "Password changed successfully.";
        } else {
            echo "Incorrect current password.";
        }
    } else {
        echo "User not found.";
    }

    $stmt->close();
    $updateStmt->close();
}

$conn->close();
?>
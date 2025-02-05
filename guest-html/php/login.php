<?php
// Start the session
session_start();

// Include database connection
include 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Prepare SQL query to check username
    $sql = "SELECT * FROM users WHERE username = ? AND role = 'guest'";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verify password
        if (password_verify($password, $user['password'])) {
            // Successful login
            $_SESSION['username'] = $username;
            $_SESSION['role'] = 'guest';
            header("Location: guest_dashboard.php");
            exit();
        } else {
            echo "<p style='color: red;'>Invalid password. Please try again.</p>";
        }
    } else {
        echo "<p style='color: red;'>Username not found or not registered as a guest.</p>";
    }

    $stmt->close();
}
$conn->close();
?>

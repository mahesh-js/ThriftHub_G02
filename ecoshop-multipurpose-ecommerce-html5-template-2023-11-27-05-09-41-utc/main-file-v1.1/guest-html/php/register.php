<?php
// Include database connection
include 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Capture form data
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Hash the password for security
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit();
    }

    // Insert data into the database
    $sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'guest')";
    $stmt = $conn->prepare($sql);
    $username = $first_name . ' ' . $last_name; // Combine first and last name as username
    $stmt->bind_param("sss", $username, $email, $hashed_password);

    if ($stmt->execute()) {
        echo "Guest registration successful! Welcome, $username.";
    } else {
        // Handle duplicate email error
        if ($conn->errno == 1062) {
            echo "This email is already registered. Please use a different email.";
        } else {
            echo "Error: " . $stmt->error;
        }
    }

    $stmt->close();
}
$conn->close();
?>

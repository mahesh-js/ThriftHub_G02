<?php
// Start session
session_start();

// Check if the user is logged in
if (!isset($_SESSION['username'])) {
    header("Location: login.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="css/style.css"> <!-- Link to the CSS -->
</head>
<body>
    <div class="dashboard-container">
        <h1>Welcome to ThriftHub, <?php echo htmlspecialchars($_SESSION['username']); ?>!</h1>
        <a href="logout.php" class="btn">Logout</a>
    </div>
</body>
</html>
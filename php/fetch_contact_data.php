<?php
// Establish a database connection
$servername = "your_servername";
$username = "your_username";
$password = "your_password";
$database = "your_database";

$conn = new mysqli("211.47.74.45", "pozstar", "dream81tns00!!", "dbpozstar");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query the "contact_page" table with specific columns
$sql = "SELECT name, mobile, email, message FROM contact_page";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $contactData = array();

    while ($row = $result->fetch_assoc()) {
        $contactData[] = $row;
    }

    // Convert data to JSON format
    $jsonContent = json_encode($contactData, JSON_PRETTY_PRINT);

    // Output JSON data
    echo $jsonContent;
} else {
    echo "Data not fetched.";
}

$conn->close();
?>
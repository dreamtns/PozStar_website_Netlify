<?php

define('MYSQL_HOST', '211.47.74.45');
define('MYSQL_USER', 'pozstar');
define('MYSQL_PASSWORD', 'dream81tns00!!');
define('MYSQL_DB', 'dbpozstar');

// Replace 'your_database_name' with the desired database name
$database_name = 'dbpozstar';

// Replace 'your_username' and 'your_password' with your MySQL username and password
$username = 'pozstar';
$password = 'dream81tns00!!';

// Initialize the response array
$response = array("success" => false, "message" => "An error occurred. Please try again later.");

// Function to log errors
function logError($error) {
    $logFile = 'error_log.txt';
    file_put_contents($logFile, date('Y-m-d H:i:s') . ' ' . $error . PHP_EOL, FILE_APPEND);
}

$userAnswer = $_POST['challenge-answer'] ?? '';

// Validate the challenge answer
if ($_POST['challenge-answer'] != $userAnswer) {
    echo json_encode([
        "success" => false,
        "message" => "Challenge question answer is incorrect."
    ]);
    exit;
}

try {
    // Create a connection to the MySQL server
    $connection = new mysqli('211.47.74.45', $username, $password);

    // Check the connection
    if ($connection->connect_error) {
        logError("Connection failed: " . $connection->connect_error);
    } else {
        // Create the database if it doesn't exist
        $query = "CREATE DATABASE IF NOT EXISTS $database_name";
        if ($connection->query($query) !== TRUE) {
            logError("Error creating database: " . $connection->error);
        } else {
            // Close the connection
            $connection->close();

            // Establish a database connection (replace with your database credentials)
            $mysqli = new mysqli("211.47.74.45", "pozstar", "dream81tns00!!", "dbpozstar");

            // Check the connection
            // Check connection
            if ($mysqli->connect_error) {
                logError("Connection failed: " . $mysqli->connect_error);
            } else {
                // Get values from the HTML form
                $name = $_POST['firstname'];
                $mobile = $_POST['number'];
                $email = $_POST['email'];
                $country = $_POST['country'];
                $city = $_POST['city'];
                $message = $_POST['message'];

                // Capture the IP address and current timestamp
                $ip_address = $_SERVER['REMOTE_ADDR'];
                $submission_time = date('Y-m-d H:i:s'); // Current timestamp

                // Table creation query with IP address and timestamp
                $tableName = "contact_page_2";
                $createTableSQL = "CREATE TABLE IF NOT EXISTS $tableName (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    mobile VARCHAR(20) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    country VARCHAR(255) NOT NULL,
                    city VARCHAR(255) NOT NULL,
                    message TEXT NOT NULL,
                    ip_address VARCHAR(45) NOT NULL,
                    submission_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )";

                // Execute table creation query
                if ($mysqli->query($createTableSQL) !== TRUE) {
                    logError("Error creating table: " . $mysqli->error);
                } else {
                    // Prepare an SQL INSERT statement with IP address and timestamp
                    $insertSQL = "INSERT INTO $tableName (name, mobile, email, country, city, message, ip_address, submission_time) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

                    // Use prepared statements to prevent SQL injection
                    if ($stmt = $mysqli->prepare($insertSQL)) {
                        // Bind parameters
                        $stmt->bind_param("ssssssss", $name, $mobile, $email, $country, $city, $message, $ip_address, $submission_time);

                        // Execute the statement
                        if ($stmt->execute()) {
                            if ($stmt->affected_rows > 0) {
                                // Update the response for success
                                $response["success"] = true;
                                $response["message"] = "Contact information stored successfully.";
                            } else {
                                logError("No rows were affected. Contact information may not have been inserted.");
                                $response["success"] = false;
                                $response["message"] = "No rows affected.";
                            }
                        } else {
                            logError("Error: " . $stmt->error);
                            $response["success"] = false;
                            $response["message"] = "Error executing statement.";
                        }

                        // Close the statement
                        $stmt->close();
                    } else {
                        logError("Error preparing statement: " . $mysqli->error);
                    }
                }

                // Close the database connection
                $mysqli->close();
            }
        }
    }
} catch (Exception $e) {
    logError("Exception: " . $e->getMessage());
}

// Send the JSON response
header('Content-Type: application/json');
echo json_encode($response);
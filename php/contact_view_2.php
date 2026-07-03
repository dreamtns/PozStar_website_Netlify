<?php
// Include the configuration file
include 'config.php';

// Create a connection using the defined constants
$conn = new mysqli(MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to select data from the table
$sql = "SELECT id, name, mobile, email, country, city, message FROM contact_page_2";
$result = $conn->query($sql);

// Check if the query was successful
if ($result === false) {
    die("Error: " . $conn->error);  // Display the MySQL error
}

// Get the number of records
$num_records = $result->num_rows;

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Database Records</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .name-column {
            width: 100px;
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    </style>
</head>
<body>

<h2>Database Records</h2>

<p>Total Records: <?php echo $num_records; ?></p> <!-- Display the number of records -->

<table>
    <tr>
        <th>ID</th>
        <th class="name-column">Name</th> <!-- Apply the class here -->
        <th>Mobile</th>
        <th>Email</th>
        <th>Country</th>
        <th>City</th>
        <th>Message</th>
    </tr>

    <?php
    // Check if there are records in the result set
    if ($num_records > 0) {
        // Output data of each row
        while($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>" . $row["id"] . "</td>";
            echo "<td class='name-column'>" . $row["name"] . "</td>"; // Apply the class here
            echo "<td>" . $row["mobile"] . "</td>";
            echo "<td>" . $row["email"] . "</td>";
            echo "<td>" . $row["country"] . "</td>";
            echo "<td>" . $row["city"] . "</td>";
            echo "<td>" . $row["message"] . "</td>";
            echo "</tr>";
        }
    } else {
        echo "<tr><td colspan='5'>No records found</td></tr>";
    }

    // Close the connection
    $conn->close();
    ?>

</table>

</body>
</html>
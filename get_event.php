<?php
// Connect to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "phplogin";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Prepare the SELECT statement
$stmt = $conn->prepare("SELECT title, start_time, end_time FROM events");
$stmt->execute();

// Bind the result columns
$stmt->bind_result($title, $start_time, $end_time);

// Fetch and process the results
$events = array();
while ($stmt->fetch()) {
  $event = array(
    'title' => $title,
    'start' => $start_time,
    'end' => $end_time
  );
  $events[] = $event;
}

// Close the statement and connection
$stmt->close();
$conn->close();

// Return the results in JSON format
header('Content-Type: application/json');
echo json_encode($events);
?>

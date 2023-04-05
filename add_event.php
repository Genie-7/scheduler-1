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

// Receive the event data
$title = $_POST['title'];
$start_time = $_POST['start'];
$end_time = $_POST['end'];

// Format the start and end times as valid MySQL date and time strings
$start_time = date('Y-m-d H:i:s', strtotime($start_time));
$end_time = date('Y-m-d H:i:s', strtotime($end_time));

// Prepare and bind the insert statement
$stmt = $conn->prepare("INSERT INTO events (title, start_time, end_time) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $title, $start_time, $end_time);

// Execute the statement and check for errors
if ($stmt->execute()) {
  echo "Event added successfully";
} else {
  echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>

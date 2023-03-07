<?php
session_start();
//connection info
$DATABASE_HOST = 'localhost';
$DATABASE_USER = 'root';
$DATABASE_PASS = '';
$DATABASE_NAME = 'phplogin';
//connect to phpmyadmin db
$con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
if ( mysqli_connect_errno() ) {
	//check for error in connecting
	exit('Failed to connect to MySQL: ' . mysqli_connect_error());
}
// Now we check if login form data was submitted
if ( !isset($_POST['username'], $_POST['password']) ) {
	// Could not get the data
	exit('Please fill both the username and password fields!');
}
// Preparing sql statement
if ($stmt = $con->prepare('SELECT id, password FROM accounts WHERE username = ?')) {
	// Bind parameters (s = string, i = int, b = blob)
	$stmt->bind_param('s', $_POST['username']);
	$stmt->execute();
	// Store the result
	$stmt->store_result();
	if ($stmt->num_rows > 0) {
		$stmt->bind_result($id, $password);
		$stmt->fetch();
		// Account exists, verify password.
		// Use password_hash in registration file to store hashed passwords
		if (password_verify($_POST['password'], $password)) {
			// Verification success, user logged-in
			// Create sessions, to know user is logged in, basically cookies but remember data on the server
			session_regenerate_id();
			$_SESSION['loggedin'] = TRUE;
			$_SESSION['name'] = $_POST['username'];
			$_SESSION['id'] = $id;
			header('Location: index.php');
		} else {
			// Incorrect password
			echo 'Incorrect username and/or password!';
		}
	} else {
		// Incorrect username
		echo 'Incorrect username and/or password!';
	}

	$stmt->close();
}
?>
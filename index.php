<?php
// using sessions always start using the below code
session_start();
// If user ! logged in, redirect to login page
if (!isset($_SESSION['loggedin'])) {
	header('Location: login.html');
	exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.4/index.global.min.js'></script>
  <script src='fullcalendar-scheduler-6.1.4\dist\index.global.js'></script>
  <title>Scheduler</title>
  <link rel="stylesheet" href="style.css">
  <meta charset="utf-8">
		<title>Home Page</title>
		<link href="style.css" rel="stylesheet" type="text/css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer">
</head>
<body>
    <nav class="navtop">
          <div>
            <h1>Website Title</h1>
            <a href="profile.php"><i class="fas fa-user-circle"></i>Profile</a>
            <a href="logout.php"><i class="fas fa-sign-out-alt"></i>Logout</a>
          </div>
        </nav>
        <div class="content">
          <h2>Home Page</h2>
          <p>Welcome back, <?=$_SESSION['name']?>!</p>
        </div>
  <button style="float: right;" onclick="toggleView()">Change View</button>

  <div id='calendar_Por'></div>
  <div id='calendar_Lands'></div>


</body>
<script src="index.js"></script>
</html>
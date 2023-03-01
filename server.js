const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'database'
});

connection.connect(err => {
  if (err) {
    return err;
  }
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/events", (req, res) => {
  const sqlSelect = "SELECT * FROM events"
  db.query(sqlSelect, (err, result) => {
      res.send(result); 
  });
})

app.post("/api/events", (req, res) => {
  const eventName = req.body.eventName;
  const eventDate = req.body.eventDate;
  const eventDescription = req.body.eventDescription;
  const eventLocation = req.body.eventLocation;

  const sqlInsert = "INSERT INTO events (eventName, eventDate, eventDescription, eventLocation) VALUES (?, ?, ?, ?)";
  db.query(sqlInsert, [eventName, eventDate, eventDescription, eventLocation], (err, result) => {
      console.log(result);
  });
});


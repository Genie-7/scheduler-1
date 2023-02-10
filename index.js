// // Create an array of weekdays
// var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// // Create an array of times
// var times = ["", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

// // Get the table element
// var table = document.getElementById("calendar-table");
// var btn = document.getElementById("create-event");
// btn.onclick = function () {
//   console.log("clicked");
// };

// // Create the header row with weekdays
// var headerRow = table.insertRow(0);
// for (var i = 0; i < times.length; i++) {
//   var headerCell = headerRow.insertCell(i);
//   // headerCell.innerHTML = weekdays[i];
//   headerCell.innerHTML = times[i];

// }

// // Create the remaining rows with times and slots
// for (var i = 0; i < weekdays.length; i++) {
//   var timeRow = table.insertRow(i + 1);
//   var timeCell = timeRow.insertCell(0);
//   timeCell.innerHTML = weekdays[i];
//   for (var j = 0; j < times.length -1; j++) {
//     var slotCell = timeRow.insertCell(j + 1);
//     slotCell.innerHTML = "&nbsp;"; // Add a non-breaking space to the cell
//   }
// }

// document.querySelector("form").addEventListener("submit", function(event) {
//   event.preventDefault(); // prevent the form from submitting

//   // Get the values of the form inputs
//   var eventName = document.getElementById("event-name").value;
//   var eventDay = document.getElementById("event-day").value;
//   var eventTime = document.getElementById("event-time").value;

//   // Get the index of the selected day and time
//   var dayIndex = weekdays.indexOf(eventDay);
//   var timeIndex = times.indexOf(eventTime);

//   // Get the cell for the selected day and time
//   var eventCell = table.rows[dayIndex + 1].cells[timeIndex + 1];

//   // Add the event name to the cell
//   eventCell.innerHTML = eventName;
// });

// Create an array of weekdays
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Create an array of times
var times = ["", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

// Get the table element
var table = document.getElementById("calendar-table");

// Get the create event button and add an event listener to it
var createEventButton = document.getElementById("create-event");
createEventButton.addEventListener("click", function () {
  // Show the modal when the button is clicked
  document.getElementById("event-modal").style.display = "block";
});

// Get the event form
var eventForm = document.querySelector("#event-form form");

// Add a submit event listener to the form
eventForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get the values of the event name, day, and time inputs
  var eventName = document.querySelector("#event-name").value;
  var eventDayIndex = document.querySelector("#event-day").selectedIndex;
  var eventDay = weekdays[eventDayIndex];
  console.log(eventDay);
  var eventTimeIndex = document.querySelector("#event-time").selectedIndex + 1;
  var eventTime = times[eventTimeIndex];

  // Get the cell for the event day and time
  var eventCell = table.rows[eventDayIndex + 1].cells[eventTimeIndex];

  // Add the event name to the cell
  eventCell.innerHTML += eventName;

  // Hide the modal
  document.getElementById("event-modal").style.display = "none";
});

// Create the header row with weekdays
var headerRow = table.insertRow(0);
for (var i = 0; i < times.length; i++) {
  var headerCell = headerRow.insertCell(i);
  headerCell.innerHTML = times[i];
}

// Create the remaining rows with times and slots
for (var i = 0; i < weekdays.length; i++) {
  var timeRow = table.insertRow(i + 1);
  var timeCell = timeRow.insertCell(0);
  timeCell.innerHTML = weekdays[i];
  for (var j = 0; j < times.length - 1; j++) {
    var slotCell = timeRow.insertCell(j + 1);
    slotCell.innerHTML = "&nbsp;"; // Add a non-breaking space to the cell
  }
}

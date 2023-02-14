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
  // click outside the modal to close it
  window.onclick = function (event) {
    if (event.target == document.getElementById("event-modal")) {
      document.getElementById("event-modal").style.display = "none";
    }
  }
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

  // save the event to local storage after the form is submitted
  var event = {
    name: eventName,
    day: eventDay,
    time: eventTime
  };
  var events = JSON.parse(localStorage.getItem("events")) || [];
  events.push(event);
  localStorage.setItem("events", JSON.stringify(events));


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

// drag and drop color change

var colorOptions = document.querySelectorAll(".color-options .color");
var tableCells = document.querySelectorAll("#calendar-table td");
var removeOption = document.getElementById("remove-option");

// Loop through the color options and add an event listener to each one
for (var i = 0; i < colorOptions.length; i++) {
  var colorOption = colorOptions[i];

  colorOption.addEventListener("dragstart", function (event) {
    // Set the data type and data for the drag operation
    event.dataTransfer.setData("text/plain", this.classList[1]);
  });
}

// Loop through the table cells and add an event listener to each one
for (var i = 0; i < tableCells.length; i++) {
  var tableCell = tableCells[i];

  tableCell.addEventListener("dragover", function (event) {
    event.preventDefault(); // Allow the drag operation to drop on the table cell
  });

  tableCell.addEventListener("drop", function (event) {
    var colorClass = event.dataTransfer.getData("text/plain");
    // checks if the element has a background color
    if (this.classList.length > 0) {
      // if it does, remove the background color
      this.className = "";
    }
    this.classList.add(colorClass); // Add the color class to the table cell
    event.preventDefault(); // Prevent the browser from opening the data as a link
  });
}

// getItems from local storage and display them on the page when the page loads for the first time or when the page is refreshed
var events = JSON.parse(localStorage.getItem("events")) || [];
for (var i = 0; i < events.length; i++) {
  var event = events[i];
  var dayIndex = weekdays.indexOf(event.day);
  var timeIndex = times.indexOf(event.time);
  var eventCell = table.rows[dayIndex + 1].cells[timeIndex];
  eventCell.innerHTML = event.name;
}
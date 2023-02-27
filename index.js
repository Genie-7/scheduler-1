// document.addEventListener('DOMContentLoaded', function() {
//   var calendarEl_Portrait = document.getElementById('calendar_Por');

//   var calendar = new FullCalendar.Calendar(calendarEl_Portrait, {
//     timeZone: 'UTC',
//     initialView: 'timeGridWeek',
//     height: 'auto',
//     headerToolbar: {
//       left: 'prev,next today',
//       center: 'title',
//       right: 'dayGridMonth,timeGridWeek,timeGridDay'
//     },
//     editable: true,
//     selectable: true,
//     selectMirror: true,
//     select: function (arg) {
//       var title = prompt('Event Title:');
//       if (title) {
//         calendar.addEvent({
//           id: title,
//           title: title,
//           start: arg.start,
//           end: arg.end,
//           allDay: arg.allDay,
//           eventColor: '#373006',
//         })
//       }
//       calendar.unselect()
//     },
//   });
//   calendar.render();
// });

// document.addEventListener('DOMContentLoaded', function() {
//   var calendarEl_Landscape = document.getElementById('calendar_Lands');

//   var calendar = new FullCalendar.Calendar(calendarEl_Landscape, {
//     timeZone: 'UTC',
//     initialView: 'resourceTimelineWeek',
//     height: 'auto',
//     width: 'auto',
//     headerToolbar: {
//       left: 'prev,next',
//       center: 'title',
//       right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
//     },
//     editable: true,
//     selectable: true,
//     selectMirror: true,
//     resourceAreaHeaderContent: 'Days',
//     resources: [
//       // days of the week
//       { class:'days', id: 'a', title: 'Monday' },
//       { class:'days', id: 'b', title: 'Tuesday' },
//       { class:'days', id: 'c', title: 'Wednesday' },
//       { class:'days', id: 'd', title: 'Thursday' },
//       { class:'days', id: 'e', title: 'Friday' },
//       { class:'days', id: 'f', title: 'Saturday' },
//       { class:'days', id: 'g', title: 'Sunday' }
//     ],
//     select: function (arg) {
//       var title = prompt('Event Title:');
//       if (title) {
//         calendar.addEvent({
//           title: title,
//           start: arg.start,
//           end: arg.end,
//           allDay: arg.allDay,
//           resourceId: arg.resource.id // Assign the event to the selected day
//         })
//       }
//       calendar.unselect()
//     }
//   });
//   calendar.render();
// });

// // toggleview
// function toggleView() {
//   var x = document.getElementById("calendar_Por");
//   var y = document.getElementById("calendar_Lands");
//   if (x.style.display === "none") {
//     x.style.display = "block";
//     y.style.display = "none";
//     calendar.render();
//   } else {
//     x.style.display = "none";
//     y.style.display = "block";
//     calendar.render();
//   }
// }
var CalendarPortrait, CalendarLandscape;

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl_Portrait = document.getElementById('calendar_Por');

  CalendarPortrait = new FullCalendar.Calendar(calendarEl_Portrait, {
    timeZone: 'UTC',
    initialView: 'timeGridWeek',
    height: 'auto',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    selectable: true,
    selectMirror: true,
    select: function (arg) {
      var title = prompt('Event Title:');
      if (title) {
        CalendarPortrait.addEvent({
          id: title,
          title: title,
          start: arg.start,
          end: arg.end,
          allDay: arg.allDay,
          eventColor: '#373006',
        })
      }          
      CalendarPortrait.unselect()
    }, 
  });
  CalendarPortrait.render();

  var calendarEl_Landscape = document.getElementById('calendar_Lands');

  CalendarLandscape = new FullCalendar.Calendar(calendarEl_Landscape, {
    timeZone: 'UTC',
    initialView: 'resourceTimelineWeek',
    height: 'auto',
    width: 'auto',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
    },
    editable: true,
    selectable: true,
    selectMirror: true,
    resourceAreaHeaderContent: 'Days',
    resources: [
      // days of the week
      { class:'days', id: 'a', title: 'Monday' },
      { class:'days', id: 'b', title: 'Tuesday' },
      { class:'days', id: 'c', title: 'Wednesday' },
      { class:'days', id: 'd', title: 'Thursday' },
      { class:'days', id: 'e', title: 'Friday' },
      { class:'days', id: 'f', title: 'Saturday' },
      { class:'days', id: 'g', title: 'Sunday' }
    ],
    select: function (arg) {
      var title = prompt('Event Title:');
      if (title) {
        CalendarLandscape.addEvent({
          title: title,
          start: arg.start,
          end: arg.end,
          allDay: arg.allDay,
          resourceId: arg.resource.id // Assign the event to the selected day
        })
      }
      CalendarLandscape.unselect()
    }
  });
  CalendarLandscape.render();
});

// toggleview
function toggleView() {
  var x = document.getElementById("calendar_Por");
  var y = document.getElementById("calendar_Lands");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
    CalendarPortrait.render();
  } else {
    x.style.display = "none";
    y.style.display = "block";
    CalendarLandscape.render();
  }
}

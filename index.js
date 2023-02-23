document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    timeZone: 'UTC',
    initialView: 'timeGridWeek',
    height: 700,
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
        calendar.addEvent({
          title: title,
          start: arg.start,
          end: arg.end,
          allDay: arg.allDay
        })
      }
      calendar.unselect()
    }
  });

  calendar.render();
});

// landscape
// document.addEventListener('DOMContentLoaded', function() {
//   var calendarEl = document.getElementById('calendar');

//   var calendar = new FullCalendar.Calendar(calendarEl, {
//     timeZone: 'UTC',
//     initialView: 'resourceTimelineWeek',
//     height: 700,
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
//     events: 'https://fullcalendar.io/api/demo-feeds/events.json?single-day&for-resource-timeline',
//     select: function (arg) {
//       var title = prompt('Event Title:');
//       if (title) {
//         calendar.addEvent({
//           title: title,
//           start: arg.start,
//           end: arg.end,
//           allDay: arg.allDay
//         })
//       }
//       calendar.unselect()
//     }
//   });

//   calendar.render();
// });
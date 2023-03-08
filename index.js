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
    // select: function (arg) {
    //   var title = prompt('Event Title:');
    //   if (title) {
    //     // onclick to change color
    //       CalendarPortrait.addEvent({
    //       id: title,
    //       title: title,
    //       start: arg.start,
    //       end: arg.end,
    //       allDay: arg.allDay,        
    //     });
        
    //     CalendarPortrait.on('eventClick', function(info) {
    //       var colorInput = document.createElement('input');
    //       colorInput.type = 'color';
    //       colorInput.value = info.event.backgroundColor;
    //       colorInput.addEventListener('change', function() {
    //         info.event.setProp('backgroundColor', colorInput.value);
    //       });
    //       colorInput.click(); // simulate click to show color picker
    //     });
    //   }
    //   CalendarPortrait.unselect();
    // }, 
    // eventClick: function (info) {
    //   info.jsEvent.preventDefault(); // don't let the browser navigate
    //   if (confirm('Are you sure you want to delete this event?')) {
    //     info.event.remove();
    //   }
    // }
    select: function(arg) {
      var title = prompt('Event Title:');
      if (title) {
        CalendarPortrait.addEvent({
          id: title,
          title: title,
          start: arg.start,
          end: arg.end,
          allDay: arg.allDay,
        });
    
        CalendarPortrait.on('eventClick', function(info) {
          var menu = document.createElement('div');
          menu.innerHTML = `
            <div>
              <button id="change-color">Change Color</button>
              <button id="delete-event">Delete Event</button>
            </div>
          `;
          menu.style.position = 'absolute';
          menu.style.top = info.jsEvent.pageY + 'px';
          menu.style.left = info.jsEvent.pageX + 'px';
          menu.style.zIndex = '9999';
          document.body.appendChild(menu);
    
          document.getElementById('change-color').addEventListener('click', function() {
            var colorInput = document.createElement('input');
            colorInput.type = 'color';
            colorInput.value = info.event.backgroundColor;
            colorInput.addEventListener('change', function() {
              info.event.setProp('backgroundColor', colorInput.value);
            });
            colorInput.click(); // simulate click to show color picker
            document.body.removeChild(menu);
          });
    
          document.getElementById('delete-event').addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this event?')) {
              info.event.remove();
            }
            document.body.removeChild(menu);
          });
        });
      }
      CalendarPortrait.unselect();
    }
    
  });
  CalendarPortrait.render();

  var calendarEl_Landscape = document.getElementById('calendar_Lands');
  CalendarLandscape = new FullCalendar.Calendar(calendarEl_Landscape, {
    timeZone: 'UTC',
    initialView: 'resourceTimelineWeek',
    height: 'auto',
    width: 'auto',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
    },
    editable: true,
    selectable: true,
    selectMirror: true,
    resourceAreaHeaderContent: 'Days',
    resources: [
      // days of the week
      { class:'days', id: 'a', title: 'Monday'},
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

// onclick to see if there is already an event
function checkEvent() {
  var x = document.getElementById("calendar_Por");
  // display side modal to ask for color change
  var modal = document.getElementById("myModal");
}

function destroyEvent() {
  var x = document.getElementById("calendar_Por");
  // remove event from event title
  var title = prompt('Event Title:');
  if (title) {
    CalendarPortrait.getEventById(title).remove();
  }
}
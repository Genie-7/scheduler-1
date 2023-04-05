var CalendarPortrait, CalendarLandscape;

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl_Portrait = document.getElementById('calendar_Por');

  CalendarPortrait = new FullCalendar.Calendar(calendarEl_Portrait, {
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
    events: 'get_event.php',
    select: function(arg) {
      var title = prompt('Event Title:');
      if (title) {
        CalendarPortrait.addEvent({
          // id: title,
          title: title,
          start: arg.start,
          end: arg.end,
          // allDay: arg.allDay,
        });
        console.log(events);
        $.ajax({
          url: 'add_event.php',
          type: 'POST',
          data: {
            title: title,
            start: moment.utc(arg.start).utcOffset("-04:00").format('YYYY-MM-DDTHH:mm:ss'),
            end: moment.utc(arg.end).utcOffset("-04:00").format('YYYY-MM-DDTHH:mm:ss')            
          },
          success: function(response) {
            console.log('success');
            console.log(moment.utc(arg.start).utcOffset("-04:00").format('YYYY-MM-DD HH:mm:ss'));
            console.log(moment.utc(arg.end).utcOffset("-04:00").format('YYYY-MM-DD HH:mm:ss'));
          },          
          error: function(jqXHR, textStatus, errorThrown) {
            console.log('fail');
            console.log(moment.utc(arg.start).utcOffset("-04:00").format('YYYY-MM-DD HH:mm:ss'));
            console.log(moment.utc(arg.end).utcOffset("-04:00").format('YYYY-MM-DD HH:mm:ss'));
          }
        });                      
        // display side modal to ask for color change, delete event.
        // if mouse leaves menu, menu disappears
        let menuDisplayed = false;
        CalendarPortrait.on('eventClick', function (info) {    
          if (!menuDisplayed) {
            menuDisplayed = true;

            var menu = document.createElement('div');
            menu.innerHTML = `
              <div id="menu">
                <button id="change-color">Change Color</button>
                <button id="delete-event">Delete Event</button>
              </div>
            `;
            menu.style.position = 'absolute';
            menu.style.top = info.jsEvent.pageY + 'px';
            menu.style.left = info.jsEvent.pageX + 'px';
            menu.style.zIndex = '9999';
            menu.style.width = '150px';
            menu.style.height = '200px';
            menu.style.backgroundColor = 'white';
            menu.style.border = '1px solid #ccc';
            menu.style.borderRadius = '5px';
            // opacity: 0.5;
            menu.style.opacity = '0.8';
            document.body.appendChild(menu);

            var menuTimeout = setTimeout(function() {
              document.body.removeChild(menu);
              menuDisplayed = false;
            }, 5000); // change the timeout to your desired value
            
            document.getElementById('change-color').addEventListener('click', function() {
              clearTimeout(menuTimeout);
              var colorInput = document.createElement('input');
              colorInput.type = 'color';
              colorInput.value = info.event.backgroundColor;
              colorInput.addEventListener('change', function() {
                info.event.setProp('backgroundColor', colorInput.value);
              });
              colorInput.click(); // simulate click to show color picker
              document.body.removeChild(menu);
              menuDisplayed = false;
            });

            document.getElementById('delete-event').addEventListener('click', function() {
              clearTimeout(menuTimeout);
              if (confirm('Are you sure you want to delete this event?')) {
                info.event.remove();
              }
              document.body.removeChild(menu);
              menuDisplayed = false;
            });
            
            menu.addEventListener('mouseleave', function() {
              clearTimeout(menuTimeout);
              document.body.removeChild(menu);
              menuDisplayed = false;
            });
          }
        });
        $.ajax({
          url: 'get_event.php',
          type: 'GET',
          data: {
            start: moment(CalendarPortrait.view.activeStart).format('YYYY-MM-DDTHH:mm:ss'),
            end: moment(CalendarPortrait.view.activeEnd).format('YYYY-MM-DDTHH:mm:ss')
          },
          success: function(response) {
            var events = JSON.parse(response);
            events.forEach(function(event) {
              calendar.addEvent({
                title: event.title,
                start: event.start,
                end: event.end
              });
            });
            console.log(events);
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.log('fail');
          }
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
    events: 'get_event.php',
    select: function(arg) {
      var title = prompt('Event Title:');
      if (title) {
        CalendarLandscape.addEvent({
          // id: title,
          title: title,
          start: arg.start,
          end: arg.end,
          // allDay: arg.allDay,
        });
        // console.log(events);
        $.ajax({
          url: 'add_event.php',
          type: 'POST',
          data: {
            title: title,
            start: moment.utc(arg.start).utcOffset("-04:00").format('YYYY-MM-DDTHH:mm:ss'),
            end: moment.utc(arg.end).utcOffset("-04:00").format('YYYY-MM-DDTHH:mm:ss')            
          },
          success: function(response) {
            console.log('success');
            console.log(moment.utc(arg.start).utcOffset("-04:00").format('YYYY-MM-DD HH:mm:ss'));
            console.log(moment.utc(arg.end).utcOffset("-04:00").format('YYYY-MM-DD HH:mm:ss'));
          },          
          error: function(jqXHR, textStatus, errorThrown) {
            console.log('fail');
            console.log(moment.utc(arg.start).utcOffset("-04:00").format('YYYY-MM-DD HH:mm:ss'));
            console.log(moment.utc(arg.end).utcOffset("-04:00").format('YYYY-MM-DD HH:mm:ss'));
          }
        });                      
        // display side modal to ask for color change, delete event.
        // if mouse leaves menu, menu disappears
        let menuDisplayed = false;
        CalendarLandscape.on('eventClick', function (info) {    
          if (!menuDisplayed) {
            menuDisplayed = true;

            var menu = document.createElement('div');
            menu.innerHTML = `
              <div id="menu">
                <button id="change-color">Change Color</button>
                <button id="delete-event">Delete Event</button>
              </div>
            `;
            menu.style.position = 'absolute';
            menu.style.top = info.jsEvent.pageY + 'px';
            menu.style.left = info.jsEvent.pageX + 'px';
            menu.style.zIndex = '9999';
            menu.style.width = '150px';
            menu.style.height = '200px';
            menu.style.backgroundColor = 'white';
            menu.style.border = '1px solid #ccc';
            menu.style.borderRadius = '5px';
            // opacity: 0.5;
            menu.style.opacity = '0.8';
            document.body.appendChild(menu);

            var menuTimeout = setTimeout(function() {
              document.body.removeChild(menu);
              menuDisplayed = false;
            }, 5000); // change the timeout to your desired value
            
            document.getElementById('change-color').addEventListener('click', function() {
              clearTimeout(menuTimeout);
              var colorInput = document.createElement('input');
              colorInput.type = 'color';
              colorInput.value = info.event.backgroundColor;
              colorInput.addEventListener('change', function() {
                info.event.setProp('backgroundColor', colorInput.value);
              });
              colorInput.click(); // simulate click to show color picker
              document.body.removeChild(menu);
              menuDisplayed = false;
            });

            document.getElementById('delete-event').addEventListener('click', function() {
              clearTimeout(menuTimeout);
              if (confirm('Are you sure you want to delete this event?')) {
                info.event.remove();
              }
              document.body.removeChild(menu);
              menuDisplayed = false;
            });
            
            menu.addEventListener('mouseleave', function() {
              clearTimeout(menuTimeout);
              document.body.removeChild(menu);
              menuDisplayed = false;
            });
          }
        });
        $.ajax({
          url: 'get_event.php',
          type: 'GET',
          data: {
            start: moment(CalendarLandscape.view.activeStart).format('YYYY-MM-DDTHH:mm:ss'),
            end: moment(CalendarLandscape.view.activeEnd).format('YYYY-MM-DDTHH:mm:ss')
          },
          success: function(response) {
            var events = JSON.parse(response);
            events.forEach(function(event) {
              calendar.addEvent({
                title: event.title,
                start: event.start,
                end: event.end
              });
            });
            console.log(events);
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.log('fail');
          }
        });
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

// function getData() {
// get events from database
  // $.ajax({
  //   url: 'get_event.php',
  //   type: 'GET',
  //   data: {
  //     start: moment(calendar.view.activeStart).format('YYYY-MM-DDTHH:mm:ss'),
  //     end: moment(calendar.view.activeEnd).format('YYYY-MM-DDTHH:mm:ss')
  //   },
  //   success: function(response) {
  //     var events = JSON.parse(response);
  //     events.forEach(function(event) {
  //       calendar.addEvent({
  //         title: event.title,
  //         start: event.start,
  //         end: event.end
  //       });
  //     });
  //     console.log(events);
  //   },
  //   error: function(jqXHR, textStatus, errorThrown) {
  //     console.log('fail');
  //   }
  // });
// }



document.addEventListener('DOMContentLoaded', function() {
  var Calendar = FullCalendar.Calendar;
  var Draggable = FullCalendar.Draggable;

  var containerEl = document.getElementById('external-events');
  var calendarEl = document.getElementById('calendar');
  var checkbox = document.getElementById('drop-remove');
  // initialize the external events
  // -----------------------------------------------------------------

  new Draggable(containerEl, {
    itemSelector: '.fc-event',
    eventData: function (eventEl) {
      return {
        title: eventEl.innerText,
      };
      
    }
  });

  // initialize the calendar
  // -----------------------------------------------------------------

  // var calendar = new Calendar(calendarEl, {
  //   headerToolbar: {
  //     left: 'prev,next today',
  //     center: 'title',
  //     right: 'dayGridMonth,timeGridWeek,timeGridDay'
  //   },
  //   editable: true,
  //   droppable: true, // this allows things to be dropped onto the calendar
  //   drop: function(info) {
  //     // is the "remove after drop" checkbox checked?
  //     if (checkbox.checked) {
  //       // if so, remove the element from the "Draggable Events" list
  //       info.draggedEl.parentNode.removeChild(info.draggedEl);
  //     }
  //   }
  // });

  // calendar.render();

})

// Retrieve existing categories from localStorage or create an empty array
let categories = JSON.parse(localStorage.getItem('categories')) || [];

// Display existing categories in the category list
const categoryList = document.getElementById('category-list');
for (let i = 0; i < categories.length; i++) {
  const category = categories[i];
  const categoryElement = document.createElement('div');
  categoryElement.classList.add('category');
  categoryElement.innerHTML = `
    <span>${category}</span>
    <button class="remove-category">Remove</button>
  `;
  categoryList.appendChild(categoryElement);

  // Add event listener to the remove button
  const removeButton = categoryElement.querySelector('.remove-category');
  removeButton.addEventListener('click', function() {
    categories.splice(i, 1); // Remove the category from the array
    localStorage.setItem('categories', JSON.stringify(categories)); // Save the updated array to localStorage
    categoryList.removeChild(categoryElement); // Remove the category element from the category list
  });
}

function addCategory() {
  // Get the new category name from the input field
  const newCategoryInput = document.getElementById('new-category');
  const newCategoryName = newCategoryInput.value.trim();

  // Check if the category name is not empty
  if (newCategoryName.length === 0) {
    alert('Please enter a category name');
    return;
  }

  // Check if the category name already exists
  for (let i = 0; i < categories.length; i++) {
    const categoryName = categories[i];
    if (newCategoryName === categoryName) {
      alert('Category already exists');
      return;
    }
  }

  // Add the new category to the array and save it to localStorage
  categories.push(newCategoryName);
  localStorage.setItem('categories', JSON.stringify(categories));

  // Create a new category element
  const newCategoryElement = document.createElement('div');
  newCategoryElement.classList.add('category');
  newCategoryElement.innerHTML = `
    <span>${newCategoryName}</span>
    <button class="remove-category">Remove</button>
  `;

  // Add event listener to the remove button
  const removeButton = newCategoryElement.querySelector('.remove-category');
  removeButton.addEventListener('click', function() {
    const categoryToRemove = this.parentNode;
    const categoryName = categoryToRemove.querySelector('span').textContent;
    categories.splice(categories.indexOf(categoryName), 1); // Remove the category from the array
    localStorage.setItem('categories', JSON.stringify(categories)); // Save the updated array to localStorage
    categoryList.removeChild(categoryToRemove); // Remove the category element from the category list
  });

  // Add the new category element to the category list
  categoryList.appendChild(newCategoryElement);

  // Clear the input field
  newCategoryInput.value = '';
}


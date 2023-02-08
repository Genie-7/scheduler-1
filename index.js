const events = [
  { day: "Monday", time: "9:00", description: "Meeting" },
  { day: "Tuesday", time: "14:00", description: "Lunch" },
  { day: "Wednesday", time: "11:00", description: "Interview" },
];

const eventElements = events.map((event) => {
  const eventElement = document.createElement("div");
  eventElement.classList.add("event");
  eventElement.innerHTML = `${event.day} ${event.time}: ${event.description}`;
  return eventElement;
});

const eventsContainer = document.querySelector("#events");
eventElements.forEach((eventElement) => {
  eventsContainer.appendChild(eventElement);
});

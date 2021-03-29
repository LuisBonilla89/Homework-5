var timeBlocks = $(".container");
var currentDate = $("#currentDay");

//moment.js formating
currentDate.text(moment().format("dddd MMM Do"));

// The following piece of code will display the blocks in the scheduler

var businessHours = [
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
];

for (i = 1; i < businessHours.length; i++) {
  var newTimeSlot = $("#9am").clone();
  newTimeSlot.attr("id", businessHours[i]);
  newTimeSlot.children(".row").attr("style", "white-space: pre-Wrap");
  newTimeSlot.children(".row").children(".hour").text(businessHours[i]);
  newTimeSlot.appendTo(".container");
}

//This part of the code will save items into the scheduler
var savedData;
var arrayData = [];

function events() {
  savedData = localStorage.getItem("SavedData");
  arrayData = [];
  if (savedData === "" || savedData === null) {
    savedData = [];
  } else {
    savedData = JSON.parse(savedData);
    for (i = 0; i < savedData; i++) {
      arrayData.push(savedData[i].time);
    }
  }

  for (i = 0; i < arrayData.length; i++) {
    var timeSlotId = "#" + arrayData[i];
    var timeSlot = $(timeSlotId).children(".row").children("textarea");
    $(timeSlotId).children(".row").children("button").attr("data-event", "yes");
    timeSlot.val(savedData[i].event);
  }
}
events();

//The following function will clear the local storage

function clearLocalStorage() {
  savedData = [];
  localStorage.setItem("savedData", savedData);
}

//The following function will save events in the local storage

function saveEvents(input, time) {
  alert("Your event has been saved!!");
  savedData.push({ time: time, event: input });
  localStorage.setItem("savedData", JSON.stringify(savedData));
}

function deleteEvent(index) {
  savedData.splice([index], 1);
  arrayData.splice([index], 1);
}

function clearEvent(clearDone, index, location, button) {
  if (clearDone) {
    alert("You have removed the event");
    removeEvent(index);
    button.attr("data-event", "none");
    localStorage.setItem("savedData", JSON.stringify(savedData));
  } else {
    location.val(savedData[index].event);
    alert("The event has not been cleared");
  }
  console.log(
    "The event is set to " +
      button.attr("data-event") +
      " at " +
      button.sibblings("p").text()
  );
}

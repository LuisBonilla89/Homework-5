var timeBlocks = $(".container");
var currentDate = $("#currentDay");

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
  var newTimeSlot = $("9am").clone();
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

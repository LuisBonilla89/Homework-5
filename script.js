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

function saveEvents(time, input) {
  alert("Your event has been saved!!");
  savedData.push({ time: time, event: input });
  localStorage.setItem("savedData", JSON.stringify(savedData));
}

function removeEvents(index) {
  savedData.splice([index], 1);
  arrayData.splice([index], 1);
}

function clearEvent(clearDone, index, location, buttonEl) {
  if (clearDone) {
    alert("You have removed the event");
    removeEvents(index);
    buttonEl.attr("data-event", "none");
    localStorage.setItem("savedData", JSON.stringify(savedData));
  } else {
    location.val(savedData[index].event);
    alert("The event has not been cleared");
  }
  console.log(
    "The event is set to " +
      buttonEl.attr("data-event") +
      " at " +
      buttonEl.sibblings("p").text()
  );
}

function newEvents(index, time, location, buttonEl, fullSlot, eventEntry) {
  //using .trim() to remove unwanted spacing when entering the input on a desired block
  if (eventEntry.trim() === "" && fullSlot === "yes") {
    var savedConf = confirm(
      ": Do you want to clear the event '" +
        savedData[index].event +
        "scheduled for " +
        time +
        "'?"
    );
    clearEvent(savedConf, index, location, buttonEl);
  } else if (eventEntry.trim() !== "" && fullSlot === "none") {
    var savedConf = confirm(
      ": Do you want to add the event '" + eventEntry + "for " + time + "'?"
    );
    if (savedConf) {
      saveEvents(time, eventEntry);
    } else {
      location.val("");
    }
  } else if (eventEntry.trim() !== "" && fullSlot === "yes") {
    if (savedData[index].event !== eventEntry) {
      var savedConf = confirm(
        "Do you want to change the event from '" +
          savedData[index].event +
          "' to '" +
          eventEntry +
          "'?"
      );
      if (savedConf) {
        removeEvents(index);
        saveEvents(time, eventEntry);
      } else {
        alert("The change was not saved.");
        location.val(savedData[index].event);
      }
    }
  }
}

$(".time-block").on("button", "click", function () {
  event.preventDefault();
  var eventEntry = $(this).siblings("textarea").val();
  var time = $(this).siblings("p").text();
  var location = $(this).siblings("textarea");
  var fullSlot = $(this).attr("data-event");
  var index = arrayData.indexOf(time);
  var buttonEl = $(this);

  newEvents(eventEntry, time, location, fullSlot, index, buttonEl);
  events();
});

//Color-coding the time blocks

var timeOftheDay = moment().format("hA");

var allTimeBlocksEle = $(".time-block");

for (i = 0; i < allTimeBlocksEle.length; i++) {
  var timeBlock = $(allTimeBlocksEle[i]);
  var timeBlockId = timeBlock.attr("id");
  var tbText = timeBlock.children(".row").children("textarea");
  if (timeBlockId === timeOftheDay) {
    tbText.addClass("present");
  } else if (moment(timeBlockId, "hA").isBefore()) {
    tbText.addClass("past");
  } else if (moment(timeBlockId, "hA").isAfter()) {
    tbText.addClass("future");
  }
}

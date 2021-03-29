var timeBlocks = $(".container");
var currentDate = $("#currentDay");

currentDate.text(moment().format("dddd MMM Do"));

// The following piece of code will display the blocks in the scheduler

var businessHours = [];

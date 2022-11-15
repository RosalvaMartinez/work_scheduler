var date = dayjs().format("dddd, MMMM, D");//gets the current date using date js in a specific format
var workHours = 8//number of hours in work day 
var workStartHour = 17// decides what hour we start work day
var savedEvents = []//global array of events 


//Inserts the current date into the element with the id of currentDay
$("#currentDay").text(date);
//gets the current hour using day js
var timeCurrently = dayjs().hour()

//for loop that runs for the number of work hours in a day times
//for loop creates timeblocks and injects them into our .container element
for (let i = 0; i < workHours; i++) {
    //recipe for how to create a time block and inject in .container element
    var timeblock = $("<div>").addClass("row time-block")
    //add data attributes to each value
    timeblock.attr("data-hour", i)
    //the following creates the children of each time block:div, textarea, button
    var hour = $("<div>").addClass("col-md-1 hour").append(dayjs().hour(workStartHour + i).format("h A"))
    var textarea = $("<textarea>").addClass("col-md-10 textbox")
    var button = $("<button>").addClass("btn saveBtn col-md-1")
    button.append("<i class='fa fa-save'>")
    //using append to add hour, textarea, button into each timeblock
    timeblock.append(hour).append(textarea).append(button);
    //append newly created timeblock into element with class of container 
    $(".container").append(timeblock);
    //specify what color each timeblock will be depending on the current hour
    if (timeCurrently > (workStartHour + i)) { //past present future class change
        textarea.addClass("past");
    } else if (timeCurrently === (workStartHour + i)) {
        textarea.addClass("present");
    } else if (timeCurrently < (workStartHour + i)) {
        textarea.addClass("future");
    }
}
//look for saved events in local storage when the page loads and try to load the into the user interface
loadSavedEvents()

//add event listner to each button
$(".saveBtn").on("click", saveLocal)

//funtion to save textbox content to local storage
function saveLocal(e) {//pass in e to target specific buttons, textareas, elements containing hour
    //create object to store hour and the user input
    var savedEvent = {
        //use jquery siblings to specifically target textareas associated with the button that was clicked
        hour: $(e.target).siblings(".hour").text(),
        text: $(e.target).siblings(".textbox").val()
    }
    //get the index of the timeblock that is the parent of the button clicked
    //the index is stored in the data-hour attribute that each timeblock has
    var index = $(e.target).parent().data("hour")
    //use index to replace the current saved event at that index of global saved events 
    savedEvents[index] = savedEvent
    //store the array of global saved events into loval storage
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));

}

function loadSavedEvents() {
    //retrieve data from local storage
    var data = localStorage.getItem("savedEvents");
    //if there isnt any previous datat found 
    if (!data) {
        //for as many work hours as we have create an object with an hour and text set to empty string
        //we do thia to create index's in the global array of savedEvents
        savedEvents = []
        for (var i = 0; i < workHours; i++) {
            savedEvents[i] = {
                hour: dayjs().hour(workStartHour + i).format("h A"),
                text: ""
            }
        }
        //otherwise add previous data
    } else {
        //bring saved data back from local storage and parse 
        savedEvents = JSON.parse(data)
        //use jquery to target all textboxes, they get stored in an array that we named textboxes
        var textboxes = $(".textbox")
        //run through all datta saved and inject it into textboxes
        for (var i in savedEvents) {
            $(textboxes[i]).val(savedEvents[i].text)
        }
    }
}











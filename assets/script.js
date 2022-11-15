var date = dayjs().format("dddd, MMMM, D");
var workHours = 8
var workStartHour = 13
var events = []



$("#currentDay").text(date);

var timeCurrently = dayjs().hour()

//funtion to save textbox content to local storage
function saveLocal() {
    var savedEvent = {
        textbox: $(".textbox").val(),
        hour: $(".hour").val()
    }
    localStorage.setItem("savedEvent", savedEvent);

}

//button listner
$(".saveBtn").on("click", saveLocal)

//recipe for how to create a time block and inject in .container element


//for loop that runs 8 times
for (let i = 0; i < workHours; i++) {
    //recipe for how to create a time block and inject in .container element
    var div1 = $("<div>").addClass("row time-block")
    var div2 = $("<div>").addClass("col-md-1 hour").append(dayjs().hour(workStartHour + i).format("h A"))
    var textarea = $("<textarea>").addClass("col-md-10 textbox")
    var button = $("<button>").addClass("btn saveBtn col-md-1")
    button.append("<i class='fa fa-save'>")
    div1.append(div2).append(textarea).append(button);
    $(".container").append(div1);
    if (timeCurrently > (workStartHour + i)) { //past present future class change
        textarea.addClass("past");
    } else if (timeCurrently === (workStartHour + i)) {
        textarea.addClass("present");
    } else {
        textarea.addClass("future");
    }
}







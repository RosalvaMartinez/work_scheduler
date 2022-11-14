var date = dayjs().format("H A");


$("#currentDay").text(date);

var timeCurrently = dayjs().hour()

//funtion to save textbox content to local storage
function saveLocal() {
    var textbox = $(".textbox").val()
    var hour = $(".hour").val()
    localStorage.setItem(textbox, hour);
}

//button listner
$(".saveBtn").on("click", saveLocal)

//recipe for how to create a time block and inject in .container element
var div1 = $("<div>").addClass("row time-block")
var div2 = $("<div>").addClass("col-md-1 hour")
var textarea = $("<textarea>").addClass("col-md-10 textbox future")
var button = $("<button>").addClass("btn saveBtn col-md-1")

button.append("<i class='fa fa-save'>")
div1.append(div2).append(textarea).append(button);
$(".container").append(div1);

//for loop 8x
//JSON.parse(localStorage.getItem(""))
for (let i = 0; i < 8; i++) {
    var div1 = $("<div>").addClass("row time-block")
    var div2 = $("<div>").addClass("col-md-1 hour")
    var textarea = $("<textarea>").addClass("col-md-10 textbox future")
    var button = $("<button>").addClass("btn saveBtn col-md-1")
    button.append("<i class='fa fa-save'>")
    div1.append(div2).append(textarea).append(button);
    $(".container").append(div1);
}





//add firebase info
var config = {
  apiKey: "AIzaSyDns_oRRc-WQ2ZjLRnb6xyX49ot0QG5ykk",
  authDomain: "trainschedule-edea3.firebaseapp.com",
  databaseURL: "https://trainschedule-edea3.firebaseio.com",
  projectId: "trainschedule-edea3",
  storageBucket: "trainschedule-edea3.appspot.com",
  messagingSenderId: "945964018910"
};

firebase.initializeApp(config);
//create database variable
var database = firebase.database();

//on submit click function
$("#addTrain").on("click", function() {

  //get the info from input areas
  var trainName = $("#trainName-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTT = moment($("#firstTT-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var frequency = $("#frequency-input").val().trim();      
   
  var addTrain = {
    name: trainName,
    destination: destination,
    firstTT: firstTT,
    frequency: frequency,
  }
  //send train info to database 
  database.ref().push(addTrain);
  //clear the form
  $("#trainName-input").val("");
  $("#destination-input").val("");
  $("#firstTT-input").val("");
  $("#frequency-input").val("");
  return false;
})

database.ref().on("child_added", function(snapshot){
  var trainName = snapshot.val().name;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var firstTT = snapshot.val().firstTT;
  var remainder = moment().diff(moment.unix(firstTT),"minutes")%frequency;
  var minutes = frequency - remainder;
  var arrival = moment().add(minutes,"m").format("hh:mm A");
  //add the train info to the table
  $("#train-table > tbody").append("<tr><td>" +trainName+ "</td><td>" +destination+ "</td><td>" +frequency+ "</td><td>" + arrival+ "</td><td>" +minutes+ "</td></tr>");

    })
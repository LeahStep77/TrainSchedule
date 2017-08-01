  $(document).ready(function(){

  var config = {
    apiKey: "AIzaSyDns_oRRc-WQ2ZjLRnb6xyX49ot0QG5ykk",
    authDomain: "trainschedule-edea3.firebaseapp.com",
    databaseURL: "https://trainschedule-edea3.firebaseio.com",
    projectId: "trainschedule-edea3",
    storageBucket: "",
    messagingSenderId: "945964018910"
    };

    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    // Initial Values
    var trainName = "";
    var destination = "";
    var frequency = 0;
    console.log("FREQUENCY:  " + moment(frequency).format("hh:mm"));
    var nextArrival = 0;
    var minAway = 0;

        // Capture Button Click
    $("#add-train").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

      //logic for storing and retrieving the train.
      trainName = $("#trainName-input").val().trim();
      destination = $("#destination-input").val().trim();
      frequency = $("#frequency-input").val().trim();
      nextArrival = $("#nextArrival-input").val().trim();
      minAway = $("#minAway-input").val().trim();

      database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival,
        minAway: minAway,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    });

    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      var sv = snapshot.val();
      // Log everything that's coming out of snapshot
      console.log(sv.trainName);
      console.log(sv.destination);
      console.log(sv.frequency);
      console.log(sv.nextArrival);
      console.log(sv.minAway);

//var firstTimeConverted = moment.diff(nextArrival, "hh:mm").subtract(1, "years");
//console.log(moment.diff(frequency, nextArrival));

console.log(firstTimeConverted);
      //add train info to the table

      $("#train-table > tbody").append("<tr><td>" + sv.trainName + "</td><td>" + sv.destination + "</td><td>" + sv.frequency + "</td><td>" + sv.nextArrival + "</td><td>" + sv.minAway + "</td></tr>")

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
    });
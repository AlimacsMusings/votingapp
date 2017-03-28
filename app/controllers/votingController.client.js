'use strict';

/**
  Strategy :
  - Load the current poll when the page loads
  - When the save votes button is clicked, make a POST request
    to the API and update the pie chart in the view
  - When the save poll button is clicked, make a POST request
    to the API and save the poll.
  - When the update poll button is clicked, make a POST request
     to the API and update the pie chart in the view
  - When the delete poll button is clicked, make a DELETE request
    to the API and update the list of
**/

/////////////////////////////////////////
$(document).ready(function() {

  console.log("Using votingController.client.js");
  var pieContent = [];
  var pollID = 0;



  //////////////////////////////////////////////////////////
  function displayPolls(json) {

    var name;
    var id;
    var href = "/poll/";
    var snippet = "";

    json.forEach(function(val) {
      name = val.name;
      id = val.id;

      var result = "<li style=\"list-style-type:none;\">" +
                     "<div class=\"srch\">" +
                       "<div class=\"txt\"><h3>" +
                         "<a href='/showpoll/" + id  + "' >" + name + "</a>" +
                            "</h3>" +
                               "<p>" + snippet + "</p></div>" +
                                 "</div><br></li>";
      console.log(result);
      $('#output').prepend(result);
    });

  }

  // //////////////////////////////////////////////////////////
  //   function getPollData(pollID) {
  //       var URL = "/poll/" + pollID;
  //       console.log("In getPollData.  URL= " + URL);
  //
  //     //GET THE JSON FROM APP
  //     $.getJSON(URL).done(function(response) {
  //       var json = response;
  //       console.log("Received data....");
  //       console.log(json[0]);
  //       pieContent.push(json[0]);
  //       displayChart();
  //
  //     }).catch(function(error) {console.log("Error in getting polls"); console.log(error);});
  //   }

    //////////////////////////////////////////////////////////
    function getPollNames() {
      var URL = "/polls";
      console.log("In getPollData.  URL= " + URL);

      //GET THE JSON FROM APP
      $.getJSON(URL).done(function(response) {
        var json = response;
        console.log("Received data....");
        console.log(json);
        displayPolls(json);
            //pieContent.push(json[0]);
            //displayChart();
      }).catch(function(error) {console.log("Error in getting polls"); console.log(error);});
    }

   //
  //  $(".onepoll").on("click", function(){
  //     var id = $(this).attr('id');
  //     console.log("Clicked " + id);
  //     getPollData(id);
   //
  //  });
   //
   //
  //   /////////////////////////////////////////////////////////
  //   $("#submit").on("click", function(){
  //      //Post to database pollid, option id, increment vote
  //   });



    getPollNames();
});

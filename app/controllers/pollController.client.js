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

  console.log("Using pollController.client.js");
  var voteButton = $('#vote');
  var submitButton = $('#submit');
  var apiUrl = "http://localhost:8085/";
  var pieContent = [];

  ///////////////////////////////////////
  function displayChart() {
      console.log("In display Chart");
      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart());
  }

  //////////////////////////////////////////////////////////
  function drawChart() {

    var data =  google.visualization.arrayToDataTable(getPieChartArray());

    var options = {
          backgroundColor: '#4A6556',
          legend: 'none',
          pieSliceText: 'label',
          pieStartAngle: 100
    };
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }

  //////////////////////////////////////////////////////////
  function getPieChartArray() {

    console.log("Getting getPieChartArray()");
    var poll = pieContent[0];
    if(poll===null || poll=== undefined) {
      testBestPie();
      poll = pieContent[0];
    }
    var result = [["Options", "Votes"]];
    var name = poll.name;
    var options = poll.options;
    var select = $('#selVotes');

    options.forEach(function(val) {
      result.push([val.name, val.votes]);
      select.append("<option>" + val.name + "</option>");
    });
    //console.log(result);
    return result;
  }

  //////////////////////////////////////////////////////////
  function testBestPie() {
     pieContent = [{"id":1,
                  "name":"Best Pie",
                  "options":[{"name":"Banoffee","votes":44},
                            {"name":"Steak and Potato", "votes":79},
                            {"name":"Steak and Ale","votes":53},
                            {"name":"Pie barm","votes":67},
                            {"name":"Apple","votes":53},
                            {"name":"Pork pie","votes":71},
                            {"name":"Cottage pie","votes":39}
                          ]
                  }];
  }

  //////////////////////////////////////////////////////////
  function testAllPolls() {
    var json = [{"id" : 1, "name" : "Best Star Trek captain"},
                {"id" : 2, "name" : "Best Star Wars Character"},
                {"id" : 3, "name" : "Star wars v Star Trek"},
                {"id" : 4, "name" : "Beverages"},
                {"id" : 5, "name" : "Best Pie"}];
    var name;
    var href = "";
    var snippet = "";
    json.forEach(function(val) {
      name = val.name;
      var result = "<li style=\"list-style-type:none;\">" +
                     "<div class=\"srch\">" +
                       "<div class=\"txt\"><h3>" +
                         "<a href=\""+ href +"\">" + name + "</a>" +
                            "</h3>" +
                               "<p>" + snippet + "</p></div>" +
                                 "</div><br></li>";
      console.log(result);
      $('#output').prepend(result);
    });
  }

  //////////////////////////////////////////////////////////
    function getPollData(pollID) {
      var endpt = "http://localhost:8085/";
      var query = "polls";

      var URL = endpt + query;
      console.log("In getPollData.  URL= " + URL);

      //GET THE JSON FROM APP
      $.getJSON(URL).done(function(response) {
        json = response;
        console.log("Received data....");
        console.log(json[0]);
        pieContent.push(json[0]);
        displayChart();

      }).catch(function(error) {console.log("Error in getting polls"); console.log(error);});
    }

    /////////////////////////////////////////////////////////
    $("#submit").on("click", function(){
       //Post to database pollid, option id, increment vote
    });

    $("#vote").on("click", function(){
       //Post to database pollid, option id, increment vote
       console.log("Clicked vote button");
       alert("To go to Voting page");
    });

});

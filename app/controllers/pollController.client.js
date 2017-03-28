'use strict';

/////////////////////////////////////////
$(document).ready(function() {

  console.log("Using pollController.client.js");
  var pieContent = [];
  var pollID = 0;

  ///////////////////////////////////////
  function displayChart() {
      console.log("In display Chart");
      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(function() {
          console.log("In drawChart()");
          var poll1 = getPieChartArray();
          var data =  google.visualization.arrayToDataTable(poll1);

          var options = {
           backgroundColor: '#4A6556',
           legend: 'none',
           pieSliceText: 'label',
           pieStartAngle: 100
          };
          var chart = new google.visualization.PieChart(document.getElementById('piechart'));
          chart.draw(data, options);
        });
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
    console.log("Name: " + name);
    console.log("Options: " + options);

    options.forEach(function(val) {
      result.push([val.name, val.votes]);
      select.append("<option>" + val.name + "</option>");
    });
    console.log(result);
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
    displayPolls(json);
  }

  //////////////////////////////////////////////////////////
    function getPollData(id) {

        pollID = id;
        var URL = "/poll/" + pollID;
        console.log("In getPollData.  URL= " + URL);

      //GET THE JSON FROM APP
      $.getJSON(URL).done(function(response) {
        var json = response;
        console.log("Received data....");
        console.log(json);
        pieContent.push(json);
        displayChart();

      }).catch(function(error) {console.log("Error in getting polls"); console.log(error);});
    }

   //////////////////////////////////////////////////////////
   $(".onepoll").on("click", function(){
      var id = $(this).attr('id');
      console.log("Clicked " + id);
      getPollData(id);

   });


    /////////////////////////////////////////////////////////
    $("#submit").on("click", function(){
       //Post to database pollid, option id, increment vote
    });

    ////////////////////////////////////////////////////////
    $("#vote").on("click", function(){
       //Post to database pollid, option id, increment vote
       console.log("Clicked vote button");

       //Get the poll id and option name - selected value in dropdown
       var optionName = $('#selVotes :selected').text();

       //alert("To go to Voting page " + optionName);
       var URL = "/vote/" + pollID + "/" + optionName;

       $.getJSON(URL).done(function(response) {
         var json = response;
         console.log("Added vote ...");
         console.log(json);
         getPollData(pollID);
       }).catch(function(error) {
         console.log("Error in adding vote");
         console.log(error);
         });
    });

    getPollData(1);

});

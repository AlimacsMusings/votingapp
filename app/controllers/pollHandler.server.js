'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');

//////////////////////////////////////////////////
function PollHandler () {

   //////////////////////////////////////////////
   this.getPoll = function(req, res) {
      Polls.findOne({'id': req.params.id}, {'_id': false})
       .exec(function(err, result) {
            if(err) {throw err; }
            //Get one poll and send it back
            res.json(result);
       });
   };

   ///////////////////////////////////////////////
   this.getPollNames = function(req, res) {
     Polls.find({}, {'_id': false, 'options': false})
       .exec(function(err, result){
         if(err) {throw err; }
         res.json(result);
       })
   }

   ///////////////////////////////////////////////
   this.addVote = function (req, res) {
     //This is very slow.  Needs looking into.
 		Polls
     .update ({ 'id': req.params.id,
                'options.name' : req.params.name },
              { $inc: { 'options.$.votes': 1 }
            })
 			.exec(function (err, result) {
 					if (err) { throw err; }
 				});
 	};

/**  ////////////////////////////////////////////////
  this.addPoll = function(json, req, res) {
			Polls.findOne({ 'id': json.id }, function (err, poll) {
				if (err) {
					return done(err);
				}

				if (poll) {
					return done(null, poll);
				} else {
					var newPoll = new Poll();

          newPoll.id = json.id;
          newPoll.name = json.name;
          newPoll.options = json.options;

					newPoll.save(function (err) {
						if (err) {
							throw err;
						}
						return done(null, newPoll);
					});
        };
      });
}; **/
};

module.exports = PollHandler;

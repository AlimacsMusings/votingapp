'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
  "id" : Number,
  "name" : String,
  "options" : [ {"id": Number,
                 "name" : String,
                 "votes" : Number } ]
});

module.exports = mongoose.model('Poll', Poll);

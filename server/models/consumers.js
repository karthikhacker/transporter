const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('mongoose-unique-validator');

const ConsumerSchema = new Schema({
  name : {
    type :String,
    required : 'Name is required',
  },
  sex : {
    type : String,
    required : 'Sex is required',
    enum : ['male','female']
  },
  address : {
    type : String,
    required : 'Address is required',
  },
  position : {
    lat : Number,
    lng : Number
  },
  phone : {
    type : String,
    required : 'Phone no is required',
  },
  notes : {
    type : String
  },
  createdAt : {
    type : Date,
    default : Date.now
  },
  needsWave : {type : Boolean},
  behavioralIssues : {type : Boolean},
  needTwoSeats : {type : Boolean},
  hasSeizures : {type : Boolean},
  hasWheelChair : {type : Boolean},
  hasMedication : {type : Boolean}
})
ConsumerSchema.plugin(validator);

const Consumer = mongoose.model('Consumer',ConsumerSchema);
module.exports = Consumer;

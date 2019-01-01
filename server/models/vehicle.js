const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Consumer = require('./consumer');
const validator = require('mongoose-unique-validator');

const VehicleSchema = new Schema({
   name : {
      type : String,
      required : 'Name is required',
      unique : 'This name already exists'
   },
   seats : {
     type : Number,
     required : 'Number of seats required',
     min : [0,'Number seats cant be negative.']
   },
   flexSeats : {
     type : Number,
     default : 0,
     min : [0,'Number of flex seats cant be negative']
   },
   wheelchairs : {
     type : Number,
     default : 0,
     min : [0,'Numbers cant be negative']
   },
   consumers : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Consumer'
   }],
   additionalwpts : Array,
   driver : {
     type : Boolean,
     default : true
   },
   rider : {
     type : Boolean,
     default : false
   },
   optimized : {
     type : String,
     enum : ['auto','first'],
     default : undefined
   },
   maxPassengerDuration: {
     type : String,
     default : undefined
   }
});

VehicleSchema.pulgin(validator);

const Vehicle = mongoose.model('Vehicle',VehicleSchema);
module.exports = Vehicle;

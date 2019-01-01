const Vehicle = require('../models/vehicle');

//Add vehicle
exports.addVehicle = (req,res) => {
  const vehicle = new Vehicle({
    name : req.body.name,
    seats : rq.body.seats,
    flexSeats : req.body.flexSeats,
    wheelchairs : req.body.wheelchairs,

  })
}
//get Vehicles
//get Vehicle
//Edit vehicle
//Delete Vehicle

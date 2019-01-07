const Vehicle = require('../models/vehicle');

//Add vehicle
exports.addVehicle = (req,res) => {
  const vehicle = new Vehicle(req.body);
  vehicle.save((err) => {
    if(err){
      res.status(400).json(err);
    }else{
      res.status(200).json({success : true, msg : 'Vehicle added'});
    }
  })
}
//get Vehicles
exports.getVehicles = (req,res) => {
  Vehicle.find({}).populate('consumers').exec((err,vehicles) => {
    if(vehicles.length > 0){
      res.status(200).json(vehicles);
    }else{
      res.status(404).json({ msg  : 'No vehicle'});
    }
  })
}
//get Vehicle
exports.getVehicle = (req,res) => {
  Vehicle.findById({_id : req.params.id}).then((consumer) => {
       res.status(200).json(consumer);
  })
}
//Edit vehicle
exports.editVehicle = (req,res) => {
  let data = req.body;
  let id = {_id : req.params.id};
  Vehicle.findOneAndUpdate(id,data,(err) => {
    if(err){
      res.status(400).json(err);
    }else{
      res.status(200).json({ msg : 'Vehicle updated.'});
    }
  })
}
//Delete Vehicle
exports.deleteVehicle = (req,res) => {
  let id = {_id : req.params.id};
  Vehicle.findOneAndDelete(id,(err) => {
    if(err){
      res.status(400).json(err);
    }else{
      res.status(200).json({ success : true, msg : 'Vehicle deleted' });
    }
  })
}

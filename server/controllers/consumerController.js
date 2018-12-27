 const Consumer = require('../models/consumers');
 const csv = require('csv-express');
 const filename = 'consumers.csv';

// add consumers
exports.addConsumer = (req,res) => {
     const consumer = new Consumer({
        name : req.body.name,
        sex : req.body.sex,
        address : req.body.address,
        notes : req.body.notes,
        phone : req.body.phone,
        needsWave : req.body.needsWave,
        behavioralIssues : req.body.behavioralIssues,
        needTwoSeats : req.body.needTwoSeats,
        hasSeizures : req.body.hasSeizures,
        hasWheelChair : req.body.hasWheelChair,
        hasMedication : req.body.hasMedication
     });
     consumer.save((err) => {
       if(err){
         if(err.errors.name){
           res.status(400).json({ success : false, msg : err.errors.name.message});
         }else if(err.errors.sex){
           res.status(400).json({ success : false, msg : err.errors.sex.message});
         }else if(err.errors.address){
           res.status(400).json({ success : false, msg : err.errors.address.message});
         }else if(err.errors.phone){
           res.status(400).json({ success : false, msg : err.errors.phone.message});
         }
       }else{
         res.status(200).json({ success : true, msg : 'consumer added'});
       }
     })
}

//Get consumers
exports.getConsumers = (req,res) => {
  Consumer.find({}).then(consumers => {
    if(consumers.length > 0){
      res.status(200).json(consumers);
    }else{
      res.status(400).json({ success : false, msg : 'No consumers'})
    }
  })
}
// Get consumer
exports.getConsumer = (req,res) => {
  Consumer.findById({_id : req.params.id}).then(consumer => {
    if(consumer){
      res.status(200).json(consumer);
    }
  })
}

//Update consumer
exports.updateConsumer = (req,res) => {
  const id = {_id : req.params.id};
  const data = {
    name : req.body.name,
    sex : req.body.sex,
    address : req.body.address,
    phone : req.body.phone,
    notes : req.body.notes,
    needsWave : req.body.needsWave,
    behavioralIssues : req.body.behavioralIssues,
    needTwoSeats : req.body.needTwoSeats,
    hasSeizures : req.body.hasSeizures,
    hasWheelChair : req.body.hasWheelChair,
    hasMedication : req.body.hasMedication
  }
  Consumer.findOneAndUpdate(id,data,(err) => {
    if(err){
      res.status(400).json(err);
    }else{
      res.status(200).json({ success : true, msg : 'consumer updated!.'});
    }
  })
}

//Delete consumer
exports.deleteConsumer = (req,res) => {
  Consumer.findOneAndDelete({_id : req.params.id},(err) => {
    if(err){
      res.status(400).json(err);
    }else{
      res.status(200).json({ msg : 'consumer deleted!.'})
    }
  })
}

 const Consumer = require('../models/consumers');
 const csv = require('csv-express');
 const filename = 'consumers.csv';
 const NodeGeocoder = require('node-geocoder');
 const options = {
   provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyCw5A4d4IHG2fg1flHSUX0FeDLef0XapKg', // for Mapquest, OpenCage, Google Premier
  formatter: null
 }
// add consumers
exports.addConsumer = (req,res) => {
   const geocoder = NodeGeocoder(options);
   const consumer = new Consumer(req.body);
   geocoder.geocode(consumer.address, function(err, data) {
      if(!data){
        res.status(400).json({ success : false, msg : 'Invalid location'});
      }else{
        var coords = {
          lat : data[0].latitude,
          lng : data[0].longitude
        }
        consumer.position = coords;
        consumer.save((err) => {
          if(err){
            if(err.errors.name){
              res.status(400).json({ success : false, msg : err.errors.name.message});
            }else if(err.errors.sex){
              res.status(400).json({ success : false, msg : err.errors.sex.message});
            }else if(err.errors.address){
              res.status(400).json({ success : false, msg : err.errors.address.message });
            }else if(err.errors.phone){
              res.status(400).json({ success : false, msg : err.errors.phone.message });
            }else{
              res.state(400).json(err);
            }
          }else{
            res.status(200).json({ success : true, msg : 'consumer added' })
          }
        })
      }
    });
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
  const geocoder = NodeGeocoder(options);
  const consumer =  req.body;
  const id = {_id : req.params.id };
  geocoder.geocode(consumer.address,function(err,data){
    if(data){
      let coords = {
        lat : data[0].latitude,
        lng : data[0].longitude
      }
      consumer.position = coords;
      Consumer.findOneAndUpdate(id,consumer,function(err){
        if(err){
          res.status(400).json(err);
        }else{
          res.status(200).json({ success : true, msg : 'Updated.'})
        }
      })
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

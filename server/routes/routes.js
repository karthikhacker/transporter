const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const AdminMiddleware = require('../middleware/adminMiddleware');
const ConsumerController = require('../controllers/consumerController');
const VehicleController = require('../controllers/vehicleController');
const passport = require('passport');

router.post('/adduser',passport.authenticate('jwt',{session : false}),AdminMiddleware,UserController.addUser);
router.post('/login',UserController.login);
router.get('/current',passport.authenticate('jwt',{ session : false}),UserController.current);
router.get('/users',passport.authenticate('jwt',{ session : false }),UserController.getUsers);
router.get('/user/:id',passport.authenticate('jwt',{session : false}),UserController.getUser)
router.put('/update/:id',passport.authenticate('jwt',{session : false}),AdminMiddleware,UserController.editUser);
router.delete('/delete/:id',passport.authenticate('jwt',{session : false}),AdminMiddleware,UserController.deleteUser);
router.post('/addconsumer',passport.authenticate('jwt',{session : false }),ConsumerController.addConsumer);
router.get('/consumers',passport.authenticate('jwt',{session : false}),ConsumerController.getConsumers);
router.get('/consumer/:id',passport.authenticate('jwt',{session : false}),ConsumerController.getConsumer);
router.put('/updateconsumer/:id',ConsumerController.updateConsumer);
router.delete('/deleteconsumer/:id',passport.authenticate('jwt',{session : false}),ConsumerController.deleteConsumer);
router.post('/addvehicle',VehicleController.addVehicle);
router.get('/vehicles',passport.authenticate('jwt',{session : false }),VehicleController.getVehicles);
router.get('/vehicle/:id',passport.authenticate('jwt',{session : false}),VehicleController.getVehicle);
router.put('/editvehicle/:id',passport.authenticate('jwt',{session : false}),VehicleController.editVehicle);
router.delete('/deletevehicle/:id',passport.authenticate('jwt',{session : false}),VehicleController.deleteVehicle);
module.exports = router;

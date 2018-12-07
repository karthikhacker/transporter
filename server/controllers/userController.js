const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// create user
exports.addUser = (req,res) => {
  const user = new User({
    email : req.body.email,
    password : req.body.password
  })
  user.save((err) => {
    if(err){
      if(err.errors.email){
        res.status(400).json({ success : false, msg : err.errors.email.message});
      }else if(err.errors.password){
        res.status(400).json({ success : false, msg : err.errors.password.message});
      }else{
        res.status(400).json(err);
      }
    }else{
      res.status(200).json({ success : true, msg : 'user added'})
    }
  })
}

//login
exports.login = (req,res) => {
   User.findOne({ email : req.body.email},(err,user) => {
     if(err) throw err;
     if(!user){
        res.status(400).json({ success : false, msg : 'Auth failed, user not found.' })
     }else if(user){
       var validPassword = user.comparePassword(req.body.password);
       if(!validPassword){
         res.status(400).json({ success : false, msg : 'Auth failed, wrong password!.'});
       }else{
         let token = jwt.sign({
           id : user.id,
           email : user.email,
           role : user.role
         },config.secret,{ expiresIn : '1h'});
         res.status(200).json({ success : true, token : 'Bearer ' + token  })
       }
     }
   })
}

// Get current  User
exports.current = (req,res) => {
  res.json({
    id : req.user.id,
    email : req.user.email,
    role : req.user.role
  })
}

// Get all users
exports.getUsers = (req,res) => {
  User.find({}).then(user => {
    if(user){
      res.status(200).json(user);
    }
  })
}

// get user data
exports.getUser = (req,res) => {
  User.findOne({_id : req.params.id},(err,user) => {
    if(err) throw err;
    if(user){
      res.status(200).json(user)
    }
  })
}
//Edit user
exports.editUser = (req,res) => {
  const id = {_id : req.params.id};
  const data = {
    email : req.body.email,
    role : req.body.role
  }
  User.findOneAndUpdate(id,data,(err) => {
    if(err){
      res.status(401).json(err);
    }else{
      res.status(200).json({ success : true, msg : 'User updated!.'});
    }
  })
}

//Delete User
exports.deleteUser = (req,res) => {
  User.findOneAndRemove({ _id : req.params.id},(err) => {
    if(err){
      res.status(401).json(err);
    }else{
      res.status(200).json({ msg : 'User deleted!.'});
    }
  })
}

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const validator = require('mongoose-unique-validator');

const UserSchema = new Schema({
   email : {
     type : String,
     required : 'Email is required',
     unique : 'Email already in use'
   },
   password : {
     type : String,
     required : 'password is required.'
   },
   role : {
      type : String,
      enum : ['admin','user'],
      default : 'admin'
   }
});
UserSchema.plugin(validator);
//methods
UserSchema.pre('save',function(next){
   var user = this;
   bcrypt.hash(user.password,null,null,function(err,hash){
      if(err) return next(err);
      user.password = hash;
      next();
   })
});

//compare password
UserSchema.methods.comparePassword = function(password){
    var user = this;
   return bcrypt.compareSync(password,user.password);
}

const User = mongoose.model('User',UserSchema);
module.exports = User;

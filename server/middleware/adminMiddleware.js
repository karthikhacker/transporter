module.exports = (req,res,next) => {
  const {role} = req.user;
  if(role === 'admin'){
    next();
  }else{
    res.status( 401).json({ msg : 'unauthorized.'})
  }
}

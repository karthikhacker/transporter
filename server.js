const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const chalk = require('chalk');
const config = require('./server/config/config');
const router = require('./server/routes/routes');
//mongodb connection
mongoose.connect(config.db,{useNewUrlParser : true},(err) => {
   if(err){
     console.log(chalk.red(err));
   }else{
     console.log(chalk.yellow('Mongodb connected.'));
   }
})
//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(cors());
require('./server/middleware/passport')(passport);
app.use('/api',router);
//server
app.listen(port,() => {
  console.log(chalk.white('App running at port ', port));
})

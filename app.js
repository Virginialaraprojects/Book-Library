var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const sequelize =require('./models/index.js').sequelize;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/* 404 error handler that directs page-not found template */
app.use((req, res, next)=>{
  const err= new Error('Not Found');
  err.status=404;
  err.message ='Sorry, page not found!'
  res.render('page-not-found',{ err })
});

/* Global error handler */
app.use((err,req, res, next)=>{
  //if (err.status === 404){
    //console.log('404 Error Handler Called');
    //res.status(404).render('page-not-found' ,{ err })
//}else{
    err.status= 500;
    err.message= 'Sorry, something went wrong with the server!'
    console.log(err.status);
    console.log(err.message);
    res.status(err.status || 500)
    res.render('error', { err });
  //}
});


/* Test connection with sql database */
//const Sequelize=require ('sequelize');
//const { sequelize } = require('./models');

(async ()=> {
  try{
  await sequelize.authenticate();
  console.log('Connection to the database successful!')
  }catch(error){
  console.log('Error connecting to the database',error);
  }
})();


module.exports = app;

var express = require('express');
const book = require('../models/book');
var router = express.Router();
//import Book model
const bookModel = require('../models').bookModel;
//const library=('/library.db');

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req,res, next) =>{
    try{
      await cb(req, res, next)
    }catch(error){
      res.status(500).send(error);
    }
  }
}
/* GET home page. */
router.get('/', (req, res) =>{
  res.redirect('/books');
});

/* All book list.*/
router.get('/books',asyncHandler(async(req,res,next)=>{
  let allBooks =await bookModel.findAll();
  res.render('index', { allBooks });
}));

module.exports = router;

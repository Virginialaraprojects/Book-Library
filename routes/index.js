var express = require('express');
const book = require('../models/book');
var router = express.Router();
//import Book model
const bookModel = require('../models').Book;
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

/* All book list. */
router.get('/books',asyncHandler(async(req,res,next)=>{
  const allBooks =await bookModel.findAll(); //{order:[['createdAt','DESC']]}
  res.render('index', { allBooks });
}));

/* Create new book. */
router.get('/books/new',asyncHandler(async(req,res)=>{
  res.render('new-book', {book: bookModel.build(), title:'New Book'});
}));

/* Post new book. */
router.post('/books/new',asyncHandler(async(req,res)=>{
  let book; 
  try{
    book= await bookModel.create(req.body);
    res.redirect('/books' + book.id);
  }catch(error){
    if(error.name === "SequelizeValidationError"){
      book  = await bookModel.build(req.body);
      res.render('new-book', {book, errors:error.errors, title:'New Book'})
    }else{
      throw error;
    }
  }  
}));

/* Get book details. */
router.get('/books/:id',asyncHandler(async(req,res,next)=>{
  const book = await bookModel.findByPk(req.params.id);
  if (book){
    res.render('update-book',{book, title: book.title});
  }else{
   next()
  }
  
}));

/* Update book info. */
router.post('/books/:id', asyncHandler(async(req, res)=> {
  let book;
  try{
    book =await bookModel.findByPk(req.params.id);
    if(book){
    await book.update(req.body);
    res.redirect('/books');
    } else{
      res.render('page-not-found');
    }
  }catch(error){
      if(error.name === "SequelizeValidationError"){
        book  = await bookModel.build(req.body);
        book.id = req.params.id;
        res.render('update-book', {book, error, title: book.title})
      }else{
        throw error;
      }
    }
}));

/* Delete a book */
router.post('/books:id/delete', asyncHandler(async(req,res)=>{
  const book= await bookModel.findByPk(req.params.id);
    await book.destroy();
    res.redirect('/books');

}));

module.exports = router;

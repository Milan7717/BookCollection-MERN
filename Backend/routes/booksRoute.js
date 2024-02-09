
import express from 'express';
import { Book } from '../models/bookModel.js';


const router =express.Router()

//route for save a new book
//using async because it connectes with mongoose  and take time to get data
router.post("", async (req, res) => {
    try {
      if (
        //conditions
        !req.body.title ||
        !req.body.author ||
        !req.body.publishYear
      ) {
        return res.status(400).send({
          message: "Send all required fields :title,author,publishYear",
        });
      }
  
      // creating new book
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };
      //question
      const book = await Book.create(newBook);
      return res.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  //route for get all books from database
  router.get("", async (req, res) => {
    try {
      //getting books that was created or posted
      const books = await Book.find({});
  
      //question
      // return res.status(200).json(books);
      return res.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error);
    }
  });
  
  //route for get books by id from database
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      //getting books that was created or posted
      const singlebook = await Book.findById(id);
  
      return res.status(200).json(singlebook);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" })
    }
  });
  
  //route dor update a book
  router.put("/:id", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send({
          message: "Send all required  fileds :title, author, publishYear",
        });
      }
  
      const { id } = req.params;
  
      //question req.body
      const result = await Book.findByIdAndUpdate(id, req.body);
  
      if (!result) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).send({ message: "Book update successfully" });
    } catch (error) {
      console.log(error);
    }
  });
  
  //route for delete a book
  router.delete("/:id",async(req,res)=>{
  try {
   const {id}=req.params;
  
   const result= await Book.findByIdAndDelete(id);
  
   if(!result){
    return res.status(400).json({message:"Book not found"})
   }
   return res.status(200).send({message:"Book deleted successfully"})
  
  } catch (error) {
    console.log(error)
  }
  });
  
export default router;
  
import express, { response } from "express";
import { PORT, mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";

const app = express();

//middleware for parsing request body
app.use(express.json());

//getting resource from server
app.get('/',(req,res)=>{
console.log(req);
return res.status(301).send("welcome to my mern stack practice project");
})


//post method used
//route for save a new Book
app.post("/books",async(req,res)=>{
try {
  if(
    !req.body.title ||
    !req.body.author||
    !req.body.publishYear

){
return res.status(400).send({message:"send all required fields: title,author, publishYear"})
}

const newBook={
  title:req.body.title,
  author:req.body.author,
  publishYear:req.body.publishYear
};
const book= await Book.create(newBook);
return res.status(201).send(book);

  
} catch (error) {
  console.log(error);
  response.status(500).send({message:error.message});
  
}
})

//route for get all books from database



mongoose.connect(mongoDBURL)
.then(()=>{
console.log("app connected to database");

//express is run if data is successfull
app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});

})
.catch((err)=>{
  console.log(err);
})
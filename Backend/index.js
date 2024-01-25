import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//middleware for parsing request body
app.use(express.json());

//getting resource from server
app.get("/", (req, res) => {
  console.log(req);
  return res.status(301).send("welcome to my mern stack practice project");
});

//use middleware for parsing data
app.use ('/books',bookRoute);

//middleware for handling cors policy
//option 1 allow all prigins
app.use(cors());

//oprion2-> all cutom users 
// app.use (cors({
//   origin:'http://localhost:3000',
//   method:['GET','POST','PUT','DELETE'],
//   allowedHeafers:['Custom-Type'],
// })
// );

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to database");

    //express is run if data is successfull
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js"
import cors from "cors"

//importing model Book which contains the data of bookschema
import { Book } from "./models/bookModel.js";

const app = express();

//middleware for parsing request body
app.use(express.json());


//middleware for handling cors policy
// step:1
app.use(cors());

// step:2
// app.use(cors({
//   origin:"http://localhost:5555/",
//   methods:["GET","POST","PUT","DELETE"],
//   allowedHeaders:["Content-Type"]
// }))

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to the page");
});

//use middleware for nooksroute
app.use("/books",booksRoute);

//listening to the port
app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});

//connected to mongoose db
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App is connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import employeeController from './controllers/employeeController.js'

//get server from express
const app = express();
//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(
  //uses the source from the react app
  cors({
    origin: "http://localhost:3000",
  })
);
app.use('/employees', employeeController);


//start sever on port 8080
app.listen(8080, () => {
  console.log("server connected");
});

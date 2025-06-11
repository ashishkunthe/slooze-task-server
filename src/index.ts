import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "hello welcome",
  });
});

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING as string)
  .then(() => {
    app.listen(5000, () => {
      console.log("server is runnig; db connectiion is done ");
    });
  })
  .catch((e) => {
    console.log("something went wrong \n", e);
  });

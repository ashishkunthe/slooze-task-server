import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth";

const app = express();

dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoute);

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

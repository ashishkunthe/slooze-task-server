import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth";
import restaurantRoutes from "./routes/restaurantRoutes";

const app = express();

dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/restaurants", restaurantRoutes);

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

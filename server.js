import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
//TODO: Import OpenAI-ChatGPT dependencies
config();
const app = express();
// import chatgptRoute from "./routes/chatgptRoute.js";
import messageRoute from "./routes/messageRoute.js";

//TODO: Setup the server
//TODO: .env encryption variable
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGO_URL;

//TODO: Initiate the middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//TODO: Initiate the route
app.use("/api/message", messageRoute);
//TODO: Listen to the open port to start the server
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
//TODO: Prevent strict query for MongoDB
mongoose.set("strictQuery", false);
//TODO: Connecting to the MongoDB using Monggose
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Successful connected to MongoDB");
  })
  .catch((err) => {
    console.log(err.messsage);
  });

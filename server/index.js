const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser")

const app = express();

// CORS Options
const corsOptions = {
  // origin: "http://localhost:5173", // Set to the origin of your frontend
  origin: "https://reflexims.vercel.app", // Set to the origin of your frontend
  credentials: true,              
};
app.use(cookieParser())
app.use(cors(corsOptions));        // Use CORS middleware
app.use(express.json());           // For parsing JSON
app.options("*", cors(corsOptions));  // Preflight request handler

// Your routes
app.use("/auth", require("./Routes/authRoutes.js"));
app.use("/api/admin", require("./Routes/adminPageRoute.js"));
app.use("/api/user", require("./Routes/userPageRoute.js"));

const port = process.env.PORT || 3005;
// console.log(port)
const url = process.env.MONGO_URL;

mongoose.connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Server running on port ${port}`));



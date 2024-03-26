const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const serviceRoutes = require("./routes/serviceRoutes");
require("dotenv").config();

const app = express();
const uri = "";

const connectToDb = require("./config/db");
connectToDb();
app.use(express.json({ limit: "20mb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", " *");
  res.status(200).json({
    success: true,
    message: "API service running ",
  });
});
app.use(
  cors({
    origin: [
      /netlify\.app$/,
      /localhost:\d{4}$/,
      "https://descriptive-accessible-arch.glitch.me",
    ],
    credentials: true,
  })
);
//api
app.use("/api", serviceRoutes);
const server = app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});

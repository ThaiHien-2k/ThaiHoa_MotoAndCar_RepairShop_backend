const express = require("express");
const dotenv = require("dotenv");
const connectToDb = require("./config/db");
const accountRoutes = require("./routes/accountRoutes");
const commentRoutes = require("./routes/commentRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectToDb();

const app = express();

// Body parser middleware
app.use(express.json());

// Basic API route
app.get("/", (req, res) => {
    res.send("API is running...");
});

//All API
app.use("/api/account", accountRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);

// Define your port from environment or use default
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

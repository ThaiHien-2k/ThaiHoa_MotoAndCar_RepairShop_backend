const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDb = require("./config/db");
const accountRoutes = require("./routes/accountRoutes");
const commentRoutes = require("./routes/commentRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const authMiddleware = require("./middleware/auth");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectToDb();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Public route
app.get("/api/public", (req, res) => {
    res.json({ message: "This is a public route." });
});

// Private route
app.get("/api/private", authMiddleware(), (req, res) => {
    res.json({ message: "This is a private route.", user: req.user });
});

// Example of protected route with privilege check
app.get("/api/admin", authMiddleware("admin"), (req, res) => {
    res.json({ message: "This is an admin route." });
});

// Basic API route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// All API routes
app.use("/api/accounts", accountRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/employees", employeeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "An error occurred", error: err.message });
});

// Define your port from environment or use default
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

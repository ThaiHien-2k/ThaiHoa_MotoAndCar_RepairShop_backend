const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDb = require("./config/db");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const accountRoutes = require("./routes/accountRoutes");
const commentRoutes = require("./routes/commentRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const authMiddleware = require("./middleware/auth");

dotenv.config();

// Verify essential environment variables
if (!process.env.PORT || !process.env.DB_URI) {
    throw new Error("Missing essential environment variables.");
}

// Connect to MongoDB
connectToDb();

const app = express();

// Security and rate-limiting middleware
app.use(cors());
app.use(helmet()); // Adds security headers
app.use(express.json());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
});
app.use(limiter);

// Public route
app.get("/api/public", (req, res) =>
    res.json({ message: "This is a public route." })
);

// Authentication-protected routes
app.get("/api/private", authMiddleware(), (req, res) =>
    res.json({ message: "This is a private route.", user: req.user })
);

// Admin-only route
app.get("/api/admin", authMiddleware("admin"), (req, res) =>
    res.json({ message: "This is an admin route." })
);

// Main route
app.get("/", (req, res) => res.send("API is running..."));

// API route setup with appropriate access control
app.use("/api/accounts", accountRoutes);
app.use("/api/comments", authMiddleware(), commentRoutes); // Authenticated users
app.use("/api/orders", authMiddleware(), orderRoutes); // Authenticated users
app.use("/api/products", productRoutes); // Public access
app.use("/api/services", authMiddleware(), serviceRoutes); // Authenticated users
app.use("/api/employees", authMiddleware("admin"), employeeRoutes); // Admin-only

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: "An error occurred",
        error: err.message,
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);

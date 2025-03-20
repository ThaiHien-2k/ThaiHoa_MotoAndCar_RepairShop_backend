const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDb = require("./config/db");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const accountRoutes = require("./routes/accountRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const productCommentRoutes = require("./routes/productCommentRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const repairAppointmentsRoutes = require("./routes/repairAppointmentsRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const supplierRoutes = require("./routes/suppliersRoutes");
const promotionsRoutes = require("./routes/promotionsRoutes");
const blogRoutes = require("./routes/blogsRoutes");
const blogCommentRoutes = require("./routes/blogCommentsRoutes");
const purchaseHistoryRoutes = require("./routes/purchaseHistoryRoutes");
const repairHistoryRoutes = require("./routes/repairHistoryRoutes");
const customerRoutes = require("./routes/customersRoutes");
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



// Main route
app.get("/", (req, res) => res.send("API is running..."));

// API route setup with appropriate access control
app.use("/api/accounts", authMiddleware(), accountRoutes);
app.use("/api/orders", authMiddleware(), orderRoutes); // Authenticated users
app.use("/api/products", authMiddleware(), productRoutes); // Public access
app.use("/api/services", authMiddleware(), serviceRoutes); // Authenticated users
app.use("/api/employees", authMiddleware(), employeeRoutes); // Admin-only
app.use("/api/productComment", authMiddleware(), productCommentRoutes); 
app.use("/api/categories",authMiddleware(), categoryRoutes);
app.use("/api/repairAppointments", authMiddleware(), repairAppointmentsRoutes); // Authenticated users
app.use("/api/inventory", authMiddleware(), inventoryRoutes); // Admin-only
app.use("/api/suppliers", authMiddleware(), supplierRoutes); // Admin-only
app.use("/api/promotions", authMiddleware(), promotionsRoutes); // Admin-only
app.use("/api/blogs", authMiddleware(), blogRoutes); // Authenticated users
app.use("/api/blogComments", authMiddleware(), blogCommentRoutes); // Authenticated users
app.use("/api/purchaseHistory", authMiddleware(), purchaseHistoryRoutes); // Authenticated users
app.use("/api/repairHistory", authMiddleware(), repairHistoryRoutes); // Authenticated users
app.use("/api/customers", authMiddleware(), customerRoutes); // Authenticated users 


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

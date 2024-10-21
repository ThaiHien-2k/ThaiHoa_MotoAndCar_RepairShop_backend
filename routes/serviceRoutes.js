const express = require("express");
const router = express.Router();
const {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
    filterServices,
} = require("../controllers/serviceController");
const authMiddleware = require("../middleware/auth");

// Route to create a new service
router.post("/", authMiddleware, createService);

// Route to get all services
router.get("/", getAllServices);

// Route to get a service by ID
router.get("/:id", getServiceById);

// Route to update a service by ID
router.put("/:id", authMiddleware, updateService);

// Route to delete a service by ID
router.delete("/:id", authMiddleware, deleteService);

// Filter services
router.get("/filter", filterServices);

module.exports = router;

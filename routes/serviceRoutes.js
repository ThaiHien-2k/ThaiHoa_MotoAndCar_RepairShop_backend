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

// Route to create a new service (requires authentication)
router.post("/", authMiddleware, createService);

// Route to get all services (public or requires authentication, adjust as needed)
router.get("/", getAllServices);

// Route to get a service by ID (public or requires authentication, adjust as needed)
router.get("/:id", getServiceById);

// Route to update a service by ID (requires authentication)
router.put("/:id", authMiddleware, updateService);

// Route to delete a service by ID (requires authentication)
router.delete("/:id", authMiddleware, deleteService);

// Route to filter services (public or requires authentication, adjust as needed)
router.get("/filter", filterServices);

module.exports = router;

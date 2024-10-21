const express = require("express");
const router = express.Router();
const {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
} = require("../controllers/serviceController");

// Route to create a new service
router.post("/", createService);

// Route to get all services
router.get("/", getAllServices);

// Route to get a service by ID
router.get("/:id", getServiceById);

// Route to update a service by ID
router.put("/:id", updateService);

// Route to delete a service by ID
router.delete("/:id", deleteService);

module.exports = router;

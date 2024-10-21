const Service = require("../models/serviceModel");

// Create a new service
exports.createService = async (req, res) => {
    const {
        serviceName,
        category,
        price,
        estimatedTime,
        description,
        available,
    } = req.body;

    try {
        const newService = new Service({
            serviceName,
            category,
            price,
            estimatedTime,
            description,
            available,
        });

        await newService.save();
        res.status(201).json({
            message: "Service created successfully",
            service: newService,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all services
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a service by ID
exports.getServiceById = async (req, res) => {
    const { id } = req.params;

    try {
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a service
exports.updateService = async (req, res) => {
    const { id } = req.params;
    const {
        serviceName,
        category,
        price,
        estimatedTime,
        description,
        available,
    } = req.body;

    try {
        const service = await Service.findByIdAndUpdate(
            id,
            {
                serviceName,
                category,
                price,
                estimatedTime,
                description,
                available,
            },
            { new: true }
        );

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json({
            message: "Service updated successfully",
            service,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a service
exports.deleteService = async (req, res) => {
    const { id } = req.params;

    try {
        const service = await Service.findByIdAndDelete(id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

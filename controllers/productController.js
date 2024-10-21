const Product = require("../models/productModel");

exports.createProduct = async (req, res) => {
    const {
        name,
        category,
        subcategory,
        rate,
        comment,
        purchases,
        commentId,
        price,
        stock,
        imageUrl,
        description,
        specifications,
        warranty,
        tags,
        isFeatured,
    } = req.body;

    try {
        const newProduct = new Product({
            name,
            category,
            subcategory,
            rate,
            comment,
            purchases,
            commentId,
            price,
            stock,
            imageUrl,
            description,
            specifications,
            warranty,
            tags,
            isFeatured,
        });

        await newProduct.save();
        res.status(201).json({
            message: "Product created successfully",
            newProduct,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const product = await Product.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// controllers/productController.js

exports.filterProducts = async (req, res) => {
    const { category, subcategory, minRate, maxRate, name } = req.query;
    let filter = {};

    if (category) {
        filter.category = category;
    }

    if (subcategory) {
        filter.subcategory = subcategory;
    }

    if (minRate) {
        filter.rate = { $gte: minRate };
    }

    if (maxRate) {
        filter.rate = { ...filter.rate, $lte: maxRate };
    }

    if (name) {
        filter.name = { $regex: name, $options: "i" }; // case-insensitive search
    }

    try {
        const products = await Product.find(filter);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

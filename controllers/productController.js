const Product = require('../models/productModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Temporary name
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.gif') {
      return cb(new Error('Only image files are allowed.'));
    }
    cb(null, true);
  },
}).array('images', 5);

// Create a new product
exports.createProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const {
        name,
        category_id,
        brand,
        price,
        stock_quantity,
        description,
        specifications,
        warranty,
        origin,
        warranty_center,
        discount,
        related_products,
        tags,
      } = req.body;

      const newProduct = new Product({
        name,
        category_id,
        brand,
        price,
        stock_quantity,
        description,
        images: [], // Temporary, will update after renaming files
        status: 'active',
        average_rating: 0,
        ratings_count: 0,
        supplier_id: req.body.supplier_id,
        specifications,
        warranty,
        origin,
        warranty_center,
        discount,
        related_products,
        tags,
      });

      await newProduct.save();

      // Rename uploaded files to include the product ID and update the 'images' array
      const renamedImages = req.files.map((file, index) => {
        const newFilename = `${newProduct._id}_${index + 1}${path.extname(file.originalname)}`;
        fs.renameSync(`uploads/products/${file.filename}`, `uploads/products/${newFilename}`);
        return newFilename;
      });

      // Assign renamed images to the product and save
      newProduct.images = renamedImages;
      await newProduct.save();

      res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  });
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const productId = req.params.id;
      const { data } = req.body;
      const parsedData = JSON.parse(data);

      // Prepare the updates, excluding images for now
      const updatedData = { ...parsedData };

      // If new images are uploaded, rename them and append to the existing images
      if (req.files && req.files.length > 0) {
        const newImages = req.files.map((file, index) => {
          const newFilename = `${productId}_${index + 1}${path.extname(file.originalname)}`;
          fs.renameSync(`uploads/products/${file.filename}`, `uploads/products/${newFilename}`);
          return newFilename;
        });

        // Merge the new images with existing ones
        updatedData.images = [...(parsedData.images || []), ...newImages];
      }

      // Use findByIdAndUpdate to update the product directly
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updatedData,
        { new: true } // `new: true` ensures that the returned document is the updated one
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update product' });
    }
  });
};



// Other product-related methods
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product list', error });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

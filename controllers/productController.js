const Product = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('supplier_id').populate('related_products');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product list', error });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('supplier_id').populate('related_products');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
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

exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category_id: req.params.category_id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products by category', error });
  }
};

exports.searchProductsByName = async (req, res) => {
  try {
    const products = await Product.find({ name: { $regex: req.query.name, $options: 'i' } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error searching products', error });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.stock_quantity = req.body.stock_quantity;
    await product.save();

    res.status(200).json({ message: 'Stock updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating stock', error });
  }
};

exports.applyDiscount = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.discount = req.body.discount;
    await product.save();

    res.status(200).json({ message: 'Discount applied successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error applying discount', error });
  }
};

exports.getProductsByStatus = async (req, res) => {
  try {
    const products = await Product.find({ status: req.params.status });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products by status', error });
  }
};

exports.getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('related_products');
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product.related_products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching related products', error });
  }
};
const Promotion = require('../models/promotionsModel');

exports.createPromotion = async (req, res) => {
  try {
    const newPromotion = new Promotion(req.body);
    await newPromotion.save();
    res.status(201).json(newPromotion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPromotions = async (req, res) => {
  try {
    const { status, title, page = 1, limit = 10, startDate, endDate } = req.query;
    const query = {};

    if (status) query.status = status;
    if (title) query.title = { $regex: title, $options: 'i' };
    if (startDate && endDate) query.startDate = { $gte: new Date(startDate), $lte: new Date(endDate) };

    const promotions = await Promotion.find(query)
      .populate('applicableProducts')
      .populate('applicableServices')
      .limit(parseInt(limit))
      .skip((page - 1) * limit);

    const total = await Promotion.countDocuments(query);
    res.status(200).json({ total, promotions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPromotionById = async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id)
      .populate('applicableProducts')
      .populate('applicableServices');
    if (!promotion) return res.status(404).json({ message: 'Promotion not found' });
    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePromotion = async (req, res) => {
  try {
    const updatedPromotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPromotion) return res.status(404).json({ message: 'Promotion not found' });
    res.status(200).json(updatedPromotion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePromotion = async (req, res) => {
  try {
    const deletedPromotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!deletedPromotion) return res.status(404).json({ message: 'Promotion not found' });
    res.status(200).json({ message: 'Promotion deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.togglePromotionStatus = async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (!promotion) return res.status(404).json({ message: 'Promotion not found' });

    promotion.status = promotion.status === 'active' ? 'inactive' : 'active';
    await promotion.save();
    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.applyPromotionCode = async (req, res) => {
  try {
    const { promotionCode } = req.body;
    const promotion = await Promotion.findOne({ promotionCode, status: 'active' });

    if (!promotion) return res.status(404).json({ message: 'Invalid or inactive promotion code' });

    const currentDate = new Date();
    if (currentDate < promotion.startDate || currentDate > promotion.endDate) {
      return res.status(400).json({ message: 'Promotion code is not valid during this period' });
    }

    if (promotion.usage_limit && promotion.usage_limit <= 0) {
      return res.status(400).json({ message: 'Promotion code usage limit reached' });
    }

    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
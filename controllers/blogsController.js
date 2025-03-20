const Blog = require('../models/blogsModel');

exports.createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, category, title } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category_id = category;
    if (title) filter.title = { $regex: title, $options: 'i' };
    const blogs = await Blog.find(filter)
      .limit(parseInt(limit))
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    const total = await Blog.countDocuments(filter);
    res.status(200).json({ total, blogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.toggleBlogStatus = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    blog.status = blog.status === 'published' ? 'draft' : 'published';
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.increaseViews = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json({ views: blog.views });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    const isLiked = req.body.like;
    blog.likes += isLiked ? 1 : -1;
    if (blog.likes < 0) blog.likes = 0;
    await blog.save();
    res.status(200).json({ likes: blog.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRelatedBlogs = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    const relatedBlogs = await Blog.find({
      _id: { $in: blog.related_blogs.map(b => b.id) },
      status: 'published'
    }).select('title slug images');
    res.status(200).json(relatedBlogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTopBlogs = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const topBlogs = await Blog.find({ status: 'published' })
      .sort({ views: -1 })
      .limit(limit)
      .select('title slug images views');
    res.status(200).json(topBlogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchBlogs = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;
    const searchQuery = {
      status: 'published',
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { tags: { $in: [query] } }
      ]
    };
    const blogs = await Blog.find(searchQuery)
      .limit(parseInt(limit))
      .skip((page - 1) * limit);
    const total = await Blog.countDocuments(searchQuery);
    res.status(200).json({ total, blogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

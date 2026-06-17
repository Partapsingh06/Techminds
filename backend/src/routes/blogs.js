const express = require('express');
const router = express.Router();
const { getModel } = require('../db');
const { upload, handleUploadedFile } = require('../storage');
const { authenticateToken } = require('./auth');

// GET all blogs
router.get('/', async (req, res) => {
  try {
    const Blog = getModel('Blog');
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving blogs.' });
  }
});

// GET single blog
router.get('/:id', async (req, res) => {
  try {
    const Blog = getModel('Blog');
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog post not found.' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving blog post.' });
  }
});

// POST create blog (Admin Only)
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title, content, category, summary, author } = req.body;
    const imageUrl = req.file ? await handleUploadedFile(req.file) : '';

    const Blog = getModel('Blog');
    const newBlog = await Blog.create({
      title,
      content,
      category,
      summary: summary || content.substring(0, 150) + '...',
      author: author || 'TechMinds Admin',
      image: imageUrl,
      publishedAt: new Date()
    });

    res.status(201).json(newBlog);
  } catch (err) {
    console.error('Create blog error:', err);
    res.status(500).json({ message: 'Error creating blog post.' });
  }
});

// PUT update blog (Admin Only)
router.put('/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title, content, category, summary, author } = req.body;
    const updateFields = { title, content, category, summary, author };

    if (req.file) {
      updateFields.image = await handleUploadedFile(req.file);
    }

    const Blog = getModel('Blog');
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    
    if (!updatedBlog) return res.status(404).json({ message: 'Blog post not found.' });
    res.json(updatedBlog);
  } catch (err) {
    console.error('Update blog error:', err);
    res.status(500).json({ message: 'Error updating blog post.' });
  }
});

// DELETE blog (Admin Only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const Blog = getModel('Blog');
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Blog post not found.' });
    res.json({ message: 'Blog post deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting blog post.' });
  }
});

module.exports = router;

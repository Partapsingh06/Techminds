const express = require('express');
const router = express.Router();
const { getModel } = require('../db');
const { upload, handleUploadedFile } = require('../storage');
const { authenticateToken } = require('./auth');

// GET gallery images
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'All' ? { category } : {};
    
    const Gallery = getModel('Gallery');
    const images = await Gallery.find(filter);
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving gallery images.' });
  }
});

// POST add gallery image (Admin Only)
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image.' });
    }

    const imageUrl = await handleUploadedFile(req.file);
    const Gallery = getModel('Gallery');
    const newItem = await Gallery.create({
      title: title || 'TechMinds Activity',
      category: category || 'General',
      image: imageUrl
    });

    res.status(201).json(newItem);
  } catch (err) {
    console.error('Gallery upload error:', err);
    res.status(500).json({ message: 'Error uploading gallery image.' });
  }
});

// DELETE gallery image (Admin Only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const Gallery = getModel('Gallery');
    const deleted = await Gallery.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Gallery image not found.' });
    res.json({ message: 'Gallery image deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting gallery image.' });
  }
});

module.exports = router;

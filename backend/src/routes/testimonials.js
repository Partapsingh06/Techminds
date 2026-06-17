const express = require('express');
const router = express.Router();
const { getModel } = require('../db');
const { upload, handleUploadedFile } = require('../storage');
const { authenticateToken } = require('./auth');

// GET all testimonials
router.get('/', async (req, res) => {
  try {
    const Testimonial = getModel('Testimonial');
    const list = await Testimonial.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving testimonials.' });
  }
});

// POST create testimonial (Admin Only)
router.post('/', authenticateToken, upload.single('avatar'), async (req, res) => {
  try {
    const { name, role, school, text } = req.body;
    const avatarUrl = req.file ? await handleUploadedFile(req.file) : '';

    const Testimonial = getModel('Testimonial');
    const newItem = await Testimonial.create({
      name,
      role,
      school,
      text,
      avatar: avatarUrl
    });

    res.status(201).json(newItem);
  } catch (err) {
    console.error('Create testimonial error:', err);
    res.status(500).json({ message: 'Error creating testimonial.' });
  }
});

// PUT update testimonial (Admin Only)
router.put('/:id', authenticateToken, upload.single('avatar'), async (req, res) => {
  try {
    const { name, role, school, text } = req.body;
    const updateFields = { name, role, school, text };

    if (req.file) {
      updateFields.avatar = await handleUploadedFile(req.file);
    }

    const Testimonial = getModel('Testimonial');
    const updated = await Testimonial.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    
    if (!updated) return res.status(404).json({ message: 'Testimonial not found.' });
    res.json(updated);
  } catch (err) {
    console.error('Update testimonial error:', err);
    res.status(500).json({ message: 'Error updating testimonial.' });
  }
});

// DELETE testimonial (Admin Only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const Testimonial = getModel('Testimonial');
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Testimonial not found.' });
    res.json({ message: 'Testimonial deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting testimonial.' });
  }
});

module.exports = router;

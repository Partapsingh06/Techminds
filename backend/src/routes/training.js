const express = require('express');
const router = express.Router();
const { getModel } = require('../db');
const { upload, handleUploadedFile } = require('../storage');
const { authenticateToken } = require('./auth');

// GET all training programs
router.get('/', async (req, res) => {
  try {
    const Training = getModel('Training');
    const list = await Training.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving training programs.' });
  }
});

// POST add training program (Admin Only)
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title, duration, targetAudience, description, syllabus } = req.body;
    const imageUrl = req.file ? await handleUploadedFile(req.file) : '';

    let syllabusArr = [];
    if (syllabus) {
      syllabusArr = typeof syllabus === 'string' ? JSON.parse(syllabus) : syllabus;
    }

    const Training = getModel('Training');
    const newItem = await Training.create({
      title,
      duration,
      targetAudience,
      description,
      syllabus: syllabusArr,
      image: imageUrl
    });

    res.status(201).json(newItem);
  } catch (err) {
    console.error('Create training program error:', err);
    res.status(500).json({ message: 'Error adding training program.' });
  }
});

// PUT update training program (Admin Only)
router.put('/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title, duration, targetAudience, description, syllabus } = req.body;
    const updateFields = { title, duration, targetAudience, description };

    if (req.file) {
      updateFields.image = await handleUploadedFile(req.file);
    }

    if (syllabus) {
      updateFields.syllabus = typeof syllabus === 'string' ? JSON.parse(syllabus) : syllabus;
    }

    const Training = getModel('Training');
    const updated = await Training.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    
    if (!updated) return res.status(404).json({ message: 'Training program not found.' });
    res.json(updated);
  } catch (err) {
    console.error('Update training program error:', err);
    res.status(500).json({ message: 'Error updating training program.' });
  }
});

// DELETE training program (Admin Only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const Training = getModel('Training');
    const deleted = await Training.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Training program not found.' });
    res.json({ message: 'Training program deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting training program.' });
  }
});

module.exports = router;

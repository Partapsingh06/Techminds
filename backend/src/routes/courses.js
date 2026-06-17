const express = require('express');
const router = express.Router();
const { getModel } = require('../db');
const { upload, handleUploadedFile } = require('../storage');
const { authenticateToken } = require('./auth');

// GET all courses
router.get('/', async (req, res) => {
  try {
    const Course = getModel('Course');
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving courses.' });
  }
});

// GET single course
router.get('/:id', async (req, res) => {
  try {
    const Course = getModel('Course');
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving course.' });
  }
});

// POST create course (Admin Only)
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title, grade, category, description, curriculum, kits } = req.body;
    const imageUrl = req.file ? await handleUploadedFile(req.file) : '';

    // Parse arrays from strings if they come as stringified JSON or comma separated lists
    let curriculumArr = [];
    if (curriculum) {
      curriculumArr = typeof curriculum === 'string' ? JSON.parse(curriculum) : curriculum;
    }
    let kitsArr = [];
    if (kits) {
      kitsArr = typeof kits === 'string' ? JSON.parse(kits) : kits;
    }

    const Course = getModel('Course');
    const newCourse = await Course.create({
      title,
      grade,
      category,
      description,
      curriculum: curriculumArr,
      kits: kitsArr,
      image: imageUrl
    });

    res.status(201).json(newCourse);
  } catch (err) {
    console.error('Create course error:', err);
    res.status(500).json({ message: 'Error creating course.' });
  }
});

// PUT update course (Admin Only)
router.put('/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title, grade, category, description, curriculum, kits } = req.body;
    const updateFields = { title, grade, category, description };

    if (req.file) {
      updateFields.image = await handleUploadedFile(req.file);
    }

    if (curriculum) {
      updateFields.curriculum = typeof curriculum === 'string' ? JSON.parse(curriculum) : curriculum;
    }
    if (kits) {
      updateFields.kits = typeof kits === 'string' ? JSON.parse(kits) : kits;
    }

    const Course = getModel('Course');
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    
    if (!updatedCourse) return res.status(404).json({ message: 'Course not found.' });
    res.json(updatedCourse);
  } catch (err) {
    console.error('Update course error:', err);
    res.status(500).json({ message: 'Error updating course.' });
  }
});

// DELETE course (Admin Only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const Course = getModel('Course');
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Course not found.' });
    res.json({ message: 'Course deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting course.' });
  }
});

module.exports = router;

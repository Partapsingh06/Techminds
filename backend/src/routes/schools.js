const express = require('express');
const router = express.Router();
const { getModel } = require('../db');
const { upload, handleUploadedFile } = require('../storage');
const { authenticateToken } = require('./auth');

// GET all partner schools
router.get('/', async (req, res) => {
  try {
    const School = getModel('School');
    const list = await School.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving schools.' });
  }
});

// POST add school (Admin Only)
router.post('/', authenticateToken, upload.single('logo'), async (req, res) => {
  try {
    const { name, location, status } = req.body;
    const logoUrl = req.file ? await handleUploadedFile(req.file) : '';

    const School = getModel('School');
    const newItem = await School.create({
      name,
      location,
      logo: logoUrl,
      status: status || 'Active'
    });

    res.status(201).json(newItem);
  } catch (err) {
    console.error('Create school error:', err);
    res.status(500).json({ message: 'Error adding partner school.' });
  }
});

// PUT update school (Admin Only)
router.put('/:id', authenticateToken, upload.single('logo'), async (req, res) => {
  try {
    const { name, location, status } = req.body;
    const updateFields = { name, location, status };

    if (req.file) {
      updateFields.logo = await handleUploadedFile(req.file);
    }

    const School = getModel('School');
    const updated = await School.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    
    if (!updated) return res.status(404).json({ message: 'School not found.' });
    res.json(updated);
  } catch (err) {
    console.error('Update school error:', err);
    res.status(500).json({ message: 'Error updating partner school.' });
  }
});

// DELETE school (Admin Only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const School = getModel('School');
    const deleted = await School.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'School not found.' });
    res.json({ message: 'Partner school deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting partner school.' });
  }
});

module.exports = router;

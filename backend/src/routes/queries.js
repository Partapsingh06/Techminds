const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { getModel } = require('../db');
const { authenticateToken } = require('./auth');

// Setup mail transporter
let transporter = null;
const canSendEmail = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

if (canSendEmail) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: (process.env.SMTP_PORT == 465),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  console.log('Nodemailer SMTP transporter initialized.');
} else {
  console.log('SMTP configuration missing. Email notifications will be printed to console logs.');
}

// Function to trigger email
async function sendNotificationEmail(queryData) {
  const mailOptions = {
    from: '"TechMinds Admin Notification" <no-reply@techminds.com>',
    to: process.env.NOTIFICATION_EMAIL || 'admin@techminds.com',
    subject: `New STEM Inquiry: ${queryData.subject || 'General Inquiry'}`,
    html: `
      <h2>New TechMinds Inquiry Received</h2>
      <p><strong>Name:</strong> ${queryData.name}</p>
      <p><strong>Email:</strong> ${queryData.email}</p>
      <p><strong>Phone:</strong> ${queryData.phone || 'N/A'}</p>
      <p><strong>Type:</strong> ${queryData.interestType}</p>
      ${queryData.schoolName ? `<p><strong>School Name:</strong> ${queryData.schoolName}</p>` : ''}
      <p><strong>Subject:</strong> ${queryData.subject || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f4f4f4; padding: 10px; border-left: 3px solid #00c3ff;">
        ${queryData.message}
      </blockquote>
    `
  };

  if (canSendEmail && transporter) {
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email notification sent to admin for query by ${queryData.email}`);
    } catch (err) {
      console.error('Email transmission failure:', err.message);
    }
  } else {
    console.log('--- [MOCK EMAIL NOTIFICATION] ---');
    console.log(`To: ${mailOptions.to}`);
    console.log(`Subject: ${mailOptions.subject}`);
    console.log(`Body:\n${mailOptions.html.replace(/<[^>]*>/g, '')}`);
    console.log('---------------------------------');
  }
}

// GET all queries (Admin Only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const Inquiry = getModel('Inquiry');
    const queries = await Inquiry.find();
    // Sort queries by date descending
    queries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(queries);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving contact queries.' });
  }
});

// POST submit new query (Public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message, schoolName, interestType } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    const Inquiry = getModel('Inquiry');
    const newQuery = await Inquiry.create({
      name,
      email,
      phone,
      subject,
      message,
      schoolName,
      interestType: interestType || 'General Inquiry',
      status: 'New'
    });

    // Send async email notification
    sendNotificationEmail(newQuery);

    res.status(201).json({
      message: 'Inquiry submitted successfully. Our team will contact you shortly.',
      query: newQuery
    });
  } catch (err) {
    console.error('Inquiry submission error:', err);
    res.status(500).json({ message: 'Error submitting inquiry.' });
  }
});

// PUT update query status (Admin Only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: 'Status is required.' });

    const Inquiry = getModel('Inquiry');
    const updated = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    
    if (!updated) return res.status(404).json({ message: 'Inquiry not found.' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating inquiry status.' });
  }
});

// DELETE query (Admin Only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const Inquiry = getModel('Inquiry');
    const deleted = await Inquiry.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Inquiry not found.' });
    res.json({ message: 'Inquiry deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting inquiry.' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { requireAdmin } = require('../middleware/auth');
const { requireDoctor } = require('../middleware/auth');

// Get all messages for admin (populate appointment, doctor)
router.get('/', requireAdmin, async (req, res) => {
  try {
    const msgs = await Message.find().sort({ createdAt: -1 }).populate('appointmentId').populate('doctorId', 'name speciality');
    res.json(msgs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin can send a direct message to a doctor
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { doctorId, content, appointmentId } = req.body;
    if (!doctorId || !content) return res.status(400).json({ error: 'Missing fields' });
    const message = new Message({ doctorId, content, appointmentId: appointmentId || null, action: 'admin-message', sender: 'admin' });
    await message.save();
    res.status(201).json({ message: 'Message sent', id: message._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Doctor fetch their messages
router.get('/doctor/:doctorId', requireDoctor, async (req, res) => {
  try {
    const { doctorId } = req.params;
    // ensure requesting doctor matches the requested id
    if (req.doctor._id.toString() !== doctorId) return res.status(403).json({ error: 'Forbidden' });
    const msgs = await Message.find({ doctorId }).sort({ createdAt: -1 }).populate('appointmentId');
    res.json(msgs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

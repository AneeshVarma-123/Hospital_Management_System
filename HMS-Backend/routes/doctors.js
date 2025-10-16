const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Doctor = require('../models/Doctor');

// Doctor login by docId and password
router.post('/login', async (req, res) => {
  try {
    const { docId, password } = req.body;
    if (!docId || !password) return res.status(400).json({ error: 'Missing fields' });
    const doc = await Doctor.findOne({ docId });
    if (!doc) return res.status(404).json({ error: 'Doctor not found' });
    const ok = await bcrypt.compare(password, doc.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const jwt = require('jsonwebtoken');
  const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';
  const token = jwt.sign({ id: doc._id, role: 'doctor' }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ message: 'Logged in', doctor: { id: doc._id, docId: doc.docId, name: doc.name, speciality: doc.speciality }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// List doctors (non-sensitive fields only)
router.get('/', async (req, res) => {
  try {
    const docs = await Doctor.find().select('name speciality honours');
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { adminId, password } = req.body;
    if (!adminId || !password) return res.status(400).json({ error: 'Missing fields' });
    const admin = await Admin.findOne({ adminId });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const jwt = require('jsonwebtoken');
  const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';
  const token = jwt.sign({ id: admin._id, role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ message: 'Admin logged in', admin: { id: admin._id, adminId: admin.adminId, name: admin.name }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Doctor = require('../models/Doctor');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';

// verify admin token
async function requireAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing auth token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    const admin = await Admin.findById(payload.id);
    if (!admin) return res.status(401).json({ error: 'Admin not found' });
    req.admin = admin;
    next();
  } catch (err) {
    console.error('Admin auth error', err);
    res.status(401).json({ error: 'Invalid token' });
  }
}

// verify doctor token
async function requireDoctor(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing auth token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.role !== 'doctor') return res.status(403).json({ error: 'Forbidden' });
    const doctor = await Doctor.findById(payload.id);
    if (!doctor) return res.status(401).json({ error: 'Doctor not found' });
    req.doctor = doctor;
    next();
  } catch (err) {
    console.error('Doctor auth error', err);
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { requireAdmin, requireDoctor, JWT_SECRET };

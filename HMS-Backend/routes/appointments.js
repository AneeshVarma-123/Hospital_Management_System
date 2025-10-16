const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Message = require('../models/Message');
const { requireAdmin, requireDoctor } = require('../middleware/auth');

// Get all appointments (most recent first)
router.get('/', requireAdmin, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ createdAt: -1 })
      .populate([{ path: 'userId', select: 'name email' }, { path: 'doctorId', select: 'name speciality honours' }]);
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create appointment
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    // if userId provided, ensure it is stored
    const appointment = new Appointment(data);
    await appointment.save();
    await appointment.populate({ path: 'userId', select: 'name email' });
    res.status(201).json({ message: 'Appointment created', appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Assign doctor to appointment (admin only)
router.patch('/:id/assign', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { doctorId } = req.body;
    const appt = await Appointment.findById(id);
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });
    appt.doctorId = doctorId;
    appt.status = 'assigned';
    appt.assignedAt = new Date();
    await appt.save();
    await appt.populate({ path: 'doctorId', select: 'name speciality honours' });
    res.json({ message: 'Doctor assigned', appointment: appt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get appointments assigned to a doctor (status = assigned) -- doctor-only if same doctor
router.get('/doctor/:doctorId', requireDoctor, async (req, res) => {
  try {
    const { doctorId } = req.params;
    // ensure the doctor requesting matches the requested doctorId
    if (req.doctor && req.doctor._id.toString() !== doctorId) return res.status(403).json({ error: 'Forbidden' });
    const appts = await Appointment.find({ doctorId, status: 'assigned' }).populate([
      { path: 'userId', select: 'name phone email' },
      { path: 'doctorId', select: 'name speciality honours' }
    ]);
    res.json(appts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Doctor accepts appointment
router.patch('/:id/accept', requireDoctor, async (req, res) => {
  try {
    const { id } = req.params;
    const appt = await Appointment.findById(id);
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });
    appt.status = 'accepted';
    await appt.save();
    // create message for admin
    await Message.create({ appointmentId: appt._id, doctorId: appt.doctorId, action: 'accepted' });
    res.json({ message: 'Appointment accepted', appointment: appt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Doctor rejects appointment with reason
router.patch('/:id/reject', requireDoctor, async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const appt = await Appointment.findById(id);
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });
    appt.status = 'rejected';
    appt.rejectionReason = reason || '';
    await appt.save();
    // create message for admin with reason
    await Message.create({ appointmentId: appt._id, doctorId: appt.doctorId, action: 'rejected', reason: reason || '' });
    res.json({ message: 'Appointment rejected', appointment: appt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update appointment preferred date (admin) and reset assignment so it can be reassigned
router.patch('/:id/update-date', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { preference } = req.body;
    const appt = await Appointment.findById(id);
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });

    // update preferred date
    appt.preference = preference;

    // reset assignment so admin can reassign
    appt.doctorId = undefined;
    appt.status = 'pending';
    appt.assignedAt = undefined;
    appt.rejectionReason = undefined;

    await appt.save();
    // populate userId and doctorId on the saved document
    await appt.populate([
      { path: 'userId', select: 'name email' },
      { path: 'doctorId', select: 'name speciality honours' }
    ]);
    res.json({ message: 'Appointment date updated and reset for reassignment', appointment: appt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get appointments by status (admin)
router.get('/status/:status', requireAdmin, async (req, res) => {
  try {
    const { status } = req.params;
    const appts = await Appointment.find({ status }).populate([
      { path: 'userId', select: 'name phone email' },
      { path: 'doctorId', select: 'name speciality honours' }
    ]).sort({ createdAt: -1 });
    res.json(appts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get appointments for a doctor filtered by status (doctor)
router.get('/doctor/:doctorId/status/:status', requireDoctor, async (req, res) => {
  try {
    const { doctorId, status } = req.params;
    const appts = await Appointment.find({ doctorId, status }).populate([
      { path: 'userId', select: 'name phone email' },
      { path: 'doctorId', select: 'name speciality honours' }
    ]).sort({ createdAt: -1 });
    res.json(appts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Mark appointment as treated (doctor or admin)
router.patch('/:id/treated', async (req, res) => {
  // attempt to authenticate as doctor or admin
  const { requireAdmin, requireDoctor } = require('../middleware/auth');
  // try doctor
  try {
    await requireDoctor(req, res, async () => {});
  } catch (e) {
    // ignore — try admin
  }
  // if not doctor, try admin
  if (!req.doctor) {
    try {
      await requireAdmin(req, res, async () => {});
    } catch (e) {}
  }
  // now if neither admin nor doctor authenticated, return 401
  if (!req.doctor && !req.admin) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const { id } = req.params;
    const appt = await Appointment.findById(id);
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });
    appt.status = 'treated';
    appt.treatedAt = new Date();
    await appt.save();
    await appt.populate([
      { path: 'userId', select: 'name phone email' },
      { path: 'doctorId', select: 'name speciality honours' }
    ]);
    // optional: create message to admin about treatment
    await Message.create({ appointmentId: appt._id, doctorId: appt.doctorId, action: 'treated' });
    res.json({ message: 'Appointment marked as treated', appointment: appt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

module.exports = router;


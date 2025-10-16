const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  action: { type: String }, // accepted | rejected | admin-message
  reason: { type: String },
  // optional free-form text when admin sends a message or a note is created
  content: { type: String },
  // optional sender identifier (e.g., 'admin')
  sender: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', MessageSchema);

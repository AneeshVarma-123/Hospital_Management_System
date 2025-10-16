const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  gender: { type: String },
  dob: { type: String },
  age: { type: Number },
  phone: { type: String },
  email: { type: String },
  adhaar: { type: String },
  symptoms: { type: String },
  preference: { type: String },
  mode: { type: String },
  ename: { type: String },
  erelation: { type: String },
  ephone: { type: String },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  status: { type: String, default: 'pending' },
  assignedAt: { type: Date },
  rejectionReason: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);

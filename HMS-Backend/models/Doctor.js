const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  docId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  speciality: { type: String },
  honours: { type: String },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Doctor', DoctorSchema);

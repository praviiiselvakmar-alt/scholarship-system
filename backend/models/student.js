const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: String },
  gender: { type: String },
  category: { type: String },
  state: { type: String },
  income: { type: Number },
  course: { type: String },
  marks: { type: Number },
  documents: {
    aadhaar: { type: String },
    marksheet: { type: String },
    incomeCertificate: { type: String },
    communityCertificate: { type: String }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);
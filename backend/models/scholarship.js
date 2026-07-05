const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  scholarship: { type: mongoose.Schema.Types.ObjectId, ref: 'Scholarship', required: true },
  status: { type: String, enum: ['Pending', 'Applied'], default: 'Pending' },
  appliedAt: { type: Date }
});

module.exports = mongoose.model('Application', applicationSchema);
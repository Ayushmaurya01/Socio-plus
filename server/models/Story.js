const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileType: { type: String, enum: ['image', 'video'], required: true },
  fileUrl: { type: String, required: true },
  text: { type: String },
  viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  expiresAt: { type: Date, default: () => Date.now() + 24*60*60*1000, index: { expires: '0' } }
}, { timestamps: true });

module.exports = mongoose.model('Story', storySchema);

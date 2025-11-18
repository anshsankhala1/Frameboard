import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['callsheet', 'storyboard', 'ai_conversation'],
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Index for efficient user-based queries
projectSchema.index({ userId: 1, type: 1 });
projectSchema.index({ userId: 1, createdAt: -1 });

export const Project = mongoose.model('Project', projectSchema);

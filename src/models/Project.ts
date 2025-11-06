import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  projectType: {
    type: String,
    enum: ['short_film', 'commercial', 'music_video', 'unscripted'],
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  crew: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: String,
    permissions: [String]
  }],
  script: {
    currentVersion: String,
    versions: [{
      content: String,
      timestamp: Date,
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }]
  },
  schedule: {
    shootDates: [{
      date: Date,
      location: String,
      scenes: [String],
      crew: [mongoose.Schema.Types.ObjectId]
    }]
  },
  storyboard: [{
    sceneNumber: String,
    shots: [{
      shotNumber: String,
      description: String,
      generatedImage: String,
      notes: String
    }]
  }],
  budget: {
    totalBudget: Number,
    expenses: [{
      category: String,
      amount: Number,
      description: String,
      date: Date
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Project = mongoose.model('Project', projectSchema);

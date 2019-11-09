const mongoose = require('../config/database');

// id, name, description, projectAdmins[], tags[], events[], usersSubscribed[]

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  projectAdmins: {
    type: [{ id: mongoose.Schema.Types.ObjectId, name: String }]
  },
  tags: {
    type: [{ id: mongoose.Schema.Types.ObjectId, name: String }]
  },
  events: {
    type: [{ id: mongoose.Schema.Types.ObjectId }]
  },
  usersSubscribed: {
    type: [{ id: mongoose.Schema.Types.ObjectId }]
  }
});

const ProjectModel = mongoose.model('Project', ProjectSchema);

module.exports = ProjectModel;
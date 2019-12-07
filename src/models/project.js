const mongoose = require("../config/database");

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
    type: [{ _id: mongoose.Schema.Types.ObjectId, name: String, email: String }]
  },
  tags: {
    type: [{ _id: mongoose.Schema.Types.ObjectId, name: String }]
  },
  events: {
    type: [{ _id: mongoose.Schema.Types.ObjectId }]
  },
  usersSubscribed: {
    type: [{ _id: mongoose.Schema.Types.ObjectId }]
  }
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectModel;

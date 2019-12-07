const mongoose = require("../config/database");

const EventSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  speaker: {
    type: String,
    required: true
  },
  schedule: {
    type: String,
    required: true
  },
  attachments: {
    type: [String]
  },
  usersSubscribed: {
    type: [
      {
        id: mongoose.Schema.Types.ObjectId,
        name: String
      }
    ]
  },
  usersAttended: {
    type: [
      {
        id: mongoose.Schema.Types.ObjectId,
        name: String
      }
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const EventModel = mongoose.model("Event", EventSchema);

module.exports = EventModel;

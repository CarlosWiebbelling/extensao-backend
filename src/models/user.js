const bcrypt = require('bcrypt');
const mongoose = require('../config/database');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  enrollment: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    require: true,
    select: false
  },
  projectsInCharge: {
    type: [{
      _id: mongoose.Schema.Types.ObjectId,
      name: String
    }]
  },
  eventsSubscribed: {
    type: [{
      _id: mongoose.Schema.Types.ObjectId,
      name: String
    }]
  },
  projectsSubscribed: {
    type: [{
      _id: mongoose.Schema.Types.ObjectId,
      name: String
    }]
  },
  certificates: {
    type: [String],
  },
  level: {
    type: Number,
    min: 1,
    max: 5,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, 10).then((hashedPassword) => {
    user.password = hashedPassword;
    next();
  });
}, function (err) {
  next(err);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return err;
  }
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
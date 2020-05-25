const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  // CODE HERE
  username: {
    type: String,
    trim: true,
    required: 'String is Required',
  },
  password: {
    type: String,
    trim: true,
    required: 'String is Required',
    min: [6, 'Too few characters'],
  },
  email: {
    type: String,
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
  },
  userCreated: {
    type: Date,
    default: Date.now,
  },
});

const Fitness = mongoose.model('Fitness', UserSchema);

module.exports = Fitness;

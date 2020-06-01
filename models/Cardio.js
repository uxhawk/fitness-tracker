const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardioSchema = new Schema({
  type: {
    type: String,
    default: 'cardio',
  },
  name: {
    type: String,
  },
  distance: {
    type: Number,
  },
  duration: {
    type: Number,
    default: 0,
  },
});

// WorkoutSchema.methods.totalDuration = function() {
//   let sumDuration;
//   const activities = this.exercises;

//   activities.forEach((exercise) => {
//     sumDuration += exercise.duration;
//   });
//   totalDuration = sumDuration;
//   return this.totalDuration;
// };

const Cardio = mongoose.model('Cardio', CardioSchema);

module.exports = Cardio;

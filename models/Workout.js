const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [],
  totalDuration: [],
});

WorkoutSchema.methods.calcTotalDuration = function() {
  let sumDuration;
  const activities = this.exercises;

  activities.forEach((exercise) => {
    sumDuration += exercise.duration;
  });
  totalDuration = sumDuration;
  return this.totalDuration;
};

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;

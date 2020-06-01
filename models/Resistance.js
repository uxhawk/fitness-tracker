const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResistanceSchema = new Schema({
  type: {
    type: String,
    default: 'resistance',
  },
  name: {
    type: String,
  },
  weight: {
    type: Number,
  },
  sets: {
    type: Number,
  },
  reps: {
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

const Resistance = mongoose.model('Resistance', ResistanceSchema);

module.exports = Resistance;

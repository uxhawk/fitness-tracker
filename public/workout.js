/**
 * this function is what you run when you first start working out
 */
async function initWorkout() {
  const lastWorkout = await API.getLastWorkout();
  console.log('Last workout:', lastWorkout);
  if (lastWorkout) {
    document
        .querySelector('a[href=\'/exercise?\']')
        .setAttribute('href', `/exercise?id=${lastWorkout._id}`);

    const workoutSummary = {
      date: formatDate(lastWorkout.day),
      totalDuration: lastWorkout.totalDuration,
      numExercises: lastWorkout.exercises.length,
      ...tallyExercises(lastWorkout.exercises),
    };

    renderWorkoutSummary(workoutSummary);
  } else {
    renderNoWorkoutText();
  }
}

/**
 * @param {exercise} exercises this is the information about what the user did
 * during the workout
 * @return {tallied} this is an array of all the workouts
 */
function tallyExercises(exercises) {
  const tallied = exercises.reduce((acc, curr) => {
    if (curr.type === 'resistance') {
      acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
      acc.totalSets = (acc.totalSets || 0) + curr.sets;
      acc.totalReps = (acc.totalReps || 0) + curr.reps;
    } else if (curr.type === 'cardio') {
      acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
    }
    return acc;
  }, {});
  return tallied;
}

/**
 * a date formatter function for consistency
 * @param {data} date is the current date
 * @return {Date} is formatted from the options object
 */
function formatDate(date) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Date(date).toLocaleDateString(options);
}

/**
 * this function displays workout details to the DOM
 * @param {summary} summary all of the information about the current workout
 */
function renderWorkoutSummary(summary) {
  const container = document.querySelector('.workout-stats');
  summary.totalDuration = summary.totalDuration.reduce((a, b) => a + b, 0);

  const workoutKeyMap = {
    date: 'Date',
    totalDuration: 'Total Workout Duration',
    numExercises: 'Exercises Performed',
    totalWeight: 'Total Weight Lifted',
    totalSets: 'Total Sets Performed',
    totalReps: 'Total Reps Performed',
    totalDistance: 'Total Distance Covered',
  };

  Object.keys(summary).forEach((key) => {
    const p = document.createElement('p');
    const strong = document.createElement('strong');

    strong.textContent = workoutKeyMap[key];
    const textNode = document.createTextNode(`: ${summary[key]}`);

    p.appendChild(strong);
    p.appendChild(textNode);

    container.appendChild(p);
  });
}

/**
 * function that you run when there are no other workout details to display
 * on the DOM
 */
function renderNoWorkoutText() {
  const container = document.querySelector('.workout-stats');
  const p = document.createElement('p');
  const strong = document.createElement('strong');
  strong.textContent = 'You have not created a workout yet!';

  p.appendChild(strong);
  container.appendChild(p);
}

initWorkout();

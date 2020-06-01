// Dependencies
// =============================================================
const db = require('../models');
const Resistance = require('../models/Resistance');
const Cardio = require('../models/Cardio');
const mongojs = require('mongojs');
// Routes
// =============================================================
module.exports = function(app) {
  // get all workouts
  app.get('/api/workouts', (req, res) => {
    db.Workout.find({}, (err, data)=> {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
  });

  // get an individual workout
  app.get('/api/workouts/:id', (req, res) => {
    db.Workout.findOne({
      // eslint-disable-next-line new-cap
      _id: mongojs.ObjectID(req.params.id),
    },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  });

  // add a workout
  app.post('/api/workouts/', (req, res) => {
    db.Workout.create({}, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  });

  // update a a specific workout
  app.put('/api/workouts/:id', (req, res) => {
    if (req.body.type === 'cardio') {
      const cardio = new Cardio(req.body);
      db.Workout.update({
        // eslint-disable-next-line new-cap
        _id: mongojs.ObjectID(req.params.id),
      },
      {
        $push: {
          exercises: [cardio],
          totalDuration: cardio.duration,
        },
      },
      (err, data)=> {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      });
    } else if (req.body.type === 'resistance') {
      const resistance = new Resistance(req.body);
      console.log(resistance);
      db.Workout.update({
        // eslint-disable-next-line new-cap
        _id: mongojs.ObjectID(req.params.id),
      },
      {
        $push: {
          exercises: [resistance],
          totalDuration: resistance.duration,
        },
      },
      (err, data)=> {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      });
    }
  });
};

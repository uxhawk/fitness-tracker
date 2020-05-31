// Dependencies
// =============================================================
const db = require('../models');
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
      db.Workout.update({
        // eslint-disable-next-line new-cap
        _id: mongojs.ObjectID(req.params.id),
      },
      {
        $push: {
          exercises: {
            type: req.body.type,
            name: req.body.name,
            distance: req.body.distance,
            duration: req.body.duration,
          },
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
      db.Workout.update({
        // eslint-disable-next-line new-cap
        _id: mongojs.ObjectID(req.params.id),
      },
      {
        $push: {
          exercises: {
            type: req.body.type,
            name: req.body.name,
            distance: req.body.distance,
            duration: req.body.duration,
          },
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

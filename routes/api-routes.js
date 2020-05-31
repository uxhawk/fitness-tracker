// Dependencies
// =============================================================
const db = require('../models');
// Routes
// =============================================================
module.exports = function(app) {
  app.get('/exercise', (req, res) => {
    db.Workout.find({})
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json(err);
        });
  });

  app.post('/exercise', (req, res) => {

  });
};

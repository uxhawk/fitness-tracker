// *****************************************************************************
// html-routes.js - this file offers a set of
// routes for sending users to the various html pages
// *****************************************************************************

// Dependencies
// =============================================================
const path = require('path');

// Routes
// =============================================================
module.exports = function(app) {
  // index route loads index.html
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  app.get('/exercise', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/exercise.html'));
  });

  // blog route loads blog.html
  app.get('/stats', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/stats.html'));
  });
};

const express = require('express');
const app = express();
const path = require('path');

// Parsing middleware
app.use(require('./body-parsing.middleware'));

// Logging Middleware
app.use(require('./logging.middleware'));

// Serving up static files 
app.use(require('./static.middleware'));

// Session Middleware
app.use(require('./session.middleware'));

// Initializing Passport [passport is authentication middleware]
app.use(require('./passport.middleware'));

// All other routes
app.get('*', function (req, res) {
	console.log('hitting this * route');
  res.sendFile(path.join(__dirname, '../../index.html'));
});

// Error-handling
app.use(require('./error.middleware'));

module.exports = app;
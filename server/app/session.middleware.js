const router = require('express').Router();
const session = require('express-session');

router.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  resave: false,
  saveUninitialized: false
}));

module.exports = router;
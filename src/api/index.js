const express = require('express');

const authentication = require('./components/authentication/authentication-route');
const users = require('./components/users/users-route');
const notifications = require('./components/notifications/notifications-route');

module.exports = () => {
  const app = express.Router();

  authentication(app);
  users(app);
  notifications(app);

  return app;
};

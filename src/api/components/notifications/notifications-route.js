const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const notificationsControllers = require('./notifications-controller');
const notificationsValidator = require('./notifications-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/notifications', route);

  route.get('/', authenticationMiddleware, notificationsControllers.getNotifications);

  route.post(
    '/',
    authenticationMiddleware,
    celebrate(notificationsValidator.createNotification),
    notificationsControllers.createNotification
  );


  route.get('/:id', authenticationMiddleware, notificationsControllers.getNotification);

  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(notificationsValidator.updateNotification),
    notificationsControllers.updateNotification
  );

  route.delete('/:id', authenticationMiddleware, notificationsControllers.deleteNotification);
};

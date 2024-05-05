const notificationsService = require('./notifications-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getNotifications(request, response, next) {
  try {
    const notifications = await notificationsService.getNotifications();
    return response.status(200).json(notifications);
  } catch (error) {
    return next(error);
  }
}

async function getNotification(request, response, next) {
  try {
    const notification = await notificationsService.getNotification(request.params.id);
    if (!notification) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown Notification');
    }
    return response.status(200).json(notification);
  } catch (error) {
    return next(error);
  }
}

async function createNotification(request, response, next) {
  try {
    const {notif_message, read, deleted} = request.body;
    const success = await notificationsService.createNotification(notif_message, read, deleted);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create Notification'
      );
    }
    return response.status(200).json({ notif_message, read, deleted, message: "Success" });
  } catch (error) {
    return next(error);
  }
}

async function updateNotification(request, response, next) {
  try {
    const id = request.params.id;
    const {notif_message, read, deleted} = request.body;
    const success = await notificationsService.updateNotification(id, notif_message, read, deleted);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update Notification'
      );
    }

    return response.status(200).json({ message: "Successfully Updated" });
  } catch (error) {
    return next(error);
  }
}

async function deleteNotification(request, response, next) {
  try {
    const id = request.params.id;
    const success = await notificationsService.deleteNotification(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete notification'
      );
    }
    return response.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getNotifications,
  getNotification,
  createNotification,
  updateNotification,
  deleteNotification
};

const notificationsRepository = require('./notifications-repository');
async function getNotifications() {
  const notifications = await notificationsRepository.getNotifications();

  const results = [];
  for (let i = 0; i < notifications.length; i += 1) {
    const notification = notifications[i];
    results.push({
      id: notification.id,
      notif_message: notification.notif_message,
      read: notification.read,
      deleted: notification.deleted,
    });
  }
  return results;
}

async function getNotification(id) {
  const notification = await notificationsRepository.getNotification(id);
  if (!notification) {
    return null;
  }
  return {
    id: notification.id,
    notif_message: notification.notif_message,
    read: notification.read,
    deleted: notification.deleted,
  };
}

async function createNotification(notif_message, read, deleted) {
  try {
    await notificationsRepository.createNotification(notif_message, read, deleted);
  } catch (err) {
    return null;
  }
  return true;
}

async function updateNotification(id, notif_message, read, deleted) {
  const notification = await notificationsRepository.getNotification(id);
  if (!notification) {
    return null;
  }
  try {
    await notificationsRepository.updateNotification(
      id,
      notif_message,
      read,
      deleted
    );
  } catch (err) {
    return null;
  }
  return true;
}

async function deleteNotification(id) {
  const notification = await notificationsRepository.getNotification(id);
  if (!notification) {
    return null;
  }
  try {
    await notificationsRepository.deleteNotification(id);
  } catch (err) {
    return null;
  }
  return true;
}

module.exports = {
  getNotifications,
  getNotification,
  createNotification,
  updateNotification,
  deleteNotification,
};

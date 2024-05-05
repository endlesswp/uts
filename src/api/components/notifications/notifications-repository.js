const { Notification} = require('../../../models');

async function getNotifications() {
  return Notification.find({});
}


async function getNotification(id) {
  return Notification.findById(id);
}

async function createNotification(notif_message, read, deleted) {
  return Notification.create({notif_message, read, deleted});
}

async function updateNotification(id, notif_message, read, deleted) {
  return Notification.updateOne(
    {
      _id: id,
    },
    {
      $set: {notif_message, read, deleted},
    }
  );
}

async function deleteNotification(id) {
  return Notification.deleteOne({ _id: id });
}


module.exports = {
  getNotifications,
  getNotification,
  createNotification,
  updateNotification,
  deleteNotification
};

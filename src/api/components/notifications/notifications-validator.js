const joi = require('joi');

module.exports = {
  createNotification: {
    body: {
      notif_message: joi.string().min(1).max(100).required().label('Notifications Message'),
      read: joi.string().valid('yes', 'no').required().label('Read'),
      deleted: joi.string().valid('yes', 'no').required().label('Deleted')
    },
  },

  updateNotification: {
    body: {
      notif_message: joi.string().min(1).max(100).required().label('Notifications Message'),
      read: joi.string().valid('yes', 'no').required().label('Read'),
      deleted: joi.string().valid('yes', 'no').required().label('Deleted')
    },
  },
};

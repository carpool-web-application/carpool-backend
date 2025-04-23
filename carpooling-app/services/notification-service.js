import Notification from "../model/notification.js";

export const getNotificationsByUser = async (userId) => {
  return await Notification.find({ userId }).sort({ createdAt: -1 }).exec();
};

export const getNotificationById = async (id) => {
  return await Notification.findById(id).exec();
};

export const saveNotification = async (notificationData) => {
  const notification = new Notification(notificationData);
  return await notification.save();
};

export const updateNotification = async (id, updateData) => {
  return await Notification.findByIdAndUpdate(id, updateData, {
    new: true,
  }).exec();
};

export const getNotificationsByUserId = async (userId) => {
  return await Notification.find({ userId: userId, status: "unread" }).exec();
};

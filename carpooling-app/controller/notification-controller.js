import { catchAsyncFunction } from "../utils/catchAsyncFunction.js";
import * as notificationService from "../services/notification-service.js";
import setSuccessfulResponse from "../utils/successResponse.js";

const getAllNotifications = catchAsyncFunction(async (req, res) => {
  const userId = req.user.id; // Assuming the user id is stored in req.user
  const notifications = await notificationService.getNotificationsByUser(
    userId
  );
  setSuccessfulResponse(notifications, res);
});

const getNotification = catchAsyncFunction(async (req, res) => {
  const notificationId = req.params.notificationId;
  const notification = await notificationService.getNotificationById(
    notificationId
  );
  setSuccessfulResponse(notification, res);
});

const createNotification = catchAsyncFunction(async (req, res) => {
  const newNotification = req.body;
  const savedNotification = await notificationService.saveNotification(
    newNotification
  );
  setSuccessfulResponse(savedNotification, res);
});

const updateNotification = catchAsyncFunction(async (req, res) => {
  const notificationId = req.params.notificationId;
  const updateData = req.body;
  const updatedNotification = await notificationService.updateNotification(
    notificationId,
    updateData
  );
  setSuccessfulResponse(updatedNotification, res);
});

const getUserNotification = catchAsyncFunction(async (req, res) => {
  const userId = req.params.userId;
  const updateData = req.body;
  const updatedNotification = await notificationService.getNotificationByUserId(
    userId,
    updateData
  );
  setSuccessfulResponse(updatedNotification, res);
});

export default {
  getAllNotifications,
  getNotification,
  createNotification,
  updateNotification,
  getUserNotification,
};

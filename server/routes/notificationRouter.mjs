import { Router } from "express";
import { NotificationController } from "../controllers/NotificationController.js";

const notificationRouter = Router();

// GET routes
notificationRouter.get('/:id', NotificationController.getNotifications);
notificationRouter.get('/:id/unread-count', NotificationController.getUnreadCount);

// PUT routes
notificationRouter.put('/:id/mark-all-read', NotificationController.markAllAsRead);
notificationRouter.put('/:id/read', NotificationController.markAsRead);

// DELETE routes
notificationRouter.delete('/:id', NotificationController.deleteNotification);
notificationRouter.delete('/:id/all', NotificationController.deleteAllNotifications);

// POST routes
notificationRouter.post('/', NotificationController.createNotification);

export default notificationRouter;
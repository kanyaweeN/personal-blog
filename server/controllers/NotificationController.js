import { NotificationService } from '../services/NotificationService.js';

export const NotificationController = {
    async getNotifications(req, res) {
        try {
            const userId = req.params.id;
            const { limit = 50, offset = 0 } = req.query;

            const result = await NotificationService.getNotificationsByUserId(
                userId,
                parseInt(limit),
                parseInt(offset)
            );

            res.json({
                success: true,
                data: result.rows,
                total: result.count
            });
        } catch (error) {
            console.error('Error fetching notifications:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch notifications'
            });
        }
    },
    async getUnreadCount(req, res) {
        try {
            const userId = req.params.id;
            const count = await NotificationService.getUnreadCount(userId);

            res.json({
                success: true,
                unreadCount: count
            });
        } catch (error) {
            console.error('Error counting unread notifications:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to count unread notifications'
            });
        }
    },
    async markAsRead(req, res) {
        try {
            const notificationId = req.params.id;

            const notification = await NotificationService.markAsRead(notificationId);

            if (!notification) {
                return res.status(404).json({
                    success: false,
                    message: 'Notification not found'
                });
            }

            res.json({
                success: true,
                data: notification
            });
        } catch (error) {
            console.error('Error marking notification as read:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to mark notification as read'
            });
        }
    },
    async markAllAsRead(req, res) {
        try {
            const userId = req.params.id;
            const count = await NotificationService.markAllAsRead(userId);

            res.json({
                success: true,
                message: 'All notifications marked as read',
                count: count
            });
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to mark all notifications as read'
            });
        }
    },
    async deleteNotification(req, res) {
        try {
            const notificationId = req.params.id;

            const deleted = await NotificationService.deleteNotification(notificationId);

            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Notification not found'
                });
            }

            res.json({
                success: true,
                message: 'Notification deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting notification:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete notification'
            });
        }
    },
    async deleteAllNotifications(req, res) {
        try {
            const userId = req.params.id;
            const count = await NotificationService.deleteAllNotifications(userId);

            res.json({
                success: true,
                message: 'All notifications deleted successfully',
                count: count
            });
        } catch (error) {
            console.error('Error deleting all notifications:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete all notifications'
            });
        }
    },
    async createNotification(req, res) {
        try {
            const { userId, type, title, message, referenceId, referenceType } = req.body;

            // Authorization check
            if (req.user.role !== 'admin' && userId !== req.user.id) {
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden'
                });
            }

            const notification = await NotificationService.createNotification({
                userId,
                type,
                title,
                message,
                referenceId,
                referenceType
            });

            res.status(201).json({
                success: true,
                data: notification
            });
        } catch (error) {
            console.error('Error creating notification:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create notification'
            });
        }
    }
}

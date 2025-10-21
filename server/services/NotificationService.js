import { NotificationRepository } from "../repositories/NotificationRepository.js";

export const NotificationService = {
    async getNotificationsByUserId(userId, limit, offset) {
        const notifications = await NotificationRepository.findByUserId(userId, limit, offset);
        return {
            rows: notifications,
            count: notifications.length
        };
    },

    async getUnreadCount(userId) {
        return await NotificationRepository.countUnread(userId);
    },

    async markAsRead(notificationId, userId) {
        const notification = await NotificationRepository.markAsRead(notificationId, userId);
        return notification;
    },
    async markAllAsRead(userId) {
        return await NotificationRepository.markAllAsRead(userId);
    },
    async deleteNotification(notificationId) {
        return await NotificationRepository.deleteById(notificationId);
    },
    async deleteAllNotifications(userId) {
        return await NotificationRepository.deleteByUserId(userId);
    },
    async createNotification(data) {
        const notificationData = {
            userId: data.userId,
            type: data.type,
            title: data.title,
            message: data.message,
            referenceId: data.referenceId || null,
            referenceType: data.referenceType || null
        };

        return await NotificationRepository.create(notificationData);
    },
    // Helper method สำหรับสร้าง notification แบบ bulk
    async createBulkNotifications(notifications) {
        return await NotificationRepository.createBulk(notifications);
    },
    // Helper method สำหรับดึง notification พร้อม pagination metadata
    async getNotificationsWithPagination(userId, limit, offset) {
        const [notifications, total] = await Promise.all([
            NotificationRepository.findByUserId(userId, limit, offset),
            NotificationRepository.countByUserId(userId)
        ]);

        return {
            rows: notifications,
            count: notifications.length,
            total: total,
            hasMore: offset + notifications.length < total
        };
    }
}

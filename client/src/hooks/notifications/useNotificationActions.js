import { notificationsService } from "@/services/notificationsService";
import { useAuth } from "../../contexts/authentication";

export function useNotificationActions(
    setNotifications,
    setUnreadCount
) {
    const { state } = useAuth();

    const markAsRead = async (id) => {
        try {
            await notificationsService.markAsRead(id);
            setNotifications(prev =>
                prev.map(n => n.id === id ? { ...n, is_read: true } : n)
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error("Failed to mark as read:", error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await notificationsService.markAllAsRead(state.user.id);
            setNotifications(prev =>
                prev.map(n => ({ ...n, is_read: true }))
            );
            setUnreadCount(0);
        } catch (error) {
            console.error("Failed to mark all as read:", error);
        }
    };

    const deleteNotification = async (id, notifications) => {
        try {
            await notificationsService.deleteById(id);
            const notification = notifications.find(n => n.id === id);
            if (notification && !notification.is_read) {
                setUnreadCount(prev => Math.max(0, prev - 1));
            }
            setNotifications(prev => prev.filter(n => n.id !== id));
        } catch (error) {
            console.error("Failed to delete notification:", error);
        }
    };

    const clearAll = async () => {
        try {
            await notificationsService.deleteAll(state.user.id);
            setNotifications([]);
            setUnreadCount(0);
        } catch (error) {
            console.error("Failed to clear all notifications:", error);
        }
    };

    return {
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll
    };
}
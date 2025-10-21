import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authentication";
import { notificationsService } from "../../services/notificationsService.js";

export function useNotifications(isOpen) {
    const { state } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const data = await notificationsService.getAll({ userId: state.user.id, limit: 20 });
            setNotifications(data);
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUnreadCount = async () => {
        try {
            const count = await notificationsService.getUnreadCount(state.user.id);
            setUnreadCount(count);
        } catch (error) {
            console.error("Failed to fetch unread count:", error);
        }
    };

    // ดึงข้อมูล notifications เมื่อเปิด dropdown
    useEffect(() => {
        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen]);

    // ดึง unread count เมื่อ component mount และ poll ทุกๆ 30 วินาที
    useEffect(() => {
        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 30000);
        return () => clearInterval(interval);
    }, []);

    return {
        notifications,
        setNotifications,
        loading,
        unreadCount,
        setUnreadCount,
        fetchNotifications
    };
}
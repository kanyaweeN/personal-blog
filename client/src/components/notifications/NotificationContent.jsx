import { useEffect } from "react";
import { useNotificationActions } from "../../hooks/notifications/useNotificationActions";
import { useNotifications } from "../../hooks/notifications/useNotifications";
import { useNavigate } from "react-router-dom";
import { NotificationPanel } from "../notifications/NotificationPanel";
import { LoadingPage } from "../loading/LoadingPage";

export default function NotificationContent() {
    // ใช้ hooks ที่มีอยู่แล้ว โดยส่ง isOpen เป็น true เพื่อให้โหลดข้อมูลทันที
    const navigate = useNavigate();

    const {
        notifications,
        setNotifications,
        loading,
        unreadCount,
        setUnreadCount,
        fetchNotifications
    } = useNotifications(true);

    const {
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll
    } = useNotificationActions(setNotifications, setUnreadCount);

    // Fetch ข้อมูลเมื่อ component mount
    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleView = (notification) => {
        if (!notification.is_read) {
            markAsRead(notification.id);
        }
        if (notification.type === "message") {
            navigate("/messages");
        } else if (notification.reference_type === "post" && notification.reference_id) {
            navigate(`/view-post/${notification.reference_id}`);

        } else if (notification.reference_type === "comment" && notification.reference_id) {
            navigate(`/view-post/${notification.reference_id}#comment-${notification.reference_id}`);
        }

    };

    const handleDelete = (id) => {
        deleteNotification(id, notifications);
    };

    if (loading) {
        return (
            <LoadingPage className="w-full" />
        );
    }

    return (
        <main className="flex-1 p-10">
            <NotificationPanel
                loading={loading}
                notifications={notifications}
                unreadCount={unreadCount}
                markAllAsRead={markAllAsRead}
                clearAll={clearAll}
                onView={handleView}
                onDelete={handleDelete}
            />
        </main>
    );
}



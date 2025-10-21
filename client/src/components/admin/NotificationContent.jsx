import { useEffect } from "react";
import { useNotificationActions } from "../../hooks/notifications/useNotificationActions";
import { useNotifications } from "../../hooks/notifications/useNotifications";
import { AppButton } from "../button/AppButton";
import NotificationItem from "../noti/NotificationItem";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
        console.log(`handleView ${notification.reference_id}`, notification.type, notification.reference_type, `/view-post/${notification.reference_id}`);

        if (notification.type === "message") {
            navigate("/messages");
        } else if (notification.reference_type === "post" && notification.reference_id) {
            navigate(`/view-post/${notification.reference_id}`);
            console.log(`Navigating to post: ${notification.reference_id}`);

        } else if (notification.reference_type === "comment" && notification.reference_id) {
            navigate(`/view-post/${notification.reference_id}#comment-${notification.reference_id}`);
        }

    };

    const handleDelete = (id) => {
        deleteNotification(id, notifications);
    };

    if (loading) {
        return (
            <main className="flex-1 p-10">
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1 p-10">
            {/* Header */}
            <header className="flex justify-between items-center mb-5 border-b pb-5">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold">
                        Notifications
                    </h2>
                    {unreadCount > 0 && (
                        <span className="px-2.5 py-0.5 bg-orange-500 text-white text-xs font-bold rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                {notifications.length > 0 && (
                    <div className="flex gap-3">
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="px-4 py-2 text-sm text-gray-400 hover:text-gray-600 rounded-lg transition-colors font-medium"
                            >
                                Mark all as read
                            </button>
                        )}
                        <button
                            onClick={clearAll}
                            className="px-4 py-2 text-sm text-orange-400 hover:text-orange-600 rounded-lg transition-colors font-medium"
                        >
                            Clear all
                        </button>
                    </div>
                )}
            </header>

            {/* Notifications List */}
            {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <Bell className="w-16 h-16 mb-4 opacity-30" />
                    <p className="text-lg">No notifications</p>
                    <p className="text-sm mt-2">You're all caught up!</p>
                </div>
            ) : (
                <div className="space-y-0">
                    {notifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onMarkAsRead={markAsRead}
                            onDelete={handleDelete}
                            onView={handleView}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}



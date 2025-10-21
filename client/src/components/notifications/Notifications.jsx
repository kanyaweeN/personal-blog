import { Bell, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDropdownMenu } from "../../hooks/notifications/useDropdownMenu";
import { useNotifications } from "../../hooks/notifications/useNotifications";
import { useNotificationActions } from "../../hooks/notifications/useNotificationActions";
import { NotificationPanel } from "./NotificationPanel";

export function Notifications() {
    const navigate = useNavigate();
    const { isOpen, menuRef, toggleMenu, closeMenu } = useDropdownMenu();

    const {
        notifications,
        setNotifications,
        loading,
        unreadCount,
        setUnreadCount,
    } = useNotifications(isOpen);

    const {
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
    } = useNotificationActions(setNotifications, setUnreadCount);

    const handleView = (n) => {
        if (!n.is_read) markAsRead(n.id);
        if (n.type === "message") navigate("/messages");
        else if (n.reference_type === "post") navigate(`/view-post/${n.reference_id}`);
        else navigate("/profile/notification");
        closeMenu();
    };

    const handleDelete = (id) => deleteNotification(id, notifications);

    // dropdown animation
    const [animate, setAnimate] = useState(false);
    useEffect(() => {
        if (isOpen) setAnimate(true);
        else {
            const timeout = setTimeout(() => setAnimate(false), 200);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    return (
        <div className="relative" ref={menuRef}>
            {/* Button */}
            <button
                onClick={toggleMenu}
                className="relative p-2 hover:bg-brown-100 rounded-full transition-all"
                aria-label="Notifications"
            >
                <Bell className="w-5 h-5 text-brown-700" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-orange-500 text-white text-xs font-bold rounded-full shadow-sm">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {animate && (
                <div
                    className={`absolute right-0 mt-3 w-80 md:w-96 bg-white border border-brown-100 rounded-2xl shadow-lg z-50 overflow-hidden transition-all duration-200 
                    ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
                >
                    <NotificationPanel
                        loading={loading}
                        notifications={notifications}
                        unreadCount={unreadCount}
                        markAllAsRead={markAllAsRead}
                        clearAll={clearAll}
                        onView={handleView}
                        onDelete={handleDelete}
                        compact
                    />

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="p-3 border-t border-brown-100 bg-brown-100">
                            <button
                                onClick={() => {
                                    navigate("/profile/notification");
                                    closeMenu();
                                }}
                                className="w-full text-center text-sm text-brown-400 hover:text-brown-600 font-medium transition-colors"
                            >
                                View all notifications
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

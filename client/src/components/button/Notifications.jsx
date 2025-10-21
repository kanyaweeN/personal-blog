import { Bell, X, Check, Trash2 } from "lucide-react";
import { useNotifications } from "../../hooks/notifications/useNotifications";
import { useNotificationActions } from "../../hooks/notifications/useNotificationActions";
import { useDropdownMenu } from "../../hooks/notifications/useDropdownMenu";
import { formatTimeNotification } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LoadingPage } from "../loading/LoadingPage";

export function Notifications() {
    const navigate = useNavigate();
    const { isOpen, menuRef, toggleMenu, closeMenu } = useDropdownMenu();

    const {
        notifications,
        setNotifications,
        loading,
        unreadCount,
        setUnreadCount
    } = useNotifications(isOpen);

    const {
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll
    } = useNotificationActions(setNotifications, setUnreadCount);

    const hasNotifications = unreadCount > 0;

    const handleNotificationClick = (notification) => {
        if (!notification.is_read) markAsRead(notification.id);

        if (notification.type === "message") {
            navigate("/messages");
        } else if (notification.reference_type === "post" && notification.reference_id) {
            navigate(`/view-post/${notification.reference_id}`);
        } else {
            navigate("/profile/notification");
        }

        closeMenu();
    };

    const handleDelete = (id) => deleteNotification(id, notifications);
    const handleViewAll = () => {
        navigate("/profile/notification");
        closeMenu();
    };

    // ✅ เพื่อให้ dropdown มี fade-in effect
    const [animate, setAnimate] = useState(false);
    useEffect(() => {
        if (isOpen) {
            setAnimate(true);
        } else {
            const timeout = setTimeout(() => setAnimate(false), 200);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    return (
        <div className="relative" ref={menuRef}>
            {/* 🔔 Notification button */}
            <button
                onClick={toggleMenu}
                className="relative p-2 hover:bg-brown-100 rounded-full transition-all duration-200"
                aria-label="Notifications"
            >
                <Bell className="w-5 h-5 text-brown-700" />
                {hasNotifications && (
                    <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-orange-500 text-white text-xs font-bold rounded-full shadow-sm">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {animate && (
                <div
                    className={`absolute right-0 mt-3 w-80 md:w-96 bg-white border border-brown-100 rounded-2xl shadow-lg z-50 max-h-[500px] flex flex-col overflow-hidden transition-all duration-200 
                        ${isOpen
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2 pointer-events-none"
                        }`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-brown-200 bg-brown-100">
                        <h3 className="text-base font-semibold text-brown-800 flex items-center gap-2">
                            Notifications
                            {unreadCount > 0 && (
                                <span className="text-sm font-normal text-orange-500">
                                    ({unreadCount})
                                </span>
                            )}
                        </h3>
                        <button
                            onClick={closeMenu}
                            className="p-1 hover:bg-brown-200 rounded-full transition-colors"
                            aria-label="Close notifications"
                        >
                            <X className="w-4 h-4 text-brown-600" />
                        </button>
                    </div>

                    {/* Actions */}
                    {notifications.length > 0 && (
                        <div className="flex gap-3 items-center px-4 py-2 border-b border-brown-100 bg-brown-100 text-xs">
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="flex items-center gap-1 text-brown-400 hover:text-brown-600 transition-colors font-medium"
                                >
                                    <Check className="w-3 h-3" />
                                    Mark all as read
                                </button>
                            )}
                            <button
                                onClick={clearAll}
                                className="flex items-center gap-1 text-orange-400 hover:text-orange-600 font-medium ml-auto transition-colors"
                            >
                                <Trash2 className="w-3 h-3" />
                                Clear all
                            </button>
                        </div>
                    )}

                    {/* Notification List */}
                    <div className="overflow-y-auto flex-1">
                        {loading ? (
                            <LoadingPage />
                        ) : notifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-brown-400">
                                <Bell className="w-12 h-12 mb-2 opacity-30" />
                                <p className="text-sm">
                                    No notifications
                                </p>
                            </div>
                        ) : (
                            notifications.map((n) => (
                                <div
                                    key={n.id}
                                    onClick={() => handleNotificationClick(n)}
                                    className={`group relative p-4 border-b border-brown-100 cursor-pointer transition-all hover:bg-brown-50 ${!n.is_read ? "bg-brown-100" : "bg-white"
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div
                                            className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${!n.is_read ? "bg-orange-500" : "bg-transparent"
                                                }`}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4
                                                className={`text-sm font-semibold mb-1 ${!n.is_read
                                                    ? "text-brown-900"
                                                    : "text-brown-700"
                                                    }`}
                                            >
                                                {n.title}
                                            </h4>
                                            <p className="text-sm text-brown-400 mb-1 line-clamp-2">
                                                {n.message}
                                            </p>
                                            <span className="text-xs text-orange">
                                                {formatTimeNotification(n.created_at)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Delete button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(n.id);
                                        }}
                                        className="absolute top-3 right-3 p-1.5 opacity-0 group-hover:opacity-100  rounded-full transition-all"
                                        aria-label="Delete notification"
                                    >
                                        <X className="w-4 h-4 text-brown-400 hover:text-orange-600 " />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="p-3 border-t border-brown-100 bg-brown-100">
                            <button
                                onClick={handleViewAll}
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

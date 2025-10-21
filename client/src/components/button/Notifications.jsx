import { Bell, X, Check, Trash2 } from "lucide-react";
import { useNotifications } from "../../hooks/notifications/useNotifications";
import { useNotificationActions } from "../../hooks/notifications/useNotificationActions";
import { useDropdownMenu } from "../../hooks/notifications/useDropdownMenu";
import { formatTimeNotification } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";

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
        if (!notification.is_read) {
            markAsRead(notification.id);
        }

        if (notification.type === "message") {
            navigate("/messages");
        } else if (notification.reference_type === "post" && notification.reference_id) {
            navigate(`/view-post/${notification.reference_id}`);
        } else {
            navigate("/profile/notification");
        }

        closeMenu();
    };

    const handleViewAll = () => {
        navigate("/profile/notification");
        closeMenu();
    };

    const handleDelete = (id) => {
        deleteNotification(id, notifications);
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={toggleMenu}
                className="relative p-2 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Notifications"
            >
                <Bell className="w-5 h-5 text-gray-700" />
                {hasNotifications && (
                    <span
                        className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-xs font-bold rounded-full"
                    >
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[500px] flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Notifications
                            {unreadCount > 0 && (
                                <span className="ml-2 text-sm font-normal text-gray-500">
                                    ({unreadCount} unread)
                                </span>
                            )}
                        </h3>
                        <button
                            onClick={closeMenu}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Close notifications"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    {/* Actions */}
                    {notifications.length > 0 && (
                        <div className="flex gap-2 px-4 py-2 border-b border-gray-200 bg-gray-50">
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 font-medium transition-colors"
                                >
                                    <Check className="w-3 h-3" />
                                    Mark all as read
                                </button>
                            )}
                            <button
                                onClick={clearAll}
                                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 font-medium ml-auto transition-colors"
                            >
                                Clear all
                            </button>
                        </div>
                    )}

                    {/* Notifications List */}
                    <div className="overflow-y-auto flex-1">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                                <Bell className="w-12 h-12 mb-2 opacity-30" />
                                <p className="text-sm">No notifications</p>
                            </div>
                        ) : (
                            <div>
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`group relative border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${!notification.is_read ? "bg-blue-50" : ""
                                            }`}
                                    >
                                        <div
                                            onClick={() => handleNotificationClick(notification)}
                                            className="p-4 pr-10"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div
                                                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0
                                                        ${!notification.is_read
                                                            ? "bg-blue-500"
                                                            : "bg-transparent"
                                                        }`}
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className={`text-sm font-medium mb-1 
                                                    ${!notification.is_read
                                                            ? "text-gray-900"
                                                            : "text-gray-700"
                                                        }`}
                                                    >
                                                        {notification.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 mb-1 line-clamp-2">
                                                        {notification.message}
                                                    </p>
                                                    <span className="text-xs text-gray-400">
                                                        {formatTimeNotification(notification.created_at)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Delete button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(notification.id);
                                            }}
                                            className="absolute top-3 right-3 p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-100 rounded transition-all"
                                            aria-label="Delete notification"
                                        >
                                            <X className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="p-3 border-t border-gray-200 bg-gray-50">
                            <button
                                onClick={handleViewAll}
                                className="w-full text-center text-sm text-gray-400 hover:text-gray-700 font-medium transition-colors"
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
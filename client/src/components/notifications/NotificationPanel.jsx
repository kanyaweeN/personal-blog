import { Check, Trash2 } from "lucide-react";
import { NotificationList } from "./NotificationList";

export function NotificationPanel({
    loading,
    notifications,
    unreadCount,
    markAllAsRead,
    clearAll,
    onView,
    onDelete,
    compact = false, // ใช้ใน dropdown
}) {
    return (
        <div
            className={`flex flex-col ${compact ? "max-h-[500px]" : "h-full"
                } overflow-hidden`}
        >
            {/* Header */}
            <div
                className={`flex justify-between items-center px-4 py-3 border-b border-brown-200 ${compact ? "bg-brown-100" : "bg-transparent mb-2"
                    }`}
            >
                <h3
                    className={`font-semibold text-brown-800 ${compact ? "text-base" : "text-xl"
                        } flex items-center gap-2`}
                >
                    Notifications
                    {unreadCount > 0 && (
                        <span className="text-sm font-normal text-orange-500">
                            ({unreadCount})
                        </span>
                    )}
                </h3>

                {notifications.length > 0 && (
                    <div className="flex gap-3 items-center text-xs">
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="flex items-center gap-1 text-brown-400 hover:text-brown-600 font-medium"
                            >
                                <Check className="w-3 h-3" />
                                Mark all as read
                            </button>
                        )}
                        <button
                            onClick={clearAll}
                            className="flex items-center gap-1 text-orange-400 hover:text-orange-600 font-medium"
                        >
                            <Trash2 className="w-3 h-3" />
                            Clear all
                        </button>
                    </div>
                )}
            </div>

            {/* List */}
            <NotificationList
                loading={loading}
                notifications={notifications}
                onView={onView}
                onDelete={onDelete}
            />
        </div>
    );
}

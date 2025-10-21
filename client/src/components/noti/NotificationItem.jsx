import { Trash2, X } from "lucide-react";
import { formatTimeNotification } from "../../utils/formatDate";

export default function NotificationItem({
    notification,
    onMarkAsRead,
    onDelete,
    onView
}) {
    return (
        <div
            className={`flex items-start justify-start border-b p-4 hover:bg-brown-50 transition-colors ${!notification.is_read ? "bg-brown-100" : ""
                }`}
        >
            {/* User Avatar */}
            <img
                className="w-9 h-9 rounded-full mr-3 flex-shrink-0"
                src={notification.user_avatar || "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"}
                alt={notification.user_name || "User"}
            />

            {/* Content */}
            <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-start gap-2">
                    {!notification.is_read && (
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                        <span className="font-bold text-brown-500">
                            {notification.user_name || "Unknown User"}
                        </span>
                        <p className="text-brown-400 mt-1">
                            {notification.message}
                        </p>
                        <p className="text-xs text-orange mt-1">
                            {formatTimeNotification(notification.created_at)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-3">
                {notification.reference_type && notification.reference_id && (
                    <button
                        className="text-xs hover:text-orange-600 cursor-pointer transition-colors"
                        onClick={() => onView(notification)}
                    >
                        view
                    </button>
                )}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(notification.id);
                    }}
                    className="p-1.5 rounded transition-colors"
                    aria-label="Delete notification"
                >
                    <X className="w-4 h-4 text-brown-400 hover:text-orange-600" />
                </button>
            </div>
        </div>
    );
}
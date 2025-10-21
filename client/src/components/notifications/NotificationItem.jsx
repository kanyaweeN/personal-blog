import { X } from "lucide-react";
import { formatTimeNotification } from "../../utils/formatDate";

export default function NotificationItem({
    notification,
    onDelete,
    onView
}) {
    return (
        <div
            onClick={() => onView(notification)}
            className={`group relative flex items-start gap-3 p-4 border-b border-brown-100 cursor-pointer transition-all 
                hover:bg-brown-50 ${!notification.is_read ? "bg-brown-100" : "bg-white"}`}
        >
            {/* Avatar */}
            <img
                className="w-9 h-9 rounded-full flex-shrink-0"
                src={notification.user_avatar || "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"}
                alt={notification.user_name || "User"}
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2">
                    {!notification.is_read && (
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                        <p className="font-semibold text-brown-700">
                            {notification.user_name || "Unknown User"}
                        </p>
                        <p className="text-sm text-brown-400 mt-1 line-clamp-2">
                            {notification.message}
                        </p>
                        <p className="text-xs text-orange mt-1">
                            {formatTimeNotification(notification.created_at)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Delete */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(notification.id);
                }}
                className="absolute top-3 right-3 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                aria-label="Delete notification"
            >
                <X className="w-4 h-4 text-brown-400 hover:text-orange-600" />
            </button>
        </div>
    );
}

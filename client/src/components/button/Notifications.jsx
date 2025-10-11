
import { Bell } from "lucide-react";

export function Notifications({ }) {
    const hasNotifications = true; // TODO: Replace with actual notification state

    const handleNotificationClick = () => {
        navigate("/notifications");
        // TODO: Mark notifications as read
    };

    return (
        <button
            onClick={handleNotificationClick}
            className="relative p-2 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Notifications"
        >
            <Bell className="w-5 h-5 text-gray-700" />
            {
                hasNotifications
                && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )
            }
        </button>
    )
}



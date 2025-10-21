import { Bell } from "lucide-react";
import NotificationItem from "./NotificationItem";
import { LoadingPage } from "../loading/LoadingPage";

export function NotificationList({
    loading,
    notifications,
    onView,
    onDelete,
    emptyText = "No notifications",
}) {
    if (loading) return <LoadingPage />;

    if (!notifications || notifications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-brown-400">
                <Bell className="w-12 h-12 mb-2 opacity-30" />
                <p className="text-sm">{emptyText}</p>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto">
            {notifications.map((n) => (
                <NotificationItem
                    key={n.id}
                    notification={n}
                    onView={onView}
                    onDelete={onDelete}
                />
            ))
            }
        </div>
    );
}

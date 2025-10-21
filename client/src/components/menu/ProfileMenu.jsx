import { User, Lock, Bell } from "lucide-react";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";

// Menu items configuration
const menuItems = [
    {
        id: "profile",
        path: "/profile",
        label: "Profile",
        icon: User
    },
    {
        id: "notification",
        path: "/profile/notification",
        label: "Notifications",
        icon: Bell
    },
    {
        id: "reset-password",
        path: "/profile/reset-password",
        label: "Reset password",
        icon: Lock
    }
];

// MenuItem Component
function MenuItem({ item, isActive, onClick }) {
    const Icon = item.icon;

    return (
        <a
            onClick={isActive ? undefined : () => onClick(item.path)}
            className={clsx(
                "flex items-center gap-2",
                isActive
                    ? "text-black cursor-default"
                    : "text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
            )}
        >
            <Icon className="h-5 w-5 mb-1" />
            {item.label}
        </a>
    );
}

// Main Component
export default function ProfileMenu() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="w-60 p-6">
            <nav
                className="space-y-4 text-brown-600">
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.id}
                        item={item}
                        isActive={isActive(item.path)}
                        onClick={() => navigate(item.path)}
                    />
                ))}
            </nav>
        </aside>
    );
}

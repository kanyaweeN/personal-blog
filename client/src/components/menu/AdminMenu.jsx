import {
    Bell,
    FileText,
    FolderOpen,
    Key,
    LogOut,
    User,
    Globe,
} from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Logo } from "../nav/Logo.jsx";
import clsx from "clsx";

const menuItems = [
    {
        path: "/admin/article-manament",
        label: "Article management",
        icon: FileText,
    },
    {
        path: "/admin/category-management",
        label: "Category management",
        icon: FolderOpen,
    },
    {
        path: "/admin/profile",
        label: "Profile",
        icon: User,
    },
    {
        path: "/admin/notification",
        label: "Notification",
        icon: Bell,
    },
    {
        path: "/admin/reset-password",
        label: "Reset password",
        icon: Key,
    },
];

const footerLinks = [
    {
        path: "/",
        label: "hh. website",
        icon: Globe,
    },
];

export default function AdminMenu() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname.startsWith(path);

    const handleLogout = () => {
        // Implement logout logic here
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <aside className="w-64 bg-brown-200 border-r flex flex-col justify-between">
            {/* Header */}
            <div>
                <div className="flex flex-col py-10 px-5">
                    <Logo />
                    <span className="text-orange">Admin panel</span>
                </div>

                {/* Navigation Menu */}
                <nav>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={clsx(
                                    "flex items-center w-full px-4 py-4 transition-colors",
                                    isActive(item.path)
                                        ? "bg-brown-300 text-brown-500"
                                        : "text-brown-400 hover:bg-brown-300 hover:text-brown-600"
                                )}
                            >
                                <Icon className="mr-3 h-5 w-5" />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Footer */}
            <div className="space-y-4 text-gray-600 p-4">
                {footerLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <button
                            key={link.path}
                            onClick={() => navigate(link.path)}
                            className="flex items-center gap-2 w-full hover:text-black transition-colors"
                        >
                            <Icon className="h-5 w-5" />
                            {link.label}
                        </button>
                    );
                })}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full hover:text-black transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    Log out
                </button>
            </div>
        </aside>
    );
}

import {
    Bell,
    FileText,
    FolderOpen,
    Key,
    LogOut,
    User,
    Globe,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Logo } from "../../components/nav/Logo.jsx";
import clsx from "clsx";

function SidebarMenu() {
    const navigate = useNavigate();

    const baseStyle = "flex items-center px-4 py-4"
    const activeColor = {
        active: "bg-brown-300 text-brown-500",
        unactive: "text-brown-400 hover:bg-brown-300 hover:text-brown-600"
    };

    const iconStyle = "mr-3 h-5 w-5"
    const isActive = (basePath) => location.pathname.startsWith(basePath);

    return (
        <aside className="w-64 bg-brown-200 border-r flex flex-col justify-between">
            <div>
                <div className="flex flex-col py-10 px-5">
                    <Logo />
                    <span className="text-orange">
                        Admin panel
                    </span>
                </div>
                <nav>
                    <a
                        onClick={() => navigate("/admin/article-manament")}
                        className={clsx(baseStyle, isActive("/admin/article-manament") ? activeColor.active : activeColor.unactive)}
                    >
                        <FileText className={iconStyle} />
                        Article management
                    </a>
                    <a
                        onClick={() => navigate("/admin/category-management")}
                        className={clsx(baseStyle, isActive("/admin/category-management") ? activeColor.active : activeColor.unactive)}
                    >
                        <FolderOpen className="mr-3 h-5 w-5" />
                        Category management
                    </a>
                    <a
                        onClick={() => navigate("/admin/profile")}
                        className={clsx(baseStyle, isActive("/admin/profile") ? activeColor.active : activeColor.unactive)}
                    >
                        <User className="mr-3 h-5 w-5" />
                        Profile
                    </a>
                    <a
                        onClick={() => navigate("/admin/notification")}
                        className={clsx(baseStyle, isActive("/admin/notification") ? activeColor.active : activeColor.unactive)}
                    >
                        <Bell className="mr-3 h-5 w-5" />
                        Notification
                    </a>
                    <a
                        onClick={() => navigate("/admin/resetpassword")}
                        className={clsx(baseStyle, isActive("/admin/resetpassword") ? activeColor.active : activeColor.unactive)}
                    >
                        <Key className="mr-3 h-5 w-5" />
                        Reset password
                    </a>
                </nav>
            </div>
            <div className="space-y-4 text-gray-600 pl-4">
                <a
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 hover:text-black"
                >
                    <Globe className="mr-3 h-5 w-5" />
                    hh. website
                </a>
                <a
                    href="#"
                    className="flex items-center gap-2 hover:text-black"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Log out
                </a>
            </div>
        </aside>
    );
}

export default SidebarMenu;

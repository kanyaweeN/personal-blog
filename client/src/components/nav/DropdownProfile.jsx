import { useState, useRef, useEffect } from "react";
import { ChevronDown, UserRoundPen, RotateCcw, LogOut, SquareArrowOutUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAuth } from "@/contexts/authentication";
import { Notifications } from "../button/Notifications";
import Userprofile from "./Userprofile";

export default function DropdownProfile({
    src,
    style,
    isMobile = false,
    isMobileMenuOpen = false,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { logout, state, isAdmin } = useAuth();

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);

    const avatarUrl = state?.user?.avatar || src;
    const username = state?.user?.username || "User";

    const menuItems = [
        {
            id: 1,
            icon: <UserRoundPen className="w-5 h-5" />,
            text: "Profile",
            onClick: () => navigate("/profile"),
        },
        {
            id: 2,
            icon: <RotateCcw className="w-5 h-5" />,
            text: "Reset password",
            onClick: () => navigate("/profile/reset-password"),
        },
        {
            id: 3,
            icon: <SquareArrowOutUpRight className="w-5 h-5" />,
            text: "Admin panel",
            onClick: () => navigate("/admin/profile"),
        },
        {
            id: 4,
            icon: <LogOut className="w-5 h-5" />,
            text: "Log out",
            onClick: () => {
                logout();
                navigate("/");
            },
            textColor: "text-red-600",
        },
    ];

    // Close menu when clicking outside
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const handleNotificationClick = () => {
        navigate("/notifications");
        // TODO: Mark notifications as read
    };

    return (
        <div className="relative" ref={menuRef}>
            {/* Desktop Profile Button */}
            {!isMobile && (
                <div className="flex items-center gap-2">
                    <Notifications />
                    <button
                        onClick={toggleMenu}
                        className="flex items-center gap-2 focus:outline-none cursor-pointer"
                    >
                        <Userprofile style={style} />
                        <span
                            className="hidden md:inline text-gray-700 font-medium">
                            {username}
                        </span>
                        <ChevronDown
                            className={clsx(
                                "w-4 h-4 text-gray-600 transition-transform duration-200",
                                isOpen && "rotate-180"
                            )}
                        />
                    </button>
                </div>
            )}

            {/* Dropdown Menu */}
            {(isOpen || isMobileMenuOpen) && (
                <div
                    className={clsx(
                        "absolute bg-white text-gray-700 border border-gray-200 shadow-md rounded-lg z-50",
                        isMobile
                            ? "mt-0 w-full border-t-0 rounded-t-none"
                            : "right-0 mt-2 w-48"
                    )}
                >
                    <div>
                        {isMobile && (
                            <div
                                className="flex items-center justify-between p-3">
                                <div className="flex items-center gap-3">
                                    <Userprofile style={style} />
                                    <span
                                        className="text-gray-700 font-medium">
                                        {username}
                                    </span>
                                </div>

                                {/* Notification Bell */}
                                <Notifications />
                            </div>
                        )}
                    </div>
                    {menuItems.map((item, index) => (
                        (item.id === 3 && isAdmin) ?
                            <MenuButton
                                key={index}
                                icon={item.icon}
                                text={item.text}
                                textColor={item.textColor}
                                onClick={() => {
                                    item.onClick();
                                    closeMenu();
                                }}
                            /> : item.id !== 3 ? <MenuButton
                                key={index}
                                icon={item.icon}
                                text={item.text}
                                textColor={item.textColor}
                                onClick={() => {
                                    item.onClick();
                                    closeMenu();
                                }}
                            />
                                : <></>
                    ))}
                </div>
            )}
        </div>
    );
}

function MenuButton({ text, icon, textColor, onClick }) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors",
                textColor
            )}
        >
            {icon}
            <span>{text}</span>
        </button>
    );
}
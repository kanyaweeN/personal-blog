import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { AppButton } from "../button/AppButton.jsx";
import { MobileMenu } from "./MobileMenu.jsx";
import { Logo } from "./Logo.jsx";
import { useAuth } from "@/contexts/authentication";
import Userprofile from "./Userprofile.jsx";
import { Notifications } from "../button/Notifications.jsx";
import DropdownProfile from "./DropdownProfile.jsx";

export function NavBar() {
    const navigate = useNavigate();
    const { isAuthenticated, state, logout } = useAuth();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

    return (
        <div className="w-full relative">
            {/* Main Navigation */}
            <nav className="bg-brown-100 h-16 flex justify-between items-center px-6 border-b border-gray-200">
                {/* Logo */}
                <Logo />

                {/* Desktop Buttons */}
                <div className="hidden md:flex gap-3 items-center">
                    {!isAuthenticated ?
                        (
                            <>
                                <AppButton
                                    onClick={() => navigate("/login")}
                                >
                                    Log in
                                </AppButton>
                                <AppButton
                                    style="dark"
                                    onClick={() => navigate("/signup")}
                                >
                                    Sign up
                                </AppButton>
                            </>
                        )
                        : (
                            <>
                                <DropdownProfile
                                    isMobileMenuOpen={false}
                                    slyte="w-10 h-10"
                                />
                            </>
                        )}
                </div>

                {/* Hamburger */}
                <button
                    onClick={toggleMobileMenu}
                    className="relative z-50 md:hidden p-2"
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? (
                        <X size={24} className="text-gray-700" />
                    ) : (
                        <Menu size={24} className="text-gray-700" />
                    )}
                </button>
            </nav>

            {/* Mobile Menu */}
            <>
                <DropdownProfile
                    isMobile={true}
                    isMobileMenuOpen={isMobileMenuOpen}
                    slyte="w-10 h-10"
                />
            </>
        </div>
    );
}

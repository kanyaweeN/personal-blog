import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "../common/Logo";
import { NavButton } from "../common/NavButton";
import { MobileMenu } from "../common/MobileMenu";

export function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

    return (
        <div className="w-full relative">
            {/* Main Navigation */}
            <nav className="bg-gray-50 h-16 flex justify-between items-center px-6 border-b border-gray-200">
                {/* Logo */}
                <Logo />

                {/* Desktop Buttons */}
                <div className="hidden md:flex gap-3 items-center">
                    <NavButton>Log in</NavButton>
                    <NavButton primary>Sign up</NavButton>
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
            <MobileMenu isOpen={isMobileMenuOpen} />
        </div>
    );
}

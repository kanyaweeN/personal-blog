import { useState } from 'react';

export function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="w-full relative">
            {/* Main Navigation */}
            <nav className="bg-gray-50 h-16 flex justify-between items-center px-6 border-b border-gray-200">
                {/* Logo */}
                <div className="flex items-center">
                    <span className="text-2xl font-semibold text-gray-800">hh.</span>
                    <span className="w-2 h-2 bg-green-500 rounded-full ml-1"></span>
                </div>

                {/* Desktop Navigation Buttons */}
                <div className="hidden md:flex gap-3 items-center">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors">
                        Log in
                    </button>
                    <button className="px-4 py-2 bg-gray-700 border border-gray-700 rounded-md text-white text-sm font-medium hover:bg-gray-600 hover:border-gray-600 transition-colors">
                        Sign up
                    </button>
                </div>

                {/* Mobile Hamburger Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
                    aria-label="Toggle mobile menu"
                >
                    <div
                        className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                            }`}
                    ></div>
                    <div
                        className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''
                            }`}
                    ></div>
                    <div
                        className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                            }`}
                    ></div>
                </button>
            </nav>

            {/* Mobile Menu Dropdown */}
            <div
                className={`md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 transition-all duration-300 ${isMobileMenuOpen
                    ? 'opacity-100 max-h-40 visible'
                    : 'opacity-0 max-h-0 invisible overflow-hidden'
                    }`}
            >
                <div className="p-4 space-y-3">
                    <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors">
                        Log in
                    </button>
                    <button className="w-full px-4 py-2 bg-gray-700 border border-gray-700 rounded-md text-white text-sm font-medium hover:bg-gray-600 hover:border-gray-600 transition-colors">
                        Sign up
                    </button>
                </div>
            </div>

            {/* Scrollbar indicator */}
            <div className="absolute right-2 top-0 w-px h-full bg-gray-200"></div>
            <div className="absolute right-1.5 top-12 w-1.5 h-1.5 bg-gray-600 rounded-full"></div>

            {/* Mobile menu backdrop overlay (optional) */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-40"
                    onClick={toggleMobileMenu}
                ></div>
            )}
        </div>
    );
}

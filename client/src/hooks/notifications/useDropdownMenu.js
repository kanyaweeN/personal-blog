import { useState, useRef, useEffect } from "react";

export function useDropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setIsOpen(prev => !prev);
    const closeMenu = () => setIsOpen(false);

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

    return {
        isOpen,
        menuRef,
        toggleMenu,
        closeMenu
    };
}
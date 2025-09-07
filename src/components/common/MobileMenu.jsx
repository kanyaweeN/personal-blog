import { NavButton } from "./NavButton";

export function MobileMenu({ isOpen }) {
    return (
        <div
            className={`md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 transition-all duration-300 ${isOpen
                ? "opacity-100 max-h-40 visible"
                : "opacity-0 max-h-0 invisible overflow-hidden"
                }`}
        >
            <div className="p-4 flex flex-col gap-5">
                <NavButton>Log in</NavButton>
                <NavButton primary>Sign up</NavButton>
            </div>
        </div>
    );
}

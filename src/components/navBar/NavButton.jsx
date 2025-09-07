export function NavButton({ children, primary }) {
    const baseClasses =
        "px-7 py-2 rounded-3xl text-sm font-medium transition-colors cursor-pointer";

    const style = primary
        ? "bg-gray-700 text-white border border-gray-700 hover:bg-gray-600"
        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400";

    return (
        <button
            className={`${baseClasses} ${style}`}>
            {children}
        </button>
    )
}

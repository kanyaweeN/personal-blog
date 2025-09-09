
import clsx from "clsx";

export function AppButton({ type, children, style = "white", size = "md", disabled = false, onClick }) {

    const baseStyles =
        "rounded-full transition-colors ";

    const styles = {
        solid: "bg-black text-white hover:bg-gray-800 disabled:bg-gray-400",
        icon:
            `flex gap-3 bg-white text-gray-700 border border-gray-400 
            hover:bg-gray-100 
            disabled:border-gray-300 disabled:text-gray-400`,
        ghost: "text-black hover:underline disabled:text-gray-400",
        dark: "bg-brown-600 text-white border border-gray-700 hover:bg-gray-600",
        white: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400",
    };

    const sizes = {
        lg: "px-10 py-3 text-md",
        md: "px-7 py-2 text-sm",
        sm: "px-2 py-1 text-sm"
    };

    return (
        <button
            type={type}
            disabled={disabled}
            className={clsx(baseStyles,
                styles[style],
                sizes[size])}
            onClick={onClick}
        >
            {children}
        </button>
    )
}



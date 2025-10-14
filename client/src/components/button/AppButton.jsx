
import clsx from "clsx";

export function AppButton({
    type,
    children,
    style = "white",
    size = "md",
    disabled = false,
    onClick
}) {

    const baseStyles =
        "rounded-full transition-colors ";

    const styles = {
        transition: "ext-white hover:bg-brown-800 disabled:bg-brown-400",
        icon:
            `flex gap-3 bg-white text-brown-700 border border-brown-400 
            hover:bg-brown-100 
            disabled:border-brown-300 disabled:text-brown-400`,
        icondark:
            `flex gap-3 bg-brown-600 text-white border order-brown-700
            hover:bg-brown-600 
            disabled:border-brown-300 disabled:text-brown-400`,
        underline: "text-black underline hover:text-brown-400 disabled:text-brown-400",
        dark: "bg-brown-600 text-white border border-brown-700 hover:bg-brown-600 disabled:bg-brown-200",
        white: "bg-white text-brown-700 border border-brown-300 hover:bg-brown-50 hover:border-brown-400",
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



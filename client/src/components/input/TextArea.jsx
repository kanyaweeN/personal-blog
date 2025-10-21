import clsx from "clsx";

function TextArea({
    error,
    showErrorText = false,
    ...props
}) {
    const baseColor = `w-full px-4 py-2 rounded-lg border border-brown-300 focus:outline-none`;

    const errorColor = `${error
        ? "border border-red text-brown-500"
        : "border border-gray-300 text-brown-500"}`;

    const disabledColor = {
        true: "bg-brown-200 border-brown-200 text-brown-400",
        false: "bg-white focus:outline-none focus:ring focus:ring-brown-300"
    };

    return (
        <div>
            <textarea
                {...props}
                className={clsx(
                    baseColor,
                    errorColor,
                    disabledColor[{ ...props.disabled }],
                )}
            />
            {showErrorText && error && (
                <p className="flex items-center text-red-500 text-xs pt-2">
                    {error}
                </p>
            )}
        </div>
    );
}

export default TextArea;
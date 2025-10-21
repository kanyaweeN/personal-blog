import clsx from "clsx";

function InputField(
    {
        id,
        type = "text",
        text,
        name,
        value,
        placeholder,
        onChange,
        error,
        showErrorText = false,
        disabled = false,
        ...props
    }
) {
    const baseColor = `w-full px-4 py-2 border border-gray-300 rounded-md`;

    const errorColor = `${error
        ? "border border-red text-red-500"
        : "border border-gray-300 text-brown-500"}`;

    const disabledColor = {
        true: "bg-brown-200 border-brown-200 text-brown-400",
        false: "bg-white focus:outline-none focus:ring focus:ring-brown-300"
    };

    return (
        <div>
            {text && (
                <label htmlFor={id} className="text-sm">
                    {text}
                </label>
            )}
            <input
                {...props}
                id={id}
                type={type}
                name={name}
                value={value ?? ""}
                placeholder={placeholder}
                onChange={!disabled ? onChange : undefined}
                disabled={disabled}
                className={clsx(
                    baseColor,
                    errorColor,
                    disabledColor[disabled],
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

export default InputField;
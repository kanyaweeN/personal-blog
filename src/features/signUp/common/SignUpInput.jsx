

function SignUpInput({ type, text, name, value, placeholder, onChange, error }) {

    return (
        <div>
            <label className="text-sm">
                {text}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={`w-full px-4 py-2 bg-white  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brown-300 ${error ? "border border-red text-red-500" : "border border-gray-300 text-brown-500"}`}
            />
            {error && <p className="flex items-center text-red-500 text-xs pt-2">{error}</p>}
        </div>
    );
}

export default SignUpInput
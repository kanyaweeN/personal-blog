function TextArea({ ...props }) {
    return (
        <textarea
            {...props}
            className="w-full px-4 py-2 rounded-lg border border-brown-300 focus:outline-none focus:ring-2 
            focus:ring-brown-300 
            focus:border-transparent"
        />
    );
}

export default TextArea;
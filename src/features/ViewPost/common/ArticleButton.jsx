function ArticleButton(poprs) {
    const { icon, text } = poprs;

    return (
        <>
            <div >
                <span className="flex bg-white py-3 px-10 gap-3 border border-gray-400 rounded-full">
                    {icon}
                    {text}
                </span>
            </div>
        </>
    );
}
export default ArticleButton;
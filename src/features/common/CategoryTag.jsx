function CategoryTag(poprs) {
    const { category } = poprs;

    return (
        <>
            <div >
                <span className="bg-green-100 rounded-full px-3 py-1 text-sm font-semibold text-green-500 mb-2">{category}
                </span>
            </div>
        </>
    );
}
export default CategoryTag;
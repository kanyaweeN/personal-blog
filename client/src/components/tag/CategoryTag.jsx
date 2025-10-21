export default function CategoryTag(poprs) {
    const { category } = poprs;

    return (
        <>
            {category && (
                <div >
                    <span className="bg-green-light rounded-full px-3 py-1 text-sm font-semibold text-green mb-2">
                        {category}
                    </span>
                </div>
            )}
        </>
    );
}
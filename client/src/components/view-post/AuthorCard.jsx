function AuthorCard(props) {
    const { name, image, description } = props;

    return (
        <>
            <div className="flex flex-col bg-brown-200 p-5 rounded-xl h-fit">
                <div className="flex flex-row">
                    <img className="w-9 h-9 rounded-full mr-2" src={image || "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"} alt="Tomson P." />
                    <div className="flex flex-col">
                        <p className="text-xs">Author</p>
                        <p className="font-bold text-brown-500">{name}</p>
                    </div>
                </div >
                <hr className="mt-3 mb-3"></hr>
                <p>
                    {description}
                </p>
            </div >
        </>
    )
}

export default AuthorCard;
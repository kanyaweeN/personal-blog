function AuthorCard(props) {
    const { name, image, description } = props;

    return (
        <>
            <div className="flex flex-col bg-brown-200 p-5 rounded-xl   h-fit">
                <div className="flex flex-row">
                    <img className="w-9 h-9 rounded-full mr-2" src={image || "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"} alt="Tomson P." />
                    <div className="flex flex-col">
                        <p className="text-xs">Author</p>
                        <p className="font-bold text-brown-500">{name}</p>
                    </div>
                </div >
                <hr className="mt-3 mb-3"></hr>
                <p>
                    I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.

                    When i’m not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes.
                </p>
            </div >
        </>
    )
}

export default AuthorCard;
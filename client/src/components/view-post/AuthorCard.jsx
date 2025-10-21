import AuthorAvatar from "../avatar/AuthorAvatar";

function AuthorCard(props) {
    const { name, image, description } = props;

    return (
        <>
            <div className="flex flex-col bg-brown-200 p-5 rounded-xl h-fit">
                <div className="flex flex-row">
                    <AuthorAvatar authorImg={image} author={name} size="lg" />
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
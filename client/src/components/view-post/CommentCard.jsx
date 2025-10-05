

function CommentCard(props) {
    const { image, date } = props;
    return (
        <>
            <div className="flex flex-col gap-4 py-7 not-last:border-b">
                <div className="flex flex-row ">
                    <img className="w-9 h-9 rounded-full mr-2" src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg" alt="Tomson P." />
                    <div className="flex flex-col">
                        <p className="font-bold text-brown-500">Jacob Lash</p>
                        <p className="text-xs">12 September 2024 at 18:30</p>
                    </div>
                </div>
                <p>
                    I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.
                </p>
            </div>
        </>
    )
}

export default CommentCard;



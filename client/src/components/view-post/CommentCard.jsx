import { formatDate, formatTime } from "../../utils/formatDate";


function CommentCard(props) {
    const { image, date, text } = props;
    return (
        <>
            <div className="flex flex-col gap-4 py-7 not-last:border-b">
                <div className="flex flex-row ">
                    <img className="w-9 h-9 rounded-full mr-2" src={image || "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"} alt="Tomson P." />
                    <div className="flex flex-col">
                        <p className="font-bold text-brown-500">Jacob Lash</p>
                        <p className="text-xs">{`${formatDate(date)} at ${formatTime(date)}`}</p>
                    </div>
                </div>
                <p>
                    {text}
                </p>
            </div>
        </>
    )
}

export default CommentCard;



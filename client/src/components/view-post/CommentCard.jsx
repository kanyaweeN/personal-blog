import { formatDate, formatTime } from "../../utils/formatDate";
import AuthorAvatar from "../avatar/AuthorAvatar";


function CommentCard(props) {
    const { name, image, date, text } = props;
    return (
        <>
            <div className="flex flex-col gap-4 py-7 not-last:border-b">
                <div className="flex flex-row ">
                    <AuthorAvatar authorImg={image} author={name} size="lg" />
                    <div className="flex flex-col">
                        <p className="font-bold text-brown-500">{name}</p>
                        <p className="text-xs">
                            {`${formatDate(date)} at ${formatTime(date)}`}
                        </p>
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



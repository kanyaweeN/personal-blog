import { useNavigate } from "react-router-dom";
import CategoryTag from "../../components/tag/CategoryTag";

export default function BlogCard(props) {
    const { id, image, category, title, description, author, authorImg, date } = props;
    const navigate = useNavigate();
    // ✅ เพิ่มชุดสีพื้นหลังสำหรับ avatar
    const bgColors = [
        "bg-blue-500",
        "bg-green-500",
        "bg-pink-500",
        "bg-yellow-500",
        "bg-purple-500",
        "bg-orange-500",
    ];

    const colorIndex = author ? author.charCodeAt(0) % bgColors.length : 0;
    const avatarColor = bgColors[colorIndex];

    return (
        <div className="flex flex-col gap-4">
            <div
                className="relative h-[212px] sm:h-[360px] cursor-pointer"
                onClick={() => navigate(`/view-post/${id}`)}
            >
                {
                    image
                        ? <img className="w-full h-full object-cover rounded-xl " src={image} alt={title} />
                        : <div className="w-full h-full rounded-xl bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                            No Image
                        </div>

                }
            </div>

            <div>
                <CategoryTag category={category} />
                <div
                    onClick={() => navigate(`/view-post/${id}`)}
                    className="cursor-pointer"
                >
                    <h2 className="text-start font-bold text-xl mb-2 pt-3 line-clamp-2 hover:underline">
                        {title}
                    </h2>
                </div>
                <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
                    {description}</p>
                <div className="flex items-center text-sm">
                    {
                        (authorImg)
                            ? <img className="w-8 h-8 rounded-full mr-2" src={authorImg} alt={author} />
                            : <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 text-white ${avatarColor}`}>
                                {author ? author.charAt(0).toUpperCase() : "?"}
                            </div>
                    }

                    <span
                        className="text-brown-500 border-r pr-3">
                        {author}
                    </span>
                    <span className="text-brown-400 px-3">
                        {date}
                    </span>
                </div>
            </div>
        </div>
    );
}
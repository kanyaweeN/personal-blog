import { useNavigate } from "react-router-dom";
import CategoryTag from "../../components/tag/CategoryTag";

function BlogCard(props) {
    const { id, image, category, title, description, author, date } = props;
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-4">
            <div
                className="relative h-[212px] sm:h-[360px] cursor-pointer"
                onClick={() => navigate(`/view-post/${id}`)}
            >
                <img className="w-full h-full object-cover rounded-xl " src={image} alt={title} />
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
                    <img className="w-8 h-8 rounded-full mr-2" src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg" alt="Tomson P." />
                    <span
                        className="text-brown-500">
                        {author}
                    </span>
                    <span className="text-brown-400">
                        {date}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default BlogCard;
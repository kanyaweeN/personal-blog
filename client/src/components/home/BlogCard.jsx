import { useNavigate } from "react-router-dom";
import CategoryTag from "../../components/tag/CategoryTag";
import AuthorAvatar from "../avatar/AuthorAvatar.jsx";
import { useState } from "react";

const BlogImage = ({ image, title }) => {
    const [imageError, setImageError] = useState(false);

    if (image && !imageError) {
        return (
            <img
                className="w-full h-full object-cover rounded-xl"
                src={image}
                alt={title}
                onError={() => setImageError(true)}
            />
        );
    }

    return (
        <div className="w-full h-full rounded-xl bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
            No Image
        </div>
    );
};

export default function BlogCard({ id, image, category, title, description, author, authorImg, date }) {
    const navigate = useNavigate();

    const handleNavigate = () => navigate(`/view-post/${id}`);

    return (
        <div className="flex flex-col gap-4">
            <div
                className="relative h-[212px] sm:h-[360px] cursor-pointer"
                onClick={handleNavigate}
            >
                <BlogImage image={image} title={title} />
            </div>

            <div>
                <CategoryTag category={category} />

                <div onClick={handleNavigate} className="cursor-pointer">
                    <h2 className="text-start font-bold text-xl mb-2 pt-3 line-clamp-2 hover:underline">
                        {title}
                    </h2>
                </div>

                <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
                    {description}
                </p>

                <div className="flex items-center text-sm">
                    <AuthorAvatar authorImg={authorImg} author={author} />

                    <span className="text-brown-500 border-r pr-3">
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
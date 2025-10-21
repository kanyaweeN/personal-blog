const AVATAR_COLORS = [
    "bg-blue-500",
    "bg-green-500",
    "bg-pink-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-orange-500",
];

const getAvatarColor = (name) => {
    if (!name) return AVATAR_COLORS[0];
    const colorIndex = name.charCodeAt(0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[colorIndex];
};

export default function AuthorAvatar({
    authorImg,
    author,
    size = "md"
}) {
    const sizeClasses = {
        xs: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-9 h-9",
        xl: "w-12 h-12",
    };

    const sizeClass = sizeClasses[size] || sizeClasses.md;

    if (authorImg) {
        return (
            <img
                className={`${sizeClass} rounded-full mr-2`}
                src={authorImg}
                alt={author}
            />
        );
    }

    const avatarColor = getAvatarColor(author);
    const initial = author ? author.charAt(0).toUpperCase() : "?";

    return (
        <div className={`flex items-center justify-center ${sizeClass} rounded-full mr-2 text-white ${avatarColor}`}>
            {initial}
        </div>
    );
}
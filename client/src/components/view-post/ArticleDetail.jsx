import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown'
import CategoryTag from "../tag/CategoryTag.jsx";
import { formatDate } from "../../utils/formatDate.js";
import { PostService } from "../../services/postService.js";
import ArticleActions from "./ArticleActions.jsx";
import CommentSection from "./CommentSection.jsx";
import AuthorCard from "./AuthorCard.jsx";
import AlertAuth from "../alert/AlertAuth.jsx";
import { LoadingPage } from "../loading/LoadingPage.jsx";

function ArticleDetail(props) {
    const { postId } = props;

    const [blogPosts, setBlogPosts] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [iserror, setError] = useState("");
    const [isOpenAlert, setisOpenAlert] = useState(false);

    const fetchPosts = async () => {
        setLoading(true);

        let result = {};
        try {
            result = await PostService.getPostById(postId);

            setBlogPosts(result);
        } catch (err) {
            setError("โหลดข้อมูลไม่สำเร็จ");
        } finally {
            setLoading(false);
        }
        return result;
    };

    const handleLike = async () => {
        setBlogPosts((prev) => ({
            ...prev,
            likes: (prev.likes || 0) + 1,
        }));

        try {
            await PostService.likePost(postId);
        } catch (error) {
            console.error("Failed to like post:", error);

            setBlogPosts((prev) => ({
                ...prev,
                likes: (prev.likes || 1) - 1,
            }));
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [])

    return (
        <div className="md:px-0 px-5">
            {isLoading
                ? <div className="w-full h-svh flex justify-center items-center">
                    <LoadingPage sizes="xl" />
                </div>
                : <>
                    <div className="flex flex-col gap-4 py-5">
                        {/* img */}
                        {
                            blogPosts.image &&
                            <img className="w-full h-full object-cover rounded-xl py-10" src={blogPosts.image} alt={blogPosts.title} />
                        }
                    </div>
                    <div className="md:flex md:flex-row relative gap-5 max-w-full min-w-0">
                        <div className="flex-1">
                            <div >
                                <div className="flex gap-4">
                                    <CategoryTag category={blogPosts.category_name} />
                                    <span className="text-brown-400">
                                        {formatDate(blogPosts.date)}
                                    </span>
                                </div>
                                <div className="text-brown-500 ">
                                    <h1
                                        className="text-start font-bold text-5xl py-5 ">
                                        {blogPosts.title}
                                    </h1>
                                    <div >
                                        <div className="markdown">
                                            <ReactMarkdown>{blogPosts.description}
                                            </ReactMarkdown>
                                        </div>
                                        <div className="markdown ">
                                            <ReactMarkdown>{blogPosts.content}
                                            </ReactMarkdown>

                                        </div>
                                    </div>
                                </div>

                                <div className="md:hidden py-7 w-auto">
                                    <AuthorCard
                                        name={blogPosts.author}
                                        image={blogPosts.author_img}
                                        description={blogPosts.bio}
                                    />
                                </div>

                                <div className="py-5">
                                    <ArticleActions
                                        likes={blogPosts.likes}
                                        onClick=
                                        {handleLike} />
                                </div>
                                <div className="py-5">
                                    <CommentSection postId={postId} />
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block w-80 shrink-0">
                            <div className="sticky top-0 right-0 min-m-50 h-fit overflow-hidden">
                                <AuthorCard
                                    name={blogPosts.author}
                                    image={blogPosts.author_img}
                                    description={blogPosts.bio}
                                />
                            </div>
                        </div>
                    </div>
                </>
            }
            <AlertAuth open={isOpenAlert} onOpenChange={setisOpenAlert} />
        </div>
    );
}

export default ArticleDetail;
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown'
import CategoryTag from "../../common/CategoryTag.jsx";
import { formatDate } from "../../../utils/formatDate.js";
import PostService from "../../../services/blogService.js";
import ArticleActions from "./ArticleActions.jsx";
import CommentSection from "./CommentSection.jsx";
import AuthorCard from "./AuthorCard.jsx";
import AlertAuth from "../../common/AlertAuth.jsx";

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
            console.log("ViewPostPage.fetchPosts : ", result);

            setBlogPosts(result);
        } catch (err) {
            setError("โหลดข้อมูลไม่สำเร็จ");
        } finally {
            setLoading(false);
        }
        return result;
    };

    const handleLike = () => {
        setisOpenAlert(true);

        // setBlogPosts((prev) => ({
        //     ...prev,
        //     likes: (prev.likes || 0) + 1,
        // }));

        // ถ้าอยากส่งไป backend ด้วย
        // PostService.likePost(postId);
    };
    useEffect(() => {
        fetchPosts();
    }, [])

    return (
        <div className="md:px-0 px-5">
            <div className="flex flex-col gap-4">
                {/* img */}
                <img className="w-full h-full object-cover rounded-xl py-15" src={blogPosts.image} alt={blogPosts.title} />
            </div>
            <div className="md:flex md:flex-row relative gap-5">
                <div>

                    <div >
                        <div className="flex gap-4">
                            <CategoryTag category={blogPosts.category} />
                            <span className="text-brown-400">
                                {formatDate(blogPosts.date)}
                            </span>
                        </div>
                        <div className="text-brown-500">
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

                        <div className="md:hidden py-7">
                            <AuthorCard />
                        </div>

                        <div >
                            <ArticleActions
                                likes={blogPosts.likes}
                                onClick=
                                {handleLike} />
                        </div>
                        <div className="py-10">
                            <CommentSection postId={postId} />
                        </div>
                    </div>
                </div>
                <div className="hidden md:block md:basis-2/5">
                    <div className="sticky top-0 right-0 min-m-50 h-fit">
                        <AuthorCard />
                    </div>
                </div>
            </div>

            <AlertAuth open={isOpenAlert} onOpenChange={setisOpenAlert} />
        </div>
    );
}

export default ArticleDetail;
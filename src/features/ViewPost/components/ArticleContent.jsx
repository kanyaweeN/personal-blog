import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown'
import CategoryTag from "../../common/CategoryTag.jsx";
import { formatDate } from "../../../utils/formatDate.js";
import PostService from "../../../services/blogService.js";
import ArticleActions from "./ArticleActions.jsx";
import CommentSection from "./CommentSection.jsx";

function ArticleContent(props) {
    const { postId } = props;

    const [blogPosts, setBlogPosts] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [iserror, setError] = useState("");

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

    useEffect(() => {
        fetchPosts();
    }, [])

    return (
        <>
            <div>
                <div className="flex flex-col gap-4">
                    {/* img */}
                    <img className="w-full h-full object-cover rounded-xl py-15" src={blogPosts.image} alt={blogPosts.title} />
                </div>
                <div >
                    <div className="flex gap-4 ">
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
                    <div >
                        <ArticleActions likes={blogPosts.likes} />
                    </div>
                    <div className="py-10">
                        <CommentSection />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ArticleContent;
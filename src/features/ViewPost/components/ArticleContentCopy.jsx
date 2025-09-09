import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown'
import PostService from "../../../services/blogService.jsx";
import CategoryTag from "../../../components/common/CategoryTag.jsx";
import { formatDate } from "../../../utils/formatDate.jsx";

function ArticleContent2(props) {
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
            <div className="flex flex-col gap-4"
            >
                {/* img */}
                <img className="w-full h-full object-cover rounded-xl" src={blogPosts.image} alt={blogPosts.title} />
            </div>
            <div >
                <div className="flex  gap-4 pt-10 ">
                    <CategoryTag category={blogPosts.category} />
                    <span>{formatDate(blogPosts.date)}</span>
                </div>
                <div>
                    <h1 className="text-start font-bold text-5xl mb-2 line-clamp-2 pt-5 pb-5">
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
                <div>
                </div>
            </div>
        </>
    );
}

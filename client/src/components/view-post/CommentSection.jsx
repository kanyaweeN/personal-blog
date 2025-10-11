import { useEffect, useState } from "react";
import { AppButton } from "../button/AppButton.jsx";
import CommentCard from "./CommentCard.jsx";
import AlertAuth from "../alert/AlertAuth.jsx";
import TextArea from "../input/TextArea.jsx";
import { useAuth } from "../../contexts/authentication.jsx";
import { CommentService } from "../../services/commentService.js";
import { LoadingDot } from "../loading/LoadingDot.jsx";

function CommentSection(props) {
    const { postId } = props;
    const { state, isAuthenticated } = useAuth();
    const [isLoading, setLoading] = useState(false);
    const [isRefresh, setRefresh] = useState(false);
    const [isOpenAlert, setisOpenAlert] = useState(false);
    const [commentText, setCommentText] = useState(false);
    const [commentData, setCommentData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [isRefresh])

    const fetchData = async () => {
        setLoading(true);

        let result = {};
        try {
            result = await CommentService.getByPostId(postId);
            console.log("CommentSection", result);

            setCommentData(result);
        } catch (err) {
            setError("โหลดข้อมูลไม่สำเร็จ");
        } finally {
            setLoading(false);
        }
        return result;
    };

    const createComment = async () => {
        setLoading(true);

        let result = {};
        try {
            await CommentService.create({
                post_id: postId,
                comment_text: commentText,
                user_id: state.user.id
            });

            setCommentText("")
            setRefresh(!isRefresh)
        } catch (err) {
            setError("โหลดข้อมูลไม่สำเร็จ");
        } finally {
            setLoading(false);
        }
        return result;
    };

    const heandleSend = async (e) => {
        e.preventDefault();

        if (isAuthenticated) {
            if (!commentText)
                return
            else {
                await createComment();
            }
        } else {
            setisOpenAlert(true);
        }
    }

    const heandleComment = async (e) => {
        setCommentText(e.target.value)
    }

    return (
        <>
            <div className="grid w-full gap-2">
                <label className="text-brown-400 text-sm">
                    Comment
                </label>
                <form
                    className="bg-white flex flex-col items-end gap-2"
                    onSubmit={heandleSend}
                >
                    <TextArea
                        value={commentText}
                        rows={3}
                        placeholder="What are your thoughts?"
                        onChange={heandleComment}
                    />
                    <AppButton
                        type="submit"
                        style="dark"
                        disabled={isLoading}
                    >
                        Send
                    </AppButton>
                </form>
            </div >
            {
                isLoading
                    ? <LoadingDot />
                    : commentData.map((item, index) => (
                        <div key={index}>
                            <CommentCard
                                image={item.author_img}
                                date={item.created_at}
                                text={item.comment_text}
                            />
                        </div>
                    ))
            }

            <AlertAuth open={isOpenAlert} onOpenChange={setisOpenAlert} />
        </>
    )
}

export default CommentSection;



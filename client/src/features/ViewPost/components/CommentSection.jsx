import { useState } from "react";
import { AppButton } from "../../common/AppButton";
import CommentCard from "./CommentCard";
import AlertAuth from "../../common/AlertAuth.jsx";
import TextArea from "../../common/TextArea.jsx";

function CommentSection(props) {
    const { postId } = props;

    const [isOpenAlert, setisOpenAlert] = useState(false);

    return (
        <>
            <div className="grid w-full gap-2">
                <label className="text-brown-400 text-sm">
                    Comment
                </label>
                <form
                    className="bg-white flex flex-col items-end gap-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setisOpenAlert(true);
                    }}
                >
                    <TextArea
                        rows={3}
                        placeholder="What are your thoughts?"
                    />
                    <AppButton
                        type="submit"
                        style="dark"
                    >Send</AppButton>
                </form>
            </div >
            <CommentCard />

            <AlertAuth open={isOpenAlert} onOpenChange={setisOpenAlert} />
        </>
    )
}

export default CommentSection;



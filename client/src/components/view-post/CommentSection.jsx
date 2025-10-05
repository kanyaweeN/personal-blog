import { useState } from "react";
import { AppButton } from "../button/AppButton.jsx";
import CommentCard from "./CommentCard.jsx";
import AlertAuth from "../alert/AlertAuth.jsx";
import TextArea from "../input/TextArea.jsx";

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



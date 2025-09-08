// import { Label } from "@/components/ui/label"
import { AppButton } from "../../common/AppButton";
import CommentCard from "./CommentCard";

function CommentSection(props) {
    return (
        <>
            <div className="grid w-full gap-2">
                <label className="text-brown-400 text-sm">
                    Comment
                </label>
                <form className="bg-white flex flex-col items-end gap-2">
                    <textarea
                        className="w-full h-32 px-4 py-2 rounded-lg border border-brown-300 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent"
                        placeholder="What are your thoughts?"
                    />
                    <AppButton type="submit" primary>Send</AppButton>
                </form>
            </div >

            <CommentCard />
        </>
    )
}

export default CommentSection;



import { Smile, Copy } from 'lucide-react';
import facebook from '../../../assets/icons/facebook.png'
import linkin from '../../../assets/icons/linkin.png'
import twitter from '../../../assets/icons/twitter.png'
import { AppButton } from '../../common/AppButton.jsx';
import { useAppToast } from '../../../hooks/useAppToast.jsx';

function ArticleActions(props) {
    const { success, error } = useAppToast();
    const { likes, onClick } = props;

    const hanleClipboard = (text) => {
        try {
            navigator.clipboard.writeText(text);
            success("Copied!", "This article has been copied to your clipboard.");
        } catch {
            error("Failed!", "Could not copy to clipboard.");
        }
    }
    return (
        <>
            <div className="flex items-center justify-between bg-brown-200 p-5  rounded-xl">
                <AppButton
                    style="icon"
                    size="lg"
                    onClick={onClick}>
                    <Smile size={20} />
                    {likes}
                </AppButton>

                <div className="flex items-center gap-3">
                    <AppButton
                        style="icon"
                        size="lg"
                        onClick={hanleClipboard}>
                        <Copy size={20} />
                        Copy link
                    </AppButton>
                    <a
                        className="h-[50px]"
                        href='https://www.facebook.com/share.php?u=<ลิงก์ที่ต้องการแชร์>'
                        target="_blank"
                    >
                        <img
                            src={facebook}
                            alt="Pacebook"

                        />
                    </a>

                    <a
                        className="h-[50px]"
                        href='https://www.linkedin.com/sharing/share-offsite/?url=<ลิงก์ที่ต้องการแชร์>'
                        target="_blank"
                    >
                        <img
                            src={linkin}
                            alt="Linkin"
                            className="h-[50px]"
                        />
                    </a>

                    <a
                        className="h-[50px]"
                        href='https://www.twitter.com/share?&url=<ลิงก์ที่ต้องการแชร์>'
                        target="_blank"
                    >
                        <img
                            src={twitter}
                            alt="Twitter"
                            className="h-[50px]"
                        />
                    </a>
                </div >
            </div>
        </>
    )
}

export default ArticleActions;
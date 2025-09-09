import { Smile, Copy } from 'lucide-react';
import facebook from '../../../assets/icons/facebook.png'
import linkin from '../../../assets/icons/linkin.png'
import twitter from '../../../assets/icons/twitter.png'
import { AppButton } from '../../common/AppButton.jsx';
import { toast } from "sonner"

function ArticleActions(props) {
    const { likes, onClick } = props;

    const hanleClipboard = (text) => {
        try {
            navigator.clipboard.writeText(text);

            toast("Copied!", {
                description: "This article has been copied to your clipboard.",
                style: {
                    background: '#12B279', // สีเขียว
                    color: 'white',
                    border: 'none'
                },
                cancel: {
                    label: "X",
                },
                cancelButtonStyle: {
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    fontSize: '18px',
                    cursor: 'pointer'
                }
            })

            // alert('Copy link to clipboard!');
        } catch {
            alert('Failed to copy!');
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
import { Smile, Copy } from 'lucide-react';
import facebook from '../../../assets/icons/facebook.png'
import linkin from '../../../assets/icons/linkin.png'
import twitter from '../../../assets/icons/twitter.png'
import { AppButton } from '../../common/AppButton.jsx';

function ArticleActions(props) {
    const { likes, onClick } = props;

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
                        onClick={onClick}>
                        <Copy size={20} />
                        Copy link
                    </AppButton>

                    <img
                        src={facebook}
                        alt="Pacebook"
                        className="h-[50px]"
                    />
                    <img
                        src={linkin}
                        alt="Linkin"
                        className="h-[50px]"
                    />
                    <img
                        src={twitter}
                        alt="Twitter"
                        className="h-[50px]"
                    /></div>
            </div >
        </>
    )
}

export default ArticleActions;
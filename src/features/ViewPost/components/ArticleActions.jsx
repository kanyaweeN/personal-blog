import { Smile, Copy } from 'lucide-react';
import ArticleButton from '../common/ArticleButton.jsx';
import facebook from '../../../assets/icons/facebook.png'
import linkin from '../../../assets/icons/linkin.png'
import twitter from '../../../assets/icons/twitter.png'

function ArticleActions(props) {
    const { likes } = props;

    return (
        <>
            <div className="flex items-center justify-between bg-brown-200 p-5  rounded-xl">
                <ArticleButton icon={<Smile size={20} />} text={likes} />

                <div className="flex items-center gap-3">
                    <ArticleButton icon={<Copy size={20} />} text="Copy link" />
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
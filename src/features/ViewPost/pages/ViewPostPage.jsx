import { useParams } from "react-router-dom";
import { NavBar } from "../../../components/layouts/NavBar.jsx";
import { Footer } from "../../../components/layouts/Footer.jsx";
import ArticleContent from "../components/ArticleContent.jsx";


function ViewPostPage() {
    const param = useParams();

    return (
        < div >
            <NavBar />
            <ArticleContent postId={param.postId} />
            <Footer />
        </div >
    );
}

export default ViewPostPage;
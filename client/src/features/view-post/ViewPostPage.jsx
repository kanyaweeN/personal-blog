import { useParams } from "react-router-dom";
import { NavBar } from "../../components/nav/NavBar.jsx";
import { Footer } from "../../components/nav/Footer.jsx";
import ArticleDetail from "../../components/view-post/ArticleDetail.jsx";

function ViewPostPage() {
    const param = useParams();

    return (
        <div className="container">
            <NavBar />
            <ArticleDetail postId={param.postId} />
            <Footer />
        </div >
    );
}

export default ViewPostPage;
import { useParams } from "react-router-dom";
import { NavBar } from "../../../components/layouts/NavBar.jsx";
import { Footer } from "../../../components/layouts/Footer.jsx";
import ArticleDetail from "../components/ArticleDetail.jsx";

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
import SidebarMenu from '../component/SidebarMenu.jsx';
import ArticleManamentContent from '../component/ArticleManamentContent.jsx';

function ArticleManamentPage() {
    return (
        <div >
            <main className="flex justify-center h-screen">
                <SidebarMenu />
                <ArticleManamentContent />
            </main>
        </div>
    );
}

export default ArticleManamentPage
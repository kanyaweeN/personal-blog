import SidebarMenu from '../../components/menu/SidebarMenu.jsx';
import ArticleManamentContent from '../../components/admin/ArticleManamentContent.jsx';

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
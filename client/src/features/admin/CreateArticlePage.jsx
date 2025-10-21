import SidebarMenu from '../../components/menu/SidebarMenu.jsx';
import CreateArticleContent from '../../components/admin/CreateArticleContent.jsx';

function CreateArticlePage() {
    return (
        <div >
            <main className="flex justify-center h-screen">
                <SidebarMenu />
                <CreateArticleContent />
            </main>
        </div>
    );
}

export default CreateArticlePage
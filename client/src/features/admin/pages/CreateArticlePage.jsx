import SidebarMenu from '../component/SidebarMenu.jsx';
import CreateArticleContent from '../component/CreateArticleContent.jsx';

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
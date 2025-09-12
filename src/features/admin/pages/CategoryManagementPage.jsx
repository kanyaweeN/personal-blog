import SidebarMenu from '../component/SidebarMenu.jsx';
import CategoryManagement from '../component/CategoryManagement.jsx';

function CategoryManagementPage() {
    return (
        <div >
            <main className="flex justify-center h-screen">
                <SidebarMenu />
                <CategoryManagement />
            </main>
        </div>
    );
}

export default CategoryManagementPage
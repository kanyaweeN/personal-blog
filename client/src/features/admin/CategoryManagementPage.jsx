import SidebarMenu from '../../components/admin/SidebarMenu.jsx';
import CategoryManagement from '../../components/admin/CategoryManagement.jsx';

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
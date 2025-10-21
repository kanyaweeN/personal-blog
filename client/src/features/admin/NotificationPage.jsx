import SidebarMenu from '../../components/menu/AdminMenu.jsx';
import NotificationContent from '../../components/admin/NotificationContent.jsx';

function NotificationPage() {
    return (
        <div >
            <main className="flex justify-center h-screen">
                <SidebarMenu />
                <NotificationContent />
            </main>
        </div>
    );
}

export default NotificationPage
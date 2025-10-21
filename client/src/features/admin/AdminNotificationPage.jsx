import SidebarMenu from '../../components/menu/AdminMenu.jsx';
import NotificationContent from '../../components/notifications/NotificationContent.jsx';

export default function AdminNotificationPage() {
    return (
        <div >
            <main className="flex justify-center h-screen">
                <SidebarMenu />
                <NotificationContent />
            </main>
        </div>
    );
}

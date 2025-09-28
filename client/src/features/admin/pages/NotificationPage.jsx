import SidebarMenu from '../component/SidebarMenu.jsx';
import NotificationContent from '../component/NotificationContent.jsx';

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
import AdminMenu from '../menu/AdminMenu.jsx';

export default function AdminLayout({ children }) {
    return (
        <div className="flex h-screen">
            <AdminMenu />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
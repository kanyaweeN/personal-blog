import ResetPasswordContent from "../../components/admin/ResetPasswordContent";
import SidebarMenu from "../../components/menu/SidebarMenu";

function AdminResetPasswordPage() {
    return (
        <div >
            <main className="flex justify-center h-screen">
                <SidebarMenu />
                <ResetPasswordContent />
            </main>
        </div>
    );
}

export default AdminResetPasswordPage
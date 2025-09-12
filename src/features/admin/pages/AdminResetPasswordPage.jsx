import ResetPasswordContent from "../component/ResetPasswordContent";
import SidebarMenu from "../component/SidebarMenu";

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
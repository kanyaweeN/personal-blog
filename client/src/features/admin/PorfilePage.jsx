import SidebarMenu from '../../components/menu/AdminMenu.jsx';
import PorfileContent from '../../components/admin/PorfileContent.jsx';

function PorfilePage() {
    return (
        <div >
            <main className="flex justify-center h-screen">
                <SidebarMenu />
                <PorfileContent />
            </main>
        </div>
    );
}

export default PorfilePage
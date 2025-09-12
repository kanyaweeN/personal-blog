import SidebarMenu from '../component/SidebarMenu.jsx';
import PorfileContent from '../component/PorfileContent.jsx';

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
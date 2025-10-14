import { CircleAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/nav/NavBar.jsx';
import { Footer } from '../../components/nav/Footer.jsx';
import { AppButton } from '../../components/button/AppButton.jsx';

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="container min-h-screen flex flex-col">
            <NavBar />

            <main className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="max-w-xl w-full text-center space-y-6">
                    <div className="flex justify-center">
                        <CircleAlert className="text-brown-600" size={72} />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl">
                            Page not found
                        </h1>
                        <p>
                            ไม่พบหน้าที่คุณต้องการหรืออาจถูกย้ายไปแล้ว
                        </p>
                    </div>
                    <AppButton
                        style="dark"
                        onClick={() => navigate('/')}>
                        กลับหน้าหลัก
                    </AppButton>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default NotFoundPage
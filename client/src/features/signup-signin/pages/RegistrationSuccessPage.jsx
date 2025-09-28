
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../../components/layouts/NavBar.jsx';
import { AppButton } from '../../common/AppButton.jsx'
import check_green from '../../../assets/icons/check_green.png'

function RegistrationSuccessPage() {
    const navigate = useNavigate();

    return (
        <div className="container flex flex-col">
            <NavBar />
            <main className="flex-1 flex justify-center px-6 py-12 ">
                <div className="bg-brown-200 p-20 rounded-xl max-w-xl w-full text-center space-y-6">
                    <div className="flex justify-center">
                        <img src={check_green} alt="success" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl">
                            Registration success
                        </h1>
                    </div>
                    <AppButton
                        style="dark"
                        onClick={() => navigate('/')}>
                        Continue
                    </AppButton>
                </div>
            </main>
        </div>
    );
}

export default RegistrationSuccessPage
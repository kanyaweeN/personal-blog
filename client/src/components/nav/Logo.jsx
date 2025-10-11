import { AppButton } from "../button/AppButton";
import { useNavigate } from 'react-router-dom';

export function Logo() {
    const navigate = useNavigate();

    return (
        <AppButton
            style="transition"
            onClick={() => {
                navigate("/");
            }}
        >
            <div className="flex items-center">
                <span className="text-2xl font-semibold text-gray-800">
                    hh
                    <span className="text-3xl text-green h-fit">.</span>
                </span>

            </div>
        </AppButton >
    );
}

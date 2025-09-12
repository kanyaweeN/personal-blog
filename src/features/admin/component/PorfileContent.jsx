import { useNavigate } from 'react-router-dom';
import { ImageIcon, X } from "lucide-react";
import { useState } from "react";
import { AppButton } from "../../common/AppButton";
import {
    SelectItem,
} from "@/components/ui/select";
import InputField from "../../common/InputField";
import TextArea from "../../common/TextArea";
import AppSelect from "../../common/AppSelect";
import { useAppToast } from '../../../hooks/useAppToast.jsx';
import Userprofile from '../../common/Userprofile.jsx';

function PorfileContent() {
    const navigate = useNavigate();
    const { success } = useAppToast();
    const [porfile, setPorfile] = useState({
        image: "",
        name: "",
        username: "",
        email: "",
        context: "",
    });
    const [error, setError] = useState({
        image: "",
        name: "",
        username: "",
        email: "",
        context: "",
    })

    const handleonChange = (e) => {
        const { name, value } = e.target;
        setPorfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    const handleSave = () => {
        let err = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!porfile.name.trim()) {
            err.name = "Please enter your name.";
        }

        if (!porfile.username.trim()) {
            err.username = "Please enter your username.";
        }

        if (!porfile.email.trim()) {
            err.email = "Please enter your email.";
        } else if (!emailRegex.test(porfile.email)) {
            err.email = "Email must be a valid email";
        }

        setError(err);

        if (Object.keys(err).length === 0) {
            saveData();
            success(
                "Saved profile",
                "Your profile has been successfully updated"
            );
        }
    }

    const saveData = () => {

    }

    return (
        <main className="flex-1 p-10">
            {/* Header */}
            <header className="flex justify-between items-center mb-5 border-b pb-5">
                <h2 className="text-xl font-bold">
                    Profile
                </h2>
                <div className="flex gap-2">
                    <AppButton
                        onClick={handleSave}
                        style='dark'
                    >
                        Save
                    </AppButton>
                </div>
            </header>

            {/* Thumbnail */}
            <form className="text-brown-400 space-y-4">
                <div className="flex items-center gap-3">
                    <div>
                        <Userprofile
                            slyte="w-20 h-20"
                        />
                    </div>
                    <div>
                        <AppButton>
                            Upload profile picture
                        </AppButton>
                    </div>
                </div>

                <div>
                    <label htmlFor="name" className="text-sm">name</label>
                    <InputField
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={porfile.name}
                        onChange={handleonChange}
                        error={error.name}
                        showErrorText={true}
                    />
                </div>

                <div>
                    <label htmlFor="title" className="text-sm">Username</label>
                    <InputField
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={porfile.username} // Prefill with the fetched title
                        onChange={handleonChange}
                        error={error.username}
                        showErrorText={true}
                    />
                </div>

                <div>
                    <label htmlFor="email" className="text-sm">Email</label>
                    <InputField
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={porfile.email} // Prefill with the fetched title
                        onChange={handleonChange}
                        error={error.email}
                        showErrorText={true}
                    />
                </div>

                <div>
                    <label htmlFor="context" className="text-sm">Bio (max 120 letters)</label>
                    <TextArea
                        id="context"
                        name="context"
                        placeholder="Bio"
                        maxLength={120}
                        rows={3}
                        value={porfile.context} // Prefill with the 
                        onChange={handleonChange}
                    />
                </div>
            </form>
        </main>
    );
}

export default PorfileContent;

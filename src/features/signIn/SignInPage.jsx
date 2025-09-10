import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { NavBar } from '../../components/layouts/NavBar.jsx';
import { AppButton } from '../common/AppButton.jsx';

function SignInPage() {
    const navigate = useNavigate();
    const [signIn, setSignIn] = useState({
        email: "",
        password: "",
    });

    function submitonClick(e) {
        e.preventDefault();
    }

    const handleInputonChange = (e) => {
        const { name, value } = e.target;
        setSignIn({
            ...name,
            [name]: value,
        });
    }

    return (
        <div className="flex flex-col">
            <NavBar />

            <main className="flex-1 flex justify-center px-6 py-12">
                <div className="bg-brown-200 p-10 rounded-xl shadow max-w-xl w-full">

                    <div className="space-y-2">
                        <h1 className="text-3xl">
                            Log in
                        </h1>
                        <div className="text-brown-400">
                            <form className="flex flex-col gap-5" onSubmit={submitonClick}>
                                {/* Email */}
                                <div>
                                    <label className="text-sm">Email</label>
                                    <input
                                        type="email"
                                        value={signIn.email}
                                        placeholder="Email"
                                        required
                                        onChange={handleInputonChange}
                                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brown-300"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="text-sm">Password</label>
                                    <input
                                        type="password"
                                        value={signIn.password}
                                        placeholder="Password"
                                        required
                                        onChange={handleInputonChange}
                                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brown-300"
                                    />
                                </div>

                                {/* Submit button */}
                                <div className="flex justify-center pb-5">
                                    <AppButton style="solid" size="md" type="submit">
                                        Log in
                                    </AppButton>
                                </div>
                            </form>

                            <p className="text-center text-brown-400 ">
                                Don’t have any account?
                                <AppButton
                                    style='underline'
                                    onClick={() => navigate(`/signup`)}
                                >
                                    Log up
                                </AppButton>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SignInPage
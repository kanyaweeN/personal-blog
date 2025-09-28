import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { NavBar } from '../../../components/layouts/NavBar.jsx';
import { AppButton } from '../../common/AppButton.jsx';
import InputField from '../../common/InputField.jsx';
import { useAppToast } from '../../../hooks/useAppToast.jsx';

function SignInPage() {
    const navigate = useNavigate();
    const { error } = useAppToast();

    const [signIn, setSignIn] = useState({
        email: "",
        password: "",
    });
    const [errorInput, setError] = useState({
        email: "",
        password: "",
    })

    function submitonClick(e) {
        e.preventDefault();

        let err = {}
        if (!signIn.email) {
            err.email = "Please enter your email.";
        }

        if (!signIn.password) {
            err.password = "Please enter your password";
        }

        setError(err);

        if (window.innerWidth > 768) { //desktop
            if (Object.keys(err).length !== 0) {
                error("Your password is incorrect or this email doesn’t exist!", "Please try another password or email");
            }
        }
    }

    const handleInputonChange = (e) => {
        const { name, value } = e.target;
        setSignIn({
            ...signIn,
            [name]: value,
        });
    }

    return (
        <div className="container flex flex-col">
            <NavBar />
            <main className="flex-1 flex justify-center px-6 py-12">
                <div className="bg-brown-200 p-10 rounded-xl shadow max-w-xl w-full">

                    <div className="space-y-2 flex flex-col items-center">
                        <h1 className="text-3xl">
                            Log in
                        </h1>
                        <div className="text-brown-400">
                            <form className="flex flex-col gap-5" onSubmit={submitonClick}>
                                {/* Email */}
                                <InputField
                                    text="Email"
                                    type="text"
                                    name="email"
                                    value={signIn.email}
                                    placeholder="Email"
                                    onChange={handleInputonChange}
                                    error={errorInput.email}
                                />

                                {/* Password */}
                                <InputField
                                    text="Password"
                                    type="password"
                                    name="password"
                                    value={signIn.password}
                                    placeholder="Password"
                                    onChange={handleInputonChange}
                                    error={errorInput.password}
                                />

                                {/* Submit button */}
                                <div className="flex justify-center pb-5">
                                    <AppButton
                                        style="dark"
                                        size="md"
                                        type="submit">
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
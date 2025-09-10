import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { NavBar } from '../../components/layouts/NavBar.jsx';
import { AppButton } from '../common/AppButton.jsx';
import SignUpInput from '../signUp/common/SignUpInput.jsx';

function SignInPage() {
    const navigate = useNavigate();
    const [signIn, setSignIn] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState({
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
        console.log(err);

        setError(err);
    }

    const handleInputonChange = (e) => {
        const { name, value } = e.target;
        setSignIn({
            ...signIn,
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
                                <SignUpInput
                                    text="Email"
                                    type="text"
                                    name="email"
                                    value={signIn.email}
                                    placeholder="Email"
                                    onChange={handleInputonChange}
                                    error={error.email}
                                />

                                {/* Password */}
                                <SignUpInput
                                    text="Password"
                                    type="password"
                                    name="password"
                                    value={signIn.password}
                                    placeholder="Password"
                                    onChange={handleInputonChange}
                                    error={error.password}
                                />

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
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { NavBar } from '../../../components/layouts/NavBar.jsx';
import { AppButton } from '../../common/AppButton.jsx';
import InputField from '../../common/InputField.jsx';
import axios from "axios"

function SignUpPage() {
    const navigate = useNavigate();
    const [signUp, setSignUp] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    })

    function submitonClick(e) {
        e.preventDefault();

        let err = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!signUp.name.trim()) {
            err.name = "Please enter your name.";
        }

        if (!signUp.username.trim()) {
            err.username = "Please enter your username.";
        }

        if (!signUp.email.trim()) {
            err.email = "Please enter your email.";
        } else if (!emailRegex.test(signUp.email)) {
            err.email = "Email must be a valid email";
        }

        if (!signUp.password || signUp.password.length < 6) {
            err.password = "Password must be at least 6 characters";
        }

        setError(err);

        if (Object.keys(err).length === 0) {
            saveData();
        }
    }

    const saveData = async () => {
        let result;
        console.log("signUp", {
            ...signUp,
            role: "user"
        });

        try {
            result = await axios.post(
                "http://localhost:4000/auth/register",
                {
                    ...signUp,
                    role: "user"
                }
            );

            console.log("signUp result", result);

            if (result?.status === 201) {
                navigate("/signup/success")
            }
        } catch (e) {
            console.log("signUp e", e);

            if (error.response?.status <= 409) {
                setError({
                    email: e.response
                        .data.message
                })
            } else {
                console.error(error);
            }
            // console.error("axios.register", e);
        }
    }

    const handleInputonChange = (e) => {
        const { name, value } = e.target;
        setSignUp((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="container flex flex-col">
            <NavBar />

            <main className="flex-1 flex justify-center px-6 py-12">
                <div className="bg-brown-200 p-10 rounded-xl shadow max-w-xl w-full">

                    <div className="space-y-2">
                        <h1 className="text-3xl">
                            Sign up
                        </h1>
                        <div className="text-brown-400">
                            <form className="flex flex-col gap-5" onSubmit={submitonClick}>
                                {/* Name */}
                                <InputField
                                    text="Name"
                                    type="text"
                                    name="name"
                                    value={signUp.name}
                                    placeholder="Full name"
                                    onChange={handleInputonChange}
                                    error={error.name}
                                    showErrorText={true}
                                />

                                {/* Username */}
                                <InputField
                                    text="Username"
                                    type="text"
                                    name="username"
                                    value={signUp.username}
                                    placeholder="Username"
                                    onChange={handleInputonChange}
                                    error={error.username}
                                    showErrorText={true}
                                />

                                {/* Email */}
                                <InputField
                                    text="email"
                                    type="text"
                                    name="email"
                                    value={signUp.email}
                                    placeholder="Email"
                                    onChange={handleInputonChange}
                                    error={error.email}
                                    showErrorText={true}
                                />

                                {/* Password */}
                                <InputField
                                    text="password"
                                    type="password"
                                    name="password"
                                    value={signUp.password}
                                    placeholder="Password"
                                    onChange={handleInputonChange}
                                    error={error.password}
                                    showErrorText={true}
                                />

                                {/* Submit button */}
                                <div className="flex justify-center  py-5">
                                    <AppButton style="dark" size="md" type="submit">
                                        Sign up
                                    </AppButton>
                                </div>
                            </form>

                            <p className="text-center text-brown-400">
                                Already have an account?
                                <AppButton
                                    style='underline'
                                    onClick={() => navigate("/login")}
                                >
                                    Log in
                                </AppButton>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SignUpPage
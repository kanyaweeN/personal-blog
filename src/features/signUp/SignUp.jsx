import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { NavBar } from '../../components/layouts/NavBar.jsx';
import { AppButton } from '../common/AppButton.jsx';

function SignUp() {
    const navigate = useNavigate();
    const [signUp, setSignUp] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });

    function submitonClick(e) {
        e.preventDefault();
    }

    const handleInputonChange = (e) => {
        const { name, value } = e.target;
        setSignUp({
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
                            Sign up
                        </h1>
                        <div className="text-brown-400">
                            <form className="flex flex-col gap-5" onSubmit={submitonClick}>
                                {/* Name */}
                                <div>
                                    <label className="text-sm">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={signUp.name}
                                        placeholder="Full name"
                                        required
                                        onChange={handleInputonChange}
                                        className="w-full px-4 py-2 bg-white  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brown-300"
                                    />
                                </div>

                                {/* Username */}
                                <div>
                                    <label className="text-sm">Username</label>
                                    <input
                                        type="text"
                                        value={signUp.username}
                                        placeholder="Username"
                                        required
                                        onChange={handleInputonChange}
                                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brown-300"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="text-sm">Email</label>
                                    <input
                                        type="email"
                                        value={signUp.email}
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
                                        value={signUp.password}
                                        placeholder="Password"
                                        required
                                        onChange={handleInputonChange}
                                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brown-300"
                                    />
                                </div>

                                {/* Submit button */}
                                <div className="flex justify-center">
                                    <AppButton style="solid" size="md" type="submit">
                                        Sign up
                                    </AppButton>
                                </div>
                            </form>

                            <p className="text-center text-sm mt-5">
                                Already have an account?{" "}
                                <AppButton
                                    style='underline'
                                    onClick={() => navigate(`/`)}
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

export default SignUp
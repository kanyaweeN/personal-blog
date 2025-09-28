
import { useAuth } from "../../../contexts/authentication.jsx";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { NavBar } from '../../../components/layouts/NavBar.jsx';
import { AppButton } from '../../common/AppButton.jsx';
import InputField from '../../common/InputField.jsx';
import { useAppToast } from '../../../hooks/useAppToast.jsx';

function SignInPage() {
    try {
        const { login, state } = useAuth();
        const navigate = useNavigate();
        const { error } = useAppToast();

        const [signInData, setSignInData] = useState({
            email: "",
            password: "",
        });
        const [errorInput, setError] = useState({
            email: "",
            password: "",
        })

        async function submitonClick(e) {
            e.preventDefault();

            let err = {}
            if (!signInData.email) {
                err.email = "Please enter your email.";
            }

            if (!signInData.password) {
                err.password = "Please enter your password";
            }

            setError(err);

            if (Object.keys(err).length !== 0) {
                if (window.innerWidth > 768) { //desktop
                    error("Your password is incorrect or this email doesn't exist!", "Please try another password or email");
                }
            }
            else {
                await signIn();
            }
        }

        const handleInputonChange = (e) => {
            const { name, value } = e.target;
            setSignInData({
                ...signInData,
                [name]: value,
            });
        }

        const signIn = async () => {
            const result = await login(signInData);

            if (result?.error) {
                error("Please try another password or email");
            } else if (result?.success) {
                console.log("signIn success");
                // ตรวจสอบว่า token ถูกบันทึกใน localStorage หรือไม่
                const savedToken = localStorage.getItem("token");
                console.log("Token in localStorage:", savedToken);

                if (savedToken) {
                    // ไม่ navigate ทันที ให้แสดงข้อความสำเร็จก่อน
                    console.log("Login successful! Token saved.");
                    // navigate("/"); // คอมเมนต์ไว้ก่อน
                } else {
                    error("Token not saved properly");
                }
            }
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
                                        value={signInData.email}
                                        placeholder="Email"
                                        onChange={handleInputonChange}
                                        error={errorInput.email}
                                    />

                                    {/* Password */}
                                    <InputField
                                        text="Password"
                                        type="password"
                                        name="password"
                                        value={signInData.password}
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
    } catch (error) {
        console.error("=== SIGNIN PAGE ERROR ===", error);
        return <div>Error in SignInPage</div>;
    }
}

export default SignInPage
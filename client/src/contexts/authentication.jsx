import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProvider(props) {
    const [state, setState] = useState({
        loading: null,
        getUserLoading: null,
        error: null,
        user: null,
    });

    const navigate = useNavigate();

    // ดึงข้อมูลผู้ใช้โดยใช้ Supabase API
    const fetchUser = async () => {
        console.log("=== FETCHUSER START ===", localStorage.getItem("token"));
        const token = localStorage.getItem("token");
        console.log("=== FETCHUSER TOKEN ===", token);
        if (!token) {
            console.log("=== NO TOKEN, SETTING USER NULL ===");
            setState((prevState) => ({
                ...prevState,
                user: null,
                getUserLoading: false,
            }));
            return;
        }

        try {
            console.log("=== SETTING GETUSERLOADING TRUE ===");
            setState((prevState) => ({ ...prevState, getUserLoading: true }));
            console.log("=== CALLING GET-USER API ===");
            // let response;
            const response = await axios.get(
                "http://localhost:4000/auth/get-user"
            );
            console.log("=== GET-USER RESPONSE ===", response.data);
            console.log("=== SETTING USER DATA ===");
            setState((prevState) => ({
                ...prevState,
                user: response.data,
                getUserLoading: false,
            }));
            console.log("=== FETCHUSER SUCCESS - USER SET ===", response.data);
        } catch (error) {
            console.error("=== FETCHUSER ERROR ===", error);

            setState((prevState) => ({
                ...prevState,
                error: error.message,
                user: null,
                getUserLoading: false,
            }));
        }
    };

    useEffect(() => {
        fetchUser(); // โหลดข้อมูลผู้ใช้เมื่อแอปเริ่มต้น
    }, []);

    // ล็อกอินผู้ใช้
    const login = async (data) => {
        try {
            setState((prevState) => ({ ...prevState, loading: true, error: null }));
            const response = await axios.post(
                "http://localhost:4000/auth/login",
                data
            );
            console.log("=== LOGIN API RESPONSE ===", response.data);
            const token = response.data.access_token;

            if (!token) {
                throw new Error("No token received from server");
            }

            localStorage.setItem("token", token);
            console.log("=== TOKEN SAVED ===", token);

            // ดึงและตั้งค่าข้อมูลผู้ใช้
            setState((prevState) => ({ ...prevState, loading: false, error: null }));
            await fetchUser();
            return { success: true };
        } catch (error) {
            console.error("=== LOGIN ERROR ===", error);

            setState((prevState) => ({
                ...prevState,
                loading: false,
                error: error.response?.data?.error || "Login failed",
            }));
            return { error: error.response?.data?.error || "Login failed" };
        }
    };

    // ลงทะเบียนผู้ใช้
    const register = async (data) => {
        try {
            setState((prevState) => ({ ...prevState, loading: true, error: null }));
            await axios.post(
                "http://localhost:4000/auth/register",
                data
            );
            setState((prevState) => ({ ...prevState, loading: false, error: null }));
            navigate("/sign-up/success");
        } catch (error) {
            setState((prevState) => ({
                ...prevState,
                loading: false,
                error: error.response?.data?.error || "Registration failed",
            }));
            return { error: state.error };
        }
    };

    // ล็อกเอาท์ผู้ใช้
    const logout = () => {
        localStorage.removeItem("token");
        setState({ user: null, error: null, loading: null });
        // navigate("/");
        console.log("logout");
    };

    const isAuthenticated = Boolean(state.user);
    console.log("AuthProvider - isAuthenticated:", isAuthenticated, "user:", state.user);

    return (
        <AuthContext.Provider
            value={{
                state,
                login,
                logout,
                register,
                isAuthenticated,
                fetchUser,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

// Hook สำหรับใช้งาน AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };


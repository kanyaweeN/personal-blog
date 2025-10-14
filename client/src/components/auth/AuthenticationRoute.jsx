/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { LoadingScreen } from "../ui/WebSection.tsx";

function AuthenticationRoute({ isLoading, isAuthenticated, children }) {
    try {
        if (isLoading === null || isLoading) {
            return (
                <div className="flex flex-col min-h-screen">
                    <div className="min-h-screen md:p-8">
                        <LoadingScreen />
                    </div>
                </div>
            );
        }

        if (isAuthenticated) {
            return <Navigate to="/" replace />;
        }
        return children;
    } catch (error) {
        console.error("=== AUTHENTICATION ROUTE ERROR ===", error);
        return <div>Error in AuthenticationRoute</div>;
    }
}

export default AuthenticationRoute;

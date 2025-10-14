/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { LoadingScreen } from "../ui/WebSection";

function ProtectedRoute({
    isLoading,
    isAuthenticated,
    userRole,
    requiredRole,
    children,
}) {
    // สถานะกำลังโหลดข้อมูลหรือยังไม่มีข้อมูล
    if (isLoading === null || isLoading) {
        return (
            <div className="flex flex-col min-h-screen">
                <div className="min-h-screen md:p-8">
                    <LoadingScreen />
                </div>
            </div>
        );
    }

    // ถ้ายังไม่ login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // เช็ค role (ถ้ามี requiredRole)
    if (requiredRole) {
        const hasPermission = Array.isArray(requiredRole)
            ? requiredRole.includes(userRole)
            : userRole === requiredRole;

        if (!hasPermission) {
            return <Navigate to="/" replace />;
        }
    }

    // ผู้ใช้มีการยืนยันตัวตนและมีบทบาทที่ถูกต้อง
    return children;
}

export default ProtectedRoute;
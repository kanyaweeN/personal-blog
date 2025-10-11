import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useAuth } from "./contexts/authentication.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import AuthenticationRoute from "./components/auth/AuthenticationRoute.jsx";

import { Toaster } from "@/components/ui/sonner"
import HomePage from "./features/home/HomePage.jsx";
import ViewPostPage from "./features/view-post/ViewPostPage.jsx";
import NotFoundPage from "./features/notfound/NotFoundPage.jsx";
import SignUpPage from "./features/signup-signin/SignUpPage.jsx";
import SignInPage from "./features/signup-signin/SignInPage.jsx";
import RegistrationSuccessPage from "./features/signup-signin/RegistrationSuccessPage.jsx";
import ProfilePage from "./features/profile/ProfilePage.jsx";
import ResetPasswordPage from "./features/profile/ResetPasswordPage.jsx";
import AdminLoginPage from "./features/admin/AdminLoginPage.jsx";
import ArticleManamentPage from "./features/admin/ArticleManamentPage.jsx";
import CreateArticlePage from "./features/admin/CreateArticlePage.jsx";
import CategoryManagementPage from "./features/admin/CategoryManagementPage.jsx";
import CreateCategoryPage from "./features/admin/CreateCategoryPage.jsx";
import PorfilePage from "./features/admin/PorfilePage.jsx";
import NotificationPage from "./features/admin/NotificationPage.jsx";
import AdminResetPasswordPage from "./features/admin/AdminResetPasswordPage.jsx";

function App() {
  const { isAuthenticated, state } = useAuth();

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={
          (() => {
            return (<HomePage />)
          })()
        } />
        <Route path="/view-post/:postId" element={<ViewPostPage />} />
        <Route path="*" element={<NotFoundPage />} />

        <Route path="/adminlogin" element={<AdminLoginPage />} />
        <Route path="/admin/article-manament" element={<ArticleManamentPage />} />
        <Route path="/admin/article-manament/cerate-article" element={<CreateArticlePage />} />
        <Route path="/admin/category-management" element={<CategoryManagementPage />} />
        <Route path="/admin/category-management/create-category" element={<CreateCategoryPage />} />
        <Route path="/admin/profile" element={
          <ProtectedRoute
            isLoading={state.getUserLoading}
            isAuthenticated={isAuthenticated}
            userRole={state.user?.role}
            requiredRole="admin"
          >
            <PorfilePage />
          </ProtectedRoute>
        } />
        <Route path="/admin/notification" element={<NotificationPage />} />
        <Route path="/admin/reset-password" element={<AdminResetPasswordPage />} />

        {/* Authentication Section */}
        <Route path="/login" element={
          (() => {
            return (
              <AuthenticationRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
              >
                <SignInPage />
              </AuthenticationRoute>
            );
          })()
        } />
        <Route path="/signup" element={
          <AuthenticationRoute
            isLoading={state.getUserLoading}
            isAuthenticated={isAuthenticated}
          >
            <SignUpPage />
          </AuthenticationRoute>
        } />
        <Route path="/signup/success" element={
          <AuthenticationRoute
            isLoading={state.getUserLoading}
            isAuthenticated={isAuthenticated}
          >
            <RegistrationSuccessPage />
          </AuthenticationRoute>
        } />

        {/* User Section */}
        <Route path="/profile" element={
          <ProtectedRoute
            isLoading={state.getUserLoading}
            isAuthenticated={isAuthenticated}
            userRole={state.user?.role}
            requiredRole="user"
          >
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/profile/reset-password" element={
          <ProtectedRoute
            isLoading={state.getUserLoading}
            isAuthenticated={isAuthenticated}
            userRole={state.user?.role}
            requiredRole="user"
          >
            <ResetPasswordPage />
          </ProtectedRoute>
        } />

      </Routes>
    </>
  );
}

export default App;

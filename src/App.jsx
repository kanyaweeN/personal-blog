import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"
import HomePage from "./features/home/pages/HomePage.jsx";
import ViewPostPage from "./features/ViewPost/pages/ViewPostPage.jsx";
import NotFoundPage from "./features/notFound/NotFoundPage.jsx";
import SignUpPage from "./features/signup-signin/pages/SignUpPage.jsx";
import SignInPage from "./features/signup-signin/pages/SignInPage.jsx";
import RegistrationSuccessPage from "./features/signup-signin/pages/RegistrationSuccessPage.jsx";
import ProfilePage from "./features/profile/pages/ProfilePage.jsx";
import ResetPasswordPage from "./features/profile/pages/ResetPasswordPage.jsx";
import AdminLoginPage from "./features/admin/pages/AdminLoginPage.jsx";
import ArticleManamentPage from "./features/admin/pages/ArticleManamentPage.jsx";
import CreateArticlePage from "./features/admin/pages/CreateArticlePage.jsx";
import CategoryManagementPage from "./features/admin/pages/CategoryManagementPage.jsx";
import CreateCategoryPage from "./features/admin/pages/CreateCategoryPage.jsx";
import PorfilePage from "./features/admin/pages/PorfilePage.jsx";
import NotificationPage from "./features/admin/pages/NotificationPage.jsx";
import AdminResetPasswordPage from "./features/admin/pages/AdminResetPasswordPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/adminlogin" element={<AdminLoginPage />} />
        <Route path="/admin/article-manament" element={<ArticleManamentPage />} />
        <Route path="/admin/article-manament/cerate-article" element={<CreateArticlePage />} />
        <Route path="/admin/category-management" element={<CategoryManagementPage />} />
        <Route path="/admin/category-management/create-category" element={<CreateCategoryPage />} />
        <Route path="/admin/profile" element={<PorfilePage />} />
        <Route path="/admin/notification" element={<NotificationPage />} />
        <Route path="/admin/resetpassword" element={<AdminResetPasswordPage />} />

        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signup/success" element={<RegistrationSuccessPage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/resetpassword" element={<ResetPasswordPage />} />

        <Route path="/viewpost/:postId" element={<ViewPostPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

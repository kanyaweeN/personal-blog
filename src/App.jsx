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


function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />

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

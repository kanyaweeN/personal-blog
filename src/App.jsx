import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./features/home/pages/HomePage.jsx";
import ViewPostPage from "./features/ViewPost/pages/ViewPostPage.jsx";
import NotFoundPage from "./features/notFound/NotFoundPage.jsx";
import SignUpPage from "./features/signUp/SignUpPage.jsx";
import SignInPage from "./features/signIn/signInPage.jsx";
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/viewpost/:postId" element={<ViewPostPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./features/home/pages/HomePage.jsx";
import ViewPostPage from "./features/ViewPost/pages/ViewPostPage.jsx";
import NotFoundPage from "./features/notFound/NotFoundPage.jsx";
import SignUp from "./features/signUp/SignUp.jsx";
SignUp

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/viewpost/:postId" element={<ViewPostPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

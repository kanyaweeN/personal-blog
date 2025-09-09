import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./features/home/pages/HomePage.jsx";
import ViewPostPage from "./features/ViewPost/pages/ViewPostPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/viewpost/:postId" element={<ViewPostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

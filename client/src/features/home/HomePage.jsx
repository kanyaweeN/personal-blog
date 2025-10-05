import { NavBar } from "../../components/nav/NavBar.jsx";
import { Footer } from "../../components/nav/Footer.jsx";
import { HeroSection } from "../../components/home/HeroSection.jsx";
import { ArticleSection } from "../../components/home/ArticleSection.jsx";

function HomePage() {

    console.log("=== BEFORE Home CALL ===", window.location.href);
    return (
        <div className="container">
            <NavBar />
            <HeroSection />
            <ArticleSection />
            <Footer />
        </div>
    );
}
export default HomePage;
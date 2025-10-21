import { NavBar } from "../../components/nav/NavBar.jsx";
import { Footer } from "../../components/nav/Footer.jsx";
import { HeroSection } from "../../components/home/HeroSection.jsx";
import { ArticleSection } from "../../components/home/ArticleSection.jsx";

function HomePage() {
    return (
        <div className="container overflow-x-hidden mx-auto">
            <NavBar />
            <HeroSection />
            <ArticleSection />
            <Footer />
        </div>
    );
}
export default HomePage;
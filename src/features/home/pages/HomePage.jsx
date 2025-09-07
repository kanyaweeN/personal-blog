import { NavBar } from "../../../components/layouts/NavBar.jsx";
import { Footer } from "../../../components/layouts/Footer.jsx";
import { HeroSection } from "../components/HeroSection.jsx";
import { ArticleSection } from "../components/ArticleSection.jsx";

function HomePage() {
    return (
        <div>
            <NavBar />
            <HeroSection />
            <ArticleSection />
            <Footer />
        </div>
    );
}
export default HomePage;
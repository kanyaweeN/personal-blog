import { NavBar } from "../components/NavBar";
import { HeroSection } from "../components/HeroSection";
import { Footer } from "../components/Footer";
import { ArticleSection } from "../components/ArticleSection";

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
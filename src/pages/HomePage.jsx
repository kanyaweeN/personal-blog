import { Footer } from "../components/layouts/Footer";
import { NavBar } from "../components/layouts/NavBar";
import { HeroSection } from "../components/blogs/HeroSection";
import { ArticleSection } from "../components/blogs/ArticleSection";


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
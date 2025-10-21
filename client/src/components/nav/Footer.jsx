import { useNavigate } from "react-router-dom";

import Github_black from "../../assets/icons/Github_black.png"
import Google_black from "../../assets/icons/Google_black.png"
import LinkedIN_black from "../../assets/icons/LinkedIN_black.png"

export function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="bg-brown-200 px-10 py-10 flex flex-col md:flex-row justify-between items-center text-gray-800 gap-5">
            <div className=" flex items-center gap-4 ">
                <span className="text-brown-500">
                    Get in touch
                </span>
                <div className="flex gap-4">
                    <a href="https://www.linkedin.com/in/kanyawee-n/" target="_blank" rel="LinkedIn">
                        <img
                            src={LinkedIN_black}
                            alt="Linked In"
                            className="h-[20px]"
                        />
                    </a>
                    <a href="https://github.com/kanyaweeN/" target="_blank" rel="Github">
                        <img
                            src={Github_black}
                            alt="Github"
                            className="h-[20px]"
                        />
                    </a>
                    <img
                        src={Google_black}
                        alt="Google"
                        className="h-[20px]"
                    />
                </div>
            </div>
            <div>
                <button
                    className="hover:text-muted-foreground font-medium underline text-brown-600"
                    onClick={() => {
                        window.scrollTo(0, 0)
                        navigate(`/`)
                    }}
                >
                    Home page
                </button>
            </div>
        </footer>
    )
}
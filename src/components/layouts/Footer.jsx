import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#f1f0ed] px-10 py-8 flex flex-col md:flex-row justify-between items-center text-gray-800 gap-5">
            <div className=" flex items-center gap-4 ">
                <span>
                    Get in touch
                </span>

                <div className="flex gap-4">
                    <a
                        href="#"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={20} />
                    </a>
                    <a href="#" aria-label="GitHub"><Github size={20} /></a>
                    <a href="#" aria-label="Email"><Mail size={20} /></a>
                </div>
            </div>
            <div>
                <a href="#" className="hover:text-muted-foreground font-medium underline">
                    Home page
                </a>
            </div>
        </footer>
    )
}
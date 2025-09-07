import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-neutral-100 px-10 py-8 flex justify-between items-center text-gray-800">
            <div className="flex items-center gap-4">
                <span className="text-base">Get in touch</span>
                <div className="flex gap-4 text-xl">
                    <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
                    <a href="#" aria-label="GitHub"><Github size={20} /></a>
                    <a href="#" aria-label="Email"><Mail size={20} /></a>
                </div>
            </div>
            <div>
                <a href="#" className="underline hover:text-black transition">
                    Home page
                </a>
            </div>
        </footer>
    )
}
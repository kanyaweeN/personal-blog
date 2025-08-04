import { useState } from "react";
import manWithCatImage from "./assets/images/imgherosection.png";
import "./App.css";

function NavBar() {
  return (
    <div className="w-full relative">
      {/* Main Navigation */}
      <nav className="bg-gray-50 h-16 flex justify-between items-center px-6 border-b border-gray-200">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-2xl font-semibold text-gray-800">hh.</span>
          <span className="w-2 h-2 bg-green-500 rounded-full ml-1"></span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 items-center">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors">
            Log in
          </button>
          <button className="px-4 py-2 bg-gray-700 border border-gray-700 rounded-md text-white text-sm font-medium hover:bg-gray-600 hover:border-gray-600 transition-colors">
            Sign up
          </button>
        </div>
      </nav>

      {/* Scrollbar indicator */}
      <div className="absolute right-2 top-0 w-px h-full bg-gray-200"></div>
      <div className="absolute right-1.5 top-12 w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
    </div>
  );
}

function HeroSection() {
  return (
    <main className="container px-4 py-8 lg:py-16 mx-auto">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/3 mb-8 lg:mb-0 lg:pr-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Stay <br className="hidden lg:block" />
            Informed, <br />
            Stay Inspired,
          </h1>
          <p className="text-lg text-gray-500">
            Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
            Inspiration and Information.
          </p>
        </div>
        <img
          src={manWithCatImage}
          alt="Person with a cat"
          className="h-[530px] object-cover rounded-lg shadow-lg lg:w-1/3 mx-4 mb-8 lg:mb-0"
        />
        <div className="lg:w-1/3 lg:pl-8">
          <h2 className="text-xl font-semibold mb-2">-Author</h2>
          <h3 className="text-2xl font-bold mb-4">Thompson P.</h3>
          <p className="text-gray-500 mb-4">
            I am a pet enthusiast and freelance writer who specializes in animal
            behavior and care. With a deep love for cats, I enjoy sharing
            insights on feline companionship and wellness.
          </p>
          <p className="text-gray-500">
            When I&apos;m not writing, I spend time volunteering at my local
            animal shelter, helping cats find loving homes.
          </p>
        </div>
      </div>
    </main>
  );
}

function App() {
  return (
    <div>
      <NavBar />
      <HeroSection />
    </div>
  );
}

export default App;

import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import BlogCard from "./BlogCard";
import { blogPosts } from "../data/blogPosts";

const categories = ["Highlight", "Cat", "Inspiration", "General"];

export function ArticleSection() {
    const [activeCategory, setActiveCategory] = useState("Highlight");

    function getBlogPosts() {
        return blogPosts.filter((item) => {
            if (activeCategory != categories[0]) {
                return item.category == activeCategory
            }
            else {
                return item
            }
        })
    }

    return (
        <section className="bg-[#f9f8f6] px-6 md:px-10 py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Latest articles</h2>

            {/* Mobile Layout */}
            <div className="md:hidden space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-4 py-3 pr-12 rounded-xl border-0 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 bg-white shadow-sm"
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                </div>

                {/* Category Dropdown */}
                <div className="space-y-2">
                    <label className="text-gray-600 text-sm font-medium">Category</label>
                    <div className="relative">
                        <select
                            value={activeCategory}
                            onChange={(e) => setActiveCategory(e.target.value)}
                            className="w-full px-4 py-3 pr-10 rounded-xl border-0 text-gray-700 bg-white shadow-sm appearance-none focus:outline-none focus:ring-0"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
                <div className="bg-[#f1f0ed] p-4 rounded-xl flex flex-col md:flex-row md:justify-between items-center gap-4">
                    {/* Tabs */}
                    <div className="flex gap-6">
                        {categories.map((category) => (
                            <button
                                key={category}
                                // onClick={() => setActiveCategory(category)}
                                // className={
                                //     `text-sm md:text-base px-4 py-2 rounded-lg transition ${activeCategory === category
                                //         ? "bg-[#d6d3ce] text-gray-900"
                                //         : "text-gray-500 hover:text-black"
                                //     }`
                                // }
                                className={`${category === activeCategory
                                    ? "bg-gray-700 text-gray-200" // สีปุ่มเมื่อถูกเลือก
                                    : "bg-gray-200 hover:bg-gray-300" // สีปุ่มเมื่อไม่ได้ถูกเลือก
                                    } px-4 py-2 rounded
                                     cursor-pointer`}
                                disabled={category === activeCategory} // ปิดการคลิกปุ่มที่ถูกเลือก
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-72">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full px-4 py-2 pr-10 rounded-md border border-gray-300 text-sm focus:outline-none"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    </div>


                </div>
            </div>

            {/* BlogCard */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {
                    getBlogPosts().map((item) =>
                        <BlogCard key={item.id} image={item.image}
                            category={item.category} title={item.title} description={item.description} author={item.author} date={item.date}
                        />
                    )
                }
            </div>
        </section>
    );
};
import { Search, ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
// import { blogPosts } from "../data/blogPosts";
import PostService from "../../services/blogService";
import { formatDate } from "../../utils/formatDate";
const categories = ["Highlight", "Cat", "Inspiration", "General"];

export function ArticleSection() {
    const [activeCategory, setActiveCategory] = useState("Highlight");
    const [blogPosts, setblogPosts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [iserror, setError] = useState("");

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchPosts = async () => {
        setLoading(true);

        let result = {};
        try {
            result = await PostService.getAllPost(setQuery());
            console.log("fetchPosts : ", result);

            if (page === 1) {
                setblogPosts(result.posts);
            }
            else {
                setblogPosts([...blogPosts, ...result.posts]);
            }

            if (result.currentPage >= result.totalPages) {
                setHasMore(false);
            }
        } catch (err) {
            setError("โหลดข้อมูลไม่สำเร็จ");
        } finally {
            setLoading(false);
        }
        return result;
    };

    const setQuery = () => {
        const queries = {
            page: page,
            limit: 6,
            keyword: "",
            category: activeCategory === "Highlight" ? "" : `${activeCategory}`,
        }

        console.log("setQuery : ", queries);
        return queries;
    }

    const handleCategory = (category) => {
        setActiveCategory(category);
        setPage(1);
    }

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1); // เพิ่มหมายเลขหน้าเพื่อโหลดข้อมูลเพิ่ม
    }

    useEffect(() => {
        fetchPosts()
    }, [page, activeCategory])

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
                            onChange={(e) =>
                                handleCategory(e.target.value)
                            }
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
                                onClick={() =>
                                    handleCategory(category)
                                }
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
                    blogPosts.map((item) =>
                        <BlogCard key={item.id} image={item.image}
                            category={item.category} title={item.title} description={item.description} author={item.author} date={formatDate(item.date)}
                        />
                    )
                }
            </div>

            {/* View more */}
            {hasMore &&
                (
                    <div className="text-center mt-8">
                        <button
                            onClick={handleLoadMore}
                            className="hover:text-muted-foreground font-medium underline"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <><div className="flex flex-col items-center">
                                    <Loader2 className="h-10 w-10 animate-spin" />
                                    Loading...</div>
                                </>
                            ) : (
                                "View more"
                            )}
                        </button>
                    </div>
                )
            }

        </section >
    );
};
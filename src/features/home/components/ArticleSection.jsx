import { ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import debounce from 'lodash.debounce'

import BlogCard from "./BlogCard";
import PostService from "../../../services/blogService.js";
import { formatDate } from "../../../utils/formatDate.js";
import InputSearch from "../common/InputSearch.jsx";


const categories = ["Highlight", "Cat", "Inspiration", "General"];

export function ArticleSection() {
    const [activeCategory, setActiveCategory] = useState("Highlight");
    const [blogPosts, setblogPosts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [iserror, setError] = useState("");

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [search, setSearch] = useState("");

    const fetchPosts = async (searchTerm = search) => {
        setLoading(true);

        let result = {};
        try {
            result = await PostService.getAllPost(setQuery(searchTerm));
            console.log("ArticleSection.fetchPosts : ", result);

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


    const setQuery = (searchTerm) => {
        const queries = {
            page: page,
            limit: 6,
            keyword: searchTerm,
            category: activeCategory === "Highlight" ? "" : `${activeCategory}`,
        }

        return queries;
    }

    // สร้าง debounced function
    const debouncedFetchPosts = useCallback(
        debounce((searchTerm) => {
            fetchPosts(searchTerm)
        }, 500), // รอ 500ms
        []
    )

    const handleCategory = (category) => {
        setActiveCategory(category);
        setPage(1);
    }

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1); // เพิ่มหมายเลขหน้าเพื่อโหลดข้อมูลเพิ่ม
    }

    const handleSearch = (e) => {
        const value = e.target.value
        setSearch(value)
        debouncedFetchPosts(value)
        console.log(value);

    }

    useEffect(() => {
        fetchPosts()
        window.scrollTo(0, 0)
    }, [page, activeCategory], search)

    useEffect(() => {
        if (search) {
            setPage(1); // reset page เมื่อมีการ search
        }
    }, [search])

    return (
        <>
            <section  >
                <h2 className="text-2xl font-semibold m-6">
                    Latest articles
                </h2>

                <div className="bg-brown-200 p-4 rounded-xl ">
                    {/* Mobile Layout */}
                    <div className="md:hidden space-y-4">
                        {/* Search Bar */}

                        <InputSearch
                            value={search}
                            onChange={handleSearch}
                        />

                        {/* Category Dropdown */}
                        <div className="space-y-2">
                            <label className="text-gray-600 text-sm">
                                Category
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full p-4 rounded-xl border border-gray-300  text-gray-800 bg-white appearance-none focus:outline-non"
                                    value={activeCategory}
                                    onChange={(e) =>
                                        handleCategory(e.target.value)
                                    }
                                >
                                    {
                                        categories.map((category) => (
                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </option>
                                        ))
                                    }
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
                                        className={`${category === activeCategory
                                            ? "bg-brown-300 text-brown-500" // สีปุ่มเมื่อถูกเลือก
                                            : "text-brown-400 hover:bg-brown-300" // สีปุ่มเมื่อไม่ได้ถูกเลือก
                                            } px-4 py-2 rounded
                                     `}
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
                            <div className=" md:w-72">
                                <InputSearch
                                    value={search} onChange={handleSearch}
                                />
                            </div>

                        </div>
                    </div>
                </div >
            </section >

            <section className="py-12">
                {/* BlogCard */}
                < div className="grid grid-cols-1 gap-10 md:grid-cols-2" >
                    {
                        blogPosts.map((item) =>
                            <BlogCard
                                key={item.id}
                                id={item.id}
                                image={item.image}
                                category={item.category}
                                title={item.title}
                                description={item.description}
                                author={item.author}
                                date={formatDate(item.date)}
                            />
                        )
                    }
                </div >

                {/* View more */}
                {
                    hasMore &&
                    (
                        <div className="text-center mt-8">
                            <button
                                onClick={handleLoadMore}
                                className="text-brown-600 hover:text-muted-foreground font-medium underline"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex flex-col items-center ">
                                        <Loader2 className="h-10 w-10 animate-spin" />
                                        Loading...
                                    </div>
                                ) : (
                                    "View more"
                                )}
                            </button>
                        </div>
                    )
                }
            </section >
        </>
    );
};
import { ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import debounce from 'lodash.debounce'
import {
    SelectItem,
} from "@/components/ui/select";

import BlogCard from "./BlogCard.jsx";
import PostService from "../../services/postService.js";
import { formatDate } from "../../utils/formatDate.js";
import InputSearch from "../input/InputSearch.jsx";
import AppSelect from "../input/AppSelect.jsx";


const categoryData = ["Highlight", "Cat", "Inspiration", "General"];

export function ArticleSection() {
    const [activeCategory, setActiveCategory] = useState("Highlight");
    const [blogPosts, setblogPosts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [iserror, setError] = useState("");

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const fetchPosts = async (searchTerm = search) => {
        setLoading(true);

        let result = {};
        try {
            result = await PostService.getAllPost(setQuery(searchTerm));

            console.log("result", result.posts);
            if (page === 1) {
                setblogPosts(result.posts);
            }
            else {
                setblogPosts([...blogPosts, ...result.posts]);
            }
            console.log("try", blogPosts);

            // Update suggestions when searching
            if (searchTerm && Array.isArray(result.posts)) {
                setSuggestions(result.posts.slice(0, 8));
            } else {
                setSuggestions([]);
            }

            if (result.currentPage >= result.totalPages) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
        } catch (err) {
            setError("โหลดข้อมูลไม่สำเร็จ");
        } finally {
            setLoading(false);
            console.log("finally", blogPosts);
        }

        console.log("out", blogPosts);
        return result;
    };

    const fetchSuggestions = async (searchTerm) => {
        setLoading(true);

        let result = {};
        try {
            result = await PostService.getPostBykeyword(searchTerm);

            // Update suggestions when searching
            if (searchTerm && Array.isArray(result.posts)) {
                setSuggestions(result.posts.slice(0, 8));
            } else {
                setSuggestions([]);
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

    // เพิ่มหมายเลขหน้าเพื่อโหลดข้อมูลเพิ่ม
    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    }

    const handleSearch = (e) => {
        const value = e.target.value
        setSearch(value)
        setPage(1);
        fetchSuggestions(value)
        debouncedFetchPosts(value)
    }

    const handleSelectSuggestion = (post) => {
        // Clear dropdown and go to the post page
        setSuggestions([]);
        setSearch("");
        navigate(`/view-post/${post.id}`);
    }

    useEffect(() => {
        fetchPosts()
        // window.scrollTo(0, 0)
    }, [page, activeCategory, search])

    // useEffect(() => {
    //     if (search) {
    //         setPage(1); // reset page เมื่อมีการ search
    //     }
    // }, [search])

    return (
        <div>
            <section>
                <h2 className="text-2xl font-semibold m-6 m">
                    Latest articles
                </h2>

                <div className="bg-brown-200 p-4 rounded-xl ">
                    {/* Mobile Layout */}
                    <div className="md:hidden space-y-4">
                        {/* Search Bar */}
                        <InputSearch
                            value={search}
                            onChange={handleSearch}
                            suggestions={suggestions}
                            onSelectSuggestion={handleSelectSuggestion}
                        />

                        {/* Category Dropdown */}
                        <AppSelect
                            value={activeCategory}
                            onValueChange={(e) => {
                                console.log(e);

                                handleCategory(e)
                            }}
                            placeholder="Select category"
                            selectContent={
                                categoryData.map((item, index) => {
                                    return (
                                        <SelectItem key={index} value={item}>
                                            {item}
                                        </SelectItem>
                                    );
                                })}
                        >
                        </AppSelect>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:block">
                        <div className=" p-4 rounded-xl flex flex-col md:flex-row md:justify-between items-center gap-4">
                            {/* Tabs */}
                            <div className="flex gap-6">
                                {categoryData.map((category) => (
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
                                    value={search}
                                    onChange={handleSearch}
                                    suggestions={suggestions}
                                    onSelectSuggestion={handleSelectSuggestion}
                                />
                            </div>

                        </div>
                    </div>
                </div >
            </section >
            <section className="py-12 md:px-0 px-5">
                {/* BlogCard */}
                < div className="grid grid-cols-1 gap-10 md:grid-cols-2" >
                    {
                        blogPosts.map((item, index) =>
                            <BlogCard
                                key={`${item.id}-${index}`}
                                id={item.id}
                                image={item.image}
                                category={item.category}
                                title={item.title}
                                description={item.description}
                                author={item.author}
                                authorImg={item.author_img}
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
        </div>
    );
};
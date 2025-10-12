import { ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import debounce from 'lodash.debounce'
import {
    SelectItem,
} from "@/components/ui/select";

import BlogCard from "./BlogCard.jsx";
import { PostService } from "../../services/postService.js";
import { formatDate } from "../../utils/formatDate.js";
import InputSearch from "../input/InputSearch.jsx";
import AppSelect from "../input/AppSelect.jsx";
import { usePosts } from "../../hooks/usePosts.js";
import { useSearch } from "../../hooks/useSearch.js";

const categoryData = ["Highlight", "Cat", "Inspiration", "General"];

export function ArticleSection() {
    const {
        blogPosts,
        isLoading,
        page,
        hasMore,
        activeCategory,
        setPage,
        fetchPosts,
        handleCategory,
        handleLoadMore,
    } = usePosts();

    const {
        search,
        suggestions,
        handleSearch,
        handleSelectSuggestion,
    } = useSearch(fetchPosts, setPage);

    useEffect(() => {
        fetchPosts(search);
    }, [page, activeCategory]);

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
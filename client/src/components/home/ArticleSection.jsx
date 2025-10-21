import { useEffect } from "react";
import {
    SelectItem,
} from "@/components/ui/select";

import BlogCard from "./BlogCard.jsx";
import { formatDate } from "../../utils/formatDate.js";
import InputSearch from "../input/InputSearch.jsx";
import AppSelect from "../input/AppSelect.jsx";
import { usePosts } from "../../hooks/usePosts.js";
import { useSearch } from "../../hooks/useSearch.js";
import { LoadingPage } from "../loading/LoadingPage.jsx";
import CategoryTabs from "../tag/CategoryTabs.jsx";

export function ArticleSection() {
    const {
        blogPosts,
        isLoading,
        page,
        hasMore,
        activeCategory,
        categoriesData,
        setPage,
        fetchPosts,
        fetchcategories,
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
        fetchcategories();
    }, []);

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
                                handleCategory(e)
                            }}
                            placeholder="Select category"
                            selectContent={
                                categoriesData.map((item, index) => {
                                    return (
                                        <SelectItem
                                            key={`${item.id}-${index}`}
                                            value={item.name}>
                                            {item.name}
                                        </SelectItem>
                                    );
                                })}
                        >
                        </AppSelect>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:block">
                        <div className="p-4 rounded-xl flex flex-col md:flex-row md:justify-between items-center gap-4">

                            {/* Tabs แยกออกมาใน div ของมันเอง */}
                            <div className="flex-1 w-full md:w-auto overflow-hidden">
                                <CategoryTabs
                                    categoriesData={categoriesData}
                                    activeCategory={activeCategory}
                                    handleCategory={handleCategory}
                                />
                            </div>

                            {/* Search */}
                            <div className="w-full md:w-72 shrink-0">
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
                                {isLoading
                                    ? (<LoadingPage />)
                                    : ("View more")}
                            </button>
                        </div>
                    )
                }
            </section >
        </div>
    );
};
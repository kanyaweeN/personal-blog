import { useState, useCallback } from "react";
import debounce from 'lodash.debounce';
import { PostService } from "../services/postService";
import { statusService } from "../services/statusService";
import { categoriesService } from "../services/categoriesService";

export const usePosts = (initialLimit = 6, initialStatusid = 2) => {
    const [blogPosts, setblogPosts] = useState([]);
    const [statusData, setStatusData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);

    const [isLoading, setLoading] = useState(false);
    const [iserror, setError] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [activeCategory, setActiveCategory] = useState("Highlight");
    const [limit, setLimit] = useState(initialLimit);
    const [statusid, setStatusid] = useState(initialStatusid);

    const setQuery = (searchTerm) => {
        const queries = {
            page: page,
            limit: limit,
            keyword: searchTerm,
            category: activeCategory === "Highlight" ? "" : `${activeCategory}`,
            statusid: statusid
        }
        console.log("queries", queries);

        return queries;
    }

    const fetchPosts = useCallback(async (searchTerm = "") => {
        setLoading(true);

        let result = {};
        try {
            result = await PostService.getAllPost(setQuery(searchTerm));

            if (page === 1) {
                setblogPosts(result.posts);
            } else {
                setblogPosts(prev => [...prev, ...result.posts]);
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
        }

        return result;
    }, [page, activeCategory]);

    const fetchcategories = useCallback(async () => {
        setLoading(true);

        let result = {};
        try {
            result = await categoriesService.getAll()

            let newdata = [
                {
                    id: 0,
                    name: "Highlight"
                },
                ...result
            ]

            setCategoriesData(newdata);
        } catch (err) {
            setError("โหลดข้อมูลไม่สำเร็จ");
            setCategoriesData({
                id: 0,
                name: "Highlight"
            },);
        } finally {
            setLoading(false);
        }

        return result;
    }, []);

    const fetchStatus = useCallback(async () => {
        setLoading(true);

        let result = {};
        try {
            result = await statusService.getAll()
            let newdata = [
                {
                    id: 0,
                    status: "All"
                },
                ...result
            ]

            setStatusData(newdata);
        } catch (err) {
            setError("โหลดข้อมูลไม่สำเร็จ");
            setStatusData({
                id: 0,
                status: "All"
            },);
        } finally {
            setLoading(false);
        }

        return result;
    }, []);

    const handleCategory = (category) => {
        setActiveCategory(category);
        setPage(1);
    }

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    }

    return {
        limit,
        setLimit,
        statusid,
        setStatusid,

        blogPosts,
        statusData,
        categoriesData,

        isLoading,
        iserror,
        page,
        hasMore,
        activeCategory,
        setPage,

        fetchPosts,
        fetchcategories,
        fetchStatus,

        handleCategory,
        handleLoadMore,
    };
};
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import debounce from 'lodash.debounce';
import { PostService } from "../services/postService";

export const useSearch = (fetchPosts, setPage) => {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [iserror, setError] = useState("");
    const navigate = useNavigate();

    const fetchSuggestions = async (searchTerm) => {
        setLoading(true);

        let result = {};
        try {
            result = await PostService.getPostBykeyword(searchTerm);

            if (searchTerm && Array.isArray(result.data.posts)) {
                setSuggestions(result.data.posts.slice(0, 8));
            } else {
                setSuggestions([]);
            }
        } catch (err) {
            setError("โหลดข้อมูลไม่สำเร็จ");
        } finally {
            setLoading(false);
        }
        return result;
    };

    const debouncedFetchPosts = useCallback(
        debounce((searchTerm) => {
            fetchPosts(searchTerm)
        }, 500),
        [fetchPosts]
    );

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        setPage(1);
        fetchSuggestions(value);
        debouncedFetchPosts(value);
    }

    const handleSelectSuggestion = (post) => {
        setSuggestions([]);
        setSearch("");
        navigate(`/view-post/${post.id}`);
    }

    return {
        search,
        suggestions,
        isLoading,
        iserror,
        handleSearch,
        handleSelectSuggestion,
    };
};
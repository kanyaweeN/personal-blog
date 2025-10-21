import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppToast } from "../hooks/useAppToast.jsx";
import { usePosts } from "../hooks/usePosts.js";
import { useAuth } from "../contexts/authentication.jsx";
import { PostService } from "../services/postService.js";
import { useImageUpload } from "../hooks/useImageUpload.js";

export function useArticleForm() {
    const { state } = useAuth();
    const param = useParams();
    const navigate = useNavigate();
    const { success, error } = useAppToast();
    const {
        fetchcategories,
        fetchPostsById,
        categoriesData
    } = usePosts();

    const {
        fileInputRef,
        imageFile,
        errorImage,
        previewUrl,
        handleUploadClick,
        handleFileChange
    } = useImageUpload();

    const id = param.postId;
    const [isLoadingData, setLoadingData] = useState(false);
    const [category, setCategory] = useState({ id: 0, name: "Highlight" });
    const [blogPosts, setBlogPosts] = useState({
        id: 0,
        image: "",
        category_id: 0,
        category_name: "",
        title: "",
        description: "",
        author: "",
        author_img: "",
        bio: "",
        date: "",
        content: "",
        likes: 0,
        status_id: 0,
        status_status: ""
    });
    const [errorInput, setErrorInput] = useState({ title: "", content: "", description: "", image: "" });


    // รวม error จาก useImageUpload ด้วย
    useEffect(() => {
        if (errorImage) setErrorInput((prev) => ({ ...prev, image: errorImage }));
    }, [errorImage]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlogPosts((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategory = (value) => {
        const selected = categoriesData.find((item) => item.name === value);
        if (selected) setCategory(selected);
    };

    const checkData = () => {
        let err = {};
        if (!blogPosts.title) err.title = "Please enter your title.";
        if (!blogPosts.content) err.content = "Please enter your content";
        if (!blogPosts.description) err.description = "Please enter your description";
        setErrorInput(err);
        return Object.keys(err).length === 0;
    };

    const fetchData = async () => {
        setLoadingData(true);
        if (id) {
            const result = await fetchPostsById(id);
            setBlogPosts(result);
            setCategory({
                id: result.category_id || 0,
                name: result.category_name || "Highlight"
            });
        } else if (state.user) {
            setBlogPosts((prev) => ({ ...prev, author: state.user.name }));
        }
        setLoadingData(false);
    };

    const saveData = async (status_id) => {
        setLoadingData(true);
        try {
            const formData = new FormData();
            formData.append("id", blogPosts.id);
            formData.append("anthor_id", state.user.id);
            formData.append("category_id", category.id);
            formData.append("title", blogPosts.title);
            formData.append("description", blogPosts.description);
            formData.append("content", blogPosts.content);
            formData.append("status_id", status_id);
            formData.append("likes_count", 0);

            if (imageFile) formData.append("imageFile", imageFile);
            else formData.append("image", blogPosts.image);

            if (!id || id === 0) await PostService.create(formData);
            else await PostService.updateById(id, formData);

            return true;
        } catch {
            error("Error", "Failed to save article");
            return false;
        } finally {
            setLoadingData(false);
        }
    };

    const handleSave = async (mode) => {
        const canSave = checkData();
        if (canSave) {
            const result = await saveData(mode);
            if (result) {
                success(
                    mode === 1
                        ? "Create article and saved as draft"
                        : "Create article and published",
                    mode === 1
                        ? "You can publish article later"
                        : "Your article has been successfully published"
                );
                navigate("/admin/article-manament");
            } else {
                error(
                    mode === 1
                        ? "Create article and saved as draft"
                        : "Create article and published",
                    mode === 1
                        ? "You can not draft article"
                        : "You can not publish article"
                );
            }
        }
    };

    useEffect(() => {
        fetchcategories();
        fetchData();
    }, [id, state.user]);

    return {
        id,
        isLoadingData,
        fileInputRef,
        imageFile,
        category,
        blogPosts,
        categoriesData,
        errorInput,
        previewUrl,
        handleUploadClick,
        handleFileChange,
        handleInputChange,
        handleCategory,
        handleSave
    };
}

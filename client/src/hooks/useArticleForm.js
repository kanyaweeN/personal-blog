import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppToast } from "../hooks/useAppToast.jsx";
import { usePosts } from "../hooks/usePosts.js";
import { useAuth } from "../contexts/authentication.jsx";
import { PostService } from "../services/postService.js";
import { MAX_FILE_SIZE } from "../utils/regex.js";

export function useArticleForm() {
    const { state } = useAuth();
    const param = useParams();
    const navigate = useNavigate();
    const { success, error } = useAppToast();
    const { fetchcategories, fetchPostsById, categoriesData } = usePosts();

    const id = param.postId;
    const fileInputRef = useRef(null);

    const [isLoadingData, setLoadingData] = useState(false);
    const [imageFile, setImageFile] = useState(null);
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
    const [errorInput, setErrorInput] = useState({ title: "", content: "", description: "" });

    const previewUrl = useMemo(() => {
        if (imageFile instanceof File) return URL.createObjectURL(imageFile);
        return null;
    }, [imageFile]);

    const handleUploadClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const validateImageFile = useCallback((file) => {
        if (!file.type.startsWith("image/"))
            return "Please upload a valid image file (JPEG, PNG, GIF, WebP)";
        if (file.size > MAX_FILE_SIZE)
            return "The file is too large. Please upload an image smaller than 5MB.";
        return "";
    }, []);

    const handleFileChange = useCallback(
        (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const validationError = validateImageFile(file);
            if (validationError) {
                setErrorInput((prev) => ({ ...prev, image: validationError }));
                return;
            }
            setImageFile(file);
            setErrorInput((prev) => ({ ...prev, image: "" }));
        },
        [validateImageFile]
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlogPosts((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategory = (value) => {
        const selected = categoriesData.find((item) => item.name === value);
        if (selected) setCategory(selected);
    };

    const checkData = () => {
        let err = {}
        if (!blogPosts.title) {
            err.title = "Please enter your title.";
        }

        if (!blogPosts.content) {
            err.content = "Please enter your content";
        }

        if (!blogPosts.description) {
            err.description = "Please enter your description";
        }

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
            setBlogPosts((prev) => ({
                ...prev,
                author: state.user.name
            }));
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

            if (imageFile) {
                formData.append("imageFile", imageFile);
            } else {
                formData.append("image", blogPosts.image);
            }

            if (id === 0 || !id) {
                await PostService.create(formData);
            } else {
                await PostService.updateById(id, formData);
            }

            return true;
        } catch (err) {
            error("Error", "Failed to save article");
            return false;
        } finally {
            setLoadingData(false);
        }
    };

    const handleSave = async (mode) => {
        const canSave = checkData()

        if (canSave) {
            const result = await saveData(mode)
            if (result) {
                switch (mode) {
                    case 1: //draft
                        success(
                            "Create article and saved as draft",
                            "You can publish article later"
                        );
                        break;
                    case 2: //publish
                        success(
                            "Create article and published",
                            "Your article has been successfully published"
                        );
                        break;
                }
                navigate("/admin/article-manament")
            } else {
                switch (mode) {
                    case 1: //draft
                        error(
                            "Create article and saved as draft",
                            "You can not draft article"
                        );
                        break;
                    case 2: //publish
                        error(
                            "Create article and published",
                            "You can not published article"
                        );
                        break;
                }
            }
        }
    };

    useEffect(() => {
        fetchcategories();
        fetchData();
    }, [id, state.user]);

    useEffect(() => {
        return () => previewUrl && URL.revokeObjectURL(previewUrl);
    }, [previewUrl]);

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

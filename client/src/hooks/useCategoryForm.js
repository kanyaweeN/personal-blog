import { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { categoriesService } from "../services/categoriesService.js";
import { useAppToast } from "./useAppToast.jsx";

export function useCategoryForm(id) {
    const navigate = useNavigate();
    const { success, error: toastError } = useAppToast();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState({
        id: 0,
        name: ""
    });

    // Fetch data if editing
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await categoriesService.getById(id);
            setData(result);
            setError("");
        } catch (err) {
            console.error("Fetch category error:", err);
            setError("Failed to load category data");
            toastError("Load failed", "Could not load category data");
        } finally {
            setIsLoading(false);
        }
    }, [id, toastError]);

    // Create or update category
    const saveData = useCallback(async () => {
        setIsLoading(true);
        try {
            if (id) {
                await categoriesService.updateById(data);
            } else {
                await categoriesService.create(data);
            }
            return true;
        } catch (err) {
            console.error("Save category error:", err);
            setError("Failed to save category");
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [id, data]);

    // Handle input change
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError("");
    }, []);

    // Handle submit
    const handleSubmit = useCallback(async () => {
        // Validate
        if (!data.name?.trim()) {
            toastError("Validation error", "Category name is required");
            setError("Category name is required");
            return;
        }

        // Save
        const success_result = await saveData();

        if (success_result) {
            navigate("/admin/category-management");
            success(
                id ? "Updated category" : "Created category",
                `Category has been successfully ${id ? "updated" : "created"}.`
            );
        } else {
            toastError(
                id ? "Update failed" : "Create failed",
                `Category could not be ${id ? "updated" : "created"}`
            );
        }
    }, [data.name, saveData, navigate, success, toastError, id]);

    // Load data on mount
    useEffect(() => {
        if (id)
            fetchData()
    }, [id])

    return {
        data,
        isLoading,
        error,
        handleInputChange,
        handleSubmit,
    };
}
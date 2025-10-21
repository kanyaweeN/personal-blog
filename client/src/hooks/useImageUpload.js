// hooks/useImageUpload.js
import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { MAX_FILE_SIZE } from "../utils/regex";

export function useImageUpload() {
    const fileInputRef = useRef(null);
    const [imageFile, setImageFile] = useState(null);
    const [errorImage, setErrorImage] = useState("");

    const validateImageFile = useCallback((file) => {
        if (!file.type.startsWith("image/"))
            return "Please upload a valid image file (JPEG, PNG, GIF, WebP)";
        if (file.size > MAX_FILE_SIZE)
            return "The file is too large. Please upload an image smaller than 5MB.";
        return "";
    }, []);

    const handleUploadClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileChange = useCallback(
        (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const validationError = validateImageFile(file);
            if (validationError) {
                setErrorImage(validationError);
                return;
            }
            setImageFile(file);
            setErrorImage("");
        },
        [validateImageFile]
    );

    const previewUrl = useMemo(() => {
        if (imageFile instanceof File) return URL.createObjectURL(imageFile);
        return null;
    }, [imageFile]);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    return {
        fileInputRef,
        imageFile,
        errorImage,
        previewUrl,
        handleUploadClick,
        handleFileChange,
        setErrorImage,
        setImageFile
    };
}

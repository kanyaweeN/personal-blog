import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { AppButton } from "../../components/button/AppButton.jsx";
import InputField from "../../components/input/InputField.jsx";
import { useAppToast } from '../../hooks/useAppToast.jsx';
import { categoriesService } from "../../services/categoriesService.js";
import { LoadingDot } from "../../components/loading/LoadingDot.jsx";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import { useCategoryForm } from "../../hooks/useCategoryForm.js";

function CreateCategoryPage() {
    const { id } = useParams();
    const {
        data,
        isLoading,
        error,
        handleInputChange,
        handleSubmit,
    } = useCategoryForm(id);

    return (
        <AdminLayout>
            {
                isLoading
                    ? <LoadingDot />
                    : <main className="flex-1 p-10">
                        {/* Header */}
                        <header className="flex justify-between items-center mb-5 border-b pb-5">
                            <h2 className="text-xl font-bold">
                                Category management
                            </h2>
                            <AppButton
                                style="icondark"
                                onClick={handleSubmit}
                            >
                                Save
                            </AppButton>
                        </header>
                        <section>
                            <div className="text-brown-400 space-y-4">
                                <label className="text-sm font-medium " htmlFor="category">Category name</label>
                                <InputField
                                    id="name"
                                    name="name"
                                    value={data.name || ""}
                                    placeholder="Enter category name"
                                    onChange={handleInputChange}
                                    error={error}
                                    showErrorText={true}
                                    disabled={isLoading}
                                />
                            </div>
                        </section>
                    </main>
            }
        </AdminLayout>
    );
}

export default CreateCategoryPage
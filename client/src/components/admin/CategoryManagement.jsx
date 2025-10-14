import { Pencil, Trash2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { AppButton } from "../button/AppButton.jsx";
import { useNavigate } from 'react-router-dom';
import Alert from "../alert/Alert.jsx";
import { useAppToast } from '../../hooks/useAppToast.jsx';
import InputField from "../input/InputField.jsx";
import { usePosts } from "../../hooks/usePosts.js";
import { LoadingDot } from "../loading/LoadingDot.jsx";
import { categoriesService } from "../../services/categoriesService.js";

function CategoryManagement() {
    const navigate = useNavigate();
    const { success, error } = useAppToast();
    const [isLoadingCat, setLoadingCat] = useState(false);
    const [search, setSearch] = useState("");
    const [isOpenAlert, setisOpenAlert] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null); // เก็บ category ที่จะลบ

    const {
        isLoading,
        categoriesData,
        fetchcategories,
    } = usePosts();

    const deleteData = async (id) => {
        setLoadingCat(true);

        try {
            await categoriesService.deleteById(id);
            return true;
        } catch (err) {
            console.error("Delete error:", err);
            return false;
        } finally {
            setLoadingCat(false);
        }
    };

    useEffect(() => {
        fetchcategories();
    }, []);

    const handleDelete = async () => {
        setisOpenAlert(false);

        if (!selectedCategory) return;

        const result = await deleteData(selectedCategory.id);

        if (result) {
            success(
                "Delete category",
                "Category has been successfully deleted."
            );
            // Refresh ข้อมูลหลังลบสำเร็จ
            await fetchcategories();
        } else {
            error(
                "Delete category",
                "Failed to delete category."
            );
        }

        setSelectedCategory(null);
    };

    const handleOpenDeleteAlert = (item) => {
        setSelectedCategory(item);
        setisOpenAlert(true);
    };

    const handleonChange = (e) => {
        setSearch(e.target.value);
    };

    // Filter categories based on search
    const filteredCategories = categoriesData.filter(item =>
        item.id !== 0 &&
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main className="flex-1 p-10">
            {/* Header */}
            <header className="flex justify-between items-center mb-5 border-b pb-5">
                <h2 className="text-xl font-bold">
                    Category management
                </h2>
                <AppButton
                    style="icondark"
                    onClick={() => navigate("/admin/category-management/create-category")}
                >
                    <Plus size={16} />
                    Create category
                </AppButton>
            </header>

            {/* Search + Filters */}
            <section className="flex gap-4 mb-4">
                <InputField
                    id="title"
                    name="title"
                    placeholder="Search..."
                    value={search}
                    onChange={handleonChange}
                />
            </section>

            {/* Loading state */}
            {(isLoading || isLoadingCat) ? (
                <LoadingDot />
            ) : (
                <section className="bg-white rounded-xl shadow p-6">
                    {/* Table */}
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="text-left border-b">
                                <th className="py-2 px-3">Category</th>
                                <th className="py-2 px-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((item, index) => (
                                    <tr key={`${item.id}-${index}`} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-3">
                                            {item.name}
                                        </td>
                                        <td className="py-3 px-3 text-right space-x-2">
                                            <button
                                                className="text-gray-600 hover:text-black"
                                                onClick={() => navigate(`/admin/category-management/create-category/${item.id}`)}
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleOpenDeleteAlert(item)}
                                                className="text-gray-600 hover:text-red-500"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="py-8 text-center text-gray-500">
                                        No categories found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            )}

            <Alert
                open={isOpenAlert}
                onOpenChange={setisOpenAlert}
                title="Delete category"
                detail={`Do you want to delete "${selectedCategory?.name}" category?`}
                acceptOnClick={handleDelete}
                acceptText="Delete"
                cancelText="Cancel"
            />
        </main>
    );
}

export default CategoryManagement;
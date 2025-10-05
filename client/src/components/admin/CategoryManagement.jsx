import { Pencil, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { AppButton } from "../button/AppButton.jsx";
import { useNavigate } from 'react-router-dom';
import Alert from "../alert/Alert.jsx";
import { useAppToast } from '../../hooks/useAppToast.jsx';
import InputField from "../input/InputField.jsx";

function CategoryManagement() {
    const navigate = useNavigate();
    const { error } = useAppToast();
    const [search, setSearch] = useState("");
    const [isOpenAlert, setisOpenAlert] = useState(false);

    const categoryData = ["Highlight", "Cat", "Inspiration", "General"];

    const handleDelete = () => {
        setisOpenAlert(false)

        error(
            "Delete category",
            "Category has been successfully deleted."
        );

    }


    const handleonChange = (e) => {
        setSearch(e.target.value);
    }

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
                        {categoryData.map((item, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-3">{item}</td>
                                <td className="py-3 px-3 text-right space-x-2">
                                    <button
                                        className="text-gray-600 hover:text-black"
                                        onClick={() => navigate("/admin/category-management/create-category")}
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => setisOpenAlert(true)}
                                        className="text-gray-600 hover:text-red-500">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <Alert
                open={isOpenAlert}
                onOpenChange={setisOpenAlert}
                title="Delete category"
                detail="Do you want to delete this category?"
                acceptOnClick={handleDelete}
                acceptText="Delete"
                cancelText="Cancel"
            />
        </main>
    );
}

export default CategoryManagement;

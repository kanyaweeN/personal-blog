import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AppButton } from "../../common/AppButton.jsx";
import InputField from "../../common/InputField.jsx";
import SidebarMenu from "../component/SidebarMenu.jsx";
import { useAppToast } from '../../../hooks/useAppToast.jsx';

function CreateCategoryPage() {
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const { success } = useAppToast();

    const handleonChange = (e) => {
        setText(e.target.value);
        success(
            "Create category",
            "Category has been successfully created."
        )
        navigate("/admin/category-management")
    }

    return (
        <div >
            <main className="flex justify-center h-screen">
                <SidebarMenu />
                <main className="flex-1 p-10">
                    {/* Header */}
                    <header className="flex justify-between items-center mb-5 border-b pb-5">
                        <h2 className="text-xl font-bold">
                            Category management
                        </h2>
                        <AppButton
                            style="icondark"
                            onClick={handleonChange}
                        >
                            Save
                        </AppButton>
                    </header>
                    <section>
                        <div className="text-brown-400 space-y-4">
                            <label className="text-sm font-medium " htmlFor="category">Category name</label>
                            <InputField
                                id="category"
                                name="category"
                                value={text}
                                placeholder="Category name"
                                onChange={handleonChange}
                            />
                        </div>
                    </section>
                </main>
            </main>
        </div>
    );
}

export default CreateCategoryPage
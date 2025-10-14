import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { AppButton } from "../../components/button/AppButton.jsx";
import InputField from "../../components/input/InputField.jsx";
import SidebarMenu from "../../components/admin/SidebarMenu.jsx";
import { useAppToast } from '../../hooks/useAppToast.jsx';
import { categoriesService } from "../../services/categoriesService.js";
import { LoadingDot } from "../../components/loading/LoadingDot.jsx";

function CreateCategoryPage() {
    const param = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [iserror, setError] = useState("");
    const { success, error } = useAppToast();
    const [data, setData] = useState({
        id: 0,
        name: ""
    });
    const id = param.id

    const fetchData = async () => {
        setLoading(true);

        let result = {};
        try {
            result = await categoriesService.getById(id);
            console.log("result", result);

            setData(result);
        } catch (err) {
            setError("โหลดข้อมูลไม่สำเร็จ");
        } finally {
            setLoading(false);
        }
        return result;
    };

    const createData = async () => {
        setLoading(true);

        let result = {};
        try {
            if (id) {
                result = await categoriesService.updateById(data);
            } else {
                result = await categoriesService.create(data);
            }
            return true
        } catch (err) {
            setError("โหลดข้อมูลไม่สำเร็จ");
        } finally {
            setLoading(false);
        }
        return false;
    };

    useEffect(() => {
        if (id)
            fetchData()
    }, [id])

    const handleonChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleonSubmit = async () => {
        if (data.name) {
            const resule = await createData()
            if (resule) {
                navigate("/admin/category-management")
                success(
                    "Create category",
                    "Category has been successfully created."
                )
            } else {
                error(
                    "Create category",
                    "Category cannot create"
                )
            }
        } else {
            error(
                "Create category",
                "Category name is require"
            )
        }
    }


    return (
        <div >
            <main className="flex justify-center h-screen">
                <SidebarMenu />
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
                                    onClick={handleonSubmit}
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
                                        placeholder="Category name"
                                        onChange={handleonChange}
                                    />
                                </div>
                            </section>
                        </main>
                }
            </main>
        </div>
    );
}

export default CreateCategoryPage
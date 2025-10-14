import { Pencil, Trash2, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AppButton } from "../button/AppButton.jsx";
import { useNavigate } from 'react-router-dom';
import Alert from "../alert/Alert.jsx";
import { useAppToast } from '../../hooks/useAppToast.jsx';
import { PostService } from "../../services/postService.js";
import { usePosts } from "../../hooks/usePosts.js";
import { useSearch } from "../../hooks/useSearch.js";
import { LoadingDot } from "../loading/LoadingDot.jsx";

function ArticleManamentContent() {
    const navigate = useNavigate();
    const { success, error } = useAppToast();
    const [iserror, setError] = useState("");
    const [isLoadingSometing, setLoadingSometing] = useState(false);
    const [isOpenAlert, setisOpenAlert] = useState(false);
    const isInitialized = useRef(false);
    const [dataDelete, setDataDelete] = useState(null);

    const {
        limit,
        setLimit,
        statusid,
        setStatusid,
        blogPosts,
        statusData,
        categoriesData,
        isLoading,
        page,
        hasMore,
        activeCategory,
        setPage,
        fetchPosts,
        fetchcategories,
        fetchStatus,
        handleCategory,
        handleLoadMore,
    } = usePosts(100, 0);

    const {
        search,
        suggestions,
        handleSearch,
        handleSelectSuggestion,
    } = useSearch(fetchPosts, setPage);

    useEffect(() => {
        fetchcategories();
        fetchStatus();
        fetchPosts();
    }, []);

    const deleteData = async (id) => {
        setLoadingSometing(true);

        try {
            await PostService.deleteById(id);
            return true;
        } catch (err) {
            console.error("Delete error:", err);
            return false;
        } finally {
            setLoadingSometing(false);
        }
    };

    const handleOpenDeleteAlert = (item) => {
        setisOpenAlert(true);
        console.log(item);

        setDataDelete(item)
    };

    const handleDelete = async () => {
        const result = await deleteData(dataDelete.id);

        setisOpenAlert(false)
        if (result) {
            success(
                "Post category",
                "Post has been successfully deleted."
            );
            await fetchPosts();
        } else {
            error(
                "Post category",
                "Failed to delete post"
            );
        }
        setDataDelete(null)
    }

    return (
        <main className="flex-1 p-10">
            {/* Header */}
            <header className="flex justify-between items-center mb-5 border-b pb-5">
                <h2 className="text-xl font-bold">
                    Article management
                </h2>
                <AppButton
                    style="icondark"
                    onClick={() => navigate("/admin/article-manament/cerate-article")}
                >
                    <Plus size={16} />
                    Create article
                </AppButton>
            </header>
            {(isLoading || isLoadingSometing) ?
                <LoadingDot />
                : <>
                    {/* Search + Filters */}
                    <section className="flex gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-3 py-2 border rounded-md text-sm"
                        />
                        <select className="px-3 py-2 border rounded-md text-sm">
                            {
                                statusData.map((item) => {
                                    return <option key={item.id}>{item.status}</option>
                                })
                            }
                        </select>
                        <select className="px-3 py-2 border rounded-md text-sm">
                            {
                                categoriesData.map((item) => {
                                    return <option key={item.id}>{item.name}</option>
                                })}
                        </select>
                    </section>

                    <section className="bg-white rounded-xl shadow p-6">
                        {/* Table */}
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="text-left border-b">
                                    <th className="py-2 px-3">Article title</th>
                                    <th className="py-2 px-3">Category</th>
                                    <th className="py-2 px-3">Status</th>
                                    <th className="py-2 px-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogPosts.map((article, idx) => (
                                    <tr key={idx} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-3">{article.title}</td>
                                        <td className="py-3 px-3">{article.category}</td>
                                        <td className="py-3 px-3 text-green font-medium">• {article.status}</td>
                                        <td className="py-3 px-3 text-right space-x-2">
                                            <button
                                                className="text-gray-600 hover:text-black"
                                                onClick={() => navigate(`/admin/article-manament/cerate-article/${article.id}`)}
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleOpenDeleteAlert(article)}
                                                className="text-gray-600 hover:text-red-500">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>

                </>
            }
            <Alert
                open={isOpenAlert}
                onOpenChange={setisOpenAlert}
                title="Delete article"
                detail="Do you want to delete this article?"
                acceptOnClick={handleDelete}
                acceptText="Delete"
                cancelText="Cancel"
            />
        </main>
    );
}

export default ArticleManamentContent;

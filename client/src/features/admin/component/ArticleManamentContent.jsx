import { Pencil, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { AppButton } from "../../common/AppButton";
import { useNavigate } from 'react-router-dom';
import Alert from "../../common/Alert";
import { useAppToast } from '../../../hooks/useAppToast.jsx';

function ArticleManamentContent() {
    const navigate = useNavigate();
    const { error } = useAppToast();
    const [isOpenAlert, setisOpenAlert] = useState(false);

    const [articles] = useState([
        { title: "Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do", category: "Cat", status: "Published" },
        { title: "The Fascinating World of Cats: Why We Love Our Furry Friends", category: "Cat", status: "Published" },
        { title: "Finding Motivation: How to Stay Inspired Through Life’s Challenges", category: "General", status: "Published" },
        { title: "The Science of the Cat’s Purr: How It Benefits Cats and Humans Alike", category: "Cat", status: "Published" },
        { title: "Top 10 Health Tips to Keep Your Cat Happy and Healthy", category: "Cat", status: "Published" },
        { title: "Unlocking Creativity: Simple Habits to Spark Inspiration Daily", category: "Inspiration", status: "Published" },
    ]);
    const statusData = ["Status", "Published", "Draft"];
    const categoryData = ["Highlight", "Cat", "Inspiration", "General"];

    const handleDelete = () => {
        setisOpenAlert(false)

        error(
            "Post category",
            "Post has been successfully deleted."
        );

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
                            return <option key={item}>{item}</option>
                        })
                    }
                </select>
                <select className="px-3 py-2 border rounded-md text-sm">
                    {categoryData.map((item) => {
                        return <option key={item}>{item}</option>
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
                        {articles.map((article, idx) => (
                            <tr key={idx} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-3">{article.title}</td>
                                <td className="py-3 px-3">{article.category}</td>
                                <td className="py-3 px-3 text-green font-medium">• {article.status}</td>
                                <td className="py-3 px-3 text-right space-x-2">
                                    <button
                                        className="text-gray-600 hover:text-black"
                                        onClick={() => navigate("/admin/article-manament/cerate-article")}
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

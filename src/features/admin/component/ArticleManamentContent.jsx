import { Pencil, Trash2, Plus } from "lucide-react";
import { useState } from "react";

function ArticleManamentContent() {
    const [articles] = useState([
        { title: "Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do", category: "Cat", status: "Published" },
        { title: "The Fascinating World of Cats: Why We Love Our Furry Friends", category: "Cat", status: "Published" },
        { title: "Finding Motivation: How to Stay Inspired Through Life’s Challenges", category: "General", status: "Published" },
        { title: "The Science of the Cat’s Purr: How It Benefits Cats and Humans Alike", category: "Cat", status: "Published" },
        { title: "Top 10 Health Tips to Keep Your Cat Happy and Healthy", category: "Cat", status: "Published" },
        { title: "Unlocking Creativity: Simple Habits to Spark Inspiration Daily", category: "Inspiration", status: "Published" },
    ]);

    return (
        <main className="flex-1 p-10">
            <div className="bg-white rounded-xl shadow p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium">Article management</h2>
                    <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 text-sm">
                        <Plus size={16} /> Create article
                    </button>
                </div>

                {/* Search + Filters */}
                <div className="flex gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-3 py-2 border rounded-md text-sm"
                    />
                    <select className="px-3 py-2 border rounded-md text-sm">
                        <option>Status</option>
                        <option>Published</option>
                        <option>Draft</option>
                    </select>
                    <select className="px-3 py-2 border rounded-md text-sm">
                        <option>Category</option>
                        <option>Cat</option>
                        <option>General</option>
                        <option>Inspiration</option>
                    </select>
                </div>

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
                                <td className="py-3 px-3 text-green-600 font-medium">• {article.status}</td>
                                <td className="py-3 px-3 text-right space-x-2">
                                    <button className="text-gray-600 hover:text-black"><Pencil size={16} /></button>
                                    <button className="text-gray-600 hover:text-red-500"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default ArticleManamentContent;

import { useNavigate } from 'react-router-dom';
import { ImageIcon, X } from "lucide-react";
import { useState } from "react";
import { AppButton } from "../../common/AppButton";
import {
    SelectItem,
} from "@/components/ui/select";
import InputField from "../../common/InputField";
import TextArea from "../../common/TextArea";
import AppSelect from "../../common/AppSelect";
import { useAppToast } from '../../../hooks/useAppToast.jsx';

function CreateArticleContent() {
    const navigate = useNavigate();
    const { success } = useAppToast();
    const [post, setPost] = useState({
        image: "",
        categoryId: null,
        title: "",
        description: "",
        date: null,
        content: "",
        statusId: null,
    });
    const [category, setCategory] = useState("Highlight");
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

    const handleInputonChange = (e) => {
        const { name, value } = e.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    const handleSave = (mode) => {
        switch (mode) {
            case 1: //draft
                success(
                    "Create article and saved as draft",
                    "You can publish article later"
                );
                break;
            case 2: //publish
                success(
                    "Create article and published",
                    "Your article has been successfully published"
                );
                break;
        }

        navigate("/admin/article-manament")
    }


    return (
        <main className="flex-1 p-10">
            {/* Header */}
            <header className="flex justify-between items-center mb-5 border-b pb-5">
                <h2 className="text-xl font-bold">
                    Create article
                </h2>
                <div className="flex gap-2">
                    <AppButton
                        onClick={() => handleSave(1)}
                    >
                        Save as draft
                    </AppButton>
                    <AppButton
                        onClick={() => handleSave(2)}
                        style="dark"
                    >
                        Save and publish
                    </AppButton>
                </div>
            </header>

            {/* Thumbnail */}
            <form className="text-brown-400 space-y-4">
                <div className="flex items-end gap-3">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Thumbnail Image
                        </label>
                        <div className="w-64 h-40 border rounded-md flex items-center justify-center bg-brown-200">
                            <span className="text-sm">
                                <ImageIcon className="mx-auto h-8 w-8" />
                            </span>
                        </div>
                    </div>
                    <div>
                        <AppButton>
                            Upload thumbnail image
                        </AppButton>
                    </div>
                </div>
                {/* </section> */}

                <div>
                    <label htmlFor="category text-sm">Category</label>
                    <AppSelect
                        value={category}
                        onValueChange={(value) => {
                            setCategory(value);
                            setPosts([]); // Clear posts when category changes
                            setPage(1); // Reset page to 1
                            setHasMore(true); // Reset "has more" state
                        }}
                        placeholder="Select category"
                        selectContent={categoryData.map((item, index) => {
                            return (
                                <SelectItem key={index} value={item}>
                                    {item}
                                </SelectItem>
                            );
                        })}
                    >
                    </AppSelect>
                </div>

                <div>
                    <label htmlFor="author">Author name</label>
                    <InputField
                        id="author"
                        name="author"
                        // value={state.user.name}
                        disabled
                        onChange={handleInputonChange}
                    />
                </div>

                <div>
                    <label htmlFor="title">Title</label>
                    <InputField
                        id="title"
                        name="title"
                        placeholder="Article title"
                        value={post.title} // Prefill with the fetched title
                        onChange={handleInputonChange}
                    />
                </div>

                <div>
                    <label htmlFor="introduction">
                        Introduction (max 120 letters)
                    </label>
                    <TextArea
                        id="introduction"
                        name="description"
                        placeholder="Introduction"
                        maxLength={120}
                        rows={3}
                        value={post.description} // Prefill with the fetched description
                        onChange={handleInputonChange}
                    />
                </div>

                <div>
                    <label htmlFor="content">Content</label>
                    <TextArea
                        id="content"
                        name="content"
                        placeholder="Content"
                        rows={20}
                        value={post.content} // Prefill with the fetched content
                        onChange={handleInputonChange}

                    />
                </div>
            </form>
        </main>
    );
}

export default CreateArticleContent;

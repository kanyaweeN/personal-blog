import { useNavigate, useParams } from 'react-router-dom';
import { ImageIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AppButton } from '../button/AppButton.jsx';
import {
    SelectItem,
} from "@/components/ui/select";
import InputField from '../input/InputField.jsx';
import TextArea from "../input/TextArea.jsx";
import AppSelect from "../input/AppSelect.jsx";
import { useAppToast } from '../../hooks/useAppToast.jsx';
import { usePosts } from "../../hooks/usePosts.js";
import { LoadingDot } from "../loading/LoadingDot.jsx";
import { useAuth } from '../../contexts/authentication.jsx';
import { PostService } from '../../services/postService.js';

function CreateArticleContent() {
    const { state } = useAuth();
    const param = useParams();
    const [isLoadingData, setLoadingData] = useState(false);
    const navigate = useNavigate();
    const { success, error } = useAppToast();
    const id = param.postId
    const [category, setCategory] = useState({
        id: 0,
        name: "Highlight"
    });

    const [blogPosts, setBlogPosts] = useState({
        id: 0,
        image: "",
        category_id: 0,
        category_name: "",
        title: "",
        description: "",
        author: "",
        author_img: "",
        bio: "",
        date: "",
        content: "",
        likes: 0,
        status_id: 0,
        status_status: ""
    });
    const [errorInput, setErrorInput] = useState({
        title: "",
        content: "",
        description: "",
    })

    const {
        isLoading,

        categoriesData,

        fetchcategories,
        fetchPostsById
    } = usePosts();


    const fetchData = async () => {
        setLoadingData(true);

        if (id) {
            const result = await fetchPostsById(id);
            setBlogPosts(result)
            setCategory({
                id: result.category_id || 0,
                name: result.category_name || "Highlight"
            })
        } else {
            if (state.user) {
                setBlogPosts({
                    id: 0,
                    image: "",
                    category_id: 0,
                    category_name: "",
                    title: "",
                    description: "",
                    author: state.user.name,
                    author_img: "",
                    bio: "",
                    date: "",
                    content: "",
                    likes: 0,
                    status_id: 0,
                    status_status: ""
                })
            }
        }

        setLoadingData(false);
    }

    const saveData = async (status_id) => {
        try {
            const data = {
                id: blogPosts.id,
                anthor_id: state.user.id,
                image: blogPosts.image,
                category_id: category.id,
                title: blogPosts.title,
                description: blogPosts.description,
                content: blogPosts.content,
                status_id: status_id,
                likes_count: 0
            }

            if (id === 0 || !id) {
                await PostService.create(data);
            } else {
                await PostService.updateById(data);
            }

            return true
        } catch (err) {
            setError("โหลดข้อมูลไม่สำเร็จ");
        } finally {
            setLoadingData(false);
        }
        return false;
    }

    useEffect(() => {
        fetchcategories();
        fetchData()
    }, [id, state.user]);

    const handleInputonChange = (e) => {
        const { name, value } = e.target;
        setBlogPosts((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleCategory = (value) => {
        // หา object จาก id
        const selectedCategory = categoriesData.find(
            item => item.name === value
        );
        if (selectedCategory) {
            setCategory(selectedCategory); // set เป็น object
        }
    }

    const handleSave = async (mode) => {
        const canSave = checkData()
        if (canSave) {
            const result = await saveData(mode)
            if (result) {
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
            } else {
                switch (mode) {
                    case 1: //draft
                        error(
                            "Create article and saved as draft",
                            "You can not draft article"
                        );
                        break;
                    case 2: //publish
                        error(
                            "Create article and published",
                            "You can not published article"
                        );
                        break;
                }
            }
        }
    }

    const checkData = () => {
        let err = {}
        if (!blogPosts.title) {
            err.title = "Please enter your title.";
        }

        if (!blogPosts.content) {
            err.content = "Please enter your password";
        }

        if (!blogPosts.description) {
            err.description = "Please enter your description";
        }
        setErrorInput(err);

        if (Object.keys(err).length !== 0) {
            return false
        } else {
            return true
        }
    }

    return (
        <main className="flex-1 p-10" >
            {/* Header */}
            < header className="flex justify-between items-center mb-5 border-b pb-5" >
                <h2 className="text-xl font-bold" >
                    Create article
                </h2>
                < div className="flex gap-2" >
                    <AppButton
                        onClick={() => handleSave(1)}
                    >
                        Save as draft
                    </AppButton>
                    < AppButton
                        onClick={() => handleSave(2)
                        }
                        style="dark"
                    >
                        Save and publish
                    </AppButton>
                </div>
            </header>
            {(isLoading || isLoadingData)
                ? <LoadingDot />
                : <>
                    {/* Thumbnail */}
                    <form className="text-brown-400 space-y-4" >
                        <div className="flex items-end gap-3" >
                            <div>
                                <label className="block text-sm font-medium mb-2" >
                                    Thumbnail Image
                                </label>
                                < div className="w-64 h-40 border rounded-md flex items-center justify-center bg-brown-200" >
                                    <span className="text-sm" >
                                        <ImageIcon className="mx-auto h-8 w-8" />
                                    </span>
                                </div>
                            </div>
                            < div >
                                <AppButton>
                                    Upload thumbnail image
                                </AppButton>
                            </div>
                        </div>
                        {/* </section> */}

                        <div>
                            <label htmlFor="category text-sm" > Category </label>
                            < AppSelect
                                value={category.name} // ส่ง id เป็น string
                                onValueChange={(value) =>
                                    handleCategory(value)
                                }
                                placeholder="Select category"
                                selectContent={
                                    categoriesData.map((item, index) => {
                                        return (
                                            <SelectItem
                                                key={`${item.id}-${index}`}
                                                value={item.name}
                                            >
                                                {item.name}
                                            </SelectItem>
                                        );
                                    })}
                            >
                            </AppSelect>
                        </div>

                        < div >
                            <label htmlFor="author" > Author name </label>
                            < InputField
                                id="author"
                                name="author"
                                value={blogPosts.author}
                                disabled
                                onChange={handleInputonChange}
                            />
                        </div>

                        < div >
                            <label htmlFor="title" > Title </label>
                            < InputField
                                id="title"
                                name="title"
                                placeholder="Article title"
                                value={blogPosts.title} // Prefill with the fetched title
                                onChange={handleInputonChange}
                            />
                        </div>

                        < div >
                            <label htmlFor="introduction" >
                                Introduction(max 120 letters)
                            </label>
                            < TextArea
                                id="description"
                                name="description"
                                placeholder="Introduction"
                                maxLength={120}
                                rows={3}
                                value={blogPosts.description} // Prefill with the fetched description
                                onChange={handleInputonChange}
                            />
                        </div>

                        < div >
                            <label htmlFor="content" > Content </label>
                            < TextArea
                                id="content"
                                name="content"
                                placeholder="Content"
                                rows={20}
                                value={blogPosts.content} // Prefill with the fetched content
                                onChange={handleInputonChange}

                            />
                        </div>
                    </form>
                </>
            }
        </main>
    );
}

export default CreateArticleContent;

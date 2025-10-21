import { ImageIcon, X } from "lucide-react";
import { AppButton } from '../button/AppButton.jsx';
import {
    SelectItem,
} from "@/components/ui/select";
import InputField from '../input/InputField.jsx';
import TextArea from "../input/TextArea.jsx";
import AppSelect from "../input/AppSelect.jsx";
import { useArticleForm } from '../../hooks/useArticleForm.js';
import { LoadingPage } from "../loading/LoadingPage.jsx";
import ThumbnailPreview from "../avatar/ThumbnailPreview.jsx";

export default function CreateArticleContent() {
    const {
        isLoadingData,
        fileInputRef,
        imageFile,
        blogPosts,
        category,
        categoriesData,
        errorInput,
        previewUrl,
        handleUploadClick,
        handleFileChange,
        handleInputChange,
        handleCategory,
        handleSave,
    } = useArticleForm();

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
            {isLoadingData
                ? <LoadingPage />
                : <>
                    {/* Thumbnail */}
                    <form className="text-brown-400 space-y-4" >
                        <div className="flex items-end gap-3" >
                            <div>
                                <label className="block text-sm font-medium mb-2" >
                                    Thumbnail Image
                                </label>
                                <ThumbnailPreview src={previewUrl || blogPosts.image} />
                            </div>
                            < div >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <AppButton
                                    type="button"
                                    onClick={handleUploadClick}
                                    disabled={isLoadingData}
                                >
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
                                onChange={handleInputChange}
                                error={errorInput.author}
                                showErrorText={true}
                            />
                        </div>

                        < div >
                            <label htmlFor="title" > Title </label>
                            < InputField
                                id="title"
                                name="title"
                                placeholder="Article title"
                                value={blogPosts.title} // Prefill with the fetched title
                                onChange={handleInputChange}
                                error={errorInput.title}
                                showErrorText={true}
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
                                onChange={handleInputChange}
                                error={errorInput.description}
                                showErrorText={true}
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
                                onChange={handleInputChange}
                                error={errorInput.content}
                                showErrorText={true}
                            />
                        </div>
                    </form>
                </>
            }
        </main>
    );
}


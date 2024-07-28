import { getBlogById, updateBlog } from "@/lib/api";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { X, Image } from "lucide-react";
import usePersonStore from "@/lib/Utils/zustandStore";

// Define a streamlined toolbar configuration
const toolbarOptions = [
    [{ 'font': [] }],
    [{ 'header': ['1', '2', '3', '4', '5', '6', false] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'align': [] }],
    ['clean']
];

function BlogPostForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [blogOwner, setblogOwner] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [cover, setCover] = useState<{ publicId: string; url: string } | File | null>(null);
    const [error, setError] = useState<string>("");
    const isUserLoggedIn = usePersonStore((state) => state._id);

    useEffect(() => {
        const fetchBlogData = async (blogId: string) => {
            try {
                const { data } = await getBlogById(blogId);
                const { title, content, coverImage, category } = data[0];
                setTitle(title);
                setCategory(category.join(", "));
                setContent(content);
                setCover(coverImage);
                console.log(data[0].userData._id);
                setblogOwner(data[0].userData._id);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        if (id) {
            fetchBlogData(id);
        }
    }, [id]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title || !category || !content || !cover) {
            setError("All fields are required.");
            return;
        }
        setError("");

        const coverFile = cover instanceof File ? cover : await urlToFile(cover.url);

        const { success, data } = await updateBlog(
            { title, category, content, image: coverFile },
            id!,
        );

        if (success) {
            navigate(`/blogs/${data._id}`);
        }
    };

    const handleCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setCover(event.target.files[0]);
        }
    };

    const removeCoverImage = () => {
        setCover(null);
    };

    const urlToFile = async (url: string): Promise<File> => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], "coverImage", { type: blob.type });
    };

    if (blogOwner !== isUserLoggedIn)
        {
            return (
            <div className="max-w-screen-md mx-auto md:text-6xl w-screen text-3xl p-4 text-center font-semibold flex items-center justify-center leading-relaxed">
                You do not have permission to edit this blog.
                You are not the owner of this blog.
            </div>
            )
        }

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 space-y-6 bg-gray-200 dark:bg-gray-800 shadow-lg rounded-lg"
        >
            {error && <p className="text-red-500">{error}</p>}

            <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">Blog Editor</h1>

            <div>
                <label
                    htmlFor="cover-input"
                    className="flex justify-center items-center text-gray-700 dark:text-gray-200 cursor-pointer"
                >
                    {cover ? (
                        <div className="relative">
                            <img
                                src={
                                    cover instanceof File
                                        ? URL.createObjectURL(cover)
                                        : cover?.url || ""
                                }
                                alt="Cover Preview"
                                className="w-96 h-auto object-cover rounded-lg items-center justify-center"
                            />
                            <button
                                type="button"
                                onClick={removeCoverImage}
                                className="absolute top-3 left-[21rem] p-1 bg-gray-400 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                                aria-label="Remove Cover Image"
                            >
                                <X size={24} className="text-red-600 dark:text-red-400" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 justify-center">
                            <Image className="text-gray-500 dark:text-gray-400" />
                            <span>Edit/Change Cover</span>
                        </div>
                    )}
                </label>
                <input
                    id="cover-input"
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="hidden"
                />

            </div>

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Edit Blog Title"
                className="block w-full text-3xl border border-gray-300 rounded-md py-2 px-4 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            />

            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Edit Blog Categories (comma separated)"
                className="block w-full text-xl border border-gray-300 rounded-md py-2 px-4 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            />

            <div className="grid grid-cols-1 gap-4">
                <div className="relative">
                    <div className="h-96 bg-gray-50 dark:bg-gray-900 rounded-md">
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={{ toolbar: toolbarOptions }}
                            className="xl:h-[84%] md:h-[82%] sm:h-[76%] h-[63%] text-gray-900 dark:text-white rounded-md"
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <input
                        type="submit"
                        value="Submit"
                        className="px-6 py-2 font-semibold text-lg text-white bg-red-500 hover:bg-red-600 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>
            </div>
        </form>
    );
}

export default BlogPostForm;

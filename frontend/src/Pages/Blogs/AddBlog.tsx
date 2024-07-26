import { FormEvent, ChangeEvent, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { postBlog } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { X, Image } from "lucide-react";

// Define a streamlined toolbar configuration
const toolbarOptions = [
    [{ 'font': [] }],
    [{ 'header': ['1', '2', '3', '4', '5', '6', false] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'align': [] }],
    ['clean']
];

function NewBlog() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [cover, setCover] = useState<File | null>(null);
    const [error, setError] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title || !category || !content || !cover) {
            setError("All fields are required.");
            return;
        }
        setError("");

        const data = await postBlog({ title, category, content, image: cover });

        if (data.success) {
            navigate(`/blogs/${data.data._id}`);
        }
    };

    const handleCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setCover(event.target.files[0]);
        }
    };

    const removeCoverImage = () => {
        setCover(null);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 space-y-4 shadow-md rounded-lg bg-gray-400 dark:bg-gray-800"
        >
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex items-center gap-4 justify-center">
                <label
                    htmlFor="cover-input"
                    className="flex items-center cursor-pointer text-gray-700 dark:text-gray-200"
                >
                    {cover ? (
                        <div className="relative">
                            <img
                                src={cover && URL.createObjectURL(cover).toString()}

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
                        <div className="flex items-center gap-2">
                            <Image className="text-gray-500 dark:text-gray-400" />
                            <span>Add Cover</span>
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
                placeholder="Blog Title..."
                className="block w-full text-2xl p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category 1, Category 2,..."
                className="block w-full text-xl p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
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

export default NewBlog;

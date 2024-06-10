import { getBlogById, updateBlog } from "@/lib/api";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { X, Image } from "lucide-react";
// import { string } from "prop-types"; // 'string' is declared but its value is never read.ts(6133)



function BlogPostForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [cover, setCover] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const dataFetch = async (id: string) => {
            try {
                const data = await getBlogById(id);
                let spreadCategory = "";
                data.data[0].category.forEach((element: any) => {
                    spreadCategory += element + ",";
                });

                setTitle(data.data[0].title);
                setCategory(spreadCategory);
                setContent(data.data[0].content);
                setCover(data.data[0].coverImage);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        dataFetch(id);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title || !category || !content || !cover) {
            setError("All fields are required.");
            return;
        }
        setError("");

        const data = await updateBlog(
            { title, category, content, image: cover },
            id,
        );

        if (data.success) {
            navigate(`/blogs/${data.data._id}`);
        }
    };

    const handleCoverChange = (event) => {
        setCover(event.target.files[0]);
    };

    const removeCoverImage = () => {
        setCover(null);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 space-y-4 shadow-md rounded-md"
        >
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex items-center">
                <label
                    htmlFor="cover-input"
                    className="text-lg text-gray-700 dark:text-gray-200 bg-transparent cursor-pointer"
                >
                    {cover ? (
                        <img
                            src={
                                cover?.url ||
                                URL.createObjectURL(cover).toString()
                            }
                            alt="Image Preview"
                            className="w-80 h-48 m-2 rounded flex items-center justify-evenly"
                        />
                    ) : (
                        <div className="flex items-center gap-2">
                            <Image />
                            Add Cover
                        </div>
                    )}
                </label>
                <input
                    id="cover-input"
                    type="file"
                    accept="image/*"
                    value={cover && null}
                    onChange={handleCoverChange}
                    style={{ display: "none" }}
                />
                {cover && (
                    <button
                        type="button"
                        onClick={removeCoverImage}
                        disabled={!cover}
                        className={`font-bold text-gray-700 dark:text-gray-200 bg-transparent rounded hover:text-red-700`}
                    >
                        <X />
                    </button>
                )}
            </div>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog Title...."
                className="mt-1 block w-full text-3xl outline-none rounded-md text-gray-700 dark:text-gray-200 bg-transparent shadow-sm py-1"
            />
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category 1, Category 2,....."
                className="mt-1 block w-full text-2xl outline-none rounded-md text-gray-700 dark:text-gray-200 bg-transparent shadow-sm py-1"
            />
            <div className="h-[500px]">
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    className="h-5/6 bg-transparent w-full text-xl rounded-md my-2 lg:my-1"
                />
            </div>
            <div className="flex justify-center items-center">
                <input
                    type="submit"
                    value="Submit"
                    className="px-4 py-2 font-bold text-xl cursor-pointer text-white bg-pink-500  hover:bg-pink-700 rounded-md -mt-810"
                />
            </div>
        </form>
    );
}

export default BlogPostForm;

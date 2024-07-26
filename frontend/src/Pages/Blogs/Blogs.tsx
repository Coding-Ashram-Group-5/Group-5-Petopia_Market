import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BlogCard from "./BlogCard";
import { Blog } from "@/types/models";
import { getAllBlogs } from "@/lib/api";
import usePersonStore from "@/lib/Utils/zustandStore";

const Blogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [showWarning, setShowWarning] = useState(false);
    const navigate = useNavigate();
    const loggedInUser = usePersonStore((state) => state._id);

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const data = await getAllBlogs();
                setBlogs(data?.data);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        dataFetch();
    }, []);

    const handleWarningConfirm = () => {
        setShowWarning(false);
        navigate("/auth"); // Navigate to the login page
    };

    const handleWarningCancel = () => {
        setShowWarning(false);
    };

    return (
        <div className="px-8 py-6 md:p-4 lg:p-6 w-full max-w-screen-xl">
            {/* Add Blog Button */}
            <div className="mb-4 flex justify-end">
                <Link
                    to="/blogs/add"
                    onClick={(e) => {
                        if (!loggedInUser) {
                            e.preventDefault();
                            setShowWarning(true);
                        }
                    }}
                    className={`mx-auto md:mr-0 px-4 py-2 font-semibold text-white ${loggedInUser ? "bg-red-500 hover:bg-red-600" : "bg-red-500 hover:bg-red-600 cursor-pointer"} rounded-md transition duration-150`}
                >
                    Write your own blog
                </Link>
            </div>

            {/* Blog Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
                {blogs?.map((blog) => (
                    <div key={blog._id}>
                        <BlogCard
                            blogId={blog._id}
                            title={blog.title}
                            content={blog.content}
                            category={blog.category}
                            coverImage={blog.coverImage}
                            likes={blog?.likes}
                            userDetails={blog.userDetails}
                        />
                    </div>
                ))}
            </div>

            {/* Warning Modal */}
            {showWarning && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                            You need to log in to perform this action.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                type="button"
                                onClick={handleWarningConfirm}
                                className="bg-yellow-400 dark:bg-red-500 text-white px-4 py-2 rounded-md hover:bg-yellow-500 dark:hover:bg-red-500"
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={handleWarningCancel}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blogs;

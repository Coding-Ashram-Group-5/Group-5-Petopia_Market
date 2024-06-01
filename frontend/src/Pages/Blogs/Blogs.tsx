import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { getAllBlogs } from "@/lib/api";
import { Blog } from "@/types/models";

const Blogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
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

    return (
        <div className="grid px-8 py-6 md:p-4 lg:p-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-screen-xl gap-5 md:gap-10">
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
    );
};

export default Blogs;

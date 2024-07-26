import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { getAllBlogs } from "@/lib/api";
import { Blog } from "@/types/models";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RelatedBlogs: React.FC<{ currentBlogId: string; categories: string[] }> = ({ currentBlogId, categories }) => {
    const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
    const [allBlogs, setAllBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchAllBlogs = async () => {
            try {
                const response = await getAllBlogs();
                setAllBlogs(response.data);
            } catch (error) {
                console.error("Error fetching all blogs:", error);
            }
        };

        fetchAllBlogs();
    }, []);

    useEffect(() => {
        if (allBlogs.length > 0 && categories.length > 0) {
            const filteredBlogs = allBlogs.filter(blog =>
                blog._id !== currentBlogId &&
                blog.category.some(cat => categories.includes(cat))
            );
            setRelatedBlogs(filteredBlogs);
        }
    }, [allBlogs, categories, currentBlogId]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CustomArrow direction="next" />,
        prevArrow: <CustomArrow direction="prev" />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="lg:sticky lg:top-0 lg:w-full lg:overflow-hidden p-4 bg-white dark:bg-gray-900 rounded-lg shadow-blog">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Related Blogs</h3>
            <div className="lg:hidden">
                {relatedBlogs.length > 0 ? (
                    <Slider {...settings}>
                        {relatedBlogs.map((blog) => (
                            <div key={blog._id} className="p-2">
                                <Link
                                    to={`/blogs/${blog._id}`}
                                    className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
                                >
                                    <img
                                        src={blog.coverImage.url}
                                        alt={blog.title}
                                        className="w-full h-40 object-cover rounded-t-lg"
                                    />
                                    <div className="p-4">
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{blog.title}</h4>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">No related blogs found.</p>
                )}
            </div>
            <div className="hidden lg:flex lg:flex-col lg:w-full lg:gap-4">
                {relatedBlogs.length > 0 ? (
                    relatedBlogs.map((blog) => (
                        <Link
                            key={blog._id}
                            to={`/blogs/${blog._id}`}
                            className="w-full mb-4"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={blog.coverImage.url}
                                    alt={blog.title}
                                    className="w-full h-60 object-cover rounded-t-lg"
                                />
                                <div className="p-4">
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{blog.title}</h4>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">No related blogs found.</p>
                )}
            </div>
        </div>
    );
};

const CustomArrow: React.FC<{ direction: 'next' | 'prev' }> = ({ direction, ...props }) => {
    const isNext = direction === 'next';
    return (
        <button
            {...props}
            className={`absolute top-1/2 transform -translate-y-1/2 ${isNext ? '-right-8' : '-left-8'} z-10 cursor-pointer w-8 h-8 bg-gray-300 dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition duration-200`}
        >
            <svg
                className={`w-6 h-6 ${isNext ? 'text-gray-900 dark:text-white absolute top-1 right-1' : 'text-gray-900 dark:text-white absolute top-1 left-1'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isNext ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
                />
            </svg>
        </button>
    );
};

export default RelatedBlogs;

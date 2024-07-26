import { Link } from "react-router-dom";
import { Heart, Dot, MoveRight } from "lucide-react";
import { RiShare2Line } from "react-icons/ri";
import DOMPurify from "dompurify";

interface BlogCardProps {
    blogId: string;
    title: string;
    content: string;
    category: string[];
    likes: string[];
    coverImage: { publicId: string; url: string };
    userDetails: { firstName: string; lastName?: string; created_at: string };
}

const BlogCard: React.FC<BlogCardProps> = ({
    blogId,
    title,
    content,
    category,
    likes,
    coverImage,
    userDetails,
}) => {
    const date = new Date(userDetails.created_at.split("T")[0]);

    const dirtyHTML = content;
    const cleanHTML = DOMPurify.sanitize(dirtyHTML);

    return (
        <div className="rounded-2xl shadow-lg bg-white dark:bg-gray-900 font-sans transition-transform duration-300 hover:scale-105">
            <div className="relative overflow-hidden rounded-t-2xl">
                <img
                    src={coverImage?.url}
                    loading="lazy"
                    alt={title}
                    className="w-full h-48 md:h-64 object-cover object-center transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute bottom-0 right-0 p-3 bg-white dark:bg-gray-900 rounded-tl-2xl">
                    <Link
                        to={`/blogs/${blogId}`}
                        className="flex items-center gap-2 text-gray-950 dark:text-white px-4 py-2 font-bold text-lg rounded-xl border border-gray-300 dark:border-gray-700"
                    >
                        Read more <MoveRight />
                    </Link>
                </div>
            </div>
            <div className="flex items-center justify-between px-4 py-2 text-lg">
                <div className="flex items-center text-gray-800 dark:text-gray-200">
                    <span className="font-semibold text-red-500 capitalize">
                        {userDetails.firstName} {userDetails.lastName}
                    </span>
                    <Dot className="mx-2" />
                    {date.toLocaleDateString("default", {
                        month: "long",
                        year: "numeric",
                    })}
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-red-500">
                        <Heart />
                        <span className="text-xs">{likes.length}</span>
                    </div>
                    <Link to={`/blogs/${blogId}`} aria-label="Share blog">
                        <RiShare2Line />
                    </Link>
                </div>
            </div>
            <div className="px-4 pb-4 text-gray-700 dark:text-gray-200">
                <h2 className="text-2xl font-bold pb-2">{title.slice(0, 27) + "..."}</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                    {category.map((x, index) => (
                        <span
                            key={index}
                            className="bg-red-500 text-white rounded-full px-3 py-1 text-sm font-semibold"
                        >
                            {x}
                        </span>
                    ))}
                </div>
                <p className="text-justify text-lg leading-6">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: content.length < 100
                                ? cleanHTML
                                : cleanHTML.slice(0, 80) + "...",
                        }}
                    />
                </p>
            </div>
        </div>
    );
};

export default BlogCard;

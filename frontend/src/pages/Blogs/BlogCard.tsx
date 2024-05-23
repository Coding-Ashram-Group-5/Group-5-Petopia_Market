import { Link } from "react-router-dom";
import { Share2, Heart, Dot, MoveRight } from "lucide-react";
import DOMPurify from "dompurify";

interface BlogCardProps {
    blogId: string;
    title: string;
    content: string;
    category: string[];
    likes: string[];
    coverImage: { publicId: string; url: string };
    userDetails: { firstName: string; lastName: string; created_at: string };
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
        <div className="rounded-2xl shadow-xl bg-white dark:bg-gray-900 font-leag">
            <div className="flex flex-col overflow-hidden rounded-t-2xl border bg-white">
                <div
                    to={`/blogs/${blogId}`}
                    className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
                >
                    <img
                        src={coverImage?.url}
                        loading="lazy"
                        alt={title}
                        className="absolute inset-0 h-full w-full object-cover  object-center transition duration-200 group-hover:scale-105"
                    />
                    <div className="p-2 absolute bottom-0 right-0 rounded-tl-xl bg-white">
                        <Link
                            to={`/blogs/${blogId}`}
                            className="flex items-center gap-2 bg-white dark:bg-gray-900 text-gray-950 dark:text-white px-4 py-3 font-bold w-fit font-mono text-xl rounded-xl border border-black "
                        >
                            Read more <MoveRight />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="text-lg flex items-center justify-between">
                <div className="px-4 py-2 text-lg flex items-center">
                    <span className="font-bold text-pink-600 text-xl capitalize">
                        {userDetails.firstName} {userDetails.lastName}
                    </span>
                    <Dot />
                    {date.toLocaleDateString("default", {
                        month: "long",
                        year: "numeric",
                    })}
                </div>
                <div className="flex items-center gap-4 pr-4">
                    <div className="flex items-center gap-1 text-pink-600">
                        <Heart />
                        <span className="text-xs">{likes.length}</span>
                    </div>
                    <Link to={`/blogs/${blogId}`}>
                        <Share2 />
                    </Link>
                </div>
            </div>
            <div className="px-4 pb-4 text-gray-700 dark:text-gray-200">
                <h2 className="text-2xl font-bold pb-1">
                    {title.slice(0, 27) + "..."}
                </h2>
                <div className="flex items-center justify-start w-full gap-2 capitalize overflow-scroll">
                    {category.map((x, index) => (
                        <div
                            key={index}
                            className="bg-pink-600 text-white rounded-2xl px-3 text-lg font-semibold w-fit"
                        >
                            {x}
                        </div>
                    ))}
                </div>
                {content.length < 100 ? (
                    <p className="text-justify py-2 leading-5 text-lg">
                        <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
                    </p>
                ) : (
                    <p className="text-justify py-2 leading-5 text-lg">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: cleanHTML.slice(0, 80) + "...",
                            }}
                        />
                    </p>
                )}
            </div>
        </div>
    );
};

export default BlogCard;

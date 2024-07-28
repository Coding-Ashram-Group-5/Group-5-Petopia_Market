import {
    deleteComment,
    dislikeBlog,
    getBlogById,
    likeBlog,
    postComment,
    updateComment,
} from "@/lib/api";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, Dot } from "lucide-react";
import { RiShare2Line } from "react-icons/ri";
import DOMPurify from "dompurify";
import Comment from "./Comment";
import usePersonStore from "@/lib/Utils/zustandStore";
import Hemlet from "./metaDATA/Helmet";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, RedditShareButton, FacebookIcon, XIcon, WhatsappIcon, RedditIcon } from "react-share";
import { Blog } from "@/types/models";
import RelatedBlogs from "./RelatedBlogs";

const Blogs = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const loggedInUser = usePersonStore((state) => state._id);
    const [comment, setComment] = useState("");
    const [updating, setUpdating] = useState<string | null>(null);
    const [blogDetails, setBlogDetails] = useState<Blog | null>(null);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(0);
    const [showWarning, setShowWarning] = useState<boolean>(false);
    const [actionOnConfirm, setActionOnConfirm] = useState<() => void>(() => () => { });

    const warningRef = useRef<HTMLDivElement | null>(null);
    const commentAreaRef = useRef<HTMLTextAreaElement | null>(null);

    if (!id) {
        throw new Error("Parameter Id is Required");
    }

    useEffect(() => {
        const fetchBlogDetails = async (blogId: string) => {
            try {
                const response = await getBlogById(blogId);
                const blog = response?.data[0];
                setBlogDetails(blog);
                setIsLiked(blog?.likes.includes(loggedInUser) ?? false);
                setLikeCount(blog?.likes.length ?? 0);
            } catch (error) {
                console.error("Error fetching blog details:", error);
            }
        };

        fetchBlogDetails(id);

        // Retrieve stored comment and like status after redirect
        const storedComment = sessionStorage.getItem(`comment-${id}`);
        if (storedComment) {
            setComment(storedComment);
            sessionStorage.removeItem(`comment-${id}`);
        }
    }, [id, loggedInUser]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (warningRef.current && !warningRef.current.contains(event.target as Node)) {
                setShowWarning(false);
            }
            // Close other modals if necessary
        };

        if (showWarning) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showWarning]);

    const handleCommentAction = async (action: Function, ...args: any[]) => {
        if (!loggedInUser) {
            // Store comment and redirect to login
            sessionStorage.setItem(`comment-${id}`, comment);
            setShowWarning(true);
            setActionOnConfirm(() => () => {
                navigate("/auth");
            });
            return;
        }
        try {
            const response = await action(...args);
            if (response.success) {
                const updatedBlog = await getBlogById(id);
                setBlogDetails(updatedBlog?.data[0]);
                setComment("");
                setUpdating(null);
            }
        } catch (error) {
            console.error("Error performing action:", error);
        }
    };

    const toggleLike = async () => {
        if (!loggedInUser) {
            sessionStorage.setItem(`isLiked-${id}`, (!isLiked).toString());
            setShowWarning(true);
            setActionOnConfirm(() => () => {
                navigate("/auth");
            });
            return;
        }
        try {
            const action = isLiked ? dislikeBlog : likeBlog;
            const response = await action(id);
            if (response) {
                setIsLiked(!isLiked);
                setLikeCount((prevCount) => isLiked ? prevCount - 1 : prevCount + 1);
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    const handleDeviceShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: blogDetails?.title || "Check out this blog",
                    url: shareUrl,
                });
                console.log('Successfully shared');
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            console.log('Web Share API not supported on this browser');
        }
    };

    const dirtyHTML = blogDetails?.content || "";
    const cleanHTML = DOMPurify.sanitize(dirtyHTML);
    const date = new Date(blogDetails?.userData?.created_at.split("T")[0] || "");

    const handleWarningConfirm = () => {
        setShowWarning(false);
        actionOnConfirm();
    };

    const handleWarningCancel = () => {
        setShowWarning(false);
    };

    const isCommentFieldEmpty = comment.trim() === "";
    const shareUrl = `${window.location.origin}/blogs/${id}`;

    return blogDetails?._id ? (
        <div className="flex flex-col lg:flex-row lg:justify-center gap-8 p-4 lg:p-8">
            <Hemlet
                title={blogDetails.title}
                description={blogDetails.content || "Default blog description."}
                image={blogDetails.coverImage.url}
                url={shareUrl}
            />
            <div className="w-full lg:w-3/4 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-blog">
                <h1 className="font-bold text-4xl text-center mb-6 text-gray-900 dark:text-white">
                    {blogDetails.title}
                </h1>
                <div className="mb-6">
                    <img
                        src={blogDetails.coverImage.url}
                        alt={blogDetails.title}
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between mb-4 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center mb-4 sm:mb-0">
                        <span className="font-semibold text-lg text-red-500">
                            {blogDetails.userData?.firstName} {blogDetails.userData?.lastName}
                        </span>
                        <Dot className="mx-2" />
                        <span className="text-lg">
                            {date.toLocaleDateString("default", { month: "long", year: "numeric" })}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <FacebookShareButton url={shareUrl} title={blogDetails.title}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <TwitterShareButton url={shareUrl} title={blogDetails.title}>
                            <XIcon size={32} round />
                        </TwitterShareButton>
                        <WhatsappShareButton url={shareUrl} title={blogDetails.title}>
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                        <RedditShareButton url={shareUrl} title={blogDetails.title}>
                            <RedditIcon size={32} round />
                        </RedditShareButton>
                        <button
                            title="Share the blog"
                            type="button"
                            onClick={handleDeviceShare}
                            className="flex items-center"
                        >
                            <RiShare2Line size={32} />
                        </button>
                        <button
                            type="button"
                            onClick={toggleLike}
                            className="flex items-center gap-1"
                        >
                            <Heart size={30} className={`${isLiked ? "text-red-500 fill-red-500" : ""} text-red-500`} />
                            <span className="text-xl">{likeCount}</span>
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="font-bold text-lg text-gray-700 dark:text-gray-300">Category:</span>
                    {blogDetails.category?.map((category, index) => (
                        <span
                            key={index}
                            className="bg-red-500 text-white rounded-full px-4 py-1 text-sm font-medium"
                        >
                            {category}
                        </span>
                    ))}
                </div>
                <div className="prose dark:prose-invert mb-6">
                    <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
                </div>
                {blogDetails.userData?._id === loggedInUser && (
                    <button
                    type="button"
                        onClick={() => navigate(`/blogs/edit/${id}`)}
                        className="px-4 py-2 font-semibold text-white bg-red-500 hover:bg-red-600 rounded-md transition duration-150"
                    >
                        Edit
                    </button>
                )}
                <div className="mt-6">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Comments</h3>
                    <div className="flex flex-col gap-4 mb-4">
                        <textarea
                            ref={commentAreaRef}
                            className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add a comment..."
                            aria-label="Comments"
                        />
                        <button
                            type="button"
                            aria-label="Add Comment"
                            className={`py-2 px-4 rounded-md font-semibold text-white ${isCommentFieldEmpty ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-500"
                                }`}
                            onClick={() =>
                                !isCommentFieldEmpty &&
                                handleCommentAction(
                                    updating === null ? postComment : updateComment,
                                    updating === null ? { comment, blogId: id } : { comment, commentId: updating }
                                )
                            }
                            disabled={isCommentFieldEmpty}
                        >
                            {updating === null ? "Add" : "Update"}
                        </button>
                    </div>
                    <div className="space-y-4">
                        {blogDetails.comments.map((comment) => (
                            <Comment
                                key={comment._id}
                                comment={comment}
                                setUpdating={setUpdating}
                                editComment={setComment}
                                delComment={(commentId: string) => handleCommentAction(deleteComment, id, commentId)}
                            />
                        ))}
                    </div>
                </div>
                {showWarning && (
                    <div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                        ref={warningRef}
                    >
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
            {/* Related Blogs component */}
            <div className="hidden lg:block lg:w-1/4">
                <RelatedBlogs currentBlogId={id} categories={blogDetails.category || []} />
            </div>

            {/* Mobile related blogs */}
            <div className="lg:hidden mt-4">
                <RelatedBlogs currentBlogId={id} categories={blogDetails.category || []} />
            </div>
        </div>
    ) : (
        <div className="text-center py-16">
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Blog not found
            </p>
        </div>
    );
};

export default Blogs;

import {
    deleteComment,
    dislikeBlog,
    getBlogById,
    likeBlog,
    postComment,
    updateComment,
} from "@/lib/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Share2, Heart, Dot } from "lucide-react";
import DOMPurify from "dompurify";
import Comment from "./Comment";
import usePersonStore from "@/lib/Utils/zustandStore";

const Blog = () => {
    const { id } = useParams();
    const loggedInUser = usePersonStore((state) => state._id);
    const [comment, setComment] = useState("");
    const [updating, setUpdating] = useState("");
    const [blogDetails, setBlogDetails] = useState({
        title: "",
        content: "",
        coverImage: {
            publicId: "",
            url: "",
        },
        category: [],
        likes: [],
        comments: [
            {
                _id: "66434d68768da922e6e1477c",
                comment: "This is Test Commetn",
                owner: "663e2428f5165ec1a97c923d",
                blogId: "6642de4f650f268265323efc",
                created_at: "2024-05-14T11:39:20.278Z",
                updated_at: "2024-05-14T11:39:20.278Z",
                ownerFirstName: "Javid",
                ownerLastName: "",
            },
        ],
        userData: {
            _id: "663e2428f5165ec1a97c923d",
            firstName: "Javid",
            lastName: "",
            avatar: {
                publicId: "",
                url: "",
            },
            email: "javidsumra135@gmail.com",
            created_at: "2024-05-10T13:42:00.429Z",
            updated_at: "2024-05-14T03:35:10.069Z",
        },
    });
    const [isLiked, setIsLiked] = useState(
        blogDetails?.likes.includes(loggedInUser),
    );

    useEffect(() => {
        const dataFetch = async (id: string) => {
            try {
                const data = await getBlogById(id);
                setBlogDetails(data?.data[0]);
                setIsLiked(blogDetails?.likes.includes(loggedInUser));
            } catch (error) {
                console.error("Error:", error);
            }
        };
        dataFetch(id);
    }, [isLiked]);

    const addComment = async () => {
        const data = await postComment({ comment, blogId: id });
        if (data.success) {
            window.location.reload();
        }
    };

    const updComment = async (commentId: string) => {
        const data = await updateComment({ comment, commentId });
        if (data.success) {
            window.location.reload();
        }
    };

    const delComment = async (commentId: string) => {
        const data = await deleteComment(id, commentId);
        if (data.success) {
            window.location.reload();
        }
    };

    const toggleLike = async () => {
        if (isLiked) {
            const data = await dislikeBlog(id);
            if (data.success) setIsLiked(!isLiked);
        } else {
            const data = await likeBlog(id);
            if (data.success) setIsLiked(!isLiked);
        }
    };

    const dirtyHTML = blogDetails?.content;
    const cleanHTML = DOMPurify.sanitize(dirtyHTML);
    const date = new Date(blogDetails.userData.created_at.split("T")[0]);

    if (blogDetails._id)
        return (
            <div className="flex justify-evenly gap-4 my-5">
                <div className="w-full lg:w-3/4 px-4">
                    <h1 className="font-bold text-3xl text-center mb-5">
                        {blogDetails.title}
                    </h1>
                    <div className="mb-5">
                        <img
                            src={blogDetails.coverImage.url}
                            alt={blogDetails.title}
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                    <div className="text-lg flex items-center justify-between">
                        <div className="py-2 text-lg flex items-center">
                            Written by
                            <span className="italic px-1 font-bold text-pink-600 text-xl capitalize">
                                {blogDetails.userData.firstName}{" "}
                                {blogDetails.userData.lastName}
                            </span>
                            <Dot />
                            {date.toLocaleDateString("default", {
                                month: "long",
                                year: "numeric",
                            })}
                        </div>
                        <div className="flex items-center gap-4 text-xl">
                            <div className="flex items-center gap-1 cursor-pointer">
                                <Heart
                                    onClick={toggleLike}
                                    className={`${
                                        isLiked && "fill-pink-600"
                                    } text-pink-600`}
                                />
                                <span className="text-xs">
                                    {blogDetails.likes.length}
                                </span>
                            </div>
                            <Link
                                to={`${import.meta.env.BASE_URL}/blogs/${id}`}
                            >
                                <Share2 />
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-start w-full gap-2 capitalize overflow-scroll">
                        <p className="font-bold text-xl">Category :</p>
                        {blogDetails.category?.map((x, index) => (
                            <div
                                key={index}
                                className="bg-pink-600 text-white rounded-2xl px-3 text-lg font-semibold w-fit"
                            >
                                {x}
                            </div>
                        ))}
                    </div>
                    <div className="my-5 text-lg text-justify">
                        <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
                    </div>
                    {blogDetails?.comments?.length && (
                        <div className="my-2">
                            <h3 className="text-2xl font-bold pb-2">
                                Comments
                            </h3>
                            <div className="flex justify-between items-end mb-2">
                                <textarea
                                    className="border-b border-b-gray-600 dark:border-b-white outline-none w-full mx-4 break-words text-xl bg-transparent"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                                {updating === "" ? (
                                    <button
                                        className="text-xl text-white bg-pink-500 py-1 px-3 rounded-md font-bold"
                                        onClick={addComment}
                                    >
                                        Add
                                    </button>
                                ) : (
                                    <button
                                        className="text-xl text-white bg-pink-500 py-1 px-3 rounded-md font-bold"
                                        onClick={() => updComment(updating)}
                                    >
                                        Update
                                    </button>
                                )}
                            </div>
                            <div className="text-gray-800 dark:text-white px-2 py-3">
                                {blogDetails.comments.map((comment) => (
                                    <Comment
                                        key={comment._id}
                                        comment={comment}
                                        setUpdating={setUpdating}
                                        editComment={setComment}
                                        delComment={delComment}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="lg:w-1/4 hidden lg:flex">
                    <h3 className="text-xl font-bold">Related Blogs</h3>
                </div>
            </div>
        );
    else
        return (
            <div className="text-4xl text-center leading-10">
                Blog not found
            </div>
        );
};

export default Blog;

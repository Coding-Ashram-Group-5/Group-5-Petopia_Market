import usePersonStore from "@/lib/Utils/zustandStore";
import { Ellipsis, User } from "lucide-react";
import { useState } from "react";

const Comment = ({
    comment,
    setUpdating,
    editComment,
    delComment,
}: {
    comment: {
        _id: string;
        ownerFirstName: string;
        comment: string;
        owner: string;
    };
    setUpdating: any;
    editComment: any;
    delComment: any;
}) => {
    const loggedInUser = usePersonStore((state) => state._id);
    const [showBtn, setShowBtn] = useState(false);
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="flex flex-col gap-2 px-4 py-2 bg-gray-200 dark:bg-[#071b4d]  m-2 rounded-lg font-leag text-lg leading-6">
            <div className="font-semibold text-xl flex items-center justify-between relative">
                <div className="flex gap-2 items-center">
                    <User
                        size={28}
                        strokeWidth={3}
                        className="rounded-full border-2 border-gray-800 dark:border-white pt-1"
                    />
                    {comment.ownerFirstName}
                </div>
                {loggedInUser === comment.owner && (
                    <Ellipsis
                        className="cursor-pointer"
                        onClick={() => {
                            setShowBtn(true);
                        }}
                    />
                )}
                {showBtn && (
                    <div className="absolute right-2 top-4 p-2 rounded-lg text-gray-800 font-medium bg-gray-300 flex flex-col justify-between items-start">
                        <button
                            onClick={() => {
                                editComment(comment.comment);
                                setUpdating(comment._id);
                                setShowBtn(false);
                            }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                delComment(comment._id);
                                setShowBtn(false);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
            {comment?._id && (
                <div className="flex-nowrap text-justify py-1">
                    {comment.comment.length > 100 ? (
                        <span>
                            {showMore
                                ? comment.comment.slice(1, 100) + "..."
                                : comment.comment}
                            <span
                                onClick={() => setShowMore(!showMore)}
                                className="text-pink-600 cursor-pointer"
                            >
                                {"  "} show {showMore ? "more" : "less"}
                            </span>
                        </span>
                    ) : (
                        <span>{comment.comment}</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default Comment;

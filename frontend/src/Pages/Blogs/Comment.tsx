import usePersonStore from "@/lib/Utils/zustandStore";
import { Ellipsis, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
        avatar?: string;
    } | null;
    setUpdating: (id: string) => void;
    editComment: (comment: string) => void;
    delComment: (id: string) => void;
}) => {
    const loggedInUser = usePersonStore((state) => state._id);
    const [showBtn, setShowBtn] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const optionsRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
                setShowBtn(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!comment || !comment.comment) {
        return (
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md m-2 text-gray-500 dark:text-gray-400">
                There is no comment yet.
            </div>
        );
    }

    return (
        <div className="relative bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md m-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {comment.avatar ? (
                        <img
                            src={comment.avatar}
                            alt={`${comment.ownerFirstName}'s avatar`}
                            className="w-10 h-10 rounded-full border-2 border-gray-700 dark:border-gray-300"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full border-2 border-gray-700 dark:border-gray-300 bg-gray-300 flex items-center justify-center text-gray-600 dark:text-gray-400">
                            {comment.ownerFirstName.charAt(0)}
                        </div>
                    )}
                    <span className="font-semibold text-lg dark:text-white">
                        {comment.ownerFirstName}
                    </span>
                </div>
                {loggedInUser === comment.owner && (
                    <div className="relative">
                        <Ellipsis
                            className="cursor-pointer text-gray-700 dark:text-gray-300"
                            onClick={() => setShowBtn(!showBtn)}
                        />
                        {showBtn && (
                            <button
                            title="Close"
                                type="button"
                                className="absolute top-0 right-0 text-gray-700 dark:text-gray-300 p-1 rounded-full"
                                onClick={() => setShowBtn(false)}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}
            </div>
            {showBtn && (
                <div className="absolute right-4 top-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg py-2 px-4 w-40 z-10">
                    <button
                        type="button"
                        className="block w-full text-left text-gray-900 dark:text-gray-100 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md"
                        onClick={() => {
                            editComment(comment.comment);
                            setUpdating(comment._id);
                            setShowBtn(false);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="block w-full text-left text-red-600 dark:text-red-400 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md"
                        onClick={() => {
                            delComment(comment._id);
                            setShowBtn(false);
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
            <div className="mt-2 text-gray-800 dark:text-gray-200 text-base">
                {comment.comment.length > 100 ? (
                    <div>
                        {showMore
                            ? comment.comment
                            : comment.comment.slice(0, 100) + "..."}
                        <span
                            onClick={() => setShowMore(!showMore)}
                            className="text-red-500 cursor-pointer ml-1 font-semibold"
                        >
                            {showMore ? "Show less" : "Show more"}
                        </span>
                    </div>
                ) : (
                    <span>{comment.comment}</span>
                )}
            </div>
        </div>
    );
};

export default Comment;

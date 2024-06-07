
export default function CardSkeleton() {
    return (
        <>
        <div className="flex flex-col gap-y-2">
                <div className="w-40 h-40 md:w-full bg-gray-200 animate-pulse dark:bg-[#071b4d] rounded-lg"></div>
                <div className="flex gap-x-2 gap-y-2 ">
                    <div className="flex flex-col gap-y-2">
                        <div className="w-24 md:w-48 h-4 bg-gray-200 animate-pulse dark:bg-[#071b4d] rounded-lg"></div>
                        <div className="md:w-40 h-6 bg-gray-200 animate-pulse dark:bg-[#071b4d] rounded-lg"></div>
                </div>
                </div>
        </div>
        </>
    )
}


export default function ProductView() {
  return (
    <>
    <div className="main flex gap-x-2 flex-col md:flex-row  justify-center">
        <div className="img w-[40vw] px-4 py-4 md:pl-20 flex flex-col gap-2 justify-start">
          <div className="w-80 h-80 rounded-lg animate-pulse bg-gray-200 dark:bg-[#071b4d]"></div>
          <div className="flex  gap-x-2">
            <div className="w-20  h-20 rounded-lg animate-pulse bg-gray-200 dark:bg-[#071b4d]"></div>
            <div className="w-20 h-20 rounded-lg animate-pulse bg-gray-200 dark:bg-[#071b4d]"></div>
            <div className="w-20 h-20 rounded-lg animate-pulse bg-gray-200 dark:bg-[#071b4d]"></div>
          </div>
        </div>
        <div className="details w-full py-4 flex flex-col gap-y-2 justify-start">
          <div className="w-28 h-8 rounded-lg animate-pulse bg-gray-200 dark:bg-[#071b4d]"></div>
          <div className="w-36 h-6 rounded-lg animate-pulse my-3 bg-gray-200 dark:bg-[#071b4d]"></div>
          <div className="w-32 h-6 rounded-lg animate-pulse  bg-gray-200 dark:bg-[#071b4d]"></div>
          <div className="w-48 h-10 my-1 rounded-lg animate-pulse bg-gray-200 dark:bg-[#071b4d]"></div>
          <div className="w-32 h-4 rounded-lg animate-pulse  bg-gray-200 dark:bg-[#071b4d]"></div>
          <div className="w-32 h-4 rounded-lg animate-pulse  bg-gray-200 dark:bg-[#071b4d]"></div>
          <div className="flex py-4 gap-x-4">
            <div className="w-48 h-14 rounded-lg animate-pulse  bg-gray-200 dark:bg-[#071b4d]"></div>
            <div className="w-20 h-14 rounded-lg animate-pulse  bg-gray-200 dark:bg-[#071b4d]"></div>
            <div className="w-20 h-14 rounded-lg animate-pulse bg-gray-200 dark:bg-[#071b4d]"></div>
          </div>
        </div>
      </div>
      <div className="px-4 flex flex-col gap-y-2">
        <div className="w-[40rem] h-4 rounded-lg animate-pulse bg-gray-200 dark:bg-[#071b4d]"></div>
        <div className="w-[60rem] h-4 rounded-lg animate-pulse bg-gray-200 dark:bg-[#071b4d]"></div>
        <div className="w-80 h-4 rounded-lg animate-pulse bg-gray-200 dark:bg-[#071b4d]"></div>
      </div>

    </>
  )
}

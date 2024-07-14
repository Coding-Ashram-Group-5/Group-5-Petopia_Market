import InfoAnimation from "@/components/Ui/Error/InfoAnim";

export default function Info() {
  return (
    <div className="p-2 pt-5 md:p-8 flex justify-between  border-b-2 flex-col md:flex-row-reverse bg-background dark:bg-background">
      <div className=" flex flex-col md:items-end items-center  md:pt-12">
        <div className="flex"><h1 className="text-black font-bold text-[3.5rem] md:text-[5rem]  -tracking-[0.1rem] leading-[4rem] dark:text-white  ">Surprised!</h1> </div>
        <div className="my-2"><h1 className=" text-yellow-400 font-bold text-[3.5rem] md:text-[5rem] -tracking-[0.3rem] leading-[4rem]   "> Your💖Family</h1></div>
        <div><h1 className="text-black font-bold text-[4rem] md:text-[5rem]  -tracking-[0.3rem] leading-[4rem] dark:text-white  "> within 24hr  </h1></div>
        <div className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden">
          <button className="my-6 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-500 to-yellow-400 group-hover:from-red-500 group-hover:to-yellow-400 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-[#FF9A8B] dark:focus:ring-[#FF6E7F]">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-100 hover:text-white bg-white dark:bg-gray-900 dark:hover:text-gray-900 rounded-md group-hover:bg-opacity-0">Order Now</span>
          </button>
        </div>
      </div>
      <div className=" mb-2  flex justify-center">
        <div className="h-[20rem] px-2  scale-75 md:scale-100 md:h-[20rem]">
          <InfoAnimation />
        </div>
      </div>
    </div>
  )
}

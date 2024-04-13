import img from "@/assets/Group 2.svg"
import logo from "@/assets/logo.png"
import { Button } from "@/components/ui/button"


export default function Hero() {

  return (
    <div className="p-2 pt-5 md:p-8 flex justify-between  border-b-2 flex-col md:flex-row bg-background dark:bg-background">
      <div className=" pl-4 md:pt-12">
        <div className="flex"><h1 className="text-black  font-bold text-[3.5rem] md:text-[5rem] -tracking-[0.3rem] leading-[4rem] dark:text-white  ">Your Pet</h1> <div className="h-20 w-20 bg-red-500 rounded-3xl   flex justify-center"> <img src={logo} className=" h-24 md:h-28" alt="logo" /></div></div>
        <div><h1 className=" text-red-500 font-bold text-[4rem] md:text-[5rem]  -tracking-[0.3rem] leading-[4rem]   "> BestFriends</h1></div>
        <div><h1 className="text-black font-bold text-[4rem] md:text-[5rem]  -tracking-[0.3rem] leading-[4rem] dark:text-white  "> Forever</h1></div>
        <div><p className="text-black text-[1.5rem] md:text-[2rem] font-mad font-semibold tracking-[0.2rem] leading-[2rem] dark:text-white ">Lorem ipsum dolor sit amet,  </p></div>
        <div className="my-6"><Button> Adopt pets </Button></div>
      </div>
      <div className="">
        <div><img src={img} className="h-[20rem] md:h-[30rem]" alt="" /></div>
      </div>
    </div>
  )
}

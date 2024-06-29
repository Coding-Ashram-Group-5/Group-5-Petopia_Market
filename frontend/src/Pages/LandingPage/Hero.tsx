import logo from "@/assets/logo.png"
import { useNavigate } from 'react-router-dom'
import Animated from "@/assets/Animated"
import { motion } from "framer-motion";

export default function Hero() {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle navigation on button click
  const AdoptionUserDetails = () => {
     navigate('/pets'); // /adoption/user/dataform
  };

  return (
    <div className="p-2 pt-5 md:p-8 flex justify-between  border-b-2 flex-col md:flex-row bg-background dark:bg-background">
      <div className=" pl-4 md:pt-12">
        <div className="flex"><h1 className="text-black font-bold text-[3.5rem] md:text-[5rem]  -tracking-[0.3rem] leading-[4rem] dark:text-white  ">Your Pet</h1> <div className="h-20 w-20 bg-red-500 rounded-3xl   flex justify-center"> <img src={logo} className=" h-24 md:h-28" alt="logo" /></div></div>
        <div><h1 className=" text-red-500 font-bold text-[4rem] md:text-[5rem] -tracking-[0.3rem] leading-[4rem]   "> BestFriends</h1></div>
        <div><h1 className="text-black font-bold text-[4rem] md:text-[5rem]  -tracking-[0.3rem] leading-[4rem] dark:text-white  "> Forever</h1></div>
        <div className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden">
          <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.8 }}
          type="button"
          className="my-6 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-[#FF9A8B] dark:focus:ring-[#FF6E7F]"
          onClick={AdoptionUserDetails}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-100 hover:text-white bg-white dark:bg-gray-900 dark:hover:text-gray-900 rounded-md group-hover:bg-opacity-0">
              Adopt Pets
            </span>
          </motion.button>
        </div>
      </div>
      <div className=" mb-2  flex justify-center">
        <div className="h-[20rem] px-2  scale-75 md:scale-100 md:h-[30rem]">
          <Animated />
        </div>
      </div>
    </div>
  )
}

import { useEffect, useState } from "react";
import {usePersonStore} from "@/hooks/useStore"

const mobile = "https://pawsindia.com/cdn/shop/files/1_-_Dog_Toys_Banner_Mobile_43cf8d2d-9311-4627-a468-9d2a5b5b7f50.png?v=1699289051"
const desktop = "https://pawsindia.com/cdn/shop/files/1_-_Dog_Toys_Banner_Desktop_1920x_fd7c2ddc-4498-4659-98da-22381a39b20b_1920x.webp?v=1711527648"
export default function DogBanner() {

    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
      };
  
      handleResize(); // Initial check
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  return (
    <>
    <div className="flex justify-center items-center h-fit">
      {isMobile ? (
        <img src={mobile} alt="Mobile Image" loading="lazy" className="max-w-full max-h-full" />
      ) : (
        <img src={desktop} alt="Desktop Image" loading="lazy" className="max-w-full max-h-full rounded-xl" />
      )}
    </div>
    </>
  )
}

import { useEffect, useState } from "react";

const mobile = "https://pawsindia.com/cdn/shop/files/Tags-Banner-Mobile.jpg?v=1711991995"
const desktop = "https://pawsindia.com/cdn/shop/files/Tags-Banner-Web_1920x.jpg?v=1711991996"
export default function Banner() {

    const [isMobile, setIsMobile] = useState(false);

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
    <div className="flex justify-center items-center h-screen">
      {isMobile ? (
        <img src={mobile} alt="Mobile Image" loading="lazy" className="max-w-full max-h-full" />
      ) : (
        <img src={desktop} alt="Desktop Image" loading="lazy" className="max-w-full max-h-full" />
      )}
    </div>
    </>
  )
}

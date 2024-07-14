import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const mobile = "https://pawsindia.com/cdn/shop/files/Dog_Raincoat_Banner_Mobile.png?v=1716742965"
const desktop = "https://pawsindia.com/cdn/shop/files/Dog_Raincoat_Banner_Desktop.png?v=1716742929"
export default function Banner2() {
  const navigate = useNavigate();
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
    <div onClick={() => navigate('/products')} className="flex justify-center cursor-pointer items-center h-fit">
      {isMobile ? (
        <img src={mobile} alt="Mobile Image" loading="lazy" className="max-w-full max-h-fit" />
      ) : (
        <img src={desktop} alt="Desktop Image" loading="lazy" className="max-w-full max-h-full rounded-xl" />
      )}
    </div>
    </>
  )
}

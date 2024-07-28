import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const mobileSrc = "https://i.ibb.co/hmBBQdP/Dog-Raincoat-Banner-Mobile.webp";
const desktopSrc = "https://i.postimg.cc/fLgrmXqW/Dog-Raincoat-Banner-Desktop.webp";

export default function Banner2() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const imageSrc = isMobile ? mobileSrc : desktopSrc;
  const imageAlt = isMobile ? "Mobile Image" : "Desktop Image";

  return (
    <div
      onClick={() => navigate('/products')}
      className="flex justify-center cursor-pointer items-center h-fit"
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        loading="lazy"
        className="w-full h-full rounded-xl"
      />
    </div>
  );
}



// const mobile = "https://pawsindia.com/cdn/shop/files/Dog_Raincoat_Banner_Mobile.png?v=1716742965"
// const desktop = "https://pawsindia.com/cdn/shop/files/Dog_Raincoat_Banner_Desktop.png?v=1716742929"
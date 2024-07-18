import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const mobileSrc = "https://i.ibb.co/6ZNm1cR/Tags-Banner-Mobile.webp";
const desktopSrc = "https://i.postimg.cc/15VZWYs0/Tags-Banner-Web-1920x2.webp";

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
      className="flex justify-center mt-2 cursor-pointer items-center"
    >
<img
  src={imageSrc}
  srcSet={`${desktopSrc} 1920w, ${mobileSrc} 768w`}
  sizes="(max-width: 768px) 100vw, 1920px"
  alt={imageAlt}
  loading="lazy"
  className="w-full h-full rounded-xl"
/>
    </div>
  );
}

// const mobile = "https://pawsindia.com/cdn/shop/files/Tags-Banner-Mobile.jpg?v=1711991995"
// const desktop = "https://pawsindia.com/cdn/shop/files/Tags-Banner-Web_1920x.jpg?v=1711991996"
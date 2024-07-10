import { Button } from "@/components/Ui/Buttons/button";
import { useNavigate } from "react-router-dom";

export default function Sales() {
   const navigate = useNavigate();
  
  return (
    <>
    <div className="bg-background py-6 sm:py-8 lg:py-12">
  <div className="mx-auto max-w-screen-2xl px-4 md:px-4">
    <div className="flex flex-col overflow-hidden rounded-lg bg-yellow-500 sm:flex-row md:h-80">

      <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-2/5">
        <h2 className="mb-4 text-xl font-bold  text-white md:text-2xl lg:text-4xl">IPL Sale<br />Up to 70% off.</h2>

        <p className="mb-8 max-w-md  text-primary font-semibold hidden md:block">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text.</p>

        <div className="mt-auto">
            <Button onClick={() => navigate('/products')} className="bg-red-600 font-leag font-bold">Shop Now</Button>
        </div>
      </div>
      <div className="order-first h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-3/5">
        <img src="https://pawsindia.com/cdn/shop/files/IPL-Web-Size-Compressed_1920x.jpg?v=1711809264" loading="lazy" alt="Photo by Dom Hill" className="h-full w-full object-fit object-center" />
      </div>
    </div>
  </div>
</div>



    </>
  )
}

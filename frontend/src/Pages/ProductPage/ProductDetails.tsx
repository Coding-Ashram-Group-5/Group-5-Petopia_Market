import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getSingleProduct } from "@/lib/ProductApi"
import { useQuery } from "@tanstack/react-query"
import { CircleUserRound, Heart, Truck, UserRoundSearch } from "lucide-react"
import useStore from "@/hooks/useStore";
import ProductView from "@/components/Ui/Skeleton/ProductView"

export default function ProductDetails() {
  const { id } = useParams()
  const { addProduct, cartItems } = useStore();
  console.log(cartItems)

  if (!id) {
    throw new Error("Parameter Id is Required")
  }
  const fetchData = async (id: string) => {
    const data = await getSingleProduct(id)
    return data.data[0]
  }

  const { isLoading, error, data } = useQuery({ queryKey: ["GetSingleProductDetails", id], queryFn: () => fetchData(id) })


  if (isLoading) return <ProductView />;
  if (error) return <div>Error: {error.message}</div>


  return (
    <>
      <div className="main p-5 mx auto ">
        <div className="flex gap-x-14 flex-col md:pl-10 md:flex-row">
          <div className="flex justify-start md:pl-10 p-2 md:p-2">
            <ImgBox petImg={data?.productImages} />
          </div>
          <div className="Pet Description ">
            <div className="">
              <div className="mb-2 md:mb-4 pt-2">
                <span className="mb-0.5 inline-block font-cab font-extrabold text-black dark:text-white"> Category:  <span className="text-red-500 font-semibold"> {data?.category[0]}</span></span>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl">{data?.productName}</h2>
              </div>
              <div className="mb-4 flex items-center md:mb-4">
                <div className="-ml-1 flex gap-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>

                <span className="ml-2 text-sm text-gray-500">4.2</span>
              </div>
              <div className="mb-2">
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl">${data?.productPrice}.00</span>
                </div>
                <span className="text-sm text-gray-500">incl. GST plus shipping</span>
              </div>

              <h1 className="mb-0.5 flex gap-x-2 items-center font-cab font-extrabold text-black dark:text-white"> <Truck /> <span className="text-black dark:text-white font-semibold text-xs">2-5 day To Shipped</span></h1>
              <h1 className="mb-0.5 flex gap-x-2 items-center font-cab font-extrabold text-black dark:text-white"> <CircleUserRound />  <span className="text-black dark:text-white font-semibold capitalize text-xs">Owner : {data?.userData.firstName} {data?.userData.lastName}</span></h1>

              <div className="flex gap-2.5 mt-4">
                <a onClick={() => addProduct(data)} className="inline-block flex-1 rounded-lg bg-red-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-red-300 transition duration-100 hover:bg-red-600 focus-visible:ring active:bg-red-700 sm:flex-none md:text-base">Add to cart</a>
                <a href="#" className="inline-block rounded-lg bg-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-red-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">
                  <Heart />
                </a>
                <a href="#" className="inline-block rounded-lg bg-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-red-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">
                  <UserRoundSearch />
                </a>

              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 md:mt-12 lg:mt-16">
          <div className="mb-3 text-xl font-semibold font-leag text-red-500">Description</div>
          <p className="text-black dark:text-white font-leag">
            Meet <span className="text-red-500 font-bold">{data?.petName}</span>, a charming <span className="text-red-500">{data?.petBread}</span> {data?.petType} with a heart of gold 💖. Despite battling flea infestation and ear infections, <span className="text-red-500">{data?.petName}</span>'s spirit remains resilient. This playful companion thrives on affection and loves adventures. With a glossy coat and soulful eyes, <span>{data?.petName}</span> captures hearts effortlessly. Although not yet adopted, <span>{data?.petName}</span> eagerly awaits a forever home where loyalty and companionship reign supreme. Don't let health challenges deter you; with proper care, <span>{data?.petName}</span> promises unwavering love and joy. Welcome <span>{data?.petName}</span> into your life, and witness the transformation of a pet into family.
          </p>
        </div>
      </div>
    </>
  )
}


const ImgBox = ({ petImg = [{ url: '' }] }) => {

  const [mainImg, setMainImg] = useState(petImg.length > 0 ? petImg[0] : { url: '' })
  useEffect(() => {
    // Set the main image when the component mounts
    setMainImg(petImg.length > 0 ? petImg[0] : { url: '' });
  }, [petImg]);
  return (
    <div className=" flex flex-col w-full h-full gap-1.5 rounded-md overflow-hidden">
      <div className=" overflow-hidden rounded-lg">
        <img
          src={mainImg.url} // throw error here can not read url of undefined
          alt="product"
          className=" h-60 md:h-80 w-80 rounded-lg object-cover object-center hover:scale-125 transition duration-300 ease-in-out"
        />

      </div>
      <div className="flex  gap-x-1.5">
        {petImg.map((img, index) => (
          <img
            key={index}
            src={img.url}
            onClick={() => setMainImg(img)}
            alt="product"
            className=" h-20 w-20 rounded-lg  object-cover object-center"
          />
        )
        )}
      </div>
    </div>
  );
}


import { useState } from "react";
import ProductCard from "./ProductCard";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"


const products = [
  {
    id: 1,
    imageUrl: "https://images.pexels.com/photos/2955820/pexels-photo-2955820.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "Timely Watch",
    price: 15.00,
    salePrice: 30.00
  },
  {
    id: 2,
    imageUrl: "https://images.pexels.com/photos/2955820/pexels-photo-2955820.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "Timely Watch",
    price: 15.00,
    salePrice: 30.00
  },
  {
    id: 3,
    imageUrl: "https://images.pexels.com/photos/2955820/pexels-photo-2955820.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "Timely Watch",
    price: 15.00,
    salePrice: 30.00
  },

];
export default function Products() {

  const [isfilterOpen, setIsFilterOpen] = useState(true);

  function onHandleclick() {
    console.log("open")
    setIsFilterOpen(!isfilterOpen)
  }

  return (
    <>
      <div className="main flex flex-col md:flex-row">
        {isfilterOpen && <>
          <div className="sidebar w-full  md:w-[20vw] md:h-screen border-r-2  ">
            <div className="p-2 font-leag ">
              <h1 className="text-xl" >Filter</h1>
              <div className="w-fit p-2" >
                <RadioGroup defaultValue="option-one">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">Dogs</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">Cats</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-three" id="option-three" />
                    <Label htmlFor="option-three">Birds</Label>
                  </div>
                </RadioGroup>
              </div>
              <h1 className="text-lg" >Seasons </h1>
              <div className="flex items-center p-2 space-x-2">
                <Checkbox id="winter" />
                <label
                  htmlFor="winter"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Winter
                </label>
                <Checkbox id="summer" />
                <label
                  htmlFor="summer"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Summer
                </label>
              </div>

            </div>
          </div>
        </>}
        <div className="products w-full  md:w-full h-screen">
          <div className="bg-background py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
              <div className="mb-6 flex items-end justify-between gap-4">
                <h2 className="text-2xl font-bold text-primary lg:text-3xl">Products</h2>
                <button
                  onClick={onHandleclick}
                  className="flex items-center font-mad hover:bg-slate-500 gap-2 text-primary lg:text-lg rounded-md border p-1 px-2"
                >Filter</button>


              </div>
              <div className="grid gap-x-4 gap-y-8 grid-cols-2 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    imageUrl={product.imageUrl}
                    title={product.title}
                    price={product.price}
                    salePrice={product.salePrice}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

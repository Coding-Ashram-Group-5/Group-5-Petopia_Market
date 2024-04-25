import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"


export default function CarouselBanner() {
  return (
    <>
     <h1 className="font-bold text-[2rem] font-leag pt-2 text-center ">Products <span className="font-bold text-red-500 text-[2rem] text-center ">Here </span> </h1>
      <div className="p-10 flex justify-center gap-4">
        
        <Carousel className="w-full max-w-full">
          <CarouselContent className="-ml-1 px-2 gap-2">
            {products.map(product => (
              <CarouselItem key={product.id} className="pl-1 md:basis-1/3 lg:basis-1/4">
              
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  )
}

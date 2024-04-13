import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import React from 'react';

  interface IProduct {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
  }
  
  interface ICardProps {
    product: IProduct;
  }
  
  const Card: React.FC<ICardProps> = ({ product }) => {
    return (
      <div className="flex flex-col border bg-background rounded-lg justify-center items-center  mx-2">
       
        <div className="" >
          <img src={product.image} loading="lazy" className="h-full w-full rounded-lg object-fill object-center" alt={product.name} />
        <div className=" absolute -top-1  h-fit p-2 w-fit rounded-full bg-red-500 font-mad text-white">Sale</div>
        </div>
        <div className="my-4">
          <h1 className=" font-bold  text-[1.5rem] " >{product.name}</h1>
          <p className=" font-leag text-red-500"> Price : {product.price}</p>
        </div>
      </div>
    );
  };
  
  const Products: React.FC = () => {
    const products: IProduct[] = [
      {
        id: 1,
        name: "Dog",
        description: "Bull Dog Puppies for sale in Lahore, Pakistan.",
        price: "700rs",
        image: "https://images.pexels.com/photos/7752793/pexels-photo-7752793.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 2,
        name: "Puppy",
        description: "normal Puppy dog ",
        price: "500rs",
        image: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
      },
      {
        id: 3,
        name: "Cat ",
        description: "Bull Dog Puppies for sale in japan.",
        price: "500rs",
        image: "https://images.pexels.com/photos/179237/pexels-photo-179237.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 4,
        name: "Product name",
        description: "Product description",
        price: "Product price",
        image: "https://images.pexels.com/photos/179222/pexels-photo-179222.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 5,
        name: "Product name",
        description: "Product description",
        price: "Product price",
        image: "https://images.pexels.com/photos/532992/pexels-photo-532992.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 6,
        name: "Product name",
        description: "Product description",
        price: "Product price",
        image: "https://images.pexels.com/photos/105810/pexels-photo-105810.jpeg?auto=compress&cs=tinysrgb&w=400"
      }

    ];
  
    return (<>
      <h1 className="font-bold text-[2rem] font-leag pt-2 text-center ">Products <span className="font-bold text-red-500 text-[2rem] text-center ">Here </span> </h1>
      <div className="p-10 flex justify-center gap-4">
        
        <Carousel className="w-full max-w-full">
          <CarouselContent className="-ml-1 px-2 gap-2">
            {products.map(product => (
              <CarouselItem key={product.id} className="pl-1 md:basis-1/3 lg:basis-1/4">
                <Card product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      </>
    );
  };
  
  export default Products;
  
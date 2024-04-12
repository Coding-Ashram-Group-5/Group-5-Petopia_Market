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
      <div className="flex flex-col border bg-background justify-center items-center  mx-2">
        <div className="h-40 w-40" >
          <img src={product.image} className=" w-fit " alt={product.name} />
        </div>
        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>{product.price}</p>
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
        name: "Bull dog",
        description: "Bull Dog Puppies for sale in japan.",
        price: "500rs",
        image: "https://plus.unsplash.com/premium_photo-1677542200557-3c6856cc98b1?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 4,
        name: "Product name",
        description: "Product description",
        price: "Product price",
        image: "https://plus.unsplash.com/premium_photo-1677542200557-3c6856cc98b1?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ];
  
    return (
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
    );
  };
  
  export default Products;
  
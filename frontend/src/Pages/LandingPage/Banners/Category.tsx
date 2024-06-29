import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/Ui/Buttons/carousel";
import React from "react";
import { Link } from "react-router-dom";

interface IProduct {
    id: number;
    url:string;
    route?:string
}

const products:IProduct[] = [
    {
        id:5,
        url:"https://res.cloudinary.com/dzxynskmo/image/upload/v1718977789/Petopia/ildp4xcfpc9obs4p8ugi.webp"
    },
    {
        id:6,
        url:"https://res.cloudinary.com/dzxynskmo/image/upload/v1718977789/Petopia/hjjgjsulrcfw8pholxvx.webp"
    },
    {
        id:7,
        url:"https://res.cloudinary.com/dzxynskmo/image/upload/v1718977789/Petopia/xwfm9pnyselehewnqmfm.webp"
    },
    {
        id:8,
        url:"https://res.cloudinary.com/dzxynskmo/image/upload/v1718977789/Petopia/s8c7onmljrk9teiwckwo.webp"
    },
    {
        id:1,
        url:"https://res.cloudinary.com/dzxynskmo/image/upload/v1718977789/Petopia/pfyadluioqtyhtlvz6zy.webp",
        route:""
    },
    {
        id:2,
        url:"https://res.cloudinary.com/dzxynskmo/image/upload/v1718977789/Petopia/oodncngrnr9gzl0uqjvh.webp",
    },
    {
        id:3,
        url:"https://res.cloudinary.com/dzxynskmo/image/upload/v1718977789/Petopia/zttjbcqstjfbuvmyrt0w.webp"
    },
    {
        id:4,
        url:"https://res.cloudinary.com/dzxynskmo/image/upload/v1718977789/Petopia/jyelelffafyaa5f0uquv.png"
    },
    
]

const Category: React.FC = () => {

    return (
        <>
            <h1 className=" font-extrabold text-[2rem]  pt-2 text-center">
                Products{" "}
                <span className="font-bold text-red-500 text-[2rem] text-center">
                Category
                </span>
            </h1>
            <div className="p-10 flex justify-center gap-4">
                <Carousel className="w-full max-w-full">
                    <CarouselContent className="-ml-1 px-2 gap-2">
                        {products.map((product) => (
                            <CarouselItem
                                key={product.id}
                                className="pl-1 md:basis-1/3 lg:basis-1/4"
                            >
                                <div className="flex flex-col shadow-lg bg-background rounded-lg justify-center items-center mx-2">
                                    <Link to={`/products`}>
                                        <div>
                                            <img
                                                src={product.url}
                                                loading="lazy"
                                                className="h-full w-full rounded-lg object-fill object-center"
                                                
                                            />

                                        </div>
                                    </Link>

                                </div>
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

export default Category;

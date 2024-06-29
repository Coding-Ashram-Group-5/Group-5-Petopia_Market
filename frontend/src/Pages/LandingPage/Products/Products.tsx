import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/Ui/Buttons/carousel";
import React from "react";
import { getAllProducts } from "@/lib/ProductApi";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/models";
import { Link } from "react-router-dom";

interface IProduct {
    _id: string;
    productName: string;
    productPrice: number;
    productImages: { url: string }[];
}

interface ICardProps {
    product: IProduct;
}

const Card: React.FC<ICardProps> = ({ product }) => (
    <div className="flex flex-col border bg-background rounded-lg justify-center items-center mx-2">
        <Link to={`/products/getDetails/${product._id}`}>
            <div>
                <img
                    src={product.productImages[0].url}
                    loading="lazy"
                    className="h-full w-full rounded-lg object-fill object-center"
                    alt={product.productName}
                />
                <div className="absolute -top-1 h-fit p-2 w-fit rounded-full bg-red-500 font-mad text-white">
                    Sale
                </div>
            </div>
        </Link>
        <div className="my-4">
            <h1 className="font-bold text-xl">{product.productName}</h1>
            <p className="font-leag font-bold text-red-500">
                Price: ₹{product.productPrice}
            </p>
        </div>
    </div>
);

const Products: React.FC = () => {
    const dataFetch = async (): Promise<Product[]> => {
        try {
            const data = await getAllProducts() as unknown as Product[];
            return data;
        } catch (error) {
            console.error("Error:", error);
            return [];
        }
    };

    const { isLoading, error, data } = useQuery<Product[]>({
        queryKey: ["GetAllProducts"],
        queryFn: dataFetch,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching products</div>;
    }

    const products = data || [];

    return (
        <>
            <h1 className=" font-extrabold text-[2rem]  pt-2 text-center">
                Trending{" "}
                <span className="font-bold text-red-600 text-[2rem] text-center">
                    Products
                </span>
            </h1>
            <div className="p-10 flex justify-center gap-4">
                <Carousel className="w-full max-w-full">
                    <CarouselContent className="-ml-1 px-2 gap-2">
                        {products.map((product) => (
                            <CarouselItem
                                key={product._id}
                                className="pl-1 md:basis-1/3 lg:basis-1/4"
                            >
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

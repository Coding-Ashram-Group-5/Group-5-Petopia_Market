import { useState } from "react";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import CardSkeleton from "@/components/Ui/Skeleton/CardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/lib/ProductApi";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/Ui/drawer"
import { ShoppingBasket } from "lucide-react";
import { Product } from "@/types/models";
interface FilterState {
  animal: string;
  seasons: string[];
  price: number[];
}

export default function Products() {
  const dataFetch = async (): Promise<Product[]> => {
    try {
      const data = await getAllProducts();
      console.log(data)
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
  console.log(isLoading, error, data)
  

  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    animal: "all",
    seasons: [],
    price: [0, 100],
  });

  const onHandleclick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  // const applyFilters = (products: Product[]) => {
  //   return products.filter((product) => {
  //     const matchesAnimal = filters.animal === "all" || product.category === filters.animal;
  //     const matchesSeason =
  //       filters.seasons.length === 0 ||
  //       filters.seasons.some((season) => product.seasons.includes(season));
  //     const matchesPrice = product.price >= filters.price[0] && product.price <= filters.price[1];
  //     return matchesAnimal && matchesSeason && matchesPrice;
  //   });
  // };

  return (
    <div className="main flex flex-col md:flex-row">
      {isFilterOpen && <Filter onFilterChange={handleFilterChange} />}
      <div className="products w-full md:w-full h-fit">
        <div className="bg-background py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold text-primary lg:text-3xl">Products</h2>
              <button
                onClick={onHandleclick}
                className="flex items-center font-mad hover:bg-slate-200 gap-2 text-primary lg:text-lg rounded-md border p-1 px-2"
              >
                Filter
              </button>
            </div>
            <div className="grid gap-x-4 gap-y-8 grid-cols-2 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
              {isLoading &&
                [1, 2, 3, 4].map((item) => <CardSkeleton key={item} />)}
              {error && <div>Something went wrong</div>}
              {Array.isArray(data) &&
              data.map((product) => (
                 <>
                  <ProductCard
                    key={product._id}
                    productId={product._id}
                    imageUrl={product.productImages[0].url}
                    title={product.productName}
                    price={product.productPrice}
                    salePrice={product.discount}
                  /></>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Drawer>
       <div className=" p-2 px-3 fixed bg-red-500 rounded-xl top-[90%] right-4">
       <DrawerTrigger> <div className=""><ShoppingBasket size={30} /> </div></DrawerTrigger>
       </div>
        <DrawerContent>
         <div className="h-[60vh]">
                <div className="head flex justify-between px-4">
                  <h1 className="text-2xl font-bold ">Cart </h1>
                  <DrawerClose><div className="px-2 py-1 border rounded-lg text-sm text-red-500">Close</div></DrawerClose>
                </div>
                <div className="Products px-1 mt-2">
                  <div className="product flex px-2">
                    <div className="product-image mx-5">
                      <img src="https://via.placeholder.com/150" className=" rounded-xl" alt="product" />
                    </div>
                    <div className="product-details">
                      <h1 className="text-lg font-bold">Product Name</h1>
                      <p className="text-sm">Price: $100</p>
                      <p className="text-sm">Quantity: 1</p>
                    </div>
                  </div>
                </div>
         </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

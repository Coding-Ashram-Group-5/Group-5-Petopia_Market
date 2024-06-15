import { useState } from "react";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import CardSkeleton from "@/components/Ui/Skeleton/CardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/lib/ProductApi";
import { Product } from "@/types/models";


interface FilterState {
  animal: string;
  seasons: string[];
  price: number[];
}

export default function Products() {
  const dataFetch = async (): Promise<Product[]> => {
    try {
      const data = await getAllProducts() as unknown as Product[];
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

  const applyFilters = (products: Product[]) => {
    return products.filter((product) => {
      const matchesAnimal = filters.animal === "all" || product.category === filters.animal;
      const matchesSeason = true;
        // filters.seasons.length === 0 || filters.seasons.some((season) => product.seasons.includes(season));
      const matchesPrice = true
      // product.price >= filters.price[0] && product.price <= filters.price[1];
      return matchesAnimal && matchesSeason && matchesPrice;
    });
  };
  

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
              applyFilters(data).map((product) => (
                 <>
                  <ProductCard
                   data={product}
                  /></>
                ))}
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}

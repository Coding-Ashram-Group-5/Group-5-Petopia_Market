import { useState } from "react";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import CardSkeleton from "@/components/Ui/Skeleton/CardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/lib/ProductApi";
import { Product } from "@/types/models";
import { Input } from "@/components/Ui/input";
import { Search } from "lucide-react";

interface FilterState {
  animal: string;
  seasons: string[];
  price: number[];
}

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const limit = "50";
  const dataFetch = async (): Promise<Product[]> => {
    try {
      const data = await getAllProducts(limit) as unknown as Product[];
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

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    animal: "all",
    seasons: [],
    price: [0, 5000],
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
      const matchesPrice = product.productPrice >= filters.price[0] && product.productPrice <= filters.price[1];
      return matchesAnimal && matchesSeason && matchesPrice;
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = applyFilters(data || []).filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main flex flex-col md:flex-row">
      {isFilterOpen && <Filter onFilterChange={handleFilterChange} />}
      <div className="products w-full md:w-full h-fit">
        <div className="bg-background py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold text-primary lg:text-3xl">Products</h2>
              <div className="flex gap-x-2 items-center">
                <h2 className="font-bold font-cab"><Search/></h2>
                <Input type="text" value={searchQuery} placeholder="Search..." onChange={handleSearchChange} />
              <button
                type="button"
                onClick={onHandleclick}
                className="flex items-center hover:bg-slate-200 font-semibold dark:hover:bg-slate-800 gap-2 text-primary lg:text-md rounded-sm border p-1 px-2"
              >
                Filter
              </button>
              </div>
            </div>
            <div className="grid gap-x-4 gap-y-8 grid-cols-2 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
              {isLoading && [1, 2, 3, 4].map((item) => <CardSkeleton key={item} />)}
              {error && <div>Something went wrong</div>}
              {filteredData.map((product) => (
                <ProductCard key={product._id} data={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

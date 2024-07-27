import React from 'react';
import { ShoppingCart } from "lucide-react";
import { Link } from 'react-router-dom';
import useStore from "@/hooks/useStore";
import { useToast } from '@/components/Ui/use-toast';
import { FaStar } from 'react-icons/fa6';

interface ProductCardProps {
  data: {
    _id: string;
    productName: string;
    productImages: { url: string }[];
    productPrice: number;
    discount: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const { cartItems, addProduct } = useStore();
  const { toast } = useToast();

  const handleAddCart = () => {
    if (cartItems.includes(data)) return alert("Product already in cart");
    addProduct(data);
    toast({
      title: " 🛒 Product Added",
      description: "Product has been added to cart",
    
    })
  }
  const alreadyInCart = cartItems.includes(data);

  return (
    <div className="bg-background dark:bg-card border border-border rounded-lg">
      <Link to={`getDetails/${data._id}`} className="group relative mb-2 block h-48 overflow-hidden rounded-t-lg lg:mb-3">
        <img
          src={data.productImages[0].url}
          loading="lazy"
          alt={`Photo of ${data.productName}`}
          className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
        />
        {data.productPrice && (
          <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-xs font-bold font-mad uppercase tracking-wider text-white">
             sale
          </span>
        )}
      </Link>
      <div className="p-2  bg-gray-100 dark:bg-transparent rounded-b-lg ">
        <a href="#" className="hover:gray-800 px-2 mb-1 text-primary font-bold text-xl transition font-leag duration-100 lg:text-md">
          {data.productName}
        </a>
        <div className="flex px-2 ">
            {[...Array(5)].map((_, index) => ( 
                <FaStar key={index} className="text-yellow-400" />
            ))}
        </div>
        <div className="flex items-end justify-between gap-2 px-2">
          <span className="font-bold text-gray-700 dark:text-white lg:text-lg">
          ₹{Math.ceil((data.productPrice)*(100 - data.discount)/100)} {data.productPrice && <span className="mb-0.5 text-red-500 line-through text-sm">₹{(data.productPrice)}</span>}
          </span>
          <span className='px-2'>
            <button  onClick={handleAddCart}>{!alreadyInCart? <ShoppingCart/>: <span className='text-red-500'><ShoppingCart  /></span>}</button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

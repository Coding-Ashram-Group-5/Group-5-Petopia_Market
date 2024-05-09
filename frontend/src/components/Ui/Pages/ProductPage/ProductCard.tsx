import React from 'react';
import { ShoppingCart } from "lucide-react";
interface ProductCardProps {
  imageUrl: string;
  title: string;
  price: number;
  salePrice?: number; // Optional prop for sale price
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, title, price, salePrice }) => {
  return (
    <div className="bg-background dark:bg-card border border-border rounded-lg">
      <a href="#" className="group relative mb-2 block h-40 overflow-hidden rounded-lg  lg:mb-3">
        <img
          src={imageUrl}
          loading="lazy"
          alt={`Photo of ${title}`}
          className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
        />
        {salePrice && (
          <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
            sale
          </span>
        )}
      </a>
      <div className="p-2">
        <a href="#" className="hover:gray-800 mb-1 text-primary font-bold transition font-leag duration-100 lg:text-sm">
          {title}
        </a>
        <div className="flex items-end justify-between gap-2">
          <span className="font-bold text-gray-800 lg:text-lg">
            ${price} {salePrice && <span className="mb-0.5 text-red-500 line-through">${salePrice}</span>}
          </span>
          <span><ShoppingCart /></span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

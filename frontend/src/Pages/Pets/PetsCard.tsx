import React from 'react';
import { HandHelping } from "lucide-react";
import { Link } from 'react-router-dom';
interface ProductCardProps {
    imageUrl: string;
    title: string;
    price: number;
    petType: string;
    petBread: string;
    isFree: boolean;
    petId:string;
}

const PetsCard: React.FC<ProductCardProps> = ({ imageUrl, title, price, petBread, petType, isFree, petId }) => {
    return (
        <div className="bg-background dark:bg-card border border-border rounded-lg">
            <Link to={`getDetails/${petId}`} className="group relative mb-0 block h-48 overflow-hidden rounded-t-lg  lg:mb-3">
                
                <img
                    src={imageUrl}
                    loading="lazy"
                    alt={`Photo of ${title}`}
                    className="h-full w-full object-cover object-center transition  group-hover:scale-110"
                />

                <span className={`absolute left-0 top-0 rounded-br-lg px-3 py-1.5 text-sm font-leag font-bold tracking-wider text-white ${isFree ? "bg-green-500" : "bg-red-500"} `}>
                    {isFree ? "Free" : "Sale"}
                </span>
            </Link>
            <div className="p-2">
                <h1 className="text-center text-primary font-bold transition font-leag duration-100 lg:text-[1.2rem] ">
                    {title}
                </h1>
                <span className='flex justify-center text-[0.8rem] font-mad'>{petType} & {petBread}</span>
                <div className="flex items-end justify-between px-2 py-2 gap-2">
                    <span className="font-bold text-green-400 lg:text-lg">
                    ₹{price}
                    </span>
                    <span><Link to={`/pets/getDetails/${petId}`}> <HandHelping /></Link></span>
                </div>
            </div>
        </div>
    );
};

export default PetsCard;

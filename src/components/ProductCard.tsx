
import React from 'react';

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
}

const ProductCard = ({ name, price, image }: ProductCardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Details
          </button>
        </div>
      </div>
      <div className="text-center mt-4">
        <h3 className="text-xl font-serif">{name}</h3>
        <p className="text-gray-600 mt-1">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;

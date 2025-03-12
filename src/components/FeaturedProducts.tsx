
import React from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    name: "Brandon Sofa",
    price: "Starting at ₹85,000",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=60"
  },
  {
    name: "Enzo Loveseat",
    price: "Starting at ₹65,000",
    image: "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?w=800&auto=format&fit=crop&q=60"
  },
  {
    name: "Kenshester Classic",
    price: "Starting at ₹95,000",
    image: "https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=800&auto=format&fit=crop&q=60"
  },
  {
    name: "Gene Sectional",
    price: "Starting at ₹120,000",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&auto=format&fit=crop&q=60"
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif text-center mb-12">Featured Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.name}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

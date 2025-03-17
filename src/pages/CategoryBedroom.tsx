import React from 'react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const CategoryBedroom = () => {
  // Product data with images from reliable public sources
  const bedroomProducts = [
    {
      id: 1,
      name: "Luxe Comfort King Bed",
      price: "Starting at ₹125,000",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Experience unparalleled comfort with our premium stainless steel frame king bed, featuring elegant design and superior durability."
    },
    {
      id: 2,
      name: "Serene Night Stand",
      price: "₹45,000",
      image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "A perfect blend of functionality and style, our stainless steel night stand complements any bedroom decor."
    },
    {
      id: 3,
      name: "Stallion Dresser Elite",
      price: "₹85,000",
      image: "https://images.unsplash.com/photo-1551298370-9d3d53740c72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Elevate your bedroom storage with our premium stainless steel dresser, featuring spacious drawers and timeless design."
    },
    {
      id: 4,
      name: "Harmony Wardrobe",
      price: "Starting at ₹150,000",
      image: "https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Our signature stainless steel wardrobe combines ample storage with sophisticated design for the modern bedroom."
    },
    {
      id: 5,
      name: "Tranquil Vanity Set",
      price: "₹95,000",
      image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Start your day with elegance using our stainless steel vanity set, featuring a crystal-clear mirror and spacious storage."
    },
    {
      id: 6,
      name: "Serenity Bedroom Bench",
      price: "₹65,000",
      image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Add a touch of luxury to your bedroom with our stainless steel bench, perfect for seating or as a decorative accent."
    }
  ];

  return (
    <div className="pt-32 pb-20">
      {/* Breadcrumb navigation */}
      <div className="container mx-auto px-4 mb-8">
        <div className="text-sm text-gray-500 mb-2">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/category" className="hover:text-gold transition-colors">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Bedroom</span>
        </div>
      </div>

      {/* Category header */}
      <div className="container mx-auto px-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">Bedroom Collection</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Transform your bedroom into a sanctuary of elegance with our premium stainless steel furniture. 
          Each piece is meticulously crafted to provide both aesthetic appeal and unmatched durability.
        </p>
      </div>

      {/* Filters and sorting */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap items-center justify-between pb-6 border-b">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className="text-gray-700">Filter by:</span>
            <select className="border rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-gold">
              <option>All Items</option>
              <option>Beds</option>
              <option>Dressers</option>
              <option>Nightstands</option>
              <option>Wardrobes</option>
            </select>
            <select className="border rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-gold">
              <option>All Prices</option>
              <option>Under ₹50,000</option>
              <option>₹50,000 - ₹100,000</option>
              <option>Over ₹100,000</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Sort by:</span>
            <select className="border rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-gold">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bedroomProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <ProductCard
                name={product.name}
                price={product.price}
                image={product.image}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBedroom; 
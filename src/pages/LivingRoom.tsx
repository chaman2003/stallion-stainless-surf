import React from 'react';
import { Link } from 'react-router-dom';

const LivingRoom = () => {
  const livingRoomProducts = [
    {
      url: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      name: "Modern Sofa Set",
      description: "Premium stainless steel frame sofa with luxurious upholstery"
    },
    {
      url: "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      name: "Coffee Table",
      description: "Contemporary glass and stainless steel coffee table"
    },
    {
      url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      name: "Side Tables",
      description: "Matching set of stainless steel side tables"
    },
    {
      url: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      name: "Entertainment Center",
      description: "Modern entertainment unit with cable management"
    },
    {
      url: "https://images.unsplash.com/photo-1611486212557-88be5ff6f941?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      name: "Accent Chair",
      description: "Designer accent chair with stainless steel frame"
    },
    {
      url: "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      name: "Storage Console",
      description: "Versatile console with hidden storage compartments"
    }
  ];

  return (
    <div className="pt-32 pb-20">
      {/* Breadcrumb navigation */}
      <div className="container mx-auto px-4 mb-8">
        <div className="text-sm text-gray-500 mb-2">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Living Room Collection</span>
        </div>
      </div>

      {/* Page header */}
      <div className="container mx-auto px-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">Living Room Collection</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Elevate your living space with our exquisite stainless steel furniture collection. 
          Each piece is masterfully crafted to blend contemporary design with timeless elegance, 
          creating the perfect atmosphere for modern living.
        </p>
      </div>

      {/* Product grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {livingRoomProducts.map((product, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg group">
              <div className="relative pb-[75%] overflow-hidden">
                <img
                  src={product.url}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <button className="mt-4 px-6 py-2 bg-gold text-white rounded hover:bg-gold/90 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LivingRoom; 
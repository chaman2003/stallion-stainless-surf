import React from 'react';
import { Link } from 'react-router-dom';

const DiningRoom = () => {
  const diningRoomProducts = [
    {
      url: "https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      name: "Elegant Dining Table Set",
      description: "Premium stainless steel dining table with 6 chairs"
    },
    {
      url: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      name: "Modern Buffet Cabinet",
      description: "Contemporary stainless steel buffet with glass accents"
    },
    {
      url: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      name: "Wine Storage Unit",
      description: "Sophisticated wine rack with temperature control"
    },
    {
      url: "https://images.unsplash.com/photo-1595514535415-dae8570cd720?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      name: "Serving Cart",
      description: "Mobile serving cart with multiple tiers"
    },
    {
      url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      name: "Console Table",
      description: "Sleek console table for dining room storage"
    },
    {
      url: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      name: "Display Cabinet",
      description: "Glass-front display cabinet with LED lighting"
    }
  ];

  return (
    <div className="pt-32 pb-20">
      {/* Breadcrumb navigation */}
      <div className="container mx-auto px-4 mb-8">
        <div className="text-sm text-gray-500 mb-2">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Dining Room Collection</span>
        </div>
      </div>

      {/* Page header */}
      <div className="container mx-auto px-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">Dining Room Collection</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Transform your dining space with our premium stainless steel furniture collection. 
          Each piece combines sophisticated design with exceptional durability, creating the 
          perfect setting for memorable dining experiences.
        </p>
      </div>

      {/* Product grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diningRoomProducts.map((product, index) => (
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

export default DiningRoom; 
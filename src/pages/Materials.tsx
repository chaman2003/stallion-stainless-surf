import React from 'react';
import { Link } from 'react-router-dom';

const Materials = () => {
  const materials = [
    {
      name: "Premium Stainless Steel",
      description: "Our signature material, chosen for its durability, aesthetic appeal, and sustainability.",
      properties: ["Corrosion Resistant", "High Strength", "Long Lasting", "Recyclable"],
      image: "https://images.unsplash.com/photo-1581092436491-d9769e1030cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "Tempered Glass",
      description: "Premium glass that complements our stainless steel designs while adding elegance and functionality.",
      properties: ["Safety Tested", "Heat Resistant", "Crystal Clear", "Easy to Clean"],
      image: "https://images.unsplash.com/photo-1598899246709-c8273815f3ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "Natural Leather",
      description: "Sustainably sourced leather that adds warmth and comfort to our metal furniture.",
      properties: ["Premium Quality", "Ethically Sourced", "Durable", "Ages Beautifully"],
      image: "https://images.unsplash.com/photo-1598541089056-f6769a0563f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const qualityFeatures = [
    {
      title: "Material Testing",
      description: "Every material undergoes rigorous testing for durability, safety, and longevity."
    },
    {
      title: "Sustainable Sourcing",
      description: "We partner with suppliers who share our commitment to environmental responsibility."
    },
    {
      title: "Quality Control",
      description: "Multiple inspection points ensure materials meet our high standards."
    },
    {
      title: "Innovation",
      description: "Continuous research into new materials and techniques to enhance our furniture."
    }
  ];

  return (
    <div className="pt-32 pb-20">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mb-8">
        <div className="text-sm text-gray-500 mb-2">
          <Link to="/" className="hover:text-[hsl(var(--theme))] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/artisans" className="hover:text-[hsl(var(--theme))] transition-colors">Artisans</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Materials</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">Our Materials</h1>
        <div className="max-w-4xl">
          <p className="text-xl text-gray-700 mb-8">
            We select only the finest materials for our furniture, ensuring each piece 
            not only looks beautiful but stands the test of time. Our commitment to 
            quality begins with the materials we choose.
          </p>
        </div>
      </div>

      {/* Materials Section */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 gap-16">
          {materials.map((material, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <div className="relative pb-[75%] overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={material.image}
                    alt={material.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-serif mb-4">{material.name}</h2>
                <p className="text-gray-600 mb-6">{material.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {material.properties.map((property, propIndex) => (
                    <div key={propIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gold rounded-full"></div>
                      <span>{property}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Features */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif mb-12">Quality Assurance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {qualityFeatures.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-medium mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Materials; 

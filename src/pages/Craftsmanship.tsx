import React from 'react';
import { Link } from 'react-router-dom';

const Craftsmanship = () => {
  const techniques = [
    {
      name: "Precision Welding",
      description: "Our master welders use advanced techniques to create seamless joints that are both strong and aesthetically pleasing.",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "Surface Finishing",
      description: "Multiple stages of finishing ensure each piece has our signature luxurious appearance and durability.",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "Custom Forming",
      description: "State-of-the-art forming techniques allow us to create unique shapes while maintaining structural integrity.",
      image: "https://images.unsplash.com/photo-1564540574859-0dfb63985953?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const qualityStandards = [
    {
      title: "Material Selection",
      description: "Only the highest grade stainless steel is used in our furniture, ensuring longevity and beauty."
    },
    {
      title: "Quality Control",
      description: "Each piece undergoes rigorous testing and inspection at multiple stages of production."
    },
    {
      title: "Environmental Standards",
      description: "Our processes meet or exceed international environmental standards for sustainable manufacturing."
    },
    {
      title: "Durability Testing",
      description: "Every design undergoes extensive testing to ensure it meets our strict durability requirements."
    }
  ];

  return (
    <div className="pt-32 pb-20">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mb-8">
        <div className="text-sm text-gray-500 mb-2">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/heritage" className="hover:text-gold transition-colors">Heritage</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Craftsmanship</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">Our Craftsmanship</h1>
        <div className="max-w-4xl">
          <p className="text-xl text-gray-700 mb-8">
            At the heart of our furniture lies unparalleled craftsmanship. Each piece is 
            a testament to our dedication to quality, precision, and artistic excellence 
            in stainless steel furniture making.
          </p>
        </div>
      </div>

      {/* Techniques Section */}
      <div className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-serif mb-12">Our Techniques</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {techniques.map((technique, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
              <div className="relative pb-[75%]">
                <img
                  src={technique.image}
                  alt={technique.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-medium mb-4">{technique.name}</h3>
                <p className="text-gray-600">{technique.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Standards */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif mb-12">Quality Standards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {qualityStandards.map((standard, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-medium mb-4">{standard.title}</h3>
              <p className="text-gray-600">{standard.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Craftsmanship; 
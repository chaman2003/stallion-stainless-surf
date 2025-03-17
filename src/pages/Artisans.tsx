import React from 'react';
import { Link } from 'react-router-dom';

const Artisans = () => {
  const artisans = [
    {
      name: "David Chen",
      role: "Master Craftsman",
      specialty: "Metal Forming",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "With over 20 years of experience in metalworking, David leads our innovative design implementations."
    },
    {
      name: "Sarah Martinez",
      role: "Design Specialist",
      specialty: "Surface Finishing",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Sarah's expertise in surface treatments creates our signature aesthetic finishes."
    },
    {
      name: "James Wilson",
      role: "Technical Director",
      specialty: "Structural Engineering",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "James ensures every piece meets our exacting standards for durability and stability."
    },
    {
      name: "Maria Kovac",
      role: "Artisan Designer",
      specialty: "Custom Solutions",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Maria specializes in creating bespoke furniture solutions for unique spaces."
    }
  ];

  return (
    <div className="pt-32 pb-20">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mb-8">
        <div className="text-sm text-gray-500 mb-2">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Our Artisans</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">Meet Our Artisans</h1>
        <div className="max-w-4xl">
          <p className="text-xl text-gray-700 mb-8">
            Behind every piece of our furniture stands a team of dedicated craftspeople, 
            each bringing years of expertise and passion to their work. Meet the masters 
            who bring our designs to life.
          </p>
        </div>
      </div>

      {/* Artisans Grid */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {artisans.map((artisan, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3">
                <div className="relative pb-[100%] overflow-hidden rounded-lg">
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-medium mb-2">{artisan.name}</h3>
                <div className="text-gold mb-2">{artisan.role}</div>
                <div className="text-gray-600 mb-4">Specialty: {artisan.specialty}</div>
                <p className="text-gray-700">{artisan.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workshop Section */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif mb-8">Our Workshop</h2>
        <div className="bg-gray-50 rounded-lg p-8">
          <div className="max-w-3xl">
            <p className="text-lg text-gray-700 mb-6">
              Our state-of-the-art workshop combines traditional craftsmanship with modern 
              technology. Each piece of furniture is meticulously crafted by our team of 
              skilled artisans, ensuring the highest quality and attention to detail.
            </p>
            <button className="px-6 py-3 bg-gold text-white rounded hover:bg-gold/90 transition-colors">
              Schedule a Workshop Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artisans; 
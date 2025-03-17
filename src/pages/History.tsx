import React from 'react';
import { Link } from 'react-router-dom';

const History = () => {
  const historicalEvents = [
    {
      year: "1980",
      title: "The Beginning",
      description: "The foundation of our company in a small workshop, where our founder first began experimenting with stainless steel furniture design."
    },
    {
      year: "1985",
      title: "First Collection",
      description: "Launch of our first complete furniture collection, featuring innovative stainless steel designs that caught the industry's attention."
    },
    {
      year: "1990",
      title: "International Recognition",
      description: "Our designs received international acclaim at the Milan Furniture Fair, establishing our presence in the global market."
    },
    {
      year: "2000",
      title: "Manufacturing Excellence",
      description: "Opening of our state-of-the-art manufacturing facility, incorporating the latest technology in stainless steel fabrication."
    },
    {
      year: "2010",
      title: "Sustainable Innovation",
      description: "Implementation of eco-friendly manufacturing processes and sustainable material sourcing practices."
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Embracing digital technology in design and customer experience while maintaining our commitment to craftsmanship."
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
          <span className="text-gray-800">History</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">Our History</h1>
        <div className="max-w-4xl">
          <p className="text-xl text-gray-700 mb-8">
            Since our inception, we have been dedicated to pushing the boundaries of 
            furniture design through innovative use of stainless steel. Our journey 
            is marked by continuous innovation, unwavering quality, and a commitment 
            to excellence.
          </p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {historicalEvents.map((event, index) => (
            <div key={index} className="relative pb-12 last:pb-0">
              <div className="flex items-start">
                {/* Year */}
                <div className="flex-shrink-0 w-24 pt-1">
                  <span className="text-2xl font-serif text-gold">{event.year}</span>
                </div>
                {/* Content */}
                <div className="flex-grow pl-8 border-l-2 border-gold">
                  <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History; 
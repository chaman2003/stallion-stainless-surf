import React from 'react';
import { Link } from 'react-router-dom';

const Process = () => {
  const designProcess = [
    {
      step: 1,
      title: "Concept Development",
      description: "Our designers create initial sketches and 3D models, exploring innovative ways to work with stainless steel.",
      image: "https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      step: 2,
      title: "Material Selection",
      description: "We carefully select the highest grade stainless steel and complementary materials for each piece.",
      image: "https://images.unsplash.com/photo-1581092436491-d9769e1030cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      step: 3,
      title: "Prototyping",
      description: "Each design is prototyped and tested extensively to ensure both functionality and aesthetic appeal.",
      image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      step: 4,
      title: "Production",
      description: "Our skilled artisans craft each piece using a combination of traditional techniques and modern technology.",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      step: 5,
      title: "Quality Control",
      description: "Rigorous quality checks ensure each piece meets our exacting standards before leaving our workshop.",
      image: "https://images.unsplash.com/photo-1564540574859-0dfb63985953?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className="pt-32 pb-20">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mb-8">
        <div className="text-sm text-gray-500 mb-2">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/artisans" className="hover:text-gold transition-colors">Artisans</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Process</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">Our Process</h1>
        <div className="max-w-4xl">
          <p className="text-xl text-gray-700 mb-8">
            From initial concept to final production, every piece of furniture goes through 
            a meticulous process that combines traditional craftsmanship with modern innovation. 
            Discover how we bring our designs to life.
          </p>
        </div>
      </div>

      {/* Process Steps */}
      <div className="container mx-auto px-4">
        {designProcess.map((step, index) => (
          <div key={index} className="mb-20 last:mb-0">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              {/* Image */}
              <div className="md:w-1/2">
                <div className="relative pb-[75%] overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Content */}
              <div className="md:w-1/2">
                <div className="text-gold text-6xl font-serif mb-4">0{step.step}</div>
                <h2 className="text-2xl font-medium mb-4">{step.title}</h2>
                <p className="text-gray-600 text-lg">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 mt-20">
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-serif mb-4">Experience Our Craftsmanship</h3>
          <p className="text-gray-600 mb-6">
            Want to see our process in action? Schedule a workshop visit to witness 
            our craftsmen at work.
          </p>
          <button className="px-8 py-3 bg-gold text-white rounded-md hover:bg-gold/90 transition-colors">
            Schedule a Visit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Process; 
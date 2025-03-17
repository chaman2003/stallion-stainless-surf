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

  // Craftsmanship content integrated from the Craftsmanship page
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
          <Link to="/" className="hover:text-[hsl(var(--theme))] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/heritage" className="hover:text-[hsl(var(--theme))] transition-colors">Heritage</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Process & Craftsmanship</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">Our Process & Craftsmanship</h1>
        <div className="max-w-4xl">
          <p className="text-xl text-gray-700 mb-8">
            From initial concept to final production, every piece of furniture goes through 
            a meticulous process that combines traditional craftsmanship with modern innovation. 
            At the heart of our furniture lies unparalleled craftsmanship and dedication to quality.
          </p>
        </div>
      </div>

      {/* Process Steps */}
      <div className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-serif mb-10">Design Process</h2>
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
                <div className="text-[hsl(var(--theme))] text-6xl font-serif mb-4">0{step.step}</div>
                <h2 className="text-2xl font-medium mb-4">{step.title}</h2>
                <p className="text-gray-600 text-lg">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Craftsmanship Techniques Section */}
      <div className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-serif mb-12">Craftsmanship Techniques</h2>
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
      <div className="container mx-auto px-4 mb-20">
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

      {/* Call to Action */}
      <div className="container mx-auto px-4 mt-20">
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-serif mb-4">Experience Our Craftsmanship</h3>
          <p className="text-gray-600 mb-6">
            Want to see our process in action? Schedule a workshop visit to witness 
            our craftsmen at work.
          </p>
          <button className="px-8 py-3 bg-[hsl(var(--theme))] text-white rounded-md hover:bg-[hsl(var(--theme-hover))] transition-colors">
            Schedule a Visit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Process; 
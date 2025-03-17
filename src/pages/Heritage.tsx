import React from 'react';
import { Link } from 'react-router-dom';

const Heritage = () => {
  const milestones = [
    {
      year: "1985",
      title: "Our Beginning",
      description: "Founded with a vision to revolutionize furniture craftsmanship using stainless steel."
    },
    {
      year: "1995",
      title: "Innovation in Design",
      description: "Pioneered new techniques in stainless steel furniture manufacturing."
    },
    {
      year: "2005",
      title: "Global Expansion",
      description: "Expanded operations to international markets, bringing our craftsmanship worldwide."
    },
    {
      year: "2015",
      title: "Sustainability Initiative",
      description: "Implemented eco-friendly production processes and sustainable material sourcing."
    },
    {
      year: "2023",
      title: "Digital Transformation",
      description: "Embracing modern technology while maintaining traditional craftsmanship values."
    }
  ];

  return (
    <div className="pt-32 pb-20">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mb-8">
        <div className="text-sm text-gray-500 mb-2">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Heritage</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">Our Heritage</h1>
        <div className="max-w-4xl">
          <p className="text-xl text-gray-700 mb-8">
            For over three decades, we have been at the forefront of innovative furniture design, 
            combining traditional craftsmanship with modern stainless steel manufacturing techniques.
          </p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-serif mb-12">Our Journey</h2>
        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/4">
                <div className="text-4xl font-serif text-gold">{milestone.year}</div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-2xl font-medium mb-4">{milestone.title}</h3>
                <p className="text-gray-600">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium mb-4">Craftsmanship</h3>
            <p className="text-gray-600">
              We maintain the highest standards of quality in every piece we create, 
              combining traditional techniques with modern innovation.
            </p>
          </div>
          <div className="p-8 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium mb-4">Sustainability</h3>
            <p className="text-gray-600">
              Our commitment to environmental responsibility guides every aspect of 
              our production process.
            </p>
          </div>
          <div className="p-8 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium mb-4">Innovation</h3>
            <p className="text-gray-600">
              We continuously push the boundaries of what's possible in stainless 
              steel furniture design.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heritage; 
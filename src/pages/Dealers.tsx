import React from 'react';
import { Link } from 'react-router-dom';

const Dealers = () => {
  const dealers = [
    {
      name: "Luxury Home Furnishings",
      location: "Los Angeles, CA",
      type: "Premium Retailer",
      contact: {
        phone: "+1 (323) 555-0101",
        email: "sales@luxuryhome.example.com"
      },
      specialties: ["Custom Orders", "Interior Design Services", "White Glove Delivery"]
    },
    {
      name: "Modern Living Solutions",
      location: "Chicago, IL",
      type: "Authorized Dealer",
      contact: {
        phone: "+1 (312) 555-0202",
        email: "info@modernliving.example.com"
      },
      specialties: ["Commercial Projects", "Space Planning", "Installation"]
    },
    {
      name: "Elite Interiors",
      location: "Dallas, TX",
      type: "Premium Retailer",
      contact: {
        phone: "+1 (214) 555-0303",
        email: "sales@eliteinteriors.example.com"
      },
      specialties: ["Residential Design", "Custom Finishes", "Project Management"]
    }
  ];

  const partnershipBenefits = [
    {
      title: "Exclusive Products",
      description: "Access to limited edition and dealer-exclusive collections."
    },
    {
      title: "Training Program",
      description: "Comprehensive product knowledge and sales training for your team."
    },
    {
      title: "Marketing Support",
      description: "Co-branded marketing materials and promotional support."
    },
    {
      title: "Priority Service",
      description: "Dedicated account manager and priority order processing."
    }
  ];

  return (
    <div className="pt-32 pb-20">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mb-8">
        <div className="text-sm text-gray-500 mb-2">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/contact" className="hover:text-gold transition-colors">Contact</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Authorized Dealers</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">Authorized Dealers</h1>
        <div className="max-w-4xl">
          <p className="text-xl text-gray-700 mb-8">
            Our network of authorized dealers represents the finest furniture retailers 
            across the country. Each dealer is carefully selected to ensure they meet 
            our high standards of service and expertise.
          </p>
        </div>
      </div>

      {/* Dealers List */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dealers.map((dealer, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="border-b pb-4 mb-4">
                <h2 className="text-2xl font-serif mb-2">{dealer.name}</h2>
                <p className="text-gray-600">{dealer.location}</p>
                <span className="inline-block bg-gold/10 text-gold px-3 py-1 rounded-full text-sm mt-2">
                  {dealer.type}
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Contact Information</h3>
                  <p className="text-gray-600">{dealer.contact.phone}</p>
                  <p className="text-gray-600">{dealer.contact.email}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Specialties</h3>
                  <ul className="space-y-2">
                    {dealer.specialties.map((specialty, specIndex) => (
                      <li key={specIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                        <span className="text-gray-600">{specialty}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partnership Section */}
      <div className="container mx-auto px-4">
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-serif mb-8">Become a Dealer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {partnershipBenefits.map((benefit, index) => (
              <div key={index} className="flex space-x-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-gold rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="px-8 py-3 bg-gold text-white rounded-md hover:bg-gold/90 transition-colors">
              Apply for Partnership
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dealers; 
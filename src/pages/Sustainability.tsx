import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sustainability = () => {
  // Sample sustainability goals for the page
  const sustainabilityGoals = [
    {
      year: "2025",
      title: "Carbon Neutral Operations",
      description: "Achieve carbon neutrality in all our manufacturing facilities through renewable energy sources and optimized processes."
    },
    {
      year: "2026",
      title: "Zero Waste Production",
      description: "Implement a closed-loop manufacturing process that eliminates waste and maximizes resource efficiency."
    },
    {
      year: "2027",
      title: "Eco-Friendly Materials",
      description: "Source 100% of our raw materials from sustainable suppliers and introduce fully recyclable product lines."
    },
    {
      year: "2028",
      title: "Water Conservation",
      description: "Reduce water consumption in our production processes by 75% through innovative recirculation systems."
    },
    {
      year: "2030",
      title: "Complete Sustainability",
      description: "Complete transition to sustainable materials, packaging, and delivery processes throughout our entire supply chain."
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-[hsl(var(--theme))] transition-colors">Home</Link>
          <span>/</span>
          <span className="font-medium text-gray-900">Sustainability</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Our Sustainability Journey</h1>
          <p className="text-xl text-gray-600 mb-10">
            At Stallion, we believe that luxury and sustainability can go hand in hand. Our commitment to sustainable practices is at the core of everything we do, from responsible material sourcing to eco-friendly manufacturing processes.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Timeline */}
          <div>
            <h2 className="text-3xl font-serif mb-8">Our Sustainability Goals</h2>
            <div className="space-y-10">
              {sustainabilityGoals.map((goal, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex"
                >
                  <div className="mr-6">
                    <div className="text-3xl font-serif text-[hsl(var(--theme))]">{goal.year}</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">{goal.title}</h3>
                    <p className="text-gray-600">{goal.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Right Column: Content and Image */}
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-serif mb-6">Sustainable Materials</h2>
              <p className="text-gray-600 mb-4">
                While our primary material is stainless steel – chosen for its exceptional durability and recyclability – we continuously seek to incorporate other sustainable materials across our operations.
              </p>
              <p className="text-gray-600 mb-4">
                Our stainless steel is sourced from suppliers who meet strict environmental standards, and we prioritize recycled steel whenever possible to reduce our environmental footprint.
              </p>
              <p className="text-gray-600">
                For complementary materials, we select eco-friendly options like responsibly-sourced wood, organic textiles, and water-based finishes that minimize environmental impact without compromising on quality.
              </p>
            </div>
            
            <div className="rounded-lg overflow-hidden h-80 bg-gray-200">
              <img 
                src="https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Sustainable manufacturing" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mt-10">
              <h2 className="text-3xl font-serif mb-6">Eco-Friendly Processes</h2>
              <p className="text-gray-600 mb-4">
                Our manufacturing facilities are equipped with energy-efficient technologies and renewable energy sources to minimize our carbon footprint.
              </p>
              <p className="text-gray-600 mb-4">
                We've implemented water recycling systems that reduce consumption by over 50%, and our waste management program ensures that over 90% of production waste is recycled or repurposed.
              </p>
              <p className="text-gray-600">
                Each piece of Stallion furniture is designed with longevity in mind – creating products that last for generations is one of the most sustainable practices we can embrace.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="container mx-auto px-4">
        <div className="bg-gray-100 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-serif mb-6">Join Our Sustainability Journey</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Learn more about our sustainability initiatives and how you can be part of our journey towards a more sustainable future.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center space-x-2 bg-[hsl(var(--theme))] text-white px-6 py-3 rounded-md hover:bg-[hsl(var(--theme-hover))] transition-colors"
          >
            <span>Contact Us</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sustainability; 
import { Link, useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, Phone, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { sofaData } from '../data/SofaData';
import { SofaProduct, SofaTypeKey } from '../data/ProductTypes';

// Helper function to check if a value is a valid SofaTypeKey
const isSofaTypeKey = (value: string | undefined): value is SofaTypeKey => {
  if (!value) return false;
  return Object.keys(sofaData).includes(value);
};

const SofaType = () => {
  const { type } = useParams<{ type: string }>();
  const location = useLocation();
  const [sofaType, setSofaType] = useState<{ 
    title: string; 
    description: string; 
    products: SofaProduct[] 
  } | null>(null);
  const [capitalizedType, setCapitalizedType] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');

  // Get the current URL for debug purposes
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  useEffect(() => {    
    if (type && isSofaTypeKey(type)) {
      setSofaType(sofaData[type]);
      
      // Format the type for display (e.g., "u-shaped" to "U-Shaped")
      const formatted = type
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      setCapitalizedType(formatted);
    } else {
      setSofaType(null);
    }
  }, [type]);

  if (!sofaType) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-serif mb-4">Sofa Type Not Found</h1>
          <p className="mb-4">We couldn't find the sofa type "{type || ''}" you're looking for.</p>
          <div className="mb-6 text-left p-4 bg-gray-100 rounded">
            <p className="font-medium mb-2">Debug Information:</p>
            <p className="text-sm mb-2">Current URL: <span className="font-mono text-xs bg-gray-200 px-1 py-0.5 rounded">{currentUrl}</span></p>
            <p className="text-sm mb-2">Parsed Type Parameter: <span className="font-mono text-xs bg-gray-200 px-1 py-0.5 rounded">{type || 'none'}</span></p>
            <p className="text-sm">Available Sofa Types: <span className="font-mono text-xs bg-gray-200 px-1 py-0.5 rounded">{Object.keys(sofaData).join(", ")}</span></p>
          </div>
          
          <p className="mb-4 font-medium">Try these direct links:</p>
          <div className="flex flex-col items-center mb-8">
            {Object.keys(sofaData).map(sofaType => (
              <Link 
                key={sofaType}
                to={`/category/living-room/sofas/${sofaType}`}
                className="inline-flex items-center mb-2 text-gold hover:text-gold/80 border border-gold px-3 py-1 rounded"
              >
                <span className="mr-2">{sofaData[sofaType as SofaTypeKey].title}</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            ))}
          </div>
          
          <Link 
            to="/category/living-room/sofas" 
            className="inline-flex items-center text-gold hover:text-gold/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Sofas</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mb-8">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-700 hover:text-gold">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link to="/category/living-room" className="text-gray-700 hover:text-gold">
                  Living Room
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link to="/category/living-room/sofas" className="text-gray-700 hover:text-gold">
                  Sofas
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gold">{capitalizedType}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Products Grid - Skip introductory section and directly show products */}
          <section className="container mx-auto px-4 mb-16">
        <h1 className="text-3xl md:text-4xl font-serif mb-8">{sofaType.title}</h1>
            <div className="grid lg:grid-cols-2 gap-12">
              {sofaType.products.map((product, index) => (
            <Link
              key={product.id}
              to={`/category/living-room/sofas/${type}/${product.id}`}
              className="block hover:no-underline"
            >
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row group cursor-pointer h-full"
                >
                  {/* Product Image */}
                  <div className="md:w-1/2 relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                    <button 
                      className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Handle favorite
                      }}
                    >
                        <Heart className="h-5 w-5 text-gray-700" />
                      </button>
                    <button 
                      className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Handle share
                      }}
                    >
                        <Share2 className="h-5 w-5 text-gray-700" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Product Details */}
                  <div className="md:w-1/2 p-6 flex flex-col">
                  <h3 className="text-2xl font-medium mb-2 text-gray-900">{product.name}</h3>
                    <span className="text-gold text-xl font-medium mb-4">{product.price}</span>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    
                    {/* Product Features */}
                  <div className="mb-4 hidden group-hover:block">
                    <h4 className="font-medium text-lg mb-2 text-gray-900">Features</h4>
                      <ul className="list-disc pl-5 space-y-1">
                      {product.features.slice(0, 2).map((feature, idx) => (
                          <li key={idx} className="text-gray-600">{feature}</li>
                        ))}
                      {product.features.length > 2 && (
                        <li className="text-gray-600">...and more</li>
                      )}
                      </ul>
                    </div>
                    
                  {/* Product Specifications - Show on non-hover */}
                  <div className="mb-4 group-hover:hidden">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium">Dimensions:</span>
                        <p className="text-gray-600">{product.dimensions}</p>
                      </div>
                      <div>
                        <span className="font-medium">Availability:</span>
                        <p className={`${
                          product.availability === 'In Stock' 
                            ? 'text-green-600' 
                            : product.availability === 'Out of Stock' 
                              ? 'text-red-600' 
                              : 'text-amber-600'
                        }`}>
                          {product.availability}
                        </p>
                      </div>
                      </div>
                    </div>
                    
                    {/* Color Options */}
                  <div className="mb-6 group-hover:hidden">
                      <span className="font-medium">Available Colors:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                      {product.colors.slice(0, 3).map((color, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-sm rounded">
                            {color}
                          </span>
                        ))}
                      {product.colors.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-sm rounded">
                          +{product.colors.length - 3} more
                        </span>
                      )}
                      </div>
                    </div>
                    
                  {/* CTA Button */}
                  <div 
                    className="mt-auto"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.location.href = "/contact";
                    }}
                  >
                    <button className="w-full bg-gold text-white py-3 rounded hover:bg-gold/90 transition-colors flex items-center justify-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Get a Quote
                      </button>
                    </div>
                  </div>
                </motion.div>
            </Link>
              ))}
            </div>
          </section>
    </div>
  );
};

export default SofaType; 
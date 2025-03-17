import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FurnitureItem {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  dimensions: string;
  material: string;
  color: string;
}

// Mock data for different furniture categories
const furnitureData = {
  'pouffe': {
    title: 'Pouffe Collection',
    description: 'Stylish and versatile pouffes that add comfort and charm to any living space.',
    items: [
      {
        id: 1,
        name: 'Classic Round Pouffe',
        price: '₹18,500',
        description: 'A classic round pouffe with premium upholstery and solid wood legs.',
        image: '/images/sofas/IMG_20250303_195019.jpg',
        dimensions: '45cm x 45cm x 35cm',
        material: 'Premium Fabric, Solid Wood',
        color: 'Beige'
      },
      {
        id: 2,
        name: 'Modern Square Pouffe',
        price: '₹22,000',
        description: 'Contemporary square pouffe with plush cushioning and sleek design.',
        image: '/images/sofas/IMG_20250303_195203.jpg',
        dimensions: '50cm x 50cm x 40cm',
        material: 'Velvet, Metal',
        color: 'Emerald Green'
      },
      {
        id: 3,
        name: 'Ottoman Storage Pouffe',
        price: '₹25,000',
        description: 'Functional pouffe with hidden storage space for books and accessories.',
        image: '/images/sofas/IMG_20250303_195107.jpg',
        dimensions: '60cm x 60cm x 40cm',
        material: 'Leather, Engineered Wood',
        color: 'Brown'
      }
    ]
  },
  'corner-table': {
    title: 'Corner Table Collection',
    description: 'Elegant corner tables designed to maximize space and enhance your living room aesthetics.',
    items: [
      {
        id: 1,
        name: 'Geometric Corner Table',
        price: '₹28,000',
        description: 'Modern geometric corner table with marble top and gold-finished legs.',
        image: '/images/sofas/IMG_20250303_195019.jpg',
        dimensions: '60cm x 60cm x 65cm',
        material: 'Marble, Metal',
        color: 'White/Gold'
      },
      {
        id: 2,
        name: 'Wooden Corner Stand',
        price: '₹32,500',
        description: 'Traditional wooden corner stand with three shelves for storage and display.',
        image: '/images/sofas/IMG_20250303_195203.jpg',
        dimensions: '45cm x 45cm x 120cm',
        material: 'Solid Wood',
        color: 'Walnut'
      },
      {
        id: 3,
        name: 'Glass Corner Accent Table',
        price: '₹24,000',
        description: 'Minimalist glass corner table with sleek stainless steel frame.',
        image: '/images/sofas/IMG_20250303_195107.jpg',
        dimensions: '50cm x 50cm x 55cm',
        material: 'Tempered Glass, Stainless Steel',
        color: 'Clear/Silver'
      }
    ]
  },
  'console-table': {
    title: 'Console Table Collection',
    description: 'Sophisticated console tables that make a statement in your entrance or living area.',
    items: [
      {
        id: 1,
        name: 'Modern Console with Drawers',
        price: '₹45,000',
        description: 'Sleek console table with two drawers and open shelf for storage.',
        image: '/images/sofas/IMG_20250303_195019.jpg',
        dimensions: '120cm x 40cm x 80cm',
        material: 'Oak Wood, Metal',
        color: 'Natural Oak/Black'
      },
      {
        id: 2,
        name: 'Luxury Marble Console',
        price: '₹65,000',
        description: 'Luxurious console table with Italian marble top and brass-finished frame.',
        image: '/images/sofas/IMG_20250303_195203.jpg',
        dimensions: '140cm x 35cm x 85cm',
        material: 'Marble, Brass',
        color: 'Green Marble/Brass'
      },
      {
        id: 3,
        name: 'Industrial Console Table',
        price: '₹38,000',
        description: 'Industrial-style console with reclaimed wood top and iron frame.',
        image: '/images/sofas/IMG_20250303_195107.jpg',
        dimensions: '130cm x 38cm x 78cm',
        material: 'Reclaimed Wood, Iron',
        color: 'Distressed Brown/Black'
      }
    ]
  },
  'coffee-table': {
    title: 'Coffee Table Collection',
    description: 'Stunning coffee tables that serve as the centerpiece of your living room.',
    items: [
      {
        id: 1,
        name: 'Marble Top Coffee Table',
        price: '₹52,000',
        description: 'Elegant coffee table with white marble top and solid wood base.',
        image: '/images/sofas/IMG_20250303_195019.jpg',
        dimensions: '120cm x 60cm x 45cm',
        material: 'Marble, Solid Wood',
        color: 'White/Natural'
      },
      {
        id: 2,
        name: 'Glass Coffee Table with Storage',
        price: '₹48,000',
        description: 'Modern glass coffee table with lower shelf and hidden compartment.',
        image: '/images/sofas/IMG_20250303_195203.jpg',
        dimensions: '110cm x 70cm x 40cm',
        material: 'Tempered Glass, Engineered Wood',
        color: 'Clear/White'
      },
      {
        id: 3,
        name: 'Nested Coffee Tables',
        price: '₹55,000',
        description: 'Set of three nested coffee tables with mixed material construction.',
        image: '/images/sofas/IMG_20250303_195107.jpg',
        dimensions: 'Large: 90cm x 50cm x 45cm, Medium: 70cm x 40cm x 40cm, Small: 50cm x 30cm x 35cm',
        material: 'Wood, Metal, Marble',
        color: 'Mixed'
      }
    ]
  }
};

type FurnitureType = 'pouffe' | 'corner-table' | 'console-table' | 'coffee-table';

const LivingRoomFurniture = () => {
  const { type } = useParams<{ type: string }>();
  const [furniture, setFurniture] = useState<{ 
    title: string; 
    description: string; 
    items: FurnitureItem[] 
  } | null>(null);
  const [capitalizedType, setCapitalizedType] = useState('');

  useEffect(() => {
    if (type && type in furnitureData) {
      setFurniture(furnitureData[type as FurnitureType]);
      
      // Format the type for display (e.g., "corner-table" to "Corner Table")
      const formatted = type
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      setCapitalizedType(formatted);
    }
  }, [type]);

  if (!furniture) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif mb-4">Product Category Not Found</h1>
          <p className="mb-8">We couldn't find the category you're looking for.</p>
          <Link 
            to="/category/living-room" 
            className="inline-flex items-center text-gold hover:text-gold/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Living Room</span>
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
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gold">{capitalizedType}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif mb-6"
          >
            {furniture.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            {furniture.description}
          </motion.p>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {furniture.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-medium">{item.name}</h3>
                  <span className="text-gold font-medium">{item.price}</span>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                
                <div className="border-t pt-4 mt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Dimensions:</span>
                      <p className="text-gray-600">{item.dimensions}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Material:</span>
                      <p className="text-gray-600">{item.material}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Color:</span>
                      <p className="text-gray-600">{item.color}</p>
                    </div>
                  </div>
                </div>
                
                <button className="mt-6 w-full bg-gold text-white py-2 rounded hover:bg-gold/90 transition-colors">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Custom Order Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-6">Custom Orders Available</h2>
            <p className="text-gray-600 mb-8">
              Can't find exactly what you're looking for? We offer custom furniture design services to create the perfect piece for your space.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-gold text-white px-8 py-3 rounded-md hover:bg-gold/90 transition-colors duration-300"
            >
              Contact Us for Custom Orders
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LivingRoomFurniture; 
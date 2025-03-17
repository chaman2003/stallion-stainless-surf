import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SofaProduct {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  features: string[];
  dimensions: string;
  materials: string[];
  colors: string[];
  availability: 'In Stock' | 'Made to Order' | 'Out of Stock';
  delivery: string;
}

// Mock data for different sofa types
const sofaData: Record<SofaTypeKey, {
  title: string;
  description: string;
  products: SofaProduct[];
}> = {
  'straight': {
    title: 'Straight Sofas',
    description: 'Classic and versatile straight sofas that fit perfectly against walls and in traditional living spaces.',
    products: [
      {
        id: 1,
        name: 'Elegance Straight Sofa',
        price: '₹85,000',
        description: 'A classic straight sofa with premium upholstery and solid wood frame, perfect for traditional living rooms.',
        image: '/images/sofas/IMG_20250303_195036.jpg',
        features: ['Classic design', 'Deep cushioning', 'Premium upholstery', 'Solid wood frame'],
        dimensions: '220cm x 90cm x 85cm',
        materials: ['Premium Fabric', 'Solid Wood Frame', 'High-density Foam'],
        colors: ['Beige', 'Grey', 'Blue', 'Green'],
        availability: 'In Stock',
        delivery: '3-4 weeks'
      },
      {
        id: 2,
        name: 'Modern Minimalist Sofa',
        price: '₹95,000',
        description: 'Contemporary straight sofa with sleek lines and metal legs, ideal for modern interiors.',
        image: '/images/sofas/IMG_20250303_195233.jpg',
        features: ['Minimalist design', 'Slim profile', 'Metal legs', 'Modular options'],
        dimensions: '240cm x 85cm x 75cm',
        materials: ['Premium Leather', 'Metal Frame', 'Memory Foam'],
        colors: ['Black', 'White', 'Tan', 'Navy Blue'],
        availability: 'Made to Order',
        delivery: '6-8 weeks'
      },
      {
        id: 3,
        name: 'Classic Chesterfield',
        price: '₹120,000',
        description: 'Timeless Chesterfield design with button-tufted back and rolled arms for a luxurious statement.',
        image: '/images/sofas/IMG_20250303_195129.jpg',
        features: ['Button-tufted design', 'Rolled arms', 'Deep seats', 'Traditional craftsmanship'],
        dimensions: '230cm x 95cm x 80cm',
        materials: ['Genuine Leather', 'Hardwood Frame', 'Spring System'],
        colors: ['Brown', 'Burgundy', 'Dark Green', 'Black'],
        availability: 'In Stock',
        delivery: '4-5 weeks'
      }
    ]
  },
  'corner': {
    title: 'Corner Sofas',
    description: 'L-shaped sofas that maximize seating space and fit perfectly into corners of your living room.',
    products: [
      {
        id: 1,
        name: 'Luxe Corner Sectional',
        price: '₹150,000',
        description: 'Spacious L-shaped corner sofa with modular design for flexible arrangements.',
        image: '/images/sofas/IMG_20250303_195536.jpg',
        features: ['L-shaped design', 'Modular configuration', 'Extra deep seats', 'Hidden storage'],
        dimensions: '320cm x 260cm x 85cm',
        materials: ['Premium Fabric', 'Engineered Wood', 'High-resilience Foam'],
        colors: ['Light Grey', 'Dark Grey', 'Beige', 'Blue'],
        availability: 'Made to Order',
        delivery: '8-10 weeks'
      },
      {
        id: 2,
        name: 'Compact Corner Sofa',
        price: '₹125,000',
        description: 'Space-saving corner sofa ideal for smaller living rooms without compromising on comfort.',
        image: '/images/sofas/IMG_20250303_195608.jpg',
        features: ['Space-saving design', 'Reversible chaise', 'Pocket springs', 'Removable covers'],
        dimensions: '260cm x 200cm x 85cm',
        materials: ['Stain-resistant Fabric', 'Solid Wood', 'Pocket Springs'],
        colors: ['Light Grey', 'Navy Blue', 'Sage Green', 'Mustard Yellow'],
        availability: 'In Stock',
        delivery: '4-6 weeks'
      },
      {
        id: 3,
        name: 'Prestige Corner Suite',
        price: '₹180,000',
        description: 'Premium corner sofa with built-in recliners and ultra-plush cushioning for maximum comfort.',
        image: '/images/sofas/IMG_20250303_195623.jpg',
        features: ['Electric recliners', 'USB charging ports', 'LED lighting', 'Adjustable headrests'],
        dimensions: '340cm x 280cm x 95cm',
        materials: ['Premium Leather', 'Metal Frame', 'Dual-density Foam'],
        colors: ['Black', 'Brown', 'Cream', 'Grey'],
        availability: 'Made to Order',
        delivery: '10-12 weeks'
      }
    ]
  },
  'curved': {
    title: 'Curved Sofas',
    description: 'Elegant and stylish curved sofas that make a statement in contemporary living spaces.',
    products: [
      {
        id: 1,
        name: 'Arte Curved Sofa',
        price: '₹140,000',
        description: 'Sculptural curved sofa with flowing lines that serves as a stunning centerpiece.',
        image: '/images/sofas/IMG_20250303_195129.jpg',
        features: ['Sculptural design', 'Continuous curve', 'Feather-filled cushions', 'Custom upholstery options'],
        dimensions: '260cm x 100cm x 85cm',
        materials: ['Designer Fabric', 'Kiln-dried Hardwood', 'Feather-filled Cushions'],
        colors: ['Cream', 'Blush Pink', 'Sage Green', 'Navy Blue'],
        availability: 'Made to Order',
        delivery: '10-12 weeks'
      },
      {
        id: 2,
        name: 'Crescent Modern Sofa',
        price: '₹165,000',
        description: 'Semi-circular curved sofa perfect for creating conversational seating arrangements.',
        image: '/images/sofas/IMG_20250303_195019.jpg',
        features: ['180-degree curve', 'Channel tufting', 'Swivel base option', 'Custom sizing available'],
        dimensions: '290cm x 110cm x 85cm',
        materials: ['Velvet', 'Metal Base', 'Multi-layer Foam'],
        colors: ['Emerald Green', 'Royal Blue', 'Dusty Rose', 'Charcoal'],
        availability: 'Made to Order',
        delivery: '12-14 weeks'
      },
      {
        id: 3,
        name: 'Wave Curved Sectional',
        price: '₹190,000',
        description: 'Modular curved sectional that can be configured to fit your space perfectly.',
        image: '/images/sofas/IMG_20250303_195353.jpg',
        features: ['Modular system', 'Gentle curve', 'Integrated side tables', 'Premium comfort system'],
        dimensions: 'Customizable (Modules: 95cm x 95cm)',
        materials: ['Premium Fabric/Leather', 'Engineered Wood', 'Zoned Comfort Foam'],
        colors: ['Custom Options Available'],
        availability: 'Made to Order',
        delivery: '14-16 weeks'
      }
    ]
  },
  'u-shaped': {
    title: 'U-Shaped Sofas',
    description: 'Spacious and comfortable U-shaped sofas perfect for large families and entertainment areas.',
    products: [
      {
        id: 1,
        name: 'Grand U-Shape Sectional',
        price: '₹220,000',
        description: 'Expansive U-shaped sofa designed for large living rooms and entertainment spaces.',
        image: '/images/sofas/IMG_20250303_195036.jpg',
        features: ['U-shaped design', 'Extra wide seats', 'Oversized ottoman available', 'Built-in storage'],
        dimensions: '380cm x 280cm x 85cm',
        materials: ['Performance Fabric', 'Hardwood Frame', 'High-density Foam'],
        colors: ['Beige', 'Light Grey', 'Dark Grey', 'Blue'],
        availability: 'Made to Order',
        delivery: '12-14 weeks'
      },
      {
        id: 2,
        name: 'Family Lounge U-Sofa',
        price: '₹250,000',
        description: 'Family-friendly U-shaped sofa with reclining seats and stain-resistant fabric.',
        image: '/images/sofas/IMG_20250303_195353.jpg',
        features: ['Multiple recliners', 'Drink holders', 'USB ports', 'Washable covers'],
        dimensions: '400cm x 300cm x 90cm',
        materials: ['Stain-resistant Fabric', 'Engineered Wood', 'Gel-infused Foam'],
        colors: ['Grey', 'Brown', 'Navy', 'Black'],
        availability: 'Made to Order',
        delivery: '14-16 weeks'
      },
      {
        id: 3,
        name: 'Modular U-Configuration',
        price: '₹195,000',
        description: 'Versatile modular system that can be arranged in a U-shape or reconfigured as needed.',
        image: '/images/sofas/IMG_20250303_195732.jpg',
        features: ['Fully modular', 'Movable backrests', 'Convertible sections', 'Add-on options'],
        dimensions: 'Customizable (Modules: 85cm x 85cm)',
        materials: ['Premium Fabric', 'Steel Frame', 'Multi-density Foam'],
        colors: ['Mix and Match Options Available'],
        availability: 'Made to Order',
        delivery: '10-12 weeks'
      }
    ]
  },
  'recliner': {
    title: 'Recliner Sofas',
    description: 'Adjustable sofas with reclining functionality for ultimate comfort and relaxation.',
    products: [
      {
        id: 1,
        name: 'Luxury Electric Recliner',
        price: '₹160,000',
        description: 'Premium electric reclining sofa with adjustable headrests and lumbar support.',
        image: '/images/sofas/IMG_20250303_195608.jpg',
        features: ['Electric recline', 'Adjustable headrests', 'Lumbar support', 'USB charging'],
        dimensions: '220cm x 95cm x 105cm',
        materials: ['Premium Leather', 'Metal Frame', 'Memory Foam'],
        colors: ['Black', 'Brown', 'Tan', 'Grey'],
        availability: 'In Stock',
        delivery: '4-6 weeks'
      },
      {
        id: 2,
        name: 'Home Theater Recliner',
        price: '₹180,000',
        description: 'Cinema-style recliner sofa with cup holders and storage for the ultimate movie experience.',
        image: '/images/sofas/IMG_20250303_195353.jpg',
        features: ['Theater-style seating', 'Cup holders', 'Storage compartments', 'LED lighting'],
        dimensions: '320cm x 95cm x 105cm',
        materials: ['Premium Fabric/Leather', 'Steel Frame', 'High-resilience Foam'],
        colors: ['Black', 'Dark Brown', 'Grey', 'Navy Blue'],
        availability: 'Made to Order',
        delivery: '8-10 weeks'
      },
      {
        id: 3,
        name: 'Smart Recliner Sofa',
        price: '₹195,000',
        description: 'App-controlled recliner sofa with voice activation and customizable positions.',
        image: '/images/sofas/IMG_20250303_195623.jpg',
        features: ['Smart app control', 'Voice activation', 'Massage function', 'Memory positions'],
        dimensions: '240cm x 100cm x 105cm',
        materials: ['Premium Leather', 'Advanced Metal Frame', 'Gel-infused Memory Foam'],
        colors: ['Black', 'Grey', 'White', 'Burgundy'],
        availability: 'Made to Order',
        delivery: '12-14 weeks'
      }
    ]
  },
  'sofa-cum-bed': {
    title: 'Sofa Cum Bed',
    description: 'Versatile sofas that convert into beds, perfect for guest rooms and small spaces.',
    products: [
      {
        id: 1,
        name: 'Classic Sleeper Sofa',
        price: '₹85,000',
        description: 'Traditional pull-out sofa bed with a comfortable mattress for occasional guests.',
        image: '/images/sofas/IMG_20250303_195732.jpg',
        features: ['Pull-out mechanism', 'Real mattress', 'Easy conversion', 'Storage for bedding'],
        dimensions: 'Sofa: 220cm x 95cm x 85cm, Bed: 220cm x 180cm x 45cm',
        materials: ['Durable Fabric', 'Solid Wood Frame', 'Spring Mattress'],
        colors: ['Beige', 'Light Grey', 'Dark Grey', 'Blue'],
        availability: 'In Stock',
        delivery: '4-6 weeks'
      },
      {
        id: 2,
        name: 'Modern Convertible Sofa',
        price: '₹95,000',
        description: 'Contemporary click-clack mechanism sofa that converts to a bed in seconds.',
        image: '/images/sofas/IMG_20250303_195036.jpg',
        features: ['Click-clack mechanism', 'Multiple positions', 'No assembly required', 'Space-saving design'],
        dimensions: 'Sofa: 200cm x 90cm x 85cm, Bed: 200cm x 120cm x 40cm',
        materials: ['Premium Fabric', 'Steel Frame', 'High-density Foam'],
        colors: ['Light Grey', 'Dark Grey', 'Navy Blue', 'Forest Green'],
        availability: 'In Stock',
        delivery: '3-4 weeks'
      },
      {
        id: 3,
        name: 'Sectional Sleeper',
        price: '₹120,000',
        description: 'L-shaped sectional that converts to a spacious bed with storage for bedding.',
        image: '/images/sofas/IMG_20250303_195129.jpg',
        features: ['Sectional design', 'Pull-out bed', 'Chaise storage', 'Adjustable headrests'],
        dimensions: 'Sofa: 260cm x 180cm x 85cm, Bed: 260cm x 180cm x 45cm',
        materials: ['Stain-resistant Fabric', 'Engineered Wood', 'Memory Foam Mattress'],
        colors: ['Light Grey', 'Beige', 'Blue', 'Green'],
        availability: 'Made to Order',
        delivery: '8-10 weeks'
      }
    ]
  }
};

type SofaTypeKey = 'straight' | 'corner' | 'curved' | 'u-shaped' | 'recliner' | 'sofa-cum-bed';

const SofaType = () => {
  const { type } = useParams<{ type: string }>();
  const [sofaType, setSofaType] = useState<{ 
    title: string; 
    description: string; 
    products: SofaProduct[] 
  } | null>(null);
  const [capitalizedType, setCapitalizedType] = useState('');

  useEffect(() => {
    if (type && type in sofaData) {
      setSofaType(sofaData[type as SofaTypeKey]);
      
      // Format the type for display (e.g., "u-shaped" to "U-Shaped")
      const formatted = type
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      setCapitalizedType(formatted);
    }
  }, [type]);

  if (!sofaType) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif mb-4">Sofa Type Not Found</h1>
          <p className="mb-8">We couldn't find the sofa type you're looking for.</p>
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif mb-6"
          >
            {sofaType.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            {sofaType.description}
          </motion.p>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {sofaType.products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row"
            >
              {/* Product Image */}
              <div className="md:w-1/2 relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Heart className="h-5 w-5 text-gray-700" />
                  </button>
                  <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Share2 className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
              </div>
              
              {/* Product Details */}
              <div className="md:w-1/2 p-6 flex flex-col">
                <h3 className="text-2xl font-medium mb-2">{product.name}</h3>
                <span className="text-gold text-xl font-medium mb-4">{product.price}</span>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                {/* Product Features */}
                <div className="mb-4">
                  <h4 className="font-medium text-lg mb-2">Features</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-600">{feature}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Product Specifications */}
                <div className="mb-4 grid grid-cols-2 gap-4">
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
                  <div>
                    <span className="font-medium">Delivery:</span>
                    <p className="text-gray-600">{product.delivery}</p>
                  </div>
                </div>
                
                {/* Color Options */}
                <div className="mb-6">
                  <span className="font-medium">Available Colors:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {product.colors.map((color, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-sm rounded">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="mt-auto grid grid-cols-2 gap-3">
                  <button className="bg-gold text-white py-2 rounded hover:bg-gold/90 transition-colors">
                    Buy Now
                  </button>
                  <button className="border border-gold text-gold py-2 rounded hover:bg-gold/10 transition-colors flex items-center justify-center">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Custom Order Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-6">Can't Find What You're Looking For?</h2>
            <p className="text-gray-600 mb-8">
              We offer custom sofa designs tailored to your specific requirements. Our master craftsmen can create the perfect sofa for your space.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-gold text-white px-8 py-3 rounded-md hover:bg-gold/90 transition-colors duration-300"
            >
              Request a Custom Design
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SofaType; 
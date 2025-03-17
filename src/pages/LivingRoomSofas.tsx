import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface SofaCategory {
  id: number;
  title: string;
  description: string;
  image: string;
  path: string;
}

const sofaCategories: SofaCategory[] = [
  {
    id: 1,
    title: "Straight Sofas",
    description: "Classic and versatile sofas that fit perfectly against walls and in traditional living spaces.",
    image: "/images/sofas/IMG_20250303_195036.jpg",
    path: "/category/living-room/sofas/straight"
  },
  {
    id: 2,
    title: "Corner Sofas",
    description: "L-shaped sofas that maximize seating space and fit perfectly into corners.",
    image: "/images/sofas/IMG_20250303_195536.jpg",
    path: "/category/living-room/sofas/corner"
  },
  {
    id: 3,
    title: "Curved Sofas",
    description: "Elegant and stylish sofas with curved designs for a sophisticated living space.",
    image: "/images/sofas/IMG_20250303_195129.jpg",
    path: "/category/living-room/sofas/curved"
  },
  {
    id: 4,
    title: "U-Shaped Sofas",
    description: "Spacious and comfortable sofas perfect for large families and entertainment areas.",
    image: "/images/sofas/IMG_20250303_195353.jpg",
    path: "/category/living-room/sofas/u-shaped"
  },
  {
    id: 5,
    title: "Recliner Sofas",
    description: "Adjustable sofas with reclining functionality for ultimate comfort and relaxation.",
    image: "/images/sofas/IMG_20250303_195608.jpg",
    path: "/category/living-room/sofas/recliner"
  },
  {
    id: 6,
    title: "Sofa Cum Bed",
    description: "Versatile sofas that convert into beds, perfect for guest rooms and small spaces.",
    image: "/images/sofas/IMG_20250303_195732.jpg",
    path: "/category/living-room/sofas/sofa-cum-bed"
  }
];

const LivingRoomSofas = () => {
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
                <span className="text-gold">Sofas</span>
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
            Sofa Collections
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            Discover our premium range of handcrafted sofas designed for comfort, style, and durability. Each piece is meticulously created by our master artisans using the finest materials.
          </motion.p>
        </div>
      </section>

      {/* Sofa Categories */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sofaCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <Link 
                    to={category.path}
                    className="inline-flex items-center text-gold hover:text-gold/80 transition-colors"
                  >
                    <span className="mr-2">View Collection</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Information */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif mb-6 text-center">Crafted for Comfort</h2>
            <p className="text-gray-600 mb-8 text-center">
              Our sofas are designed with comfort and durability in mind. We use premium materials and traditional craftsmanship techniques to ensure each piece stands the test of time.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2">Premium Materials</h3>
                <p className="text-gray-600">High-quality fabrics, genuine leather, and solid wood frames</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2">Master Craftsmanship</h3>
                <p className="text-gray-600">Handcrafted by our skilled artisans with decades of experience</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2">5-Year Warranty</h3>
                <p className="text-gray-600">Confidence in our quality with comprehensive warranty coverage</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LivingRoomSofas; 
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import { Card } from '../components/ui/card';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, Eye, Heart, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  gridArea: string;
  category?: string;
}

// Updated gallery images with more diversity
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/images/sofas/IMG_20250303_195036.jpg",
    alt: "Elegant Modern Living Room Setup",
    gridArea: "span 2 / span 2",
    category: "Living Room"
  },
  {
    id: 2,
    src: "/images/sofas/IMG_20250303_195129.jpg",
    alt: "Contemporary Lounge Design",
    gridArea: "span 1 / span 1",
    category: "Lounge"
  },
  {
    id: 3,
    src: "/images/sofas/IMG_20250303_195253.jpg", // Changed to new image
    alt: "Premium Comfort Seating",
    gridArea: "span 2 / span 1",
    category: "Seating"
  },
  {
    id: 4,
    src: "/images/sofas/WhatsApp Image 2025-03-13 at 17.09.16_fced05a6.jpg", // Changed to new image
    alt: "Modern Living Space",
    gridArea: "span 1 / span 1",
    category: "Living Space"
  },
  {
    id: 5,
    src: "/images/sofas/Sofa Catalogue_page-0072.jpg", // Changed to new image
    alt: "Luxury Sofa Collection",
    gridArea: "span 2 / span 2",
    category: "Premium Collection"
  },
  {
    id: 6,
    src: "/images/sofas/IMG_20250303_195203.jpg", // Changed image
    alt: "Designer Living Room Set",
    gridArea: "span 1 / span 2",
    category: "Designer Series"
  },
  {
    id: 7,
    src: "/images/sofas/Sofa Catalogue_page-0006 - Copy.jpg", // Changed to new image
    alt: "Premium Furniture Design",
    gridArea: "span 2 / span 1",
    category: "Premium Design"
  },
  {
    id: 8,
    src: "/images/sofas/IMG_20250303_195623.jpg",
    alt: "Exclusive Sofa Collection",
    gridArea: "span 1 / span 1",
    category: "Exclusive"
  },
  {
    id: 9,
    src: "/images/sofas/Sofa Catalogue_page-0064.jpg", // Changed image
    alt: "Modern Comfort Solutions",
    gridArea: "span 2 / span 2",
    category: "Comfort Collection"
  },
  {
    id: 10,
    src: "/images/sofas/IMG_20250304_141654.jpg",
    alt: "Contemporary Living Design",
    gridArea: "span 1 / span 2",
    category: "Contemporary"
  },
  {
    id: 11,
    src: "/images/sofas/IMG_20250304_141721.jpg",
    alt: "Premium Living Room Collection",
    gridArea: "span 2 / span 1",
    category: "Premium"
  },
  {
    id: 12,
    src: "/images/sofas/IMG_20250304_144613.jpg",
    alt: "Luxury Interior Solutions",
    gridArea: "span 1 / span 1",
    category: "Luxury"
  }
];

interface FeaturedProduct {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  link: string;
}

// Updated featured products with different images
const featuredProducts: FeaturedProduct[] = [
  {
    id: 1,
    name: "Brandon Sofa",
    price: "Starting at ₹85,000",
    image: "/images/sofas/IMG_20250303_195036.jpg",
    category: "Living Room",
    link: "/category/living-room/sofas/straight"
  },
  {
    id: 2,
    name: "Enzo Loveseat",
    price: "Starting at ₹65,000",
    image: "/images/sofas/IMG_20250303_195253.jpg", // Changed to new image
    category: "Lounge",
    link: "/category/living-room/sofas/curved"
  },
  {
    id: 3,
    name: "Kenshester Classic",
    price: "Starting at ₹95,000",
    image: "/images/sofas/IMG_20250303_195501.jpg", // Changed to new image
    category: "Premium",
    link: "/category/living-room/sofas/corner"
  },
  {
    id: 4,
    name: "Gene Sectional",
    price: "Starting at ₹120,000",
    image: "/images/sofas/IMG_20250303_195608.jpg", // Changed to new image
    category: "Sectionals",
    link: "/category/living-room/sofas/u-shaped"
  }
];

const FadeInWhenVisible = ({ children, index, delay = 0.1 }: { children: React.ReactNode; index: number; delay?: number }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: { 
          opacity: 0,
          y: 50
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            delay: index * delay,
            ease: [0.17, 0.55, 0.55, 1]
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

interface CollectionSection {
  title: string;
  subtitle?: string;
  description?: string;
  items: string[];
  delay: number;
  image?: string;
}

const collectionSections: CollectionSection[] = [
  {
    title: "Luxury Format",
    subtitle: "STALLION STAINLESS",
    description: "LEVEL NEXT",
    items: ["Stationary Sofas", "Motion Sofas", "Home Theatre", "Armchairs", "Day Bed", "Sofa Cum Bed", "Recliners", "Beds"],
    delay: 0,
    image: "/images/sofas/IMG_20250303_195732.jpg"
  },
  {
    title: "Case Goods",
    items: ["Dining Tables", "Dining Chairs", "Center Tables", "Consoles", "Office Tables", "Office Chairs"],
    delay: 0.2,
    image: "/images/sofas/IMG_20250303_195107.jpg"
  },
  {
    title: "Fixed Cabinets",
    items: ["Kitchens", "Wardrobes", "TV Cabinets"],
    delay: 0.4,
    image: "/images/sofas/Sofa Catalogue_page-0097.jpg"
  }
];

const Index = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      
      {/* Featured Collection */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif mb-4"
            >
              Featured Collection
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-0.5 w-24 bg-gold mx-auto"
            ></motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Link to={product.link}>
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <motion.img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-[350px] object-cover"
                      initial={{ scale: 1 }}
                      animate={{ 
                        scale: hoveredProduct === product.id ? 1.08 : 1,
                        filter: hoveredProduct === product.id ? "brightness(0.85)" : "brightness(1)"
                      }}
                      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                    />
                    <div className="absolute top-4 left-4">
                      <motion.span 
                        className="inline-block bg-gold text-white text-xs py-1 px-3 rounded-full"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: hoveredProduct === product.id ? 1 : 0,
                          x: hoveredProduct === product.id ? 0 : -20
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        {product.category}
                      </motion.span>
                    </div>
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: hoveredProduct === product.id ? 1 : 0
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ 
                          scale: hoveredProduct === product.id ? 1 : 0.8
                        }}
                        transition={{ duration: 0.4 }}
                        className="flex space-x-3"
                      >
                        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gold hover:text-white transition-colors duration-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gold hover:text-white transition-colors duration-300">
                          <Heart className="w-4 h-4" />
                        </button>
                      </motion.div>
                    </motion.div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-medium mb-1 group-hover:text-gold transition-colors duration-300">{product.name}</h3>
                      <p className="text-gray-600">{product.price}</p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ 
                        opacity: hoveredProduct === product.id ? 1 : 0,
                        scale: hoveredProduct === product.id ? 1 : 0.5
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gold hover:text-white transition-colors duration-300"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-[2000px] mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif mb-4"
            >
              Gallery
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-0.5 w-24 bg-gold mx-auto"
            ></motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[300px]">
            {galleryImages.map((image, index) => (
              <FadeInWhenVisible key={image.id} index={index} delay={0.05}>
                <motion.div 
                  className="relative w-full h-full overflow-hidden group rounded-lg shadow-md"
                  style={{ gridArea: image.gridArea }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-black/20 transition-all duration-300 z-10"
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                  ></motion.div>
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                  />
                  <motion.div 
                    className="absolute inset-0 flex flex-col justify-end p-6 z-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {image.category && (
                      <span className="text-white/80 text-sm mb-1 inline-block bg-gold/80 px-2 py-0.5 rounded-full w-fit">
                        {image.category}
                      </span>
                    )}
                    <p className="text-white text-lg font-medium">
                      {image.alt}
                    </p>
                  </motion.div>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif mb-4"
            >
              Our Collections
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-0.5 w-24 bg-gold mx-auto"
            ></motion.div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {collectionSections.map((section, idx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
              >
                {section.image && (
                  <div className="h-48 overflow-hidden">
                    <motion.img 
                      src={section.image} 
                      alt={section.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-serif mb-2">{section.title}</h3>
                  {section.subtitle && <p className="text-gold mb-1">{section.subtitle}</p>}
                  {section.description && <p className="text-gray-600 mb-6">{section.description}</p>}
                  <ul className="space-y-3">
                    {section.items.map((item, itemIdx) => (
                      <motion.li 
                        key={item} 
                        className="flex items-center space-x-2 group"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 + (itemIdx * 0.1) }}
                        viewport={{ once: true }}
                      >
                        <motion.span 
                          className="w-1.5 h-1.5 rounded-full bg-gold"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 + (itemIdx * 0.1) }}
                          viewport={{ once: true }}
                        ></motion.span>
                        <a 
                          href="#" 
                          className="text-gray-600 hover:text-gold transition-colors"
                        >
                          <motion.span
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                        {item}
                          </motion.span>
                      </a>
                      </motion.li>
                  ))}
                </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto text-center px-4 relative"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-gold/10"
          ></motion.div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gold/10"
          ></motion.div>
          
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-6 relative" 
            style={{ fontFamily: 'Mistral' }}
          >
            Experience Luxury
          </motion.h2>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 relative"
          >
            Visit our showroom to explore our complete collection and find your perfect piece
          </motion.p>
          <motion.button 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gold text-white px-8 py-3 rounded-md hover:bg-gold/90 transition-all duration-300 relative"
          >
            Find a Showroom
          </motion.button>
        </motion.div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-serif mb-4">NEWSLETTER</h3>
              <p className="mb-4">Sign up to get information on our latest products and collections.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="px-4 py-2 bg-gray-800 rounded flex-1 focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gold hover:bg-gold/90 rounded transition-colors"
                >
                  Sign Up
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-serif mb-4">CONTACT</h3>
              <p>Contact us for any inquiries</p>
              <p className="mt-2">Phone: +1 234 567 890</p>
              <p>Email: info@stallionstainless.com</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-serif mb-4">FOLLOW US</h3>
              <p className="mb-4">Follow us on social media for unmissable updates!</p>
              <div className="flex space-x-4">
                <motion.a 
                  href="#" 
                  className="hover:text-gold transition-colors"
                  whileHover={{ scale: 1.1, x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  Facebook
                </motion.a>
                <motion.a 
                  href="#" 
                  className="hover:text-gold transition-colors"
                  whileHover={{ scale: 1.1, x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  Instagram
                </motion.a>
                <motion.a 
                  href="#" 
                  className="hover:text-gold transition-colors"
                  whileHover={{ scale: 1.1, x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  Twitter
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;



import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type CarouselApi } from './ui/carousel';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const isInitialRender = useRef(true);
  
  // Images and content array for synced management
  const slides = [
    {
      image: "https://images.pexels.com/photos/6312362/pexels-photo-6312362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Masterful Craftsmanship",
      subtitle: "Meticulously crafted stainless steel furniture where durability meets sophistication.",
    },
    {
      image: "https://images.pexels.com/photos/8089083/pexels-photo-8089083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Timeless Sustainability",
      subtitle: "Environmentally conscious designs built to last generations.",
    },
    {
      image: "https://images.pexels.com/photos/14613922/pexels-photo-14613922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Premium Materials",
      subtitle: "Only the finest stainless steel and premium finishes for exceptional quality.",
    },
    {
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      title: "Modern Elegance",
      subtitle: "Contemporary designs that enhance any living space with timeless appeal.",
    },
    {
      image: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg",
      title: "Artisan Excellence",
      subtitle: "Each piece crafted by skilled artisans with decades of expertise.",
    }
  ];
  
  // Implement manual auto-advance with better error handling
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      try {
        api.scrollNext();
      } catch (error) {
        console.error("Error advancing carousel:", error);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [api]);
  
  // Update current slide when API changes slide
  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    
    // Initial call to set the current slide
    onSelect();
    
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  
  // Add keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!api) return;
      
      if (e.key === 'ArrowLeft') {
        scrollPrev();
      } else if (e.key === 'ArrowRight') {
        scrollNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [api]);
  
  // Handle direct manual navigation with enhanced error handling
  const scrollPrev = useCallback(() => {
    console.log("Previous button clicked");
    if (api) {
      try {
        api.scrollPrev();
        setTimeout(() => {
          if (api && api.selectedScrollSnap() !== undefined) {
            setCurrentSlide(api.selectedScrollSnap());
          }
        }, 100);
      } catch (error) {
        console.error("Error scrolling to previous slide:", error);
      }
    }
  }, [api]);
  
  const scrollNext = useCallback(() => {
    console.log("Next button clicked");
    if (api) {
      try {
        api.scrollNext();
        setTimeout(() => {
          if (api && api.selectedScrollSnap() !== undefined) {
            setCurrentSlide(api.selectedScrollSnap());
          }
        }, 100);
      } catch (error) {
        console.error("Error scrolling to next slide:", error);
      }
    }
  }, [api]);
  
  // Function to go to a specific slide with enhanced error handling
  const goToSlide = useCallback((index: number) => {
    console.log(`Dot ${index} clicked`);
    if (api) {
      try {
        api.scrollTo(index);
        // Update current slide immediately for UI feedback
        setCurrentSlide(index);
      } catch (error) {
        console.error(`Error scrolling to slide ${index}:`, error);
      }
    }
  }, [api]);

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
      }
    })
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Front Sheet Content - centered on screen */}
      <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/50 text-white text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-wide font-serif mb-2 text-shadow-lg"
              style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '1px' }}>
            STALLION COMFORT SYSTEMS
          </h1>
          <div className="h-0.5 w-20 bg-gold mx-auto my-4"></div>
          <p className="text-lg md:text-xl tracking-wider mb-8 text-gray-200 text-shadow"
             style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '2px', fontWeight: 300 }}>
            MASTERFUL CRAFTSMANSHIP | TIMELESS SUSTAINABILITY
          </p>
          
          <motion.h2 
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            key={`title-${currentSlide}`}
            className="text-2xl md:text-3xl lg:text-4xl font-serif mb-4 text-shadow"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {slides[currentSlide].title}
          </motion.h2>
          
          <motion.p 
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            key={`subtitle-${currentSlide}`}
            className="text-lg mb-8 max-w-2xl mx-auto text-gray-300 text-shadow"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
          >
            {slides[currentSlide].subtitle}
          </motion.p>
          
          <Link to="/category/living-room">
            <button className="bg-white text-[#001F3F] px-8 py-3 rounded-none hover:bg-[#001F3F] hover:text-white transition-colors text-lg tracking-wider"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
              Explore our Collection
            </button>
          </Link>
        </motion.div>
      </div>
      
      {/* Carousel (lowest layer) */}
      <Carousel 
        className="absolute inset-0 z-0"
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div
                className="h-screen w-full bg-cover bg-center transition-transform duration-1000 ease-in-out"
                style={{ 
                  backgroundImage: `url('${slide.image}')`,
                  animation: "zoomInOut 15s infinite alternate",
                  filter: "brightness(1.2) contrast(1.1)"
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      {/* Dark overlay (layer 1) - reduced opacity */}
      <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
      
      {/* Navigation controls - Higher z-index and improved hit area */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        {/* Navigation arrows - standalone, not nested */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-auto">
          <button
            onClick={scrollPrev}
            className="bg-white/50 hover:bg-white/80 transition-all duration-300 rounded-full p-5 focus:outline-none shadow-lg transform hover:scale-110 active:scale-90"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-8 w-8 text-black/90" />
          </button>
        </div>
        
        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-auto">
          <button 
            onClick={scrollNext}
            className="bg-white/50 hover:bg-white/80 transition-all duration-300 rounded-full p-5 focus:outline-none shadow-lg transform hover:scale-110 active:scale-90"
            aria-label="Next slide"
          >
            <ChevronRight className="h-8 w-8 text-black/90" />
          </button>
        </div>
      </div>
      
      {/* Slide indicators - improved hit areas and positioning */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50">
        <div className="flex space-x-5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-6 h-6 rounded-full p-3 flex items-center justify-center transition-all duration-300 active:scale-90 ${
                currentSlide === index 
                  ? 'bg-white scale-110 shadow-md' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span className="sr-only">Slide {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
      
      <style>
        {`
        @keyframes zoomInOut {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }
        
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        
        .text-shadow-lg {
          text-shadow: 0 4px 8px rgba(0,0,0,0.5);
        }
        `}
      </style>
    </div>
  );
};

export default Hero;

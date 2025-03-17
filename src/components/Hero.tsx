import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback } from 'react';
import { type CarouselApi } from './ui/carousel';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  
  // Images array for easier management
  const images = [
    "https://images.pexels.com/photos/6312362/pexels-photo-6312362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/8089083/pexels-photo-8089083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/14613922/pexels-photo-14613922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg"
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
  
  // Function to handle manual navigation
  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);
  
  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);
  
  // Function to go to a specific slide
  const goToSlide = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div
                className="h-screen w-full bg-cover bg-center transition-transform duration-1000 ease-in-out"
                style={{ 
                  backgroundImage: `url('${image}')`,
                  animation: "zoomInOut 15s infinite alternate"
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      {/* Dark overlay (layer 1) */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
      
      {/* Navigation controls (layer 2) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Navigation arrows */}
        <div className="relative h-full w-full flex items-center justify-between px-6 md:px-12">
          <button 
            onClick={scrollPrev}
            className="pointer-events-auto bg-white/40 hover:bg-white/70 transition-all duration-300 rounded-full p-3 focus:outline-none shadow-lg transform hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-8 w-8 text-black/80" />
          </button>
          
          <button 
            onClick={scrollNext}
            className="pointer-events-auto bg-white/40 hover:bg-white/70 transition-all duration-300 rounded-full p-3 focus:outline-none shadow-lg transform hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="h-8 w-8 text-black/80" />
          </button>
        </div>
      </div>
      
      {/* Slide indicators (layer 2) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3 pointer-events-none">
        <div className="flex space-x-3 pointer-events-auto">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-white scale-110 shadow-md' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Hero content (top layer) */}
      <div className="container mx-auto px-4 relative z-30 text-white text-center pointer-events-none">
        <p className="text-lg md:text-xl mb-4 animate-fade-up font-serif tracking-widest">
          CRAFTED WITH EXCELLENCE
        </p>
        <h1 className="text-6xl md:text-8xl font-serif mb-6 animate-fade-up leading-tight" style={{ animationDelay: "0.2s" }}>
          Timeless Elegance <br/> in Stainless Steel
        </h1>
        <p className="text-xl md:text-2xl mb-8 animate-fade-up max-w-2xl mx-auto" style={{ animationDelay: "0.4s" }}>
          Discover our collection of meticulously crafted stainless steel furniture, where durability meets sophistication.
        </p>
        <button 
          className="bg-white text-black px-8 py-3 rounded-none hover:bg-[hsl(var(--theme))] hover:text-white transition-colors animate-fade-up text-lg tracking-wider pointer-events-auto" 
          style={{ animationDelay: "0.6s" }}
        >
          Explore Collection
        </button>
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
        `}
      </style>
    </div>
  );
};

export default Hero;

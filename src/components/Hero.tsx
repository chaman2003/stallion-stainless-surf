
const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/lovable-uploads/91403dcc-dfe4-4b8d-8dcb-a2979f523755.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="absolute inset-0 bg-black/30 z-10" />
      
      <div className="container mx-auto px-4 relative z-20 text-white text-center">
        <h1 className="text-7xl md:text-8xl font-serif mb-6 animate-fade-up">
          sale
        </h1>
        <p className="text-xl md:text-2xl mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Off Season Limited Period
        </p>
        <button className="bg-white text-black px-8 py-3 rounded-none hover:bg-gold hover:text-white transition-colors animate-fade-up" style={{ animationDelay: "0.4s" }}>
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Hero;

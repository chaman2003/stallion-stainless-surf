
const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=60')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      />
      
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      <div className="container mx-auto px-4 relative z-20 text-white text-center">
        <p className="text-lg md:text-xl mb-4 animate-fade-up font-serif tracking-widest">
          CRAFTED WITH EXCELLENCE
        </p>
        <h1 className="text-6xl md:text-8xl font-serif mb-6 animate-fade-up leading-tight" style={{ animationDelay: "0.2s" }}>
          Timeless Elegance <br/> in Steel
        </h1>
        <p className="text-xl md:text-2xl mb-8 animate-fade-up max-w-2xl mx-auto" style={{ animationDelay: "0.4s" }}>
          Discover our collection of meticulously crafted stainless steel furniture, where durability meets sophistication.
        </p>
        <button 
          className="bg-white text-black px-8 py-3 rounded-none hover:bg-gold hover:text-white transition-colors animate-fade-up text-lg tracking-wider" 
          style={{ animationDelay: "0.6s" }}
        >
          Explore Collection
        </button>
      </div>
    </div>
  );
};

export default Hero;


import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import { Card } from '../components/ui/card';

const categories = [
  {
    title: "Luxury Format",
    subtitle: "STALLION STAINLESS",
    description: "LEVEL NEXT",
    items: ["Stationary Sofas", "Motion Sofas", "Home Theatre", "Armchairs", "Day Bed", "Sofa Cum Bed", "Recliners", "Beds"]
  },
  {
    title: "Case Goods",
    items: ["Dining Tables", "Dining Chairs", "Center Tables", "Consoles", "Office Tables", "Office Chairs"]
  },
  {
    title: "Fixed Cabinets",
    items: ["Kitchens", "Wardrobes", "TV Cabinets"]
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Card key={category.title} className="p-8 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-serif mb-2">{category.title}</h2>
                {category.subtitle && (
                  <p className="text-sm text-gold mb-1">{category.subtitle}</p>
                )}
                {category.description && (
                  <p className="text-sm mb-4">{category.description}</p>
                )}
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-600 hover:text-gold transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-serif mb-4">NEWSLETTER</h3>
              <p className="mb-4">Sign up to get information on our latest products and collections.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="px-4 py-2 bg-gray-800 rounded flex-1"
                />
                <button className="px-6 py-2 bg-gold hover:bg-gold/90 rounded">
                  Sign Up
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-serif mb-4">CONTACT</h3>
              <p>Contact us for any inquiries</p>
              <p className="mt-2">Phone: +1 234 567 890</p>
              <p>Email: info@stallionstainless.com</p>
            </div>
            
            <div>
              <h3 className="text-xl font-serif mb-4">FOLLOW US</h3>
              <p className="mb-4">Follow us on social media for unmissable updates!</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gold transition-colors">Facebook</a>
                <a href="#" className="hover:text-gold transition-colors">Instagram</a>
                <a href="#" className="hover:text-gold transition-colors">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

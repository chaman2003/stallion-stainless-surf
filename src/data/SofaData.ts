import { SofaProduct, SofaTypeKey } from "../features/products/ProductTypes";

export const sofaData: Record<SofaTypeKey, {
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
      }
    ]
  },
  'sofa-cum-bed': {
    title: 'Sofa Cum Bed',
    description: 'Versatile sofas that convert into beds, perfect for guest rooms and small spaces.',
    products: [
      {
        id: 1,
        name: 'Convertible Sleeper Sofa',
        price: '₹110,000',
        description: 'Stylish sofa that easily transforms into a comfortable queen-sized bed.',
        image: '/images/sofas/IMG_20250303_195623.jpg',
        features: ['Easy conversion mechanism', 'Comfortable mattress', 'Storage for bedding', 'Removable covers'],
        dimensions: '230cm x 90cm x 85cm (Sofa) / 230cm x 150cm (Bed)',
        materials: ['Premium Fabric', 'Engineered Wood', 'Memory Foam Mattress'],
        colors: ['Grey', 'Navy Blue', 'Beige', 'Olive Green'],
        availability: 'In Stock',
        delivery: '3-5 weeks'
      }
    ]
  }
}; 
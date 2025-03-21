export interface Product {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  sofaType?: string;
  image: string;
  dimensions?: string;
  material?: string;
  color?: string;
}

export interface SofaProduct {
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

export type SofaTypeKey = 'straight' | 'corner' | 'curved' | 'u-shaped' | 'recliner' | 'sofa-cum-bed'; 
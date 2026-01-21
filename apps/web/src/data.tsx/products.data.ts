interface Product {
  id: string;
  name: string;
  price: number;
  category: 'wigs' | 'equipment' | 'care';
  image: string;
  description: string;
  rating: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'HD Lace Frontal Wig - 22"',
    price: 450,
    category: 'wigs',
    image:
      'https://images.unsplash.com/photo-1595475244925-24e5c8e312e5?auto=format&fit=crop&q=80&w=400',
    description: '100% Brazilian human hair with ultra-thin HD lace.',
    rating: 5,
  },
  {
    id: 'p2',
    name: 'Professional Ceramic Flat Iron',
    price: 129,
    category: 'equipment',
    image:
      'https://images.unsplash.com/photo-1522338140262-f46f5913618a?auto=format&fit=crop&q=80&w=400',
    description: 'Adjustable heat up to 450°F with ionic technology.',
    rating: 4,
  },
  {
    id: 'p3',
    name: 'Deep Conditioning Mask',
    price: 34,
    category: 'care',
    image:
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=400',
    description: 'Revitalizing treatment for damaged hair.',
    rating: 5,
  },
  {
    id: 'p4',
    name: 'Synthetic Curly Wig - Honey Blonde',
    price: 85,
    category: 'wigs',
    image:
      'https://images.unsplash.com/photo-1634449591010-449e75529f79?auto=format&fit=crop&q=80&w=400',
    description: 'Heat-resistant fiber with a natural bouncy curl.',
    rating: 4,
  },
  {
    id: 'p5',
    name: 'Professional Hair Dryer',
    price: 189,
    category: 'equipment',
    image:
      'https://images.unsplash.com/photo-1511285513322-c74858059820?auto=format&fit=crop&q=80&w=400',
    description: 'Lightweight, salon-grade motor for quick drying.',
    rating: 5,
  },
  {
    id: 'p6',
    name: 'Edge Control Gel',
    price: 12,
    category: 'care',
    image:
      'https://images.unsplash.com/photo-1594433133649-90471b058727?auto=format&fit=crop&q=80&w=400',
    description: '24-hour hold with non-greasy formula.',
    rating: 4,
  },
];

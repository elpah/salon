import { useState } from 'react'
import { PRODUCTS } from "@salon/data";
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';

const Shop = () => {

	const [activeCategory, setActiveCategory] = useState<'all' | 'wigs' | 'equipment' | 'care'>(
		'all'
	  );
	  const filteredProducts =
		activeCategory === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);
	
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div>
            <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">The Boutique</h1>
            <p className="text-slate-600">
              Elevate your home hair routine with our professional selection.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg">
            {['all', 'wigs', 'equipment', 'care'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${activeCategory === cat ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map(product => (
            <motion.div layout key={product.id} className="bg-white group">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-50 mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button className="absolute bottom-4 right-4 p-3 bg-white text-slate-900 rounded-full shadow-lg transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <ShoppingCart className="h-5 w-5" />
                </button>
                {product.category === 'wigs' && (
                  <span className="absolute top-4 left-4 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
                    Best Seller
                  </span>
                )}
              </div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < product.rating ? 'text-amber-400 fill-current' : 'text-slate-300'}`}
                      />
                    ))}
                    <span className="ml-2 text-xs text-slate-400">(24 reviews)</span>
                  </div>
                </div>
                <span className="text-xl font-bold text-slate-900">${product.price}</span>
              </div>
              <p className="text-sm text-slate-500 mb-4">{product.description}</p>
              <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-rose-600 transition-all">
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop
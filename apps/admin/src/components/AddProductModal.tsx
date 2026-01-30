import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { GlobalContext } from '../context/GlobalContext';
import type { Product } from '../types/product.type';
import { X } from 'lucide-react';

const AddProductModal = () => {
  const globalContext = useContext(GlobalContext);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    category: '',
    description: '',
    stock: 0,
  });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price > 0) {
      const product: Product = {
        id: Date.now().toString(),
        ...newProduct,
      };
      globalContext.setProducts([...globalContext.products, product]);
      setNewProduct({
        name: '',
        price: 0,
        category: '',
        description: '',
        stock: 0,
      });
      globalContext.setShowAddProductModal(false);
    }
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => globalContext.setShowAddProductModal(false)}
    >
      <motion.div
        initial={{
          scale: 0.9,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.9,
          opacity: 0,
        }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-slate-900">Add Product</h3>
          <button
            onClick={() => globalContext.setShowAddProductModal(false)}
            className="cursor-pointer text-slate-400 hover:text-slate-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={e =>
                setNewProduct({
                  ...newProduct,
                  name: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
            <input
              type="text"
              value={newProduct.category}
              onChange={e =>
                setNewProduct({
                  ...newProduct,
                  category: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
              placeholder="e.g., Wigs, Equipment, Care"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Price (€)</label>
            <input
              type="number"
              value={newProduct.price}
              onChange={e =>
                setNewProduct({
                  ...newProduct,
                  price: parseFloat(e.target.value),
                })
              }
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Stock Quantity
            </label>
            <input
              type="number"
              value={newProduct.stock}
              onChange={e =>
                setNewProduct({
                  ...newProduct,
                  stock: parseInt(e.target.value),
                })
              }
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
            <textarea
              value={newProduct.description}
              onChange={e =>
                setNewProduct({
                  ...newProduct,
                  description: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none resize-none"
              rows={3}
              placeholder="Product description"
            />
          </div>
        </div>

        <button
          onClick={handleAddProduct}
          className="w-full mt-6 px-6 py-3 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition-all"
        >
          Add Product
        </button>
      </motion.div>
    </motion.div>
  );
};

export default AddProductModal;

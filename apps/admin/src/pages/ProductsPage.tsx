import { AnimatePresence } from 'framer-motion';
import { Package, Trash2 } from 'lucide-react';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import AddProductModal from '../components/AddProductModal';

const ProductsPage = () => {
  const globalContext = useContext(GlobalContext);

  const handleDeleteProduct = (id: string) => {
    globalContext.setProducts(globalContext.products.filter(p => p.id !== id));
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {globalContext.products.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
                <p className="text-sm text-slate-500">{product.category}</p>
              </div>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="text-red-600 hover:text-red-700 p-2"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-slate-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <p className="text-xl font-bold text-rose-600">${product.price}</p>
              <p className="text-sm text-slate-500">Stock: {product.stock}</p>
            </div>
          </div>
        ))}
      </div>

      {globalContext.products.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-xl">
          <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">No products added yet</p>
          <p className="text-slate-400 text-sm mt-1">Click "Add Product" to get started</p>
        </div>
      )}

      {/* Add Product Modal */}
      <AnimatePresence>{globalContext.showAddProductModal && <AddProductModal />}</AnimatePresence>
    </div>
  );
};

export default ProductsPage;

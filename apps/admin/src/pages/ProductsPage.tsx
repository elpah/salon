import { AnimatePresence } from 'framer-motion';
import { Package, Trash2 } from 'lucide-react';
import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import AddProductModal from '../components/AddProductModal';
import { useProducts } from '@salon/hooks';
import type { Product } from '@salon/types';
import useDeleteProduct from '../hooks/useDeleteProduct';
import ShowModal from '../components/modal/ShowModal';
import { notifyError, notifySuccess } from '@salon/ui';

const apiUrl = import.meta.env.VITE_API_URL;
const ProductsPage = () => {
  const globalContext = useContext(GlobalContext);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null);
  const { data: products, isLoading, isError, refetch } = useProducts(apiUrl);

  const { mutate: deleteProduct } = useDeleteProduct();

  const handleDeleteProduct = (id: string) => {
    setProductIdToDelete(id);
    globalContext.setShowConfirmationModal(true);
  };

  const handleProceedClick = () => {
    globalContext.setShowConfirmationModal(true);
    if (!productIdToDelete) return;
    deleteProduct(productIdToDelete!, {
      onSuccess: () => {
        notifySuccess('Product Deleted Successfully.');
        refetch();
      },
      onError: (_error: unknown) => {
        notifyError('Error Deleting');
      },
    });
    setProductIdToDelete(null);
    globalContext.setShowConfirmationModal(false);
  };

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">Loading products...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500">Failed to load products. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products && products.length > 0 ? (
          products.map((product: Product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="w-full  h-60 bg-slate-100 overflow-hidden rounded-t-xl flex items-center justify-center">
                <img
                  src={product.image as string}
                  alt={product.name}
                  className="max-h-60 w-full object-contain"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
                    <p className="text-sm text-slate-500">{product.category}</p>
                  </div>

                  {
                    //Future Improvement
                    /* {product.status === 'deleted' && (
                    <button className="inline-flex items-center gap-2 rounded-md border border-green-600 px-3 py-1.5 text-sm font-medium text-green-600 hover:bg-green-50 transition">
                      <RotateCcw className="h-4 w-4" />
                      Restore
                    </button>
                  )} */
                  }
                  <button
                    onClick={() => product.id && handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-slate-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <p className="text-xl font-bold text-rose-600">€{product.price}</p>
                  <p className="text-sm text-slate-500">Stock: {product.stock}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-xl col-span-full">
            <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 font-medium">No products added yet</p>
            <p className="text-slate-400 text-sm mt-1">Click "Add Product" to get started</p>
          </div>
        )}
      </div>
      {globalContext.showConfirmationModal && (
        <ShowModal
          text={'Are you sure you want to delete product?'}
          handleProceedClick={() => {
            handleProceedClick();
          }}
          handleCancelClick={() => {
            globalContext.setShowConfirmationModal(false);
            setProductIdToDelete(null);
          }}
        />
      )}
      <AnimatePresence>{globalContext.showAddProductModal && <AddProductModal />}</AnimatePresence>
    </div>
  );
};

export default ProductsPage;

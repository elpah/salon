import { AnimatePresence, motion } from 'framer-motion';
import { Trash2, Package } from 'lucide-react';
import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import AddCategoryModal from '../components/AddCategoryModal';
import { useGetCategories } from '@salon/hooks';
import useDeleteCategory, { type CategoryPayload } from '../hooks/useDeleteCategory';
import { notifyError, notifySuccess } from '@salon/ui';

const apiUrl = import.meta.env.VITE_API_URL;

const CategoryPage = () => {
  const globalContext = useContext(GlobalContext);
  const [activeTab, setActiveTab] = useState<'product' | 'service'>('product');
  const { mutate: deleteCategory } = useDeleteCategory();

  const {
    data: categories,
    isLoading: categoriesIsLoading,
    isError: categoriesIsError,
    refetch,
  } = useGetCategories(apiUrl);

  const displayCategories =
    activeTab === 'product' ? categories?.shopCategories : categories?.serviceCategories;

  const handleDeleteCategory = ({ name, type }: CategoryPayload) => {
    deleteCategory(
      { name, type },
      {
        onSuccess: () => {
          notifySuccess('Category Deleted Successfully.');
          refetch();
        },
        onError: (_error: unknown) => {
          notifyError('Error Deleting Category');
        },
      }
    );
  };
  if (categoriesIsLoading) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">Loading Categories...</p>
      </div>
    );
  }
  if (categoriesIsError) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500">Failed to load Categories. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center space-x-2 bg-white p-1 rounded-lg border border-slate-200 mb-6 w-fit">
        <button
          onClick={() => setActiveTab('product')}
          className={`cursor-pointer px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'product' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Product Categories
        </button>
        <button
          onClick={() => setActiveTab('service')}
          className={`cursor-pointer px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'service' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Service Categories
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayCategories?.map(category => (
          <motion.div
            key={category}
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{category}</h3>
                <p className="text-xs text-slate-500 mt-1 capitalize">{activeTab} Category</p>
              </div>
              <button
                onClick={() => handleDeleteCategory({ name: category, type: activeTab })}
                className="cursor-pointer text-red-600 hover:text-red-700 p-2"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {displayCategories?.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-xl">
          <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">No {activeTab} categories added yet</p>
          <p className="text-slate-400 text-sm mt-1">Click "Add Category" to get started</p>
        </div>
      )}

      <AnimatePresence>
        {globalContext.showAddCategoryModal && <AddCategoryModal />}
      </AnimatePresence>
    </div>
  );
};

export default CategoryPage;

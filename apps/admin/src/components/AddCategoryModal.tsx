import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { useQueryClient } from '@tanstack/react-query';
import useCreateNewCategory from '../hooks/useCreateNewCategory';
import { notifyError, notifySuccess } from '@salon/ui';

const AddCategoryModal = () => {
  const globalContext = useContext(GlobalContext);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreateNewCategory();
  const [_error, setError] = useState<boolean>(false);

  const [newCategory, setNewCategory] = useState({
    name: '',
    type: 'product' as 'product' | 'service',
  });

  const handleAddCategory = () => {
    if (newCategory.name.trim() && newCategory.type) {
      mutate(newCategory, {
        onSuccess: () => {
          notifySuccess('Category Successfully Added');
          queryClient.invalidateQueries({ queryKey: ['products'] });
          setNewCategory({
            name: '',
            type: 'product',
          });
          globalContext.setShowAddCategoryModal(false);
        },
        onError: (err: unknown) => {
          notifyError('Unable to add new category. Try again later');
          if (import.meta.env.VITE_NODE_ENV !== 'production') {
            console.error(err);
          }
        },
      });
    } else {
      setError(true);
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
      onClick={() => globalContext.setShowAddCategoryModal(false)}
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
        className="bg-white rounded-2xl p-8 max-w-md w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-slate-900">Add Category</h3>
          <button
            onClick={() => globalContext.setShowAddCategoryModal(false)}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Category Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  setNewCategory({
                    ...newCategory,
                    type: 'product',
                  })
                }
                className={`py-3 px-4 rounded-lg border-2 text-sm font-bold transition-all ${newCategory.type === 'product' ? 'border-rose-600 bg-rose-50 text-rose-600' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
              >
                Product
              </button>
              <button
                onClick={() =>
                  setNewCategory({
                    ...newCategory,
                    type: 'service',
                  })
                }
                className={`py-3 px-4 rounded-lg border-2 text-sm font-bold transition-all ${newCategory.type === 'service' ? 'border-rose-600 bg-rose-50 text-rose-600' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
              >
                Service
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Category Name</label>
            <input
              type="text"
              value={newCategory.name}
              onChange={e =>
                setNewCategory({
                  ...newCategory,
                  name: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
              placeholder="Enter category name"
            />
          </div>
        </div>

        <button
          onClick={handleAddCategory}
          disabled={isPending}
          className="w-full mt-6 px-6 py-3 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 disabled:opacity-50 disabled:hover:bg-rose-600 transition-all"
        >
          {isPending ? 'Adding...' : 'Add Category'}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default AddCategoryModal;

import { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import { GlobalContext } from '../context/GlobalContext';
import type { Service } from '@salon/types';
import { notifyError, notifySuccess } from '@salon/ui';
import { useQueryClient } from '@tanstack/react-query';
import useCreateNewService from '../hooks/useCreateNewService';
import { useImageUpload } from '../hooks/useImageUpload';
import { useGetCategories } from '@salon/hooks';
const apiUrl = import.meta.env.VITE_API_URL;

const AddServicesModal = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreateNewService();
  const [error, setError] = useState<boolean>(false);
  const globalContext = useContext(GlobalContext);
  const {
    data: categories,
    isLoading: categoriesIsLoading,
    isError: categoriesIsError,
  } = useGetCategories(apiUrl);
  const {
    data: serviceToAdd,
    setData: setServiceToAdd,
    imagePreview,
    dragging,
    handleFileChange: handleImageUpload,
    handleDrop,
    handleDragEnter,
    handleDragLeave,
    clearImage,
  } = useImageUpload<Service>({
    id: '',
    name: '',
    price: 0,
    duration: '',
    description: '',
    category: '',
    image: null,
  });

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  if (categoriesIsError) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500">Failed to load Categories. Please try again.</p>
      </div>
    );
  }

  const handleCreateService = () => {
    if (
      serviceToAdd.name.trim() &&
      serviceToAdd.duration.trim() &&
      serviceToAdd.category &&
      serviceToAdd.description.trim() &&
      serviceToAdd.image &&
      serviceToAdd.price >= 0
    ) {
      const newService: Service = {
        id: '',
        name: serviceToAdd.name,
        price: serviceToAdd.price,
        duration: serviceToAdd.duration,
        category: serviceToAdd.category,
        description: serviceToAdd.description,
        image: serviceToAdd.image,
      };
      mutate(newService, {
        onSuccess: () => {
          notifySuccess('Service Successfully Added');
          queryClient.invalidateQueries({ queryKey: ['services'] });
          setServiceToAdd({
            id: '',
            name: '',
            price: 0,
            duration: '',
            description: '',
            category: '',
            image: null,
          });
          globalContext.setShowAddServicesModal(false);
        },
        onError: (err: unknown) => {
          notifyError('Something went wrong while submitting.');
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
      onClick={() => globalContext.setShowAddServicesModal(false)}
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
          <h3 className="text-2xl font-bold text-slate-900">Add Service</h3>
          <button
            onClick={() => globalContext.setShowAddServicesModal(false)}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Service Name</label>
            <input
              type="text"
              value={serviceToAdd.name}
              onChange={e =>
                setServiceToAdd({
                  ...serviceToAdd,
                  name: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
              placeholder="Enter service name"
            />
            {error && !serviceToAdd.name && (
              <p className="text-sm text-red-600">Enter a service name</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
            {categoriesIsLoading ? (
              <p className=" px-4 py-3 border rounded-lg text-rose-600">Loading categories...</p>
            ) : (
              <select
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
                name="category "
                id="category"
                value={serviceToAdd.category}
                onChange={e =>
                  setServiceToAdd({
                    ...serviceToAdd,
                    category: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories?.serviceCategories.map((cat, index) => (
                  <option key={index}>{cat}</option>
                ))}
              </select>
            )}
            {error && !serviceToAdd.category && (
              <p className="text-sm text-red-600">Select a category</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Price (€)</label>
            <input
              type="number"
              value={serviceToAdd.price}
              onChange={e =>
                setServiceToAdd({
                  ...serviceToAdd,
                  price: parseFloat(e.target.value),
                })
              }
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
              placeholder="0.00"
            />
            {error && !serviceToAdd.price && (
              <p className="text-sm text-red-600">Enter a price greater than 0</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Duration</label>
            <input
              type="text"
              value={serviceToAdd.duration}
              onChange={e =>
                setServiceToAdd({
                  ...serviceToAdd,
                  duration: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
              placeholder="e.g., 60 min, 2 hrs"
            />

            {error && !serviceToAdd.duration && (
              <p className="text-sm text-red-600">Enter a duration</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Service Image</label>

            {/* Image Preview */}
            {imagePreview && (
              <div className="relative inline-block mb-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-30 w-auto object-cover rounded-lg border-2 border-slate-200"
                />
                <button
                  onClick={clearImage}
                  className="absolute -top-2 -right-2 flex items-center justify-center
                    h-8 w-8 rounded-full bg-red-600 text-white shadow-lg
                      hover:bg-red-700 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <div
              className={`relative transition-all rounded-lg border-2 border-dashed 
                ${
                  dragging
                    ? 'border-rose-600 bg-rose-50 ring-2 ring-rose-400/40 scale-[1.01]'
                    : 'border-slate-300 hover:border-rose-600 hover:bg-rose-50'
                }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="product-image-upload"
              />

              <label
                htmlFor="product-image-upload"
                className="flex items-center justify-center w-full px-4 py-6 cursor-pointer"
              >
                <div className="text-center pointer-events-none">
                  <Upload
                    className={`h-8 w-8 mx-auto mb-2 transition-colors ${
                      dragging ? 'text-rose-600' : 'text-slate-400'
                    }`}
                  />

                  <p className="text-sm font-medium">
                    {dragging ? (
                      <span className="text-rose-600 font-semibold">Drop image here</span>
                    ) : imagePreview ? (
                      'Change Image'
                    ) : (
                      'Upload Image or Drag & Drop'
                    )}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                </div>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
            <textarea
              value={serviceToAdd.description}
              onChange={e =>
                setServiceToAdd({
                  ...serviceToAdd,
                  description: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none resize-none"
              rows={3}
              placeholder="Service description"
            />
            {error && !serviceToAdd.description && (
              <p className="text-sm text-red-600">Enter a description</p>
            )}
          </div>
        </div>

        <button
          onClick={() => handleCreateService()}
          // disabled={isPending}
          className=" cursor-pointer w-full mt-6 px-6 py-3 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition-all"
        >
          {isPending ? 'Adding...' : 'Add Service'}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default AddServicesModal;

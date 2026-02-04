import { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlobalContext } from '../context/GlobalContext';
import type { Product } from '@salon/types';
import { Upload, X } from 'lucide-react';

const AddProductModal = () => {
  const globalContext = useContext(GlobalContext);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [dragging, setDragging] = useState(false);

  const [newProduct, setNewProduct] = useState<Product>({
    name: '',
    price: 0,
    category: '',
    description: '',
    stock: 0,
    image: '',
  });

  useEffect(() => {
    console.log(newProduct);
  }, [newProduct]);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Create preview and store base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setNewProduct({
          ...newProduct,
          image: base64String,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    if (!file.type.startsWith('image/')) {
      alert('Please drop an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
      setNewProduct({
        ...newProduct,
        image: base64String,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

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
        image: '',
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
      onClick={() => false}
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
            className="text-slate-400 hover:text-slate-600"
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
            <label className="block text-sm font-semibold text-slate-700 mb-2">Price ($)</label>
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
            <label className="block text-sm font-semibold text-slate-700 mb-2">Product Image</label>

            {/* Image Preview */}
            {imagePreview && (
              <div className="relative inline-block mb-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-30 w-auto object-cover rounded-lg border-2 border-slate-200"
                />

                <button
                  onClick={() => {
                    setImagePreview('');
                    setNewProduct({
                      ...newProduct,
                      image: '',
                    });
                  }}
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

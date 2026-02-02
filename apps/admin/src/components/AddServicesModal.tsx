import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { GlobalContext } from '../context/GlobalContext';
import type { Service } from '@salon/types';
import { notifyError, notifySuccess } from '../lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import useCreateNewService from '../hooks/useCreateNewService';

const AddServicesModal = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreateNewService();
  const globalContext = useContext(GlobalContext);
  const [serviceToAdd, setServiceToAdd] = useState({
    id: '',
    name: '',
    price: 0,
    duration: '',
    description: '',
    category: '',
    image:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGFpcnxlbnwwfHwwfHx8MA%3D%3D',
  });

  const handleCreateService = () => {
    if (
      serviceToAdd.name &&
      serviceToAdd.price &&
      serviceToAdd.duration &&
      serviceToAdd.category &&
      serviceToAdd.description
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
            image:
              'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGFpcnxlbnwwfHwwfHx8MA%3D%3D',
          });
          globalContext.setshowAddServicesModal(false);
        },
        onError: (err: unknown) => {
          notifyError('Something went wrong while submitting.');
          if (import.meta.env.VITE_NODE_ENV !== 'production') {
            console.error(err);
          }
        },
      });
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
      onClick={() => globalContext.setshowAddServicesModal(false)}
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
            onClick={() => globalContext.setshowAddServicesModal(false)}
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
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
            <input
              type="text"
              value={serviceToAdd.category}
              onChange={e =>
                setServiceToAdd({
                  ...serviceToAdd,
                  category: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
              placeholder="e.g., Styling, Color, Treatment"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Price ($)</label>
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
          </div>
        </div>

        <button
          onClick={handleCreateService}
          disabled={isPending}
          className="w-full mt-6 px-6 py-3 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition-all"
        >
          {isPending ? 'Adding...' : 'Add Service'}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default AddServicesModal;

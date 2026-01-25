import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { GlobalContext } from '../context/GlobalContext';
import type { Service } from '../types/service.type';

const AddServicesModal = () => {
  const globalContext = useContext(GlobalContext);
  const [newService, setNewService] = useState({
    name: '',
    price: 0,
    duration: '',
    description: '',
    category: '',
  });

  const handleAddService = () => {
    if (newService.name && newService.price > 0) {
      const service: Service = {
        id: Date.now().toString(),
        ...newService,
      };
      globalContext.setServices([...globalContext.services, service]);
      setNewService({
        name: '',
        price: 0,
        duration: '',
        description: '',
        category: '',
      });
      globalContext.setshowAddServicesModal(false);
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
              value={newService.name}
              onChange={e =>
                setNewService({
                  ...newService,
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
              value={newService.category}
              onChange={e =>
                setNewService({
                  ...newService,
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
              value={newService.price}
              onChange={e =>
                setNewService({
                  ...newService,
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
              value={newService.duration}
              onChange={e =>
                setNewService({
                  ...newService,
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
              value={newService.description}
              onChange={e =>
                setNewService({
                  ...newService,
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
          onClick={handleAddService}
          className="w-full mt-6 px-6 py-3 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition-all"
        >
          Add Service
        </button>
      </motion.div>
    </motion.div>
  );
};

export default AddServicesModal;

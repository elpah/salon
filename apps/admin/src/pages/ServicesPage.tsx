import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Trash2, Briefcase, X } from 'lucide-react';
import { useState } from 'react';

interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  category: string;
}

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
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
      setServices([...services, service]);
      setNewService({
        name: '',
        price: 0,
        duration: '',
        description: '',
        category: '',
      });
      setShowAddModal(false);
    }
  };
  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Services</h2>
          <p className="text-slate-600">Manage your salon services</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-all"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map(service => (
          <div
            key={service.id}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900">{service.name}</h3>
                <p className="text-sm text-slate-500">{service.category}</p>
              </div>
              <button
                onClick={() => handleDeleteService(service.id)}
                className="text-red-600 hover:text-red-700 p-2"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-slate-600 mb-4">{service.description}</p>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <p className="text-xl font-bold text-rose-600">${service.price}</p>
              <p className="text-sm text-slate-500">{service.duration}</p>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-xl">
          <Briefcase className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">No services added yet</p>
          <p className="text-slate-400 text-sm mt-1">Click "Add Service" to get started</p>
        </div>
      )}

      {/* Add Service Modal */}
      <AnimatePresence>
        {showAddModal && (
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
            onClick={() => setShowAddModal(false)}
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
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Service Name
                  </label>
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
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category
                  </label>
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
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Price ($)
                  </label>
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
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Duration
                  </label>
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
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>
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
        )}
      </AnimatePresence>
    </div>
  );
};
export default ServicesPage;

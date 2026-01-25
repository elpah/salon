import { AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import { useContext } from 'react';
import AddServicesModal from '../components/AddServicesModal';
import { GlobalContext } from '../context/GlobalContext';

const ServicesPage = () => {
  const globalContext = useContext(GlobalContext);
  const handleDeleteService = (id: string) => {
    globalContext.setServices(globalContext.services.filter(s => s.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Services</h2>
          <p className="text-slate-600">Manage your salon services</p>
        </div>
        <button
          onClick={() => globalContext.setshowAddServicesModal(true)}
          className="flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-all"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {globalContext.services.map(service => (
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

      {globalContext.services.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-xl">
          <Briefcase className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">No services added yet</p>
          <p className="text-slate-400 text-sm mt-1">Click "Add Service" to get started</p>
        </div>
      )}

      {/* Add Service Modal */}
      <AnimatePresence>
        {globalContext.showAddServicesModal && <AddServicesModal />}
      </AnimatePresence>
    </div>
  );
};
export default ServicesPage;

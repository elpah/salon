import { AnimatePresence } from 'framer-motion';
import { Trash2, Briefcase } from 'lucide-react';
import { useContext, useState } from 'react';
import AddServicesModal from '../components/AddServicesModal';
import { GlobalContext } from '../context/GlobalContext';
import { useServices } from '@salon/hooks';
import ShowModal from '../components/modal/ShowModal';
// import 'react-toastify/dist/ReactToastify.css';
import useDeleteService from '../hooks/useDeleteService';
import { notifyError,notifySuccess } from '../lib/utils';

const apiUrl = import.meta.env.VITE_API_URL;

const ServicesPage = () => {
  const globalContext = useContext(GlobalContext);
  const [serviceIdToDelete, setServiceIdToDelete] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data: services, isLoading, isError, refetch } = useServices(apiUrl);
  const { mutate: deleteProduct } = useDeleteService();
  const handleDeleteProduct = (id: string) => {
    setServiceIdToDelete(id);
    setShowModal(true);
  };

  const handleProceedClick = () => {
    setShowModal(false);
    if (!serviceIdToDelete) return;
    deleteProduct(serviceIdToDelete!, {
      onSuccess: () => {
        notifySuccess('Product Deleted Successfully');
        refetch();
      },
      onError: (error: any) => {
        console.log(error);
        notifyError(error.message);
      },
    });
    setServiceIdToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">Loading Services...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500">Failed to load services. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services?.map(service => (
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
                onClick={() => handleDeleteProduct(service.id)}
                className="cursor-pointer text-red-600 hover:text-red-700 p-2"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-slate-600 mb-4">{service.description}</p>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <p className="text-xl font-bold text-rose-600">€{service.price}</p>
              <p className="text-sm text-slate-500">{service.duration}</p>
            </div>
          </div>
        ))}
      </div>

      {services?.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-xl">
          <Briefcase className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">No services added yet</p>
          <p className="text-slate-400 text-sm mt-1">Click "Add Service" to get started</p>
        </div>
      )}
      {showModal && (
        <ShowModal
          text={'Are you sure you want to delete service?'}
          handleProceedClick={() => {
            handleProceedClick();
          }}
          handleCancelClick={() => {
            setShowModal(false);
            setServiceIdToDelete(null);
          }}
        />
      )}
      {/* Add Service Modal */}
      <AnimatePresence>
        {globalContext.showAddServicesModal && <AddServicesModal />}
      </AnimatePresence>
    </div>
  );
};

export default ServicesPage;


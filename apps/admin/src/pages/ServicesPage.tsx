import { AnimatePresence } from 'framer-motion';
import { Trash2, Briefcase } from 'lucide-react';
import { useContext, useState } from 'react';
import AddServicesModal from '../components/AddServicesModal';
import { GlobalContext } from '../context/GlobalContext';
import { useServices } from '@salon/hooks';
import ShowModal from '../components/modal/ShowModal';
import useDeleteService from '../hooks/useDeleteService';
import { notifyError, notifySuccess } from '@salon/ui';
import Loading from '../components/Loading';

const sharedApiUrl = import.meta.env.VITE_SHARED_API_URL;

const ServicesPage = () => {
  const globalContext = useContext(GlobalContext);
  const [serviceIdToDelete, setServiceIdToDelete] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data: services, isLoading, isError, refetch } = useServices(sharedApiUrl);
  const { mutate: deleteProduct } = useDeleteService();
  const handleDeleteService = (id: string) => {
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
      onError: (_error: unknown) => {
        notifyError('Error Deleting');
      },
    });
    setServiceIdToDelete(null);
  };

  if (isLoading) {
    return <Loading />;
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services?.map(service => (
          <div
            key={service.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all"
          >
            {service.image && (
              <div className="w-full  h-60 bg-slate-100 overflow-hidden rounded-t-xl flex items-center justify-center">
                <img
                  src={service.image as string}
                  alt={service.name}
                  className="max-h-60 w-full object-contain"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900">{service.name}</h3>
                  <p className="text-sm text-slate-500">{service.category}</p>
                </div>
                <button
                  onClick={() => {
                    if (service.id) {
                      handleDeleteService(service.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-700 p-2"
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

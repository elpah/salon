import { AnimatePresence, motion } from 'framer-motion';
import { Trash2, Clock } from 'lucide-react';
import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import AddSlotModal from '../components/AddSlotModal';
import useGetAvailability from '../hooks/useGetAvailability';
import useDeleteAvailability from '../hooks/useDeleteAvailability';
import ShowModal from '../components/modal/ShowModal';
import type { AvailabilityWindow } from '@salon/types';
import { notifyError, notifySuccess } from '../lib/utils';

const apiUrl = import.meta.env.VITE_API_URL;

const AvailabilityPage = () => {
  const globalContext = useContext(GlobalContext);
  const [avaibabilityIdToDelete, setAvaibabilityIdToDelete] = useState<string | null>(null);
  const { data: availabilities, isLoading, isError, refetch } = useGetAvailability(apiUrl);
  const { mutate: deleteAvailability } = useDeleteAvailability();

  const handleDeleteAvailability = (id: string) => {
    setAvaibabilityIdToDelete(id);
    globalContext.setShowConfirmationModal(true);
  };

  const handleProceedClick = () => {
    globalContext.setShowConfirmationModal(false);
    if (!avaibabilityIdToDelete) return;
    deleteAvailability(avaibabilityIdToDelete!, {
      onSuccess: () => {
        notifySuccess('Product Deleted Successfully.');
        refetch();
      },
      onError: (error: unknown) => {
        notifyError('Error Deleting product');
      },
    });
    setAvaibabilityIdToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">Loading products...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500">Failed to load products. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availabilities?.map((slot: AvailabilityWindow) => (
          <motion.div
            key={slot.id}
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
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-lg font-bold text-slate-900">{slot.date}</p>
                <p className="text-sm text-slate-500">
                  {slot.startTime} - {slot.endTime}
                </p>{' '}
                <p className="text-sm text-slate-500">Durations:{slot.slotMinutes} minutes</p>
                <p className="text-sm text-slate-500">
                  Breaks inbetween: {slot.bufferMinutes} minutes intervals
                </p>
              </div>
              <button
                onClick={() => handleDeleteAvailability(slot.id)}
                className="text-red-600 hover:text-red-700 p-2"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      {globalContext.showConfirmationModal && (
        <ShowModal
          text={'Are you sure you want to delete availability?'}
          handleProceedClick={() => {
            handleProceedClick();
          }}
          handleCancelClick={() => {
            globalContext.setShowConfirmationModal(false);
            setAvaibabilityIdToDelete(null);
          }}
        />
      )}
      <AnimatePresence>{globalContext.showAddSlotModal && <AddSlotModal />}</AnimatePresence>
      {availabilities?.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-xl">
          <Clock className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">No availabilities added yet</p>
          <p className="text-slate-400 text-sm mt-1">Click "Add Availability" to get started</p>
        </div>
      )}
    </div>
  );
};

export default AvailabilityPage;

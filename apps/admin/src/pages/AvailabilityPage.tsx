import { AnimatePresence, motion } from 'framer-motion';
import { Trash2, Clock } from 'lucide-react';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import AddSlotModal from '../components/AddSlotModal';

const AvailabilityPage = () => {
  const globalContext = useContext(GlobalContext);
  const handleDeleteSlot = (id: string) => {
    globalContext.setTimeSlots(globalContext.timeSlots.filter(slot => slot.id !== id));
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {globalContext.timeSlots.map(slot => (
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
                </p>
              </div>
              <button
                onClick={() => handleDeleteSlot(slot.id)}
                className="text-red-600 hover:text-red-700 p-2"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${slot.isBooked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
              >
                {slot.isBooked ? 'Booked' : 'Available'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>{globalContext.showAddSlotModal && <AddSlotModal />}</AnimatePresence>
      {globalContext.timeSlots.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-xl">
          <Clock className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">No time slots added yet</p>
          <p className="text-slate-400 text-sm mt-1">Click "Add Time Slot" to get started</p>
        </div>
      )}
    </div>
  );
};

export default AvailabilityPage;

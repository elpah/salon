import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Clock, X } from 'lucide-react';

interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

const AvailabilityPage = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSlot, setNewSlot] = useState({
    date: '',
    startTime: '',
    endTime: '',
  });
  const handleAddSlot = () => {
    if (newSlot.date && newSlot.startTime && newSlot.endTime) {
      const slot: TimeSlot = {
        id: Date.now().toString(),
        date: newSlot.date,
        startTime: newSlot.startTime,
        endTime: newSlot.endTime,
        isBooked: false,
      };
      setTimeSlots([...timeSlots, slot]);
      setNewSlot({
        date: '',
        startTime: '',
        endTime: '',
      });
      setShowAddModal(false);
    }
  };
  const handleDeleteSlot = (id: string) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== id));
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Availability</h2>
          <p className="text-slate-600">Manage your appointment time slots</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-all"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Time Slot
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {timeSlots.map(slot => (
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

      {timeSlots.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-xl">
          <Clock className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">No time slots added yet</p>
          <p className="text-slate-400 text-sm mt-1">Click "Add Time Slot" to get started</p>
        </div>
      )}

      {/* Add Slot Modal */}
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
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Add Time Slot</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newSlot.date}
                    onChange={e =>
                      setNewSlot({
                        ...newSlot,
                        date: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={newSlot.startTime}
                    onChange={e =>
                      setNewSlot({
                        ...newSlot,
                        startTime: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={newSlot.endTime}
                    onChange={e =>
                      setNewSlot({
                        ...newSlot,
                        endTime: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleAddSlot}
                className="w-full mt-6 px-6 py-3 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition-all"
              >
                Add Slot
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvailabilityPage;

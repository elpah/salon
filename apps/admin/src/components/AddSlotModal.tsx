import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { GlobalContext } from '../context/GlobalContext';
import type { AvailabilityWindow } from '@salon/types';
import useCreateAvailability from '../hooks/useCreateNewAvailability';
import { useQueryClient } from '@tanstack/react-query';
import { notifyError, notifySuccess  } from '@salon/ui';


const AddSlotModal = () => {
  const globalContext = useContext(GlobalContext);
  const { mutate, isPending } = useCreateAvailability();
  const queryClient = useQueryClient();

  const [newSlot, setNewSlot] = useState({
    date: '',
    startTime: '',
    endTime: '',
    slotMinutes: 30,
    bufferMinutes: 10,
  });
  const handleAddSlot = () => {
    if (
      newSlot.date &&
      newSlot.startTime &&
      newSlot.endTime &&
      newSlot.slotMinutes &&
      newSlot.bufferMinutes
    ) {
      const slot: AvailabilityWindow = {
        id: Date.now().toString(),
        date: newSlot.date,
        startTime: newSlot.startTime,
        endTime: newSlot.endTime,
        slotMinutes: newSlot.slotMinutes,
        bufferMinutes: newSlot.bufferMinutes,
      };

      mutate(slot, {
        onSuccess: () => {
          notifySuccess('Availability Successfully Added');
          queryClient.invalidateQueries({ queryKey: ['availabilities'] });
          setNewSlot({
            date: '',
            startTime: '',
            endTime: '',
            slotMinutes: 30,
            bufferMinutes: 10,
          });
          globalContext.setShowAddSlotModal(false);
        },
        onError: err => {
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
      onClick={() => globalContext.setShowAddSlotModal(false)}
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
            onClick={() => globalContext.setShowAddSlotModal(false)}
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
            <label className="block text-sm font-semibold text-slate-700 mb-2">Start Time</label>
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
            <label className="block text-sm font-semibold text-slate-700 mb-2">End Time</label>
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
        <div className="mt-4">
          <label className="block text-sm font-semibold text-slate-700 mb-2 space-y-4">
            Slot Duration (minutes)
          </label>
          <input
            type="number"
            min={5}
            step={5}
            value={newSlot.slotMinutes}
            onChange={e =>
              setNewSlot({
                ...newSlot,
                slotMinutes: Number(e.target.value),
              })
            }
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-semibold text-slate-700 mb-2 space-y-4">
            Breaks
          </label>
          <input
            type="number"
            min={5}
            step={5}
            value={newSlot.bufferMinutes}
            onChange={e =>
              setNewSlot({
                ...newSlot,
                bufferMinutes: Number(e.target.value),
              })
            }
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
          />
        </div>

        <button
          onClick={handleAddSlot}
          disabled={isPending}
          className="w-full mt-6 px-6 py-3 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition-all"
        >
          {isPending ? 'Adding...' : 'Add Availability'}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default AddSlotModal;

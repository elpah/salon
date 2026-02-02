import useGetAvailabilities from '@/hooks/useGetAvailabilities';
import { useServices, useGetBookedSlots } from '@salon/hooks';
import { AvailabilityWindow, BookedSlot } from '@salon/types';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useReducer, useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

type SelectedSlot = {
  date: string;
  startTime: string;
  endTime: string;
};

interface AvailableTime {
  startTime: string;
  endTime: string;
  duration: number;
}

interface AvailableSlotByDate {
  date: string;
  times: AvailableTime[];
}

type BookingState = {
  selectedService: string | null;
  selectedDate: string;
  selectedSlot: SelectedSlot | null;
  clientDetails: {
    name: string;
    email: string;
    phone: string;
  };
};

type ClientField = keyof BookingState['clientDetails'];

type BookingAction =
  | { type: 'SET_SERVICE'; payload: string | null }
  | { type: 'SET_DATE'; payload: string }
  | { type: 'SET_SLOT'; payload: SelectedSlot | null }
  | { type: 'SET_CLIENT_DETAILS'; payload: { field: ClientField; value: string } }
  | { type: 'RESET' };

const initialBookingState: BookingState = {
  selectedService: null,
  selectedDate: '',
  selectedSlot: null,
  clientDetails: { name: '', email: '', phone: '' },
};

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'SET_SERVICE':
      return { ...state, selectedService: action.payload };
    case 'SET_DATE':
      return { ...state, selectedDate: action.payload, selectedSlot: null };
    case 'SET_SLOT':
      return { ...state, selectedSlot: action.payload };
    case 'SET_CLIENT_DETAILS':
      return {
        ...state,
        clientDetails: { ...state.clientDetails, [action.payload.field]: action.payload.value },
      };
    case 'RESET':
      return initialBookingState;
    default:
      return state;
  }
}

const BookAppointment = () => {
  const [step, setStep] = useState(1);
  const [state, dispatch] = useReducer(bookingReducer, initialBookingState);

  const { data: services, isLoading, isError } = useServices(apiUrl);
  const { data: availabilityWindow, isLoading: availabilityIsLoading } =
    useGetAvailabilities(apiUrl);
  const { data: bookedSlots, isLoading: bookedSlotsIsLoading } = useGetBookedSlots(apiUrl);

  if (isLoading || availabilityIsLoading || bookedSlotsIsLoading) {
    return <p className="text-center py-16 text-slate-500">Loading...</p>;
  }

  const pad = (n: number) => n.toString().padStart(2, '0');

  const formatTime = (time: string) => {
    const [h, m] = time.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${pad(m)} ${ampm}`;
  };

  const splitWindow = (
    startTime: string,
    endTime: string,
    slotMinutes: number,
    bufferMinutes: number
  ): AvailableTime[] => {
    const result: AvailableTime[] = [];
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    let current = new Date();
    current.setHours(startH, startM, 0, 0);

    const end = new Date();
    end.setHours(endH, endM, 0, 0);

    while (current.getTime() + slotMinutes * 60000 <= end.getTime()) {
      const start = `${pad(current.getHours())}:${pad(current.getMinutes())}`;
      const endDate = new Date(current.getTime() + slotMinutes * 60000);
      const endTimeStr = `${pad(endDate.getHours())}:${pad(endDate.getMinutes())}`;

      result.push({ startTime: start, endTime: endTimeStr, duration: slotMinutes });
      current = new Date(endDate.getTime() + bufferMinutes * 60000);
    }

    return result;
  };

  const getAvailableSlots = (
    availabilityWindows: AvailabilityWindow[],
    bookedSlots: BookedSlot[]
  ): AvailableSlotByDate[] => {
    const slotsByDate: Record<string, AvailableTime[]> = {};

    availabilityWindows.forEach(window => {
      const splitTimes = splitWindow(
        window.startTime,
        window.endTime,
        window.slotMinutes,
        window.bufferMinutes
      );

      const freeTimes = splitTimes.filter(
        slot =>
          !bookedSlots.some(
            b =>
              b.date === window.date && b.startTime === slot.startTime && b.endTime === slot.endTime
          )
      );

      slotsByDate[window.date] = freeTimes;
    });

    return Object.entries(slotsByDate)
      .map(([date, times]) => ({ date, times }))
      .sort((a, b) => a.date.localeCompare(b.date));
  };

  const availableSlots = getAvailableSlots(availabilityWindow!, bookedSlots!);
  const selectedSlotDay = availableSlots.find(s => s.date === state.selectedDate);

  const formatDate = (dateStr: string) =>
    new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <div className="pt-24 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Step Indicator */}
          <div className="bg-slate-900 p-8 md:p-12 text-white">
            <h1 className="text-3xl font-serif font-bold mb-4">Book Your Transformation</h1>
            <p className="text-slate-400 text-sm">Secure your appointment in just a few clicks.</p>
            <div className="flex mt-8 space-x-4">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className="flex items-center">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                      step >= s
                        ? 'bg-rose-600 border-rose-600'
                        : 'bg-transparent border-slate-700 text-slate-600'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 4 && (
                    <div
                      className={`w-12 h-0.5 ml-4 ${step > s ? 'bg-rose-600' : 'bg-slate-700'}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="p-8 md:p-12">
            {/* Step 1: Select Service */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-xl font-bold mb-6">Select a Service</h3>
                <div className="space-y-4">
                  {services?.map(service => (
                    <div
                      key={service.id}
                      onClick={() => dispatch({ type: 'SET_SERVICE', payload: service.id })}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex justify-between items-center ${
                        state.selectedService === service.id
                          ? 'border-rose-600 bg-rose-50'
                          : 'border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div>
                        <p className="font-bold text-slate-900">{service.name}</p>
                        <p className="text-xs text-slate-500">
                          {service.duration} • €{service.price}
                        </p>
                      </div>
                      {state.selectedService === service.id && (
                        <CheckCircle className="text-rose-600 h-5 w-5" />
                      )}
                    </div>
                  ))}
                </div>
                <button
                  disabled={!state.selectedService}
                  onClick={() => setStep(2)}
                  className="mt-8 w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-rose-600 disabled:opacity-50 disabled:hover:bg-slate-900 transition-all"
                >
                  Continue to Schedule
                </button>
              </motion.div>
            )}

            {/* Step 2: Choose Date & Time */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-xl font-bold mb-6">Choose Date & Time</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {availableSlots.map(slot => (
                    <button
                      key={slot.date}
                      onClick={() => dispatch({ type: 'SET_DATE', payload: slot.date })}
                      className={`py-3 px-2 rounded-lg border-2 text-xs font-bold transition-all ${
                        state.selectedDate === slot.date
                          ? 'border-rose-600 bg-rose-50 text-rose-600'
                          : 'border-slate-100 hover:border-slate-200 text-slate-600'
                      }`}
                    >
                      {formatDate(slot.date)}
                    </button>
                  ))}
                </div>

                {state.selectedDate && selectedSlotDay && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedSlotDay.times.map(slot => (
                      <div
                        key={`${slot.startTime}-${slot.endTime}`}
                        onClick={() =>
                          dispatch({
                            type: 'SET_SLOT',
                            payload: {
                              date: state.selectedDate,
                              startTime: slot.startTime,
                              endTime: slot.endTime,
                            },
                          })
                        }
                        className={`p-4 rounded-lg border cursor-pointer flex flex-col gap-1 ${
                          state.selectedSlot?.startTime === slot.startTime
                            ? 'border-rose-600 bg-rose-50'
                            : 'border-slate-200'
                        }`}
                      >
                        <span className="font-bold">
                          {formatTime(slot.startTime)} – {formatTime(slot.endTime)}
                        </span>
                        <span className="text-xs text-slate-400">{slot.duration} min</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 border-2 border-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                  >
                    Back
                  </button>
                  <button
                    disabled={!state.selectedSlot}
                    onClick={() => setStep(3)}
                    className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-rose-600 disabled:opacity-50 disabled:hover:bg-slate-900 transition-all"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Client Details */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-xl font-bold mb-6">Your Details</h3>
                <div className="space-y-4 mb-8">
                  {(['name', 'email', 'phone'] as ClientField[]).map(field => (
                    <div key={field}>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        {field === 'name'
                          ? 'Full Name *'
                          : field === 'email'
                            ? 'Email Address *'
                            : 'Phone Number *'}
                      </label>
                      <input
                        type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                        value={state.clientDetails[field]}
                        onChange={e =>
                          dispatch({
                            type: 'SET_CLIENT_DETAILS',
                            payload: { field, value: e.target.value },
                          })
                        }
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
                        placeholder={
                          field === 'name'
                            ? 'John Doe'
                            : field === 'email'
                              ? 'john@example.com'
                              : '(555) 123-4567'
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 border-2 border-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                  >
                    Back
                  </button>
                  <button
                    disabled={
                      !state.clientDetails.name ||
                      !state.clientDetails.email ||
                      !state.clientDetails.phone
                    }
                    onClick={() => setStep(4)}
                    className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-rose-600 disabled:opacity-50 disabled:hover:bg-slate-900 transition-all"
                  >
                    Review Booking
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-100 text-rose-600 mb-6">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Confirm Appointment</h3>
                  <p className="text-slate-600 mb-8">
                    Please review your booking details before finishing.
                  </p>

                  <div className="bg-slate-50 p-6 rounded-2xl text-left space-y-4 mb-8">
                    {[
                      { label: 'Name', value: state.clientDetails.name },
                      { label: 'Email', value: state.clientDetails.email },
                      { label: 'Phone', value: state.clientDetails.phone },
                      {
                        label: 'Service',
                        value: services?.find(s => s.id === state.selectedService)?.name,
                      },
                      { label: 'Date', value: formatDate(state.selectedDate) },
                      {
                        label: 'Time',
                        value: `${formatTime(state.selectedSlot!.startTime)} – ${formatTime(state.selectedSlot!.endTime)}`,
                      },
                    ].map(item => (
                      <div
                        key={item.label}
                        className="flex justify-between border-b border-slate-200 pb-3"
                      >
                        <span className="text-slate-500">{item.label}</span>
                        <span className="font-bold text-slate-900">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 py-4 border-2 border-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        alert('Booking Successful! You will receive a confirmation email shortly.');
                        dispatch({ type: 'RESET' });
                        setStep(1);
                      }}
                      className="flex-1 py-4 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20"
                    >
                      Complete Booking
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;

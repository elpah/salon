import { SERVICES } from '@salon/data';
import { useServices } from '@salon/hooks';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

const BookAppointment = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [clientDetails, setClientDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const { data: services, isLoading, isError } = useServices(apiUrl);

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

  const availableSlots = [
    {
      date: '2024-01-19',
      times: ['10:00 AM - 11:00 AM', '1:00 PM - 2:00 PM', '2:30 PM - 3:30 PM', '4:00 PM - 5:00 PM'],
    },
    {
      date: '2024-01-20',
      times: [
        '9:00 AM - 10:00 AM',
        '11:30 AM - 12:30 PM',
        '2:00 PM - 3:00 PM',
        '5:00 PM - 6:00 PM',
      ],
    },
    {
      date: '2024-01-21',
      times: ['10:00 AM - 11:00 AM', '1:30 PM - 2:30 PM', '3:00 PM - 4:00 PM'],
    },
    {
      date: '2024-01-22',
      times: ['9:30 AM - 10:30 AM', '12:00 PM - 1:00 PM', '3:30 PM - 4:30 PM', '5:30 PM - 6:30 PM'],
    },
    {
      date: '2024-01-23',
      times: ['10:00 AM - 11:00 AM', '2:00 PM - 3:00 PM', '4:00 PM - 5:00 PM'],
    },
  ]; // I will fetch this data from a backend; add booked key with value yes/no to distinguish between available and unavalable slots.
  const selectedSlot = availableSlots.find(slot => slot.date === selectedDate);
  const availableTimes = selectedSlot ? selectedSlot.times : [];
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  // @return
  return (
    <div className="pt-24 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-slate-900 p-8 md:p-12 text-white">
            <h1 className="text-3xl font-serif font-bold mb-4">Book Your Transformation</h1>
            <p className="text-slate-400 text-sm">Secure your appointment in just a few clicks.</p>

            <div className="flex mt-8 space-x-4">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className="flex items-center">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${step >= s ? 'bg-rose-600 border-rose-600' : 'bg-transparent border-slate-700 text-slate-600'}`}
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

          <div className="p-8 md:p-12">
            {step === 1 && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
              >
                <h3 className="text-xl font-bold mb-6">Select a Service</h3>
                <div className="space-y-4">
                  {services?.map(service => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex justify-between items-center ${selectedService === service.id ? 'border-rose-600 bg-rose-50' : 'border-slate-100 hover:border-slate-200'}`}
                    >
                      <div>
                        <p className="font-bold text-slate-900">{service.name}</p>
                        <p className="text-xs text-slate-500">
                          {service.duration} • €{service.price}
                        </p>
                      </div>
                      {selectedService === service.id && (
                        <CheckCircle className="text-rose-600 h-5 w-5" />
                      )}
                    </div>
                  ))}
                </div>
                <button
                  disabled={!selectedService}
                  onClick={() => setStep(2)}
                  className="mt-8 w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-rose-600 disabled:opacity-50 disabled:hover:bg-slate-900 transition-all"
                >
                  Continue to Schedule
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
              >
                <h3 className="text-xl font-bold mb-6">Choose Date & Time</h3>
                <div className="mb-8">
                  <p className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">
                    Select a Date
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {availableSlots.map(slot => (
                      <button
                        key={slot.date}
                        onClick={() => {
                          setSelectedDate(slot.date);
                          setSelectedTime('');
                        }}
                        className={`py-3 px-2 rounded-lg border-2 text-xs font-bold transition-all ${selectedDate === slot.date ? 'border-rose-600 bg-rose-50 text-rose-600' : 'border-slate-100 hover:border-slate-200 text-slate-600'}`}
                      >
                        {formatDate(slot.date)}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <div className="mb-8">
                    <p className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">
                      Available Time Slots
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {availableTimes.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 px-4 rounded-lg border-2 text-sm font-bold transition-all ${selectedTime === time ? 'border-rose-600 bg-rose-50 text-rose-600' : 'border-slate-100 hover:border-slate-200 text-slate-600'}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 border-2 border-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                  >
                    Back
                  </button>
                  <button
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => setStep(3)}
                    className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-rose-600 disabled:opacity-50 disabled:hover:bg-slate-900 transition-all"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
              >
                <h3 className="text-xl font-bold mb-6">Your Details</h3>
                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={clientDetails.name}
                      onChange={e =>
                        setClientDetails({
                          ...clientDetails,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={clientDetails.email}
                      onChange={e =>
                        setClientDetails({
                          ...clientDetails,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={clientDetails.phone}
                      onChange={e =>
                        setClientDetails({
                          ...clientDetails,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 border-2 border-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                  >
                    Back
                  </button>
                  <button
                    disabled={!clientDetails.name || !clientDetails.email || !clientDetails.phone}
                    onClick={() => setStep(4)}
                    className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-rose-600 disabled:opacity-50 disabled:hover:bg-slate-900 transition-all"
                  >
                    Review Booking
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
              >
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-100 text-rose-600 mb-6">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Confirm Appointment</h3>
                  <p className="text-slate-600 mb-8">
                    Please review your booking details before finishing.
                  </p>

                  <div className="bg-slate-50 p-6 rounded-2xl text-left space-y-4 mb-8">
                    <div className="flex justify-between border-b border-slate-200 pb-3">
                      <span className="text-slate-500">Name</span>
                      <span className="font-bold text-slate-900">{clientDetails.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-3">
                      <span className="text-slate-500">Email</span>
                      <span className="font-bold text-slate-900">{clientDetails.email}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-3">
                      <span className="text-slate-500">Phone</span>
                      <span className="font-bold text-slate-900">{clientDetails.phone}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-3">
                      <span className="text-slate-500">Service</span>
                      <span className="font-bold text-slate-900">
                        {SERVICES.find(s => s.id === selectedService)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-3">
                      <span className="text-slate-500">Date</span>
                      <span className="font-bold text-slate-900">{formatDate(selectedDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Time</span>
                      <span className="font-bold text-slate-900">{selectedTime}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 py-4 border-2 border-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={() =>
                        // Here i will handle completed booking. send to a backend, edit slot field to booked. maybe add to user profile(Optional)
                        alert('Booking Successful! You will receive a confirmation email shortly.')
                      }
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

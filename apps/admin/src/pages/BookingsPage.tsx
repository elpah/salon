import Loading from '../components/Loading';
import { useGetBookings } from '../hooks/useGetBookings';
import type { BookingType } from '@salon/types';

const apiUrl = import.meta.env.VITE_API_URL;

const BookingsPage = () => {
  const { data: bookings, isLoading, isError } = useGetBookings(apiUrl);

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case 'confirmed':
  //       return 'bg-green-100 text-green-700';
  //     case 'pending':
  //       return 'bg-yellow-100 text-yellow-700';
  //     case 'completed':
  //       return 'bg-blue-100 text-blue-700';
  //     case 'cancelled':
  //       return 'bg-red-100 text-red-700';
  //     default:
  //       return 'bg-slate-100 text-slate-700';
  //   }
  // };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500">Failed to load products. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="sticky left-0 z-20 bg-slate-50 px-6 py-4 shadow-[inset_-1px_0_0_0_rgb(226,232,240)] text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Client
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Service
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Date & Time
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {bookings?.map((booking: BookingType) => (
            <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
              <td
                className=" sticky left-0 z-10 shadow-[inset_-1px_0_0_0_rgb(226,232,240)]
                 bg-white px-6 py-4"
              >
                <div>
                  <p className="font-medium text-slate-900">{booking.clientDetails.name}</p>
                  <p className="text-sm text-slate-500">{booking.clientDetails.email}</p>
                  <p className="text-xs text-slate-400">{booking.clientDetails.phone}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="text-slate-900">{booking.selectedService}</p>
              </td>
              <td className="px-6 py-4">
                <p className="text-slate-900">{booking.selectedDate}</p>
                <p className="text-sm text-slate-500">
                  {booking.selectedSlot?.startTime} - {booking.selectedSlot?.endTime}
                </p>
              </td>
              {/* <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}
                >
                  {booking.status}
                </span>
              </td> */}
              {/* <td className="px-6 py-4">
                <button className="text-rose-600 hover:text-rose-700 text-sm font-medium">
                  View Details
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsPage;

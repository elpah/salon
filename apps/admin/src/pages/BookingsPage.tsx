interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah@example.com',
    clientPhone: '(555) 123-4567',
    service: 'Silk Press',
    date: '2024-01-19',
    time: '10:00 AM',
    status: 'confirmed',
  },
  {
    id: '2',
    clientName: 'Michael Brown',
    clientEmail: 'michael@example.com',
    clientPhone: '(555) 987-6543',
    service: 'Box Braids',
    date: '2024-01-20',
    time: '2:00 PM',
    status: 'pending',
  },
];

const BookingsPage = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

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
          {MOCK_BOOKINGS.map(booking => (
            <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
              <td
                className=" sticky left-0 z-10 shadow-[inset_-1px_0_0_0_rgb(226,232,240)]
                 bg-white px-6 py-4"
              >
                <div>
                  <p className="font-medium text-slate-900">{booking.clientName}</p>
                  <p className="text-sm text-slate-500">{booking.clientEmail}</p>
                  <p className="text-xs text-slate-400">{booking.clientPhone}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="text-slate-900">{booking.service}</p>
              </td>
              <td className="px-6 py-4">
                <p className="text-slate-900">{booking.date}</p>
                <p className="text-sm text-slate-500">{booking.time}</p>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}
                >
                  {booking.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <button className="text-rose-600 hover:text-rose-700 text-sm font-medium">
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsPage;

// brand IG - to showcase what i do -

// Reveal to me what i dont know. Show me what i have to know
// ELPA IT School
//

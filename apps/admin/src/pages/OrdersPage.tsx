import { motion } from 'framer-motion';
import { useState } from 'react';

interface Order {
  id: string;
  orderNumber: string;
  clientName: string;
  items: string[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}
const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-001',
    clientName: 'Emma Davis',
    items: ['HD Lace Frontal Wig', 'Edge Control Gel'],
    total: 462,
    status: 'processing',
    date: '2024-01-15',
  },
  {
    id: '2',
    orderNumber: 'ORD-002',
    clientName: 'James Wilson',
    items: ['Professional Ceramic Flat Iron'],
    total: 129,
    status: 'shipped',
    date: '2024-01-14',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'processing':
      return 'bg-blue-100 text-blue-700';
    case 'shipped':
      return 'bg-purple-100 text-purple-700';
    case 'delivered':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

const OrdersPage = () => {
  const [orders] = useState<Order[]>(MOCK_ORDERS);

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-4"
    >
      {orders.map(order => (
        <div
          key={order.id}
          className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-lg font-bold text-slate-900">{order.orderNumber}</p>
              <p className="text-sm text-slate-500">{order.clientName}</p>
              <p className="text-xs text-slate-400">{order.date}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
            >
              {order.status}
            </span>
          </div>
          <div className="mb-4">
            <p className="text-sm font-semibold text-slate-700 mb-2">Items:</p>
            <ul className="space-y-1">
              {order.items.map((item, idx) => (
                <li key={idx} className="text-sm text-slate-600">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <p className="text-lg font-bold text-slate-900">Total: €{order.total}</p>
            <button className="text-rose-600 hover:text-rose-700 text-sm font-medium">
              View Details
            </button>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default OrdersPage;

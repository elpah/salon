import  { useState } from 'react';
import { Calendar, LogOut, Clock, Package, Briefcase, Plus, X, Trash2, Edit2, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
type AdminPage = 'bookings' | 'availability' | 'orders' | 'products' | 'services';
interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}
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
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  stock: number;
}
interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  category: string;
}
interface Order {
  id: string;
  orderNumber: string;
  clientName: string;
  items: string[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}

// --- Mock Data ---


// --- Availability Page ---
const AvailabilityPage = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSlot, setNewSlot] = useState({
    date: '',
    startTime: '',
    endTime: ''
  });
  const handleAddSlot = () => {
    if (newSlot.date && newSlot.startTime && newSlot.endTime) {
      const slot: TimeSlot = {
        id: Date.now().toString(),
        date: newSlot.date,
        startTime: newSlot.startTime,
        endTime: newSlot.endTime,
        isBooked: false
      };
      setTimeSlots([...timeSlots, slot]);
      setNewSlot({
        date: '',
        startTime: '',
        endTime: ''
      });
      setShowAddModal(false);
    }
  };
  const handleDeleteSlot = (id: string) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== id));
  };
  return <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Availability</h2>
          <p className="text-slate-600">Manage your appointment time slots</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-all">
          <Plus className="h-5 w-5 mr-2" />
          Add Time Slot
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {timeSlots.map(slot => <motion.div key={slot.id} initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-lg font-bold text-slate-900">{slot.date}</p>
                <p className="text-sm text-slate-500">{slot.startTime} - {slot.endTime}</p>
              </div>
              <button onClick={() => handleDeleteSlot(slot.id)} className="text-red-600 hover:text-red-700 p-2">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${slot.isBooked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {slot.isBooked ? 'Booked' : 'Available'}
              </span>
            </div>
          </motion.div>)}
      </div>

      {timeSlots.length === 0 && <div className="text-center py-16 bg-slate-50 rounded-xl">
          <Clock className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">No time slots added yet</p>
          <p className="text-slate-400 text-sm mt-1">Click "Add Time Slot" to get started</p>
        </div>}

      {/* Add Slot Modal */}
      <AnimatePresence>
        {showAddModal && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
            <motion.div initial={{
          scale: 0.9,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.9,
          opacity: 0
        }} onClick={e => e.stopPropagation()} className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Add Time Slot</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Date
                  </label>
                  <input type="date" value={newSlot.date} onChange={e => setNewSlot({
                ...newSlot,
                date: e.target.value
              })} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Start Time
                  </label>
                  <input type="time" value={newSlot.startTime} onChange={e => setNewSlot({
                ...newSlot,
                startTime: e.target.value
              })} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    End Time
                  </label>
                  <input type="time" value={newSlot.endTime} onChange={e => setNewSlot({
                ...newSlot,
                endTime: e.target.value
              })} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none" />
                </div>
              </div>

              <button onClick={handleAddSlot} className="w-full mt-6 px-6 py-3 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition-all">
                Add Slot
              </button>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};

// --- Orders Page ---
const OrdersPage = () => {
  const [orders] = useState<Order[]>(MOCK_ORDERS);
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
  return <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Orders</h2>
        <p className="text-slate-600">Manage product orders</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {orders.map(order => <div key={order.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-lg font-bold text-slate-900">{order.orderNumber}</p>
                <p className="text-sm text-slate-500">{order.clientName}</p>
                <p className="text-xs text-slate-400">{order.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold text-slate-700 mb-2">Items:</p>
              <ul className="space-y-1">
                {order.items.map((item, idx) => <li key={idx} className="text-sm text-slate-600">• {item}</li>)}
              </ul>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <p className="text-lg font-bold text-slate-900">Total: ${order.total}</p>
              <button className="text-rose-600 hover:text-rose-700 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>)}
      </div>
    </div>;
};

// --- Products Page ---
const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    category: '',
    description: '',
    stock: 0
  });
  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price > 0) {
      const product: Product = {
        id: Date.now().toString(),
        ...newProduct
      };
      setProducts([...products, product]);
      setNewProduct({
        name: '',
        price: 0,
        category: '',
        description: '',
        stock: 0
      });
      setShowAddModal(false);
    }
  };
  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };
  return <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Products</h2>
          <p className="text-slate-600">Manage your product inventory</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-all">
          <Plus className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => <div key={product.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
                <p className="text-sm text-slate-500">{product.category}</p>
              </div>
              <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-700 p-2">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-slate-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <p className="text-xl font-bold text-rose-600">${product.price}</p>
              <p className="text-sm text-slate-500">Stock: {product.stock}</p>
            </div>
          </div>)}
      </div>

      {products.length === 0 && <div className="text-center py-16 bg-slate-50 rounded-xl">
          <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">No products added yet</p>
          <p className="text-slate-400 text-sm mt-1">Click "Add Product" to get started</p>
        </div>}

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddModal && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
            <motion.div initial={{
          scale: 0.9,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.9,
          opacity: 0
        }} onClick={e => e.stopPropagation()} className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Add Product</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Product Name
                  </label>
                  <input type="text" value={newProduct.name} onChange={e => setNewProduct({
                ...newProduct,
                name: e.target.value
              })} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none" placeholder="Enter product name" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category
                  </label>
                  <input type="text" value={newProduct.category} onChange={e => setNewProduct({
                ...newProduct,
                category: e.target.value
              })} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none" placeholder="e.g., Wigs, Equipment, Care" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Price ($)
                  </label>
                  <input type="number" value={newProduct.price} onChange={e => setNewProduct({
                ...newProduct,
                price: parseFloat(e.target.value)
              })} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none" placeholder="0.00" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Stock Quantity
                  </label>
                  <input type="number" value={newProduct.stock} onChange={e => setNewProduct({
                ...newProduct,
                stock: parseInt(e.target.value)
              })} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none" placeholder="0" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea value={newProduct.description} onChange={e => setNewProduct({
                ...newProduct,
                description: e.target.value
              })} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none resize-none" rows={3} placeholder="Product description" />
                </div>
              </div>

              <button onClick={handleAddProduct} className="w-full mt-6 px-6 py-3 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition-all">
                Add Product
              </button>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};

// --- Services Page ---
const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    price: 0,
    duration: '',
    description: '',
    category: ''
  });
  const handleAddService = () => {
    if (newService.name && newService.price > 0) {
      const service: Service = {
        id: Date.now().toString(),
        ...newService
      };
      setServices([...services, service]);
      setNewService({
        name: '',
        price: 0,
        duration: '',
        description: '',
        category: ''
      });
      setShowAddModal(false);
    }
  };
  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };
  return <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Services</h2>
          <p className="text-slate-600">Manage your salon services</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-all">
          <Plus className="h-5 w-5 mr-2" />
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map(service => <div key={service.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900">{service.name}</h3>
                <p className="text-sm text-slate-500">{service.category}</p>
              </div>
              <button onClick={() => handleDeleteService(service.id)} className="text-red-600 hover:text-red-700 p-2">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-slate-600 mb-4">{service.description}</p>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <p className="text-xl font-bold text-rose-600">${service.price}</p>
              <p className="text-sm text-slate-500">{service.duration}</p>
            </div>
          </div>)}
      </div>

      {services.length === 0 && <div className="text-center py-16 bg-slate-50 rounded-xl">
          <Briefcase className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">No services added yet</p>
          <p className="text-slate-400 text-sm mt-1">Click "Add Service" to get started</p>
        </div>}

      {/* Add Service Modal */}
      <AnimatePresence>
        {showAddModal && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
            <motion.div initial={{
          scale: 0.9,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.9,
          opacity: 0
        }} onClick={e => e.stopPropagation()} className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Add Service</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Service Name
                  </label>
                  <input type="text" value={newService.name} onChange={e => setNewService({
                ...newService,
                name: e.target.value
              })} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none" placeholder="Enter service name" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category
                  </label>
                  <input type="text" value={newService.category} onChange={e => setNewService({
                ...newService,
                category: e.target.value
              })} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none" placeholder="e.g., Styling, Color, Treatment" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Price ($)
                  </label>
                  <input type="number" value={newService.price} onChange={e => setNewService({
                ...newService,
                price: parseFloat(e.target.value)
              })} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none" placeholder="0.00" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Duration
                  </label>
                  <input type="text" value={newService.duration} onChange={e => setNewService({
                ...newService,
                duration: e.target.value
              })} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none" placeholder="e.g., 60 min, 2 hrs" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea value={newService.description} onChange={e => setNewService({
                ...newService,
                description: e.target.value
              })} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none resize-none" rows={3} placeholder="Service description" />
                </div>
              </div>

              <button onClick={handleAddService} className="w-full mt-6 px-6 py-3 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition-all">
                Add Service
              </button>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};

// --- Main Admin Dashboard Component ---
export const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState<AdminPage>('bookings');
  const handleLogout = () => {
    alert('Logging out...');
  };
  const renderPage = () => {
    switch (currentPage) {
      case 'bookings':
        return <BookingsPage />;
      case 'availability':
        return <AvailabilityPage />;
      case 'orders':
        return <OrdersPage />;
      case 'products':
        return <ProductsPage />;
      case 'services':
        return <ServicesPage />;
      default:
        return <BookingsPage />;
    }
  };
  return <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentPage={currentPage} setPage={setCurrentPage} onLogout={handleLogout} />
      <main className="flex-1 p-8">
        <AnimatePresence mode="wait">
          <motion.div key={currentPage} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} transition={{
          duration: 0.3
        }}>
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>;
};
import { Calendar, Clock ,Package,Briefcase} from 'lucide-react';
import React from 'react'

  const menuItems = [{
    id: 'bookings' as AdminPage,
    icon: Calendar,
    label: 'Bookings'
  }, {
    id: 'availability' as AdminPage,
    icon: Clock,
    label: 'Availability'
  }, {
    id: 'orders' as AdminPage,
    icon: Package,
    label: 'Orders'
  }, {
    id: 'products' as AdminPage,
    icon: Package,
    label: 'Products'
  }, {
    id: 'services' as AdminPage,
    icon: Briefcase,
    label: 'Services'
  }] as any[];
  
const Sidebar =  ({
  currentPage,
  setPage,
  onLogout
}: {
  currentPage: AdminPage;
  setPage: (p: AdminPage) => void;
  onLogout: () => void;
}) => {
  return <div className="w-64 bg-slate-900 min-h-screen text-white flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-serif font-bold">Admin Panel</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your salon</p>
      </div>

      <nav className="flex-1 py-6">
        {menuItems.map(item => {
        const Icon = item.icon;
        return <button key={item.id} onClick={() => setPage(item.id)} className={`w-full flex items-center px-6 py-3 transition-colors ${currentPage === item.id ? 'bg-rose-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
              <Icon className="h-5 w-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </button>;
      })}
      </nav>

      <button onClick={onLogout} className="flex items-center px-6 py-4 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors border-t border-slate-800">
        <LogOut className="h-5 w-5 mr-3" />
        <span className="font-medium">Logout</span>
      </button>
    </div>
}

export default Sidebar


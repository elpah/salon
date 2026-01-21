import { Scissors, Instagram, Facebook, Twitter, MapPin, Phone, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NAV_LINKS } from './Navbar'; // Make sure Navbar exports NAV_LINKS
import React from 'react';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand & Social */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Scissors className="h-6 w-6 text-rose-500" />
              <span className="ml-2 text-xl font-serif font-bold text-white tracking-tight">
                Professional Hair Stylist
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Redefining beauty through precision, care, and the latest in hair technology. Visit our
              flagship salon for a transformation.
            </p>
            <div className="flex space-x-4">
              <Instagram className="h-5 w-5 hover:text-rose-500 cursor-pointer" />
              <Facebook className="h-5 w-5 hover:text-rose-500 cursor-pointer" />
              <Twitter className="h-5 w-5 hover:text-rose-500 cursor-pointer" />
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3 text-sm">
              {NAV_LINKS.map(link => (
                <li
                  key={link.name}
                  className="hover:text-rose-500 cursor-pointer capitalize"
                  onClick={() => navigate(link.path)}
                >
                  {link.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-rose-500" /> 123 Glamour St, New York
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-rose-500" /> (555) 123-4567
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-rose-500" /> Tue - Sat: 9am - 7pm
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Get beauty tips and exclusive offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-slate-800 border-none rounded-l-md px-4 py-2 text-sm w-full focus:ring-1 focus:ring-rose-500"
              />
              <button className="bg-rose-600 text-white px-4 py-2 rounded-r-md hover:bg-rose-700 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-xs">
          © {new Date().getFullYear()} Professional Hair Stylist. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

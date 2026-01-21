import { SERVICES } from "@salon/data";
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Star, CheckCircle, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=2000"
            alt="Salon Interior"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1 bg-rose-600/20 backdrop-blur-md border border-rose-500/30 rounded-full text-rose-400 text-sm font-semibold mb-6">
              New Season Styles Now Available
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
              Unveil Your Natural <span className="text-rose-500 italic">Radiance</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed max-w-xl">
              From precision cuts to high-end wigs, we specialize in hair artistry that elevates
              your personal style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('book-appointment')}
                className="cursor-pointer px-8 py-4 bg-rose-600 text-white rounded-full font-bold text-lg hover:bg-rose-700 transition-all flex items-center justify-center group"
              >
                Book Appointment
                <Calendar className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/shop')}
                className=" cursor-pointer px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center"
              >
                Shop Collection
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
                Our Signature Services
              </h2>
              <p className="text-slate-600">
                Explore our menu of professional salon services designed to make you look and feel
                your absolute best.
              </p>
            </div>
            <button
              onClick={() => navigate('/services')}
              className="mt-6 md:mt-0 flex items-center text-rose-600 font-bold hover:text-rose-700 transition-colors"
            >
              View Full Menu <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.slice(0, 3).map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: idx * 0.1,
                }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-4/5 mb-6">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                    <p className="font-bold text-xl">{service.name}</p>
                    <p className="text-sm">Starting at ${service.price}</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.name}</h3>
                <p className="text-slate-600 text-sm line-clamp-2">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Boutique Promo */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
              <img
                src="https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&q=80&w=800"
                alt="Wig Collection"
                className="relative z-10 rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl z-20 hidden md:block">
                <div className="flex items-center space-x-2 text-rose-500 mb-2">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="fill-current w-4 h-4" />
                  ))}
                </div>
                <p className="text-slate-900 font-bold italic">
                  "Best wig quality I've ever owned!"
                </p>
                <p className="text-slate-500 text-xs mt-1">- Sarah Jenkins</p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">
                Premium Wigs & Professional Hair Care Tools
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Experience salon-quality results at home. Our boutique features a handpicked
                collection of high-definition lace wigs and professional tools trusted by stylists
                worldwide.
              </p>
              <ul className="space-y-4">
                {[
                  '100% Virgin Human Hair Wigs',
                  'Professional Grade Flat Irons & Dryers',
                  'Premium Styling Products',
                  'Expert-led Maintenance Guides',
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-slate-700">
                    <CheckCircle className="h-5 w-5 text-rose-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/shop')}
                className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all inline-flex items-center"
              >
                Explore Boutique <ShoppingBag className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;

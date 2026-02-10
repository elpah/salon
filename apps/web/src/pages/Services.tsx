import { Clock } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCategories, useServices } from '@salon/hooks';
import Loading from '@/components/Loading';

const apiUrl = import.meta.env.VITE_API_URL;

const Services = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('all');

  const { data: services, isLoading, isError } = useServices(apiUrl);
  const {
    data: categories,
    isLoading: categoriesIsLoading,
    isError: categoriesIsError,
  } = useGetCategories(apiUrl);

  if (isLoading || categoriesIsLoading) {
    return <Loading />;
  }
  if (isError || categoriesIsError) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500">Failed to load products. Please try again.</p>
      </div>
    );
  }
  const filteredServices =
    filter === 'all'
      ? services
      : services?.filter(s => s.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Service Menu
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Each service includes a thorough consultation to ensure we achieve your hair goals.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', ...(categories?.serviceCategories ?? [])].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`cursor-pointer px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredServices?.map(service => (
            <div
              key={service.id}
              className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-xl transition-all group"
            >
              <div className="w-full sm:w-40 h-40 shrink-0 overflow-hidden rounded-xl">
                <img
                  src={service.image as string}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{service.name}</h3>
                  <span className="text-rose-600 font-bold">€{service.price}</span>
                </div>
                <div className="flex items-center text-slate-500 text-sm mb-4">
                  <Clock className="h-4 w-4 mr-1" /> {service.duration}
                </div>
                <p className="text-slate-600 text-sm mb-6 grow">{service.description}</p>
                <button
                  onClick={() => navigate('/book-appointment')}
                  className="cursor-pointer w-full sm:w-auto px-4 py-2 border border-rose-600 text-rose-600 rounded-lg text-sm font-bold hover:bg-rose-600 hover:text-white transition-all"
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;

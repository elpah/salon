import { Clock, Facebook, Instagram, MapPin, Phone, Twitter } from 'lucide-react';
import React, { useState } from 'react';

import { SiTiktok } from 'react-icons/si';
// --- Form Fields Data ---

const FORM_FIELDS = [
  { label: 'Full Name *', name: 'name', type: 'text', placeholder: 'John Doe', required: true },
  {
    label: 'Email Address *',
    name: 'email',
    type: 'email',
    placeholder: 'john@example.com',
    required: true,
  },
  { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '(555) 123-4567' },
];

const SERVICE_OPTIONS = [
  { label: 'Hair Styling', value: 'styling' },
  { label: 'Color Services', value: 'color' },
  { label: 'Hair Treatment', value: 'treatment' },
  { label: 'Extensions', value: 'extensions' },
  { label: 'Wig Purchase', value: 'shop' },
  { label: 'General Consultation', value: 'consultation' },
];

// --- Info Cards Data ---
const INFO_CARDS = [
  {
    icon: MapPin,
    title: 'Location',
    content: (
      <>
        123 Rotterdam Street
        <br />
        Rotterdam, 1506 DD
        <br />
        Netherlands
      </>
    ),
  },
  {
    icon: Phone,
    title: 'Phone',
    content: (
      <>
        <p className="text-slate-300 text-sm">(555) 123-4567</p>
        <p className="text-slate-400 text-xs mt-1">Call or text for quick responses</p>
      </>
    ),
  },
  {
    icon: Clock,
    title: 'Hours',
    content: (
      <div className="text-slate-300 text-sm space-y-1">
        <p>Tuesday - Friday: 9:00 AM - 7:00 PM</p>
        <p>Saturday: 9:00 AM - 6:00 PM</p>
        <p className="text-slate-400">Sunday & Monday: Closed</p>
      </div>
    ),
  },
];

// --- ContactForm Component ---
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '', service: '' });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-8 md:p-10 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Map Form Fields */}
        {FORM_FIELDS.map(field => (
          <div key={field.name}>
            <label className="block text-sm font-semibold text-slate-700 mb-2">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all outline-none"
            />
          </div>
        ))}

        {/* Service Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Interested In</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all outline-none bg-white"
          >
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Message *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Tell us about what you're looking for..."
            required
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

// --- InfoCard Component ---
const InfoCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-start space-x-4">
    <div className="p-3 bg-rose-600 rounded-lg shrink-0">
      <Icon className="h-6 w-6" />
    </div>
    <div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      {children}
    </div>
  </div>
);

// --- SocialButtons Component ---

// Define social links
const SOCIAL_LINKS = [
  { icon: Instagram, url: 'https://www.instagram.com/yourusername', name: 'Instagram' },
  { icon: Facebook, url: 'https://www.facebook.com/yourusername', name: 'Facebook' },
  { icon: Twitter, url: 'https://www.twitter.com/yourusername', name: 'Twitter' },
  { icon: SiTiktok, url: 'https://www.tiktok.com/@yourusername', name: 'TikTok' },
];

const SocialButtons = () => (
  <div className="mt-10 pt-8 border-t border-slate-700">
    <h3 className="font-bold text-lg mb-4">Follow Us</h3>
    <div className="flex space-x-4">
      {SOCIAL_LINKS.map(({ icon: Icon, url, name }, idx) => (
        <a
          key={idx}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="cursor-pointer p-3 bg-slate-800 hover:bg-rose-600 rounded-lg transition-all flex items-center justify-center"
        >
          <Icon className="h-5 w-5 text-white" />
        </a>
      ))}
    </div>
  </div>
);

// --- MapPlaceholder Component ---
const MapPlaceholder = () => (
  <div className="bg-slate-100 rounded-2xl overflow-hidden h-64 relative">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-3" />
        <p className="text-slate-500 font-medium">Map View</p>
        <p className="text-slate-400 text-sm"> 123 Rotterdam Street</p>
      </div>
    </div>
  </div>
);

// --- Main Contact Component ---
const Contact = () => (
  <div className="pt-24 pb-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
          Get In Touch
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Have questions or ready to book? We'd love to hear from you. Reach out and let's start
          your transformation journey.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <ContactForm />

        <div className="space-y-8">
          <div className="bg-slate-900 rounded-2xl p-8 md:p-10 text-white space-y-6">
            {INFO_CARDS.map((card, idx) => (
              <InfoCard key={idx} icon={card.icon} title={card.title}>
                {card.content}
              </InfoCard>
            ))}

            <SocialButtons />
          </div>

          <MapPlaceholder />
        </div>
      </div>
    </div>
  </div>
);

export default Contact;

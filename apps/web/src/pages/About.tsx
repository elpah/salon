import React from 'react';

const About = () => {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
              Our Story
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Founded in 2015, Professional Hair Stylist was born from a desire to blend traditional
              styling techniques with the modern needs of diverse clients. We believe that hair is
              the ultimate form of self-expression.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Our team consists of internationally trained stylists who specialize in everything
              from textured hair care to avant-garde color. Every chair at Professional Hair Stylist
              is a space of creativity, respect, and luxury.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-4xl font-serif font-bold text-rose-600">8+</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                  Years of Excellence
                </p>
              </div>
              <div>
                <p className="text-4xl font-serif font-bold text-rose-600">12k</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                  Happy Clients
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1595475244925-24e5c8e312e5?auto=format&fit=crop&q=80&w=400"
              className="rounded-2xl h-80 w-full object-cover"
              alt="Salon"
            />
            <img
              src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400"
              className="rounded-2xl h-80 w-full object-cover translate-y-8"
              alt="Stylist at work"
            />
          </div>
        </div>

        <section className="bg-slate-900 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Meet the Stylists</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            {[
              {
                name: 'Daniel Osuji',
                role: 'Master Stylist',
                img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
              },
              {
                name: 'Gift Osuji',
                role: 'Color Director',
                img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
              },
              {
                name: 'Daniel SideChick Osuji',
                role: 'Wig Specialist',
                img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
              },
            ].map(member => (
              <div key={member.name} className="flex flex-col items-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-rose-500"
                />
                <h4 className="font-bold text-xl">{member.name}</h4>
                <p className="text-rose-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

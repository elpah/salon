import { motion } from 'framer-motion';

type ServicesCardProps = {
  id: string;
  idx: number;
  image: string;
  name: string;
  price: number;
  description: string;
};
const ServicesCard = ({ id, idx, image, name, price, description }: ServicesCardProps) => {
  return (
    <motion.div
      key={id}
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
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
          <p className="font-bold text-xl">{name}</p>
          <p className="text-sm">Starting at €{price}</p>
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{name}</h3>
      <p className="text-slate-600 text-sm line-clamp-2">{description}</p>
    </motion.div>
  );
};

export default ServicesCard;

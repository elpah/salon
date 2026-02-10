import { motion } from 'framer-motion';
import { SearchX, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="max-w-2xl w-full text-center"
      >
        <motion.div
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            delay: 0.2,
            type: 'spring',
            stiffness: 200,
          }}
          className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-rose-100 text-rose-600 mb-8"
        >
          <SearchX className="h-16 w-16" />
        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.3,
          }}
          className="text-8xl md:text-9xl font-serif font-bold text-slate-900 mb-6"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }}
          className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
          }}
          className="text-lg text-slate-600 mb-12 leading-relaxed max-w-md mx-auto"
        >
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.6,
          }}
        >
          <button
            onClick={() => navigate('/')}
            className="cursor-pointer px-8 py-4 bg-rose-600 text-white rounded-full font-bold text-lg hover:bg-rose-700 transition-all inline-flex items-center shadow-lg shadow-rose-600/20 group"
          >
            <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Return to Home
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default NotFound;

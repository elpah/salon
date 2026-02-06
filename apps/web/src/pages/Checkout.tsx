import { GlobalContext } from '@/context/GlobalContext';
import { motion } from 'framer-motion';
import { CheckCircle, Home } from 'lucide-react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);
  const [step, setStep] = useState<'info' | 'payment' | 'confirmed'>('info');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });
  if (step === 'confirmed') {
    return (
      <div className="pt-24 pb-24 bg-slate-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="bg-white rounded-3xl p-12 text-center shadow-xl"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 mb-6">
              <CheckCircle className="h-12 w-12" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-slate-900 mb-4">Order Confirmed!</h1>
            <p className="text-lg text-slate-600 mb-2">Thank you for your purchase!</p>
            <p className="text-slate-500 mb-8">You will receive a confirmation email shortly.</p>
            <div className="bg-slate-50 rounded-xl p-6 mb-8">
              <p className="text-sm text-slate-500 mb-2">Order Total</p>
              {/* <p className="text-3xl font-bold text-slate-900">${totalWithTax.toFixed(2)}</p> */}
            </div>
            <button
              onClick={() => navigate('home')}
              className="px-8 py-4 bg-rose-600 text-white rounded-full font-bold hover:bg-rose-700 transition-all inline-flex items-center"
            >
              <Home className="mr-2 h-5 w-5" />
              Return to Home
            </button>
          </motion.div>
        </div>
      </div>
    );
  }
  return (
    <div className="pt-24 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-8">
            {step === 'info' && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Shipping Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            phone: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          address: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
                      placeholder="123 Main St"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            city: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            zipCode: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setStep('payment')}
                  disabled={
                    !formData.name ||
                    !formData.email ||
                    !formData.phone ||
                    !formData.address ||
                    !formData.city ||
                    !formData.zipCode
                  }
                  className="w-full mt-8 py-4 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 disabled:opacity-50 disabled:hover:bg-rose-600 transition-all"
                >
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          cardNumber: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        value={formData.cardExpiry}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            cardExpiry: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        CVC *
                      </label>
                      <input
                        type="text"
                        value={formData.cardCVC}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            cardCVC: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep('info')}
                    className="flex-1 py-4 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                  >
                    Back
                  </button>
                  {/* <button onClick={handleCompleteOrder} disabled={!formData.cardNumber || !formData.cardExpiry || !formData.cardCVC} className="flex-1 py-4 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 disabled:opacity-50 disabled:hover:bg-rose-600 transition-all">
                  Complete Purchase
                </button> */}
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {/* {globalContext.cart.map(item => <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-slate-600">{item.name} x {item.quantity}</span>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>)} */}
              </div>
              <div className="border-t border-slate-200 pt-4 space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  {/* <span>${total.toFixed(2)}</span> */}
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax</span>
                  {/* <span>${(total * 0.08).toFixed(2)}</span> */}
                </div>
                <div className="flex justify-between text-xl font-bold text-slate-900 pt-2">
                  <span>Total</span>
                  {/* <span>${totalWithTax.toFixed(2)}</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;

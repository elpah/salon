import { useContext } from 'react';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '@/context/GlobalContext';

const Cart = () => {
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);

  const onUpdateQuantity = (productId: string, delta: number) => {
    globalContext.setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max((item.quantity ?? 0) + delta, 1) }
          : item
      )
    );
  };

  const onRemoveItem = (productId: string) => {
    globalContext.setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  return (
    <div className="pt-24 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-8">Shopping Cart</h1>

        {globalContext.cart.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <ShoppingCart className="h-20 w-20 text-slate-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
            <p className="text-slate-600 mb-8">Add some products to get started!</p>
            <button
              onClick={() => navigate('/shop')}
              className="px-8 py-4 bg-rose-600 text-white rounded-full font-bold hover:bg-rose-700 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {globalContext.cart.map(item => (
                <div key={item.id} className="bg-white rounded-2xl p-6 flex gap-6">
                  <img
                    src={item.image as string}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="grow">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-slate-500 mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => onUpdateQuantity(item.id as string, -1)}
                          className="p-1 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                          disabled={(item.quantity ?? 0) <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-bold text-slate-900 w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id as string, 1)}
                          className="p-1 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-xl font-bold text-slate-900">
                          ${(item.price * (item.quantity ?? 0)).toFixed(2)}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.id as string)}
                          className="text-red-600 hover:text-red-700 p-2"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>€{globalContext.cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tax</span>
                    <span>€{(globalContext.cartTotal * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-slate-900">
                      <span>Total</span>
                      <span>€{(globalContext.cartTotal * 1.08).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button
                    onClick={() => navigate('/checkout')}
                  className="cursor-pointer w-full py-4 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-all mb-4"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => navigate('/shop')}
                  className="w-full py-4 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

import { User } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

export type LoginInfo = {
  username?: string;
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (!globalContext.authLoading && globalContext.authUser) {
      navigate('/dashboard');
    }
  }, [globalContext.authUser, globalContext.authLoading, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        loginInfo.email,
        loginInfo.password
      );
      await userCredentials.user.getIdToken();
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage('Invalid email of password');
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-600 rounded-2xl mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-slate-400">Sign in to manage your salon</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={loginInfo.email}
                onChange={e =>
                  setLoginInfo(prev => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all outline-none"
                placeholder="admin@salon.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={loginInfo.password}
                onChange={e =>
                  setLoginInfo(prev => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20"
            >
              Sign In
            </button>
            {errorMessage && <p className="text-rose-600 -mt-4">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

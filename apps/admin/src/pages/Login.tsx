import { User } from "lucide-react";
import React, { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // onLogin(email, password);
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-600 rounded-2xl mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            Admin Portal
          </h1>
          <p className="text-slate-400">Sign in to manage your salon</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all outline-none"
                placeholder="admin@salon.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

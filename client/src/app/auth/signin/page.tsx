"use client"

import { useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import FrameboardLogo from '@/app/components/FrameboardLogo';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      router.push('/portal');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8 hover:scale-105 transition-all duration-300">
          <FrameboardLogo className="w-10 h-10" />
          <span className="text-3xl font-anton tracking-wide">FRAMEBOARD</span>
        </Link>

        {/* Sign In Card */}
        <div
          className="bg-white border-4 border-black p-8"
          style={{ boxShadow: "8px 8px 0px rgba(0,0,0,1)" }}
        >
          <h1 className="text-3xl font-black mb-2">SIGN IN</h1>
          <p className="text-gray-600 mb-8">Welcome back to Frameboard</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 text-red-700 text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-black text-white border-3 border-black font-black text-lg hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}
            >
              {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
              {!isLoading && <ArrowRight className="w-5 h-5" strokeWidth={3} />}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 pt-6 border-t-2 border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="font-bold text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-black transition">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

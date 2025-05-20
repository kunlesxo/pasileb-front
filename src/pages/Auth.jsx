import { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isLogin && password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // Handle form submission
    alert(`Form submitted: ${isLogin ? 'Login' : 'Signup'}`);
  };

  const handleGoogleAuth = () => {
    // Handle Google authentication
    alert('Google authentication initiated');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="w-full max-w-md px-4 sm:px-0">
        {/* Logo and company name */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold mb-3">P</div>
          <h1 className="text-3xl font-bold text-white">Pasileb</h1>
        </div>

        {/* Rounded Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full bg-slate-800 p-1">
            <button 
              onClick={() => setIsLogin(true)} 
              className={`py-2 px-6 font-medium transition-all duration-300 rounded-full ${isLogin ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)} 
              className={`py-2 px-6 font-medium transition-all duration-300 rounded-full ${!isLogin ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form container with animation */}
        <div className="overflow-hidden">
            <div 
              className="transition-all duration-500 ease-in-out"
              style={{ 
                transform: isLogin ? 'translateX(0)' : 'translateX(-100%)',
                opacity: isLogin ? 1 : 0,
                position: isLogin ? 'relative' : 'absolute',
                width: '100%',
                display: isLogin ? 'block' : 'none'
              }}
            >
              {/* Login Form */}
              <div>
                <div className="mb-4">
                  <label className="block text-white text-sm font-medium mb-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-lg py-2 pl-10 pr-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-white text-sm font-medium mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-lg py-2 pl-10 pr-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="mt-1 text-right">
                    <a href="#" className="text-sm text-blue-400 hover:text-blue-300">Forgot password?</a>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center transition-colors shadow-lg"
                >
                  Login
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600/60"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-slate-900/30 backdrop-blur-sm text-gray-300">Or continue with</span>
                  </div>
                </div>

                <button
                  onClick={handleGoogleAuth}
                  className="mt-4 w-full bg-slate-800/70 hover:bg-slate-700 text-white py-2 rounded-lg flex items-center justify-center transition-colors backdrop-blur-sm"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M21.35,11.1H12.18V13.83H18.69C18.36,15.64 17.61,16.8 16.38,17.57C15.38,18.22 14.08,18.58 12.18,18.58C9.07,18.58 6.38,16.43 5.44,13.53C5.16,12.75 5,11.89 5,11C5,10.11 5.16,9.25 5.44,8.47C6.38,5.57 9.07,3.42 12.18,3.42C14.08,3.42 15.29,4.1 16.2,4.91L18.2,2.84C16.62,1.4 14.62,0.5 12.18,0.5C7.31,0.5 3.21,3.8 1.83,8.16C1.26,9.63 1,11 1,11C1,11 1.26,12.37 1.83,13.84C3.21,18.2 7.31,21.5 12.18,21.5C14.52,21.5 16.62,20.69 18.24,19.39C20.02,17.96 21,15.83 21,13.23C21,12.4 20.85,11.7 20.65,11.1H21.35Z"
                    />
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </div>

            <div 
              className="transition-all duration-500 ease-in-out"
              style={{ 
                transform: !isLogin ? 'translateX(0)' : 'translateX(100%)',
                opacity: !isLogin ? 1 : 0,
                position: !isLogin ? 'relative' : 'absolute',
                width: '100%',
                display: !isLogin ? 'block' : 'none'
              }}
            >
              {/* Sign Up Form */}
              <div>
                <div className="mb-4">
                  <label className="block text-white text-sm font-medium mb-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)} 
                      className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-lg py-2 pl-10 pr-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-medium mb-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-lg py-2 pl-10 pr-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-medium mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-lg py-2 pl-10 pr-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Create a password"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-medium mb-1">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-lg py-2 pl-10 pr-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center transition-colors shadow-lg"
                >
                  Sign Up
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600/60"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-slate-900/30 backdrop-blur-sm text-gray-300">Or sign up with</span>
                  </div>
                </div>

                <button
                  onClick={handleGoogleAuth}
                  className="mt-4 w-full bg-slate-800/70 hover:bg-slate-700 text-white py-2 rounded-lg flex items-center justify-center transition-colors backdrop-blur-sm"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M21.35,11.1H12.18V13.83H18.69C18.36,15.64 17.61,16.8 16.38,17.57C15.38,18.22 14.08,18.58 12.18,18.58C9.07,18.58 6.38,16.43 5.44,13.53C5.16,12.75 5,11.89 5,11C5,10.11 5.16,9.25 5.44,8.47C6.38,5.57 9.07,3.42 12.18,3.42C14.08,3.42 15.29,4.1 16.2,4.91L18.2,2.84C16.62,1.4 14.62,0.5 12.18,0.5C7.31,0.5 3.21,3.8 1.83,8.16C1.26,9.63 1,11 1,11C1,11 1.26,12.37 1.83,13.84C3.21,18.2 7.31,21.5 12.18,21.5C14.52,21.5 16.62,20.69 18.24,19.39C20.02,17.96 21,15.83 21,13.23C21,12.4 20.85,11.7 20.65,11.1H21.35Z"
                    />
                  </svg>
                  Sign up with Google
                </button>

                <div className="mt-6 text-center text-sm text-gray-400">
                  By signing up, you agree to our
                  <a href="#" className="text-blue-400 hover:text-blue-300 mx-1">Terms</a>
                  and
                  <a href="#" className="text-blue-400 hover:text-blue-300 mx-1">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    );
}
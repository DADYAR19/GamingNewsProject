import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Gamepad2, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate account creation and auto-login
    setTimeout(() => {
      setIsLoading(false);
      if (name && email && password) {
        // Save user to AuthContext (and localStorage for persistence)
        login({ name, email });
        toast.success(`Welcome, ${name}! Your account has been created.`);
        navigate('/');
      } else {
        toast.error('Please fill in all fields.');
      }
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div
        className="max-w-md w-full space-y-8 bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800"
      >
        <div>
          <div className="flex justify-center">
            <Gamepad2 className="w-12 h-12 text-primary" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900 dark:text-white">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary-hover transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-neutral-300 dark:border-neutral-700 placeholder-neutral-500 dark:placeholder-neutral-400 text-neutral-900 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-neutral-300 dark:border-neutral-700 placeholder-neutral-500 dark:placeholder-neutral-400 text-neutral-900 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-neutral-300 dark:border-neutral-700 placeholder-neutral-500 dark:placeholder-neutral-400 text-neutral-900 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>

          <div>
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
              {!isLoading && (
                <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                  <ArrowRight className="h-5 w-5 text-primary-hover group-hover:text-white transition-colors transform group-hover:translate-x-1" />
                </span>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

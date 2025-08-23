'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import AuthBackground from '@/components/ui/AuthBackground';
import { Github } from 'lucide-react';
import Link from 'next/link';

export default function SignUp() {
  const { signUp, signInWithGitHub } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      await signUp(formData.email, formData.password, formData.name);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    setGithubLoading(true);
    setError('');

    try {
      await signInWithGitHub();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with GitHub');
      setGithubLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors relative">
      {/* Auth Background Animation */}
      <AuthBackground />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="relative p-2">
            <img 
              src="/icon.png" 
              alt="Gitify" 
              className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl shadow-lg" 
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 pointer-events-none"></div>
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 opacity-20 blur-sm"></div>
          </div>
        </div>
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-bold text-secondary-700 dark:text-primary-300 transition-colors">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-secondary-600 dark:text-secondary-300 transition-colors">
          Already have an account?{' '}
          <Link href="/auth/signin" className="font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <Card>
          <CardHeader>
            <Button
              onClick={handleGitHubSignIn}
              loading={githubLoading}
              variant="outline"
              className="w-full flex items-center justify-center space-x-2"
            >
              <Github className="h-5 w-5" />
              <span>Continue with GitHub</span>
            </Button>
            
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 transition-colors">Or continue with email</span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-md text-sm transition-colors">
                  {error}
                </div>
              )}

              <Input
                label="Full name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
              />

              <Input
                label="Email address"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
              />

              <Input
                label="Password"
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Create a password"
                helperText="Must be at least 8 characters long"
              />

              <Input
                label="Confirm password"
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirm your password"
              />

              <Button
                type="submit"
                loading={loading}
                className="w-full"
              >
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

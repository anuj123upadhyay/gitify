'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Github, Bell, Zap, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src="/icon.png" 
                    alt="Gitify" 
                    className="h-12 w-12 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200" 
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary-400/20 to-secondary-400/20 pointer-events-none"></div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent tracking-tight">Gitify</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-secondary-700 mb-6">
            Never Miss a{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">GitHub Issue</span>{' '}
            Again
          </h1>
          <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto">
            Get instant notifications when new issues are created in repositories you care about. 
            Be the first to contribute and claim the best opportunities.
          </p>
          <div className="space-x-4">
            <Link href="/auth/signup">
              <Button size="lg" className="px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline" size="lg" className="px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6">
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Bell className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-700 mb-2">
              Fast Notifications
            </h3>
            <p className="text-secondary-600">
              Get notified instantly when new issues are created in your tracked repositories.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-secondary-600" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-700 mb-2">
              Smart Filtering
            </h3>
            <p className="text-secondary-600">
              Filter by labels like "good first issue" or "help wanted" to find opportunities that match your skills.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-gradient-to-br from-primary-100 via-secondary-100 to-primary-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-700 mb-2">
              GitHub Integration
            </h3>
            <p className="text-secondary-600">
              Seamlessly connect with GitHub using OAuth. Your data is secure and private.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

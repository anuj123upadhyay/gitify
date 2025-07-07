'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { LoadingMessage } from '@/components/ui/Loader';
import { Github, Bell, Zap, Shield, Moon, Sun } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoadingMessage size="xl" fullPage />;
  }

  if (user) {
    return null; // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-black dark:via-black dark:to-black transition-colors">
      {/* Navigation */}
      <nav className="bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="relative">
                  <img 
                    src="/icon.png" 
                    alt="Gitify" 
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200" 
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary-400/20 to-secondary-400/20 pointer-events-none"></div>
                </div>
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent tracking-tight">Gitify</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="p-2">
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm" className="text-sm">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="text-sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-secondary-700 dark:text-primary-300 mb-4 sm:mb-6 transition-colors">
            Never Miss a{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">GitHub Issue</span>{' '}
            Again
          </h1>
          <p className="text-lg sm:text-xl text-secondary-600 dark:text-secondary-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 transition-colors">
            Get instant notifications when new issues are created in repositories you care about. 
            Be the first to contribute and claim the best opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto px-6 sm:px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 sm:px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-16 sm:mt-20">
          <div className="text-center p-4 sm:p-6">
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-colors">
              <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-700 dark:text-primary-300 mb-2 transition-colors">
              Fast Notifications
            </h3>
            <p className="text-secondary-600 dark:text-secondary-300 text-sm sm:text-base transition-colors">
              Get notified instantly when new issues are created in your tracked repositories.
            </p>
          </div>

          <div className="text-center p-4 sm:p-6">
            <div className="bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-900/30 dark:to-secondary-800/30 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-colors">
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-secondary-600 dark:text-secondary-400" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-700 dark:text-primary-300 mb-2 transition-colors">
              Smart Filtering
            </h3>
            <p className="text-secondary-600 dark:text-secondary-300 text-sm sm:text-base transition-colors">
              Filter by labels like "good first issue" or "help wanted" to find opportunities that match your skills.
            </p>
          </div>

          <div className="text-center p-4 sm:p-6">
            <div className="bg-gradient-to-br from-primary-100 via-secondary-100 to-primary-200 dark:from-primary-900/30 dark:via-secondary-900/30 dark:to-primary-800/30 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-colors">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-700 dark:text-primary-300 mb-2 transition-colors">
              GitHub Integration
            </h3>
            <p className="text-secondary-600 dark:text-secondary-300 text-sm sm:text-base transition-colors">
              Seamlessly connect with GitHub using OAuth. Your data is secure and private.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

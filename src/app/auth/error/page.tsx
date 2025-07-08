'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { LoadingMessage } from '@/components/ui/Loader';
import ErrorBackground from '@/components/ui/ErrorBackground';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message') || 'Authentication failed';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors relative z-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center space-x-3">
            <img src="/icon.png" alt="Gitify" className="h-12 w-12 rounded-lg shadow-lg shadow-primary-500/20 dark:shadow-primary-500/10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Gitify
            </span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-primary-300 transition-colors">
            Authentication Error
          </h2>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 transition-colors">
                  Sign In Failed
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 transition-colors">
                  {message}
                </p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors">
                This could happen for several reasons:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc list-inside space-y-1 transition-colors">
                <li>You cancelled the authentication process</li>
                <li>There was a network connection issue</li>
                <li>The authentication provider is temporarily unavailable</li>
              </ul>
              
              <div className="flex space-x-3 pt-4">
                <Link href="/auth/signin" className="flex-1">
                  <Button className="w-full">
                    Try Again
                  </Button>
                </Link>
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Go Home
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <img src="/icon.png" alt="Gitify" className="h-12 w-12 rounded-lg shadow-lg shadow-primary-500/20 dark:shadow-primary-500/10" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Gitify
          </span>
        </div>
        <div className="flex justify-center">
          <LoadingMessage size="lg" />
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-primary-300 transition-colors mt-4">
          Loading...
        </h2>
      </div>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="relative">
        <ErrorBackground />
        <AuthErrorContent />
      </div>
    </Suspense>
  );
}

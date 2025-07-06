'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { AlertCircle, Github } from 'lucide-react';
import Link from 'next/link';

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message') || 'Authentication failed';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Github className="h-12 w-12 text-gray-400" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Authentication Error
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Sign In Failed
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {message}
                </p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                This could happen for several reasons:
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Github className="h-12 w-12 text-gray-400" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Loading...
        </h2>
      </div>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthErrorContent />
    </Suspense>
  );
}

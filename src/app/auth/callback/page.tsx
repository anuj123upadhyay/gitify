'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { account, databases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('🔄 Processing OAuth callback...');
        
        // Get the authenticated user
        const user = await account.get();
        console.log('✅ OAuth user authenticated:', user);
        
        // Check if user document already exists in database
        try {
          await databases.getDocument(DATABASE_ID, COLLECTIONS.USERS, user.$id);
          console.log('ℹ️ User document already exists');
        } catch (error: any) {
          if (error.code === 404) {
            // User document doesn't exist, create it
            console.log('📝 Creating user document in database...');
            
            const userDoc = await databases.createDocument(
              DATABASE_ID,
              COLLECTIONS.USERS,
              user.$id,
              {
                email: user.email,
                name: user.name,
                auth_provider: 'github',
                github_username: user.prefs?.username || null,
                notification_frequency: 'immediate'
              }
            );
            console.log('✅ User document created:', userDoc);
          } else {
            console.error('❌ Error checking user document:', error);
          }
        }
        
        // Redirect to dashboard
        router.push('/dashboard');
        
      } catch (error) {
        console.error('❌ OAuth callback error:', error);
        router.push('/auth/error?message=' + encodeURIComponent('OAuth authentication failed'));
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Completing sign in...
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please wait while we set up your account
          </p>
        </div>
      </div>
    </div>
  );
}

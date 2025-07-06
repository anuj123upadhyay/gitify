'use client';

import useSWR from 'swr';
import { databases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { UserDocument } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export function useUserProfile() {
  const { user } = useAuth();

  const { data: userProfile, error, mutate } = useSWR(
    user ? ['userProfile', user.$id] : null,
    async () => {
      if (!user) return null;
      
      try {
        const response = await databases.getDocument(
          DATABASE_ID,
          COLLECTIONS.USERS,
          user.$id
        );
        
        return response as unknown as UserDocument;
      } catch (error: any) {
        if (error.code === 404) {
          // User document doesn't exist, create it
          const newUserDoc = await databases.createDocument(
            DATABASE_ID,
            COLLECTIONS.USERS,
            user.$id,
            {
              email: user.email,
              name: user.name,
              auth_provider: user.prefs?.provider || 'email',
              github_username: user.prefs?.username || null,
              notification_frequency: 'immediate'
            }
          );
          return newUserDoc as unknown as UserDocument;
        }
        throw error;
      }
    }
  );

  const updateUserProfile = async (updates: Partial<UserDocument>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        user.$id,
        updates
      );

      mutate();
      return response as unknown as UserDocument;
    } catch (error) {
      throw error;
    }
  };

  return {
    userProfile,
    loading: !error && !userProfile && !!user,
    error,
    updateUserProfile,
    refresh: mutate,
  };
}

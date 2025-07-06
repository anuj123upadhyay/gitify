'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { account, databases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { User } from '@/types';
import { ID } from 'appwrite';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await account.get();
      console.log('✅ User authenticated:', currentUser);
      
      // Ensure user document exists in database
      try {
        await databases.getDocument(DATABASE_ID, COLLECTIONS.USERS, currentUser.$id);
        console.log('✅ User document exists in database');
      } catch (dbError: any) {
        if (dbError.code === 404) {
          // User document doesn't exist, create it
          console.log('📝 Creating missing user document...');
          try {
            await databases.createDocument(
              DATABASE_ID,
              COLLECTIONS.USERS,
              currentUser.$id,
              {
                email: currentUser.email,
                name: currentUser.name,
                auth_provider: currentUser.prefs?.provider || 'email',
                github_username: currentUser.prefs?.username || null,
                notification_frequency: 'immediate'
              }
            );
            console.log('✅ User document created successfully');
          } catch (createError) {
            console.error('❌ Failed to create user document:', createError);
          }
        }
      }
      
      setUser(currentUser as User);
    } catch (error) {
      console.log('ℹ️ User not authenticated');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await account.createEmailSession(email, password);
      await checkAuth();
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // Create account in Appwrite Auth
      const newUser = await account.create(ID.unique(), email, password, name);
      console.log('✅ Auth account created:', newUser);
      
      // Sign in the user
      await signIn(email, password);
      
      // Get the authenticated user details
      const currentUser = await account.get();
      
      // Create user entry in the database collection
      try {
        const userDoc = await databases.createDocument(
          DATABASE_ID,
          COLLECTIONS.USERS,
          currentUser.$id, // Use the same ID as auth account
          {
            email: currentUser.email,
            name: currentUser.name,
            auth_provider: 'email',
            github_username: null,
            notification_frequency: 'immediate'
          }
        );
        console.log('✅ User document created in database:', userDoc);
      } catch (dbError: any) {
        console.log('ℹ️ User document may already exist:', dbError.message);
        // If document already exists, that's fine - continue
      }
      
    } catch (error) {
      console.error('❌ Sign up error:', error);
      throw error;
    }
  };

  const signInWithGitHub = async () => {
    try {
      await account.createOAuth2Session('github', 
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/error`
      );
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGitHub,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

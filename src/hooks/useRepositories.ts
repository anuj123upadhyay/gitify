'use client';

import useSWR from 'swr';
import { databases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { Repository } from '@/types';
import { validateGitHubUrl } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Query } from 'appwrite';

export function useRepositories() {
  const { user } = useAuth();

  const { data: repositories, error, mutate } = useSWR(
    user ? ['repositories', user.$id] : null,
    async () => {
      if (!user) return [];
      
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.REPOSITORIES,
        [Query.equal('user_id', user.$id)]
      );
      
      return response.documents as unknown as Repository[];
    }
  );

  const addRepository = async (repoUrl: string, labels: string[] = []) => {
    if (!user) throw new Error('User not authenticated');

    const validation = validateGitHubUrl(repoUrl);
    if (!validation.isValid || !validation.owner || !validation.repo) {
      throw new Error('Invalid GitHub URL');
    }

    const repoData = {
      user_id: user.$id,
      repo_url: repoUrl,
      repo_name: validation.repo,
      repo_owner: validation.owner,
      labels: labels.join(','), // Convert array to comma-separated string
      notifications_enabled: true,
      last_checked_at: new Date().toISOString(),
    };

    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.REPOSITORIES,
        'unique()',
        repoData
      );

      mutate();
      return response as unknown as Repository;
    } catch (error) {
      throw error;
    }
  };

  const updateRepository = async (repoId: string, updates: Partial<Repository>) => {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.REPOSITORIES,
        repoId,
        updates
      );

      mutate();
      return response as unknown as Repository;
    } catch (error) {
      throw error;
    }
  };

  const deleteRepository = async (repoId: string) => {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTIONS.REPOSITORIES,
        repoId
      );

      mutate();
    } catch (error) {
      throw error;
    }
  };

  return {
    repositories: repositories || [],
    loading: !error && !repositories,
    error,
    addRepository,
    updateRepository,
    deleteRepository,
    refresh: mutate,
  };
}

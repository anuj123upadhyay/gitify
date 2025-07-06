'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRepositories } from '@/hooks/useRepositories';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ExternalLink, Trash2, Eye, EyeOff, Plus } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function Dashboard() {
  const { user } = useAuth();
  const { repositories, loading, deleteRepository, updateRepository } = useRepositories();

  const handleToggleRepo = async (repoId: string, notifications_enabled: boolean) => {
    try {
      await updateRepository(repoId, { notifications_enabled: !notifications_enabled });
    } catch (error) {
      console.error('Failed to toggle repository:', error);
    }
  };

  const handleDeleteRepo = async (repoId: string) => {
    if (confirm('Are you sure you want to remove this repository?')) {
      try {
        await deleteRepository(repoId);
      } catch (error) {
        console.error('Failed to delete repository:', error);
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your repositories...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600">
              You're tracking {repositories.length} repositories
              <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                📡 10-min polling
              </span>
            </p>
          </div>
          <Link href="/dashboard/add-repo">
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Repository</span>
            </Button>
          </Link>
        </div>

        {/* Repositories Grid */}
        {repositories.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No repositories yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start by adding a GitHub repository to track new issues.
                </p>
                <Link href="/dashboard/add-repo">
                  <Button>Add Your First Repository</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {repositories.map((repo: any) => (
              <Card key={repo.$id} className={!repo.notifications_enabled ? 'opacity-60' : ''}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {repo.repo_owner}/{repo.repo_name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Added {formatDate(repo.$createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleRepo(repo.$id, repo.notifications_enabled)}
                        title={repo.notifications_enabled ? 'Pause notifications' : 'Resume notifications'}
                      >
                        {repo.notifications_enabled ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRepo(repo.$id)}
                        title="Remove repository"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {/* Labels */}
                    {repo.labels && repo.labels.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">
                          Watching labels:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {repo.labels.split(',').filter((label: string) => label.trim()).map((label: string, index: number) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                            >
                              {label.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Last checked */}
                    {repo.last_checked_at && (
                      <p className="text-xs text-gray-500">
                        Last checked: {formatDate(repo.last_checked_at)}
                      </p>
                    )}

                    {/* External link */}
                    <a
                      href={repo.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
                    >
                      View on GitHub
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

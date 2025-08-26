'use client'  ;
import { useAuth } from '@/contexts/AuthContext';
import { useRepositories } from '@/hooks/useRepositories';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingMessage } from '@/components/ui/Loader';

import { ExternalLink, Trash2, Eye, EyeOff, Plus, AlertTriangle } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import DashboardBackground from '@/components/ui/DashboardBackground';
import { useState } from 'react';

export default function Dashboard() {
  const { user } = useAuth();
  const { repositories, loading, deleteRepository, updateRepository } = useRepositories();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [repoToDelete, setRepoToDelete] = useState<any>(null);
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [repoToToggle, setRepoToToggle] = useState<any>(null);

  const handleToggleRepo = async (repo: any) => {
    // If enabling notifications, do it directly
    if (!repo.notifications_enabled) {
      try {
        await updateRepository(repo.$id, { notifications_enabled: true });
        console.log('✅ Repository notifications enabled - issues will be tracked');
      } catch (error) {
        console.error('Failed to toggle repository:', error);
      }
    } else {
      // If disabling notifications, show confirmation modal
      setRepoToToggle(repo);
      setShowToggleModal(true);
    }
  };

  const confirmToggleRepo = async () => {
    if (!repoToToggle) return;

    try {
      await updateRepository(repoToToggle.$id, { notifications_enabled: false });
      
      // Close modal and reset state
      setShowToggleModal(false);
      setRepoToToggle(null);
      
      console.log('⏸️ Repository notifications disabled - issues will NOT be tracked');
    } catch (error) {
      console.error('Failed to toggle repository:', error);
    }
  };

  const cancelToggleRepo = () => {
    setShowToggleModal(false);
    setRepoToToggle(null);
  };

  const handleDeleteRepo = async (repo: any) => {
    // Set the repository to delete and show modal
    setRepoToDelete(repo);
    setShowDeleteModal(true);
  };

  const confirmDeleteRepo = async () => {
    if (!repoToDelete) return;

    try {
      // First disable notifications to ensure no tracking
      await updateRepository(repoToDelete.$id, { notifications_enabled: false });
      
      // Then delete the repository
      await deleteRepository(repoToDelete.$id);
      
      // Close modal and reset state
      setShowDeleteModal(false);
      setRepoToDelete(null);
      
      console.log(`✅ Repository ${repoToDelete.repo_owner}/${repoToDelete.repo_name} deleted and notifications disabled`);
    } catch (error) {
      console.error('Failed to delete repository:', error);
    }
  };

  const cancelDeleteRepo = () => {
    setShowDeleteModal(false);
    setRepoToDelete(null);
  };

  if (loading) {
    return (
      <Layout>
        <LoadingMessage message="Loading your repositories..." size="lg" fullPage />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative">
        <DashboardBackground />
        <div className="space-y-3 xs:space-y-4 sm:space-y-6 relative z-10">
          {/* Header - Mobile Optimized */}
          <div className="space-y-3 sm:space-y-0 sm:flex sm:justify-between sm:items-center">
            <div className="space-y-1">
              <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-secondary-700 dark:text-primary-300 leading-tight transition-colors">
                Welcome back{user?.name ? `, ${user.name.split(' ')[0]}!` : '!'}
              </h1>
              <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2">
                <p className="text-xs xs:text-sm text-secondary-600 dark:text-secondary-300 transition-colors">
                  Tracking {repositories.filter(repo => repo.notifications_enabled).length} of {repositories.length} {repositories.length === 1 ? 'repository' : 'repositories'}
                </p>
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-0.5 rounded-full w-fit transition-colors">
                  📡 
                </span>
              </div>
            </div>
            
            {/* Add Repository Button - Desktop Only */}
            <div className="hidden sm:block w-full sm:w-auto">
              <Link href="/dashboard/add-repo">
                <Button className="w-full sm:w-auto flex items-center justify-center space-x-2 text-sm">
                  <Plus className="h-4 w-4" />
                  <span>Add Repository</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Repositories Section */}
          {repositories.length === 0 ? (
            <Card className="border-0 sm:border shadow-sm">
              <CardContent className="text-center py-6 xs:py-8 sm:py-12 px-4">
                <div className="max-w-sm mx-auto space-y-3 xs:space-y-4">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto transition-colors">
                    <Plus className="h-5 w-5 xs:h-6 xs:w-6 sm:h-8 sm:w-8 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base xs:text-lg font-medium text-secondary-700 dark:text-primary-300 transition-colors">
                      No repositories yet
                    </h3>
                    <p className="text-xs xs:text-sm sm:text-base text-secondary-600 dark:text-secondary-300 leading-relaxed transition-colors">
                      Start by adding a GitHub repository to track new issues.
                    </p>
                  </div>
                  <Link href="/dashboard/add-repo">
                    <Button className="w-full xs:w-auto text-sm">
                      <span className="xs:hidden">Add First Repo</span>
                      <span className="hidden xs:inline">Add Your First Repository</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-3 xs:gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {repositories.map((repo: any) => (
                <Card key={repo.$id} className={`${!repo.notifications_enabled ? 'opacity-60' : ''} border-0 sm:border shadow-sm hover:shadow-md transition-shadow`}>
                  <CardHeader className="pb-2 xs:pb-3 p-3 xs:p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-secondary-700 dark:text-primary-300 truncate text-sm xs:text-base transition-colors">
                          <span className="hidden xs:inline">{repo.repo_owner}/{repo.repo_name}</span>
                          <span className="xs:hidden">{repo.repo_name}</span>
                        </h3>
                        <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-0.5 xs:mt-1 transition-colors">
                          Added {formatDate(repo.$createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-0.5 xs:space-x-1 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleRepo(repo)}
                          title={repo.notifications_enabled ? 'Pause issue tracking' : 'Resume issue tracking'}
                          className="p-1 xs:p-1.5 sm:p-2"
                        >
                          {repo.notifications_enabled ? (
                            <Eye className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4" />
                          ) : (
                            <EyeOff className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteRepo(repo)}
                          title="Remove repository"
                          className="p-1 xs:p-1.5 sm:p-2"
                        >
                          <Trash2 className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 p-3 xs:p-4 sm:p-6">
                    <div className="space-y-2 xs:space-y-3">
                      {/* Labels - Mobile Optimized */}
                      {repo.labels && repo.labels.length > 0 && (
                        <div className="space-y-1 xs:space-y-1.5">
                          <p className="text-xs font-medium text-secondary-500 dark:text-secondary-400 transition-colors">
                            Watching labels:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {repo.labels.split(',').filter((label: string) => label.trim()).slice(0, 3).map((label: string, index: number) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 transition-colors"
                              >
                                {label.trim()}
                              </span>
                            ))}
                            {repo.labels.split(',').filter((label: string) => label.trim()).length > 3 && (
                              <span className="text-xs text-secondary-500 dark:text-secondary-400 transition-colors">
                                +{repo.labels.split(',').filter((label: string) => label.trim()).length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Last checked - Mobile Optimized */}
                      {repo.last_checked_at && (
                        <p className="text-xs text-secondary-500 dark:text-secondary-400 transition-colors">
                          Last checked: {formatDate(repo.last_checked_at)}
                        </p>
                      )}

                      {/* External link - Mobile Optimized */}
                      <a
                        href={repo.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs xs:text-sm text-secondary-600 dark:text-secondary-300 hover:text-secondary-700 dark:hover:text-secondary-200 font-medium transition-colors"
                      >
                        <span className="hidden xs:inline">View on GitHub</span>
                        <span className="xs:hidden">View</span>
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Delete Repository Confirmation Modal */}
          {showDeleteModal && repoToDelete && (
            <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-800">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-primary-300">
                        Remove Repository
                      </h3>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      Are you sure you want to remove{' '}
                      <span className="font-medium text-gray-900 dark:text-primary-300">
                        {repoToDelete.repo_owner}/{repoToDelete.repo_name}
                      </span>
                      ?
                    </p>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-3">
                      <div className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div className="ml-2">
                          <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                            Warning: Issue tracking will be disabled
                          </p>
                          <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                            This repository will no longer be monitored for new issues. You can re-add it later if needed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      onClick={cancelDeleteRepo}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={confirmDeleteRepo}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                      Remove Repository
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Toggle Repository Confirmation Modal */}
          {showToggleModal && repoToToggle && (
            <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-800">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-primary-300">
                        Pause Issue Tracking
                      </h3>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      Are you sure you want to pause tracking for{' '}
                      <span className="font-medium text-gray-900 dark:text-primary-300">
                        {repoToToggle.repo_owner}/{repoToToggle.repo_name}
                      </span>
                      ?
                    </p>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-3">
                      <div className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div className="ml-2">
                          <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                            Warning: Issue tracking will be paused
                          </p>
                          <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                            This repository will stop being monitored for new issues until you resume tracking.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      onClick={cancelToggleRepo}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={confirmToggleRepo}
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
                    >
                      Pause Tracking
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

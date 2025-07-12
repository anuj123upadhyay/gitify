/**
 * GitHub Token Status Component
 * Shows the status of multiple GitHub tokens and scaling statistics
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Activity, Clock, GitBranch, Users, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

interface TokenStatus {
  name: string;
  remaining: number;
  resetTime: string;
  isActive: boolean;
  lastUsed: string;
}

interface ScalingStats {
  totalRepositorySubscriptions: number;
  uniqueRepositories: number;
  totalNotifications: number;
  executionTime: number;
  tokenStatus: TokenStatus[];
}

interface Props {
  className?: string;
}

export default function GitHubTokenStatus({ className }: Props) {
  const [stats, setStats] = useState<ScalingStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/github/token-status');
      if (!response.ok) {
        throw new Error('Failed to fetch token status');
      }
      
      const data = await response.json();
      setStats(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const getTokenStatusColor = (token: TokenStatus) => {
    if (!token.isActive) return 'bg-red-100 text-red-800';
    if (token.remaining <= 100) return 'bg-yellow-100 text-yellow-800';
    if (token.remaining <= 500) return 'bg-orange-100 text-orange-800';
    return 'bg-green-100 text-green-800';
  };

  const getTokenStatusIcon = (token: TokenStatus) => {
    if (!token.isActive) return <AlertCircle className="h-4 w-4" />;
    if (token.remaining <= 100) return <Clock className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString();
  };

  const getTotalAvailableRequests = () => {
    return stats?.tokenStatus.reduce((total, token) => total + (token.isActive ? token.remaining : 0), 0) || 0;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            GitHub API Scaling Status
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor your GitHub token usage and scaling performance
          </p>
        </div>
        <Button
          onClick={fetchStats}
          disabled={loading}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-red-800 font-medium">Error loading token status</span>
          </div>
          <p className="text-red-700 mt-1">{error}</p>
        </div>
      )}

      {/* Summary Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {getTotalAvailableRequests().toLocaleString()}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Tokens</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stats.tokenStatus.filter(t => t.isActive).length}/{stats.tokenStatus.length}
                  </p>
                </div>
                <GitBranch className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Repositories</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stats.uniqueRepositories}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last Run Time</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stats.executionTime}ms
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Token Status Details */}
      {stats && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              GitHub Token Status
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Real-time status of your GitHub Personal Access Tokens
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.tokenStatus.map((token, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getTokenStatusIcon(token)}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {token.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {token.lastUsed ? `Last used: ${formatTime(token.lastUsed)}` : 'Never used'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {token.remaining.toLocaleString()} requests
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Resets: {formatTime(token.resetTime)}
                      </p>
                    </div>
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTokenStatusColor(token)}`}>
                      {token.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Last Updated */}
      {lastUpdated && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Last updated: {lastUpdated.toLocaleString()}
        </div>
      )}
    </div>
  );
}

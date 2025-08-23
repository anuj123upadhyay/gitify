'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingMessage } from '@/components/ui/Loader';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import SettingsBackground from '@/components/ui/SettingsBackground';
import { FIELDS, NOTIFICATION_FREQUENCY } from '@/constants/appwrite';
import { handleError } from '@/lib/errors/errorHandler';

export default function Settings() {
  const { user, signOut } = useAuth();
  const { userProfile, loading, updateUserProfile } = useUserProfile();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  type NotificationFrequencyType = typeof NOTIFICATION_FREQUENCY[keyof typeof NOTIFICATION_FREQUENCY];
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    notification_frequency: NOTIFICATION_FREQUENCY.IMMEDIATE as NotificationFrequencyType,
  });

  // Update form data when userProfile loads
  useEffect(() => {
    if (userProfile && typeof userProfile !== 'string') {
      setFormData({
        name: user?.name || '',
        notification_frequency: (userProfile.notification_frequency as NotificationFrequencyType) || NOTIFICATION_FREQUENCY.IMMEDIATE,
      });
    }
  }, [userProfile, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await updateUserProfile({
        [FIELDS.NOTIFICATION_FREQUENCY]: formData.notification_frequency,
      });
      
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(handleError(error, 'Save settings'));
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    if (confirm('Are you sure you want to sign out?')) {
      try {
        await signOut();
      } catch (error) {
        console.error('Sign out error:', error);
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <LoadingMessage message="Loading settings..." size="lg" fullPage />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative">
        <SettingsBackground />
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          {/* Header */}
        <div className="space-y-4">
          <Link href="/dashboard" className="inline-block">
            <Button variant="ghost" size="sm" className="group hover:bg-secondary-50 dark:hover:bg-gray-800 transition-colors duration-200 px-3 py-2">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-0.5 transition-transform duration-200" />
              <span className="text-secondary-600 dark:text-secondary-300 group-hover:text-secondary-700 dark:group-hover:text-secondary-200 font-medium transition-colors">Back to Dashboard</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-secondary-700 dark:text-primary-300 transition-colors">Settings</h1>
            <p className="text-secondary-600 dark:text-secondary-300 transition-colors">Manage your account and preferences</p>
          </div>
        </div>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-secondary-700 dark:text-primary-300 transition-colors">Account Information</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">
                  Email
                </label>
                <p className="text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 p-2 rounded border dark:border-gray-600 transition-colors">
                  {user?.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">
                  Name
                </label>
                <p className="text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 p-2 rounded border dark:border-gray-600 transition-colors">
                  {user?.name}
                </p>
              </div>
            </div>
            
            {userProfile && typeof userProfile !== 'string' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">
                    Authentication Provider
                  </label>
                  <p className="text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 p-2 rounded border dark:border-gray-600 capitalize transition-colors">
                    {userProfile[FIELDS.AUTH_PROVIDER as keyof typeof userProfile]}
                  </p>
                </div>
                {userProfile[FIELDS.GITHUB_USERNAME as keyof typeof userProfile] && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">
                      GitHub Username
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 p-2 rounded border dark:border-gray-600 transition-colors">
                      @{userProfile[FIELDS.GITHUB_USERNAME as keyof typeof userProfile]}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-secondary-700 dark:text-primary-300 transition-colors">Notification Preferences</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {message && (
                <div className={`p-4 rounded-md text-sm transition-colors ${
                  message.includes('success') 
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
                }`}>
                  {message}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 transition-colors">
                  Notification Frequency
                </label>
                <div className="space-y-3">
                  {[
                    { value: NOTIFICATION_FREQUENCY.IMMEDIATE, label: 'Immediate', description: 'Get notified as soon as new issues are found' },
                    { value: NOTIFICATION_FREQUENCY.HOURLY, label: 'Hourly', description: 'Receive a summary every hour' },
                    { value: NOTIFICATION_FREQUENCY.DAILY, label: 'Daily', description: 'Receive a daily digest' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="notification_frequency"
                        value={option.value}
                        checked={formData.notification_frequency === option.value}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          notification_frequency: e.target.value as NotificationFrequencyType
                        })}
                        className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors">{option.label}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" loading={saving} className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save Settings</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-red-900 dark:text-red-400 transition-colors">Danger Zone</h2>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors">Sign Out</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">Sign out of your account</p>
              </div>
              <Button variant="danger" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </Layout>
  );
}

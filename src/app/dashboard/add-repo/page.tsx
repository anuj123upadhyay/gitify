'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRepositories } from '@/hooks/useRepositories';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { validateGitHubUrl } from '@/lib/utils';
import { ArrowLeft, Plus, X } from 'lucide-react';
import Link from 'next/link';

const COMMON_LABELS = [
  'good first issue',
  'help wanted',
  'bug',
  'enhancement',
  'documentation',
  'hacktoberfest',
  'beginner',
  'easy',
];

export default function AddRepository() {
  const router = useRouter();
  const { addRepository } = useRepositories();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    repoUrl: '',
    labels: [] as string[],
    customLabel: '',
  });
  const [error, setError] = useState('');
  const [urlError, setUrlError] = useState('');

  const validateUrl = (url: string) => {
    if (!url) {
      setUrlError('');
      return;
    }

    const validation = validateGitHubUrl(url);
    if (!validation.isValid) {
      setUrlError('Please enter a valid GitHub repository URL');
    } else {
      setUrlError('');
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData({ ...formData, repoUrl: url });
    validateUrl(url);
  };

  const handleLabelToggle = (label: string) => {
    const newLabels = formData.labels.includes(label)
      ? formData.labels.filter(l => l !== label)
      : [...formData.labels, label];
    
    setFormData({ ...formData, labels: newLabels });
  };

  const handleAddCustomLabel = () => {
    const trimmed = formData.customLabel.trim();
    if (trimmed && !formData.labels.includes(trimmed)) {
      setFormData({
        ...formData,
        labels: [...formData.labels, trimmed],
        customLabel: '',
      });
    }
  };

  const handleRemoveLabel = (label: string) => {
    setFormData({
      ...formData,
      labels: formData.labels.filter(l => l !== label),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (urlError) {
      return;
    }

    const validation = validateGitHubUrl(formData.repoUrl);
    if (!validation.isValid) {
      setUrlError('Please enter a valid GitHub repository URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await addRepository(formData.repoUrl, formData.labels);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to add repository');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Add Repository
            </h1>
            <p className="text-gray-600">
              Track new issues in a GitHub repository
            </p>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">
              Repository Details
            </h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {/* Repository URL */}
              <Input
                label="GitHub Repository URL"
                type="url"
                required
                value={formData.repoUrl}
                onChange={handleUrlChange}
                placeholder="https://github.com/owner/repository"
                error={urlError}
                helperText="Enter the URL of the GitHub repository you want to track"
              />

              {/* Label Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Issue Labels to Track (Optional)
                </label>
                <p className="text-sm text-gray-500">
                  Select the labels you want to monitor. Leave empty to track all new issues.
                </p>

                {/* Common Labels */}
                <div className="flex flex-wrap gap-2">
                  {COMMON_LABELS.map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => handleLabelToggle(label)}
                      className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                        formData.labels.includes(label)
                          ? 'bg-primary-100 text-primary-800 border-primary-300'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Custom Label Input */}
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add custom label"
                    value={formData.customLabel}
                    onChange={(e) => setFormData({ ...formData, customLabel: e.target.value })}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomLabel();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddCustomLabel}
                    disabled={!formData.customLabel.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Selected Labels */}
                {formData.labels.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      Selected labels:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {formData.labels.map((label) => (
                        <span
                          key={label}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                        >
                          {label}
                          <button
                            type="button"
                            onClick={() => handleRemoveLabel(label)}
                            className="ml-2 text-primary-600 hover:text-primary-800"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-3">
                <Link href="/dashboard">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button
                  type="submit"
                  loading={loading}
                  disabled={!formData.repoUrl || !!urlError}
                >
                  Add Repository
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

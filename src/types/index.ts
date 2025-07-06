export interface User {
  $id: string;
  email: string;
  name: string;
  provider?: string;
  prefs?: {
    provider?: string;
    username?: string;
  };
  $createdAt: string;
  $updatedAt: string;
}

export interface UserDocument {
  $id: string;
  email: string;
  name: string;
  auth_provider: string;
  github_username?: string;
  notification_frequency: string;
  $createdAt: string;
  $updatedAt: string;
}

export interface Repository {
  $id: string;
  user_id: string;
  repo_url: string;
  repo_name: string;
  repo_owner: string;
  labels: string; // Comma-separated string of labels (max 251 chars)
  last_checked_at?: string;
  last_issue_id?: number;
  notifications_enabled: boolean;
  $createdAt: string;
  $updatedAt: string;
}

export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body: string;
  html_url: string;
  state: 'open' | 'closed';
  labels: Array<{
    id: number;
    name: string;
    color: string;
  }>;
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    avatar_url: string;
  };
}

export interface Notification {
  $id: string;
  user_id: string;
  repository_id: string;
  issue_id: number;
  issue_title: string;
  issue_url: string;
  issue_labels: string[];
  sent_at: string;
  email_status: 'pending' | 'sent' | 'failed';
  $createdAt: string;
  $updatedAt: string;
}

export interface AppwriteError {
  message: string;
  code: number;
  type: string;
}


// Centralized Appwrite field and status names


export const FIELDS = {
  NOTIFICATIONS_ENABLED: 'notifications_enabled',
  REPO_URL: 'repo_url',
  REPO_NAME: 'repo_name',
  REPO_OWNER: 'repo_owner',
  LABELS: 'labels',
  LAST_CHECKED_AT: 'last_checked_at',
  USER_ID: 'user_id',
  EMAIL: 'email',
  NAME: 'name',
  AUTH_PROVIDER: 'auth_provider',
  GITHUB_USERNAME: 'github_username',
  NOTIFICATION_FREQUENCY: 'notification_frequency',
  EMAIL_STATUS: 'email_status'
};

export const STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
};

// Notification frequency options
export const NOTIFICATION_FREQUENCY = {
  IMMEDIATE: 'immediate',
  HOURLY: 'hourly',
  DAILY: 'daily'
} as const;

// Auth providers
export const AUTH_PROVIDER = {
  EMAIL: 'email',
  GITHUB: 'github'
} as const;

// Email status
export const EMAIL_STATUS = {
  PENDING: 'pending',
  SENT: 'sent',
  FAILED: 'failed'
} as const;

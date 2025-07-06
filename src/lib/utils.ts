import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function validateGitHubUrl(url: string): { isValid: boolean; owner?: string; repo?: string } {
  try {
    const urlObj = new URL(url);
    
    if (urlObj.hostname !== 'github.com') {
      return { isValid: false };
    }

    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    
    if (pathParts.length < 2) {
      return { isValid: false };
    }

    const [owner, repo] = pathParts;
    
    // Basic validation for GitHub username and repo name
    const usernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
    const repoRegex = /^[a-zA-Z0-9._-]+$/;
    
    if (!usernameRegex.test(owner) || !repoRegex.test(repo)) {
      return { isValid: false };
    }

    return { isValid: true, owner, repo };
  } catch {
    return { isValid: false };
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  return formatDate(dateString);
}

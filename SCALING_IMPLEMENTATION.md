# 🚀 Gitify Scaling Implementation

## Overview

This document explains the scaling techniques implemented in Gitify to handle high-volume GitHub API usage and efficient per-user notification tracking.

## 📊 Scaling Solutions Implemented

### 1. 🔄 Multi-PAT Round-Robin System

**Problem**: GitHub API rate limits (5,000 requests/hour per token)
**Solution**: Use up to 6 GitHub Personal Access Tokens in round-robin fashion

#### Features:
- **Automatic Token Rotation**: Switches tokens every minute or when rate limit is low
- **Rate Limit Monitoring**: Tracks remaining requests and reset times for each token
- **Smart Failover**: Automatically switches to available tokens when one is exhausted
- **Status Monitoring**: Real-time visibility into token usage and health

#### Implementation:
```javascript
// Located in: functions/github-poller/main.js
class GitHubTokenManager {
  - initializeTokens()     // Load tokens from environment
  - getNextToken()         // Get next available token
  - rotateToNextToken()    // Switch to next token
  - updateRateLimit()      // Update usage stats
  - getStatus()           // Get status of all tokens
}
```

#### Environment Variables:
```bash
# Primary token (backward compatibility)
GITHUB_TOKEN=ghp_your_primary_token

# Additional tokens for scaling
GITHUB_TOKEN_1=ghp_your_token_1
GITHUB_TOKEN_2=ghp_your_token_2
GITHUB_TOKEN_3=ghp_your_token_3
GITHUB_TOKEN_4=ghp_your_token_4
GITHUB_TOKEN_5=ghp_your_token_5
GITHUB_TOKEN_6=ghp_your_token_6
```

### 2. 👥 Per-User Issue Tracking

**Problem**: Duplicate notifications when multiple users track the same repository
**Solution**: Track "last issue seen" per user/repository combination

#### Features:
- **Individual Tracking**: Each user has their own tracking state per repository
- **Efficient Queries**: Only fetch issues newer than user's last seen issue
- **Automatic Deduplication**: Prevents duplicate notifications
- **Label Filtering**: Respects each user's label preferences

#### Implementation:
```javascript
// Located in: functions/github-poller/main.js
class UserIssueTrackingService {
  - getOrCreateTracker()    // Get/create user tracker
  - updateLastSeenIssue()   // Update user's last seen issue
  - getNewIssuesForUser()   // Get new issues for specific user
  - isNewIssueForUser()     // Check if issue is new for user
}
```

#### Database Schema:
```javascript
// New Collection: user_issue_trackers
{
  user_id: string,              // User who is tracking
  repository_id: string,        // Repository being tracked
  repo_owner: string,           // Repository owner
  repo_name: string,            // Repository name
  last_issue_id: number,        // ID of last issue seen
  last_issue_created_at: string, // Timestamp of last issue
  last_checked_at: string       // Last time we checked
}
```

## 🏗️ Architecture Changes

### Enhanced Polling Function

The main polling function (`functions/github-poller/main.js`) has been completely rewritten to:

1. **Initialize Scaling Services**:
   - Token Manager with all available tokens
   - User Issue Tracking Service

2. **Optimize Repository Processing**:
   - Group users by repository to minimize API calls
   - Find earliest "since" date across all users
   - Process all users for each repository in one API call

3. **Smart Issue Distribution**:
   - Filter issues per user based on their last seen timestamp
   - Apply label filters per user
   - Send personalized notifications

4. **Enhanced Monitoring**:
   - Track token usage statistics
   - Monitor processing performance
   - Provide detailed execution reports

### Frontend Enhancements

**New Component**: `GitHubTokenStatus` (`src/components/GitHubTokenStatus.tsx`)
- Real-time token status monitoring
- Visual indicators for token health
- Execution statistics
- Auto-refresh every 30 seconds

**Dashboard Integration**: Added token status section to main dashboard

**API Endpoint**: `/api/github/token-status` for real-time status updates

## 📋 Setup Instructions

### 1. Database Setup

Run the updated database setup script:
```bash
node scripts/setup-appwrite.js
```

This will create the new `user_issue_trackers` collection.

### 2. Environment Variables

#### Main Application (`.env.local`):
```bash
# Add these to your existing .env.local
GITHUB_TOKEN_1=ghp_your_token_1
GITHUB_TOKEN_2=ghp_your_token_2
GITHUB_TOKEN_3=ghp_your_token_3
GITHUB_TOKEN_4=ghp_your_token_4
GITHUB_TOKEN_5=ghp_your_token_5
GITHUB_TOKEN_6=ghp_your_token_6
NEXT_PUBLIC_COLLECTION_USER_ISSUE_TRACKERS=user_issue_trackers
```

#### Functions (`.env` in functions folder):
```bash
# Add these to your functions/.env
GITHUB_TOKEN_1=ghp_your_token_1
GITHUB_TOKEN_2=ghp_your_token_2
GITHUB_TOKEN_3=ghp_your_token_3
GITHUB_TOKEN_4=ghp_your_token_4
GITHUB_TOKEN_5=ghp_your_token_5
GITHUB_TOKEN_6=ghp_your_token_6
COLLECTION_USER_ISSUE_TRACKERS=user_issue_trackers
```

### 3. GitHub Token Setup

1. **Generate Multiple Tokens**:
   - Go to GitHub → Settings → Developer settings → Personal access tokens
   - Generate 6 tokens with `repo` and `public_repo` permissions
   - Use different GitHub accounts if needed to avoid token limits

2. **Token Distribution**:
   - Use tokens from different GitHub accounts if possible
   - Each token provides 5,000 requests/hour
   - Total capacity: 30,000 requests/hour with 6 tokens

### 4. Deploy Enhanced Function

1. **Update Function Code**:
   - The enhanced `main.js` is already updated with scaling features
   - Deploy the updated function to Appwrite

2. **Environment Configuration**:
   - Add all token environment variables to your function
   - Ensure the new collection ID is configured

## 📊 Performance Improvements

### Before Scaling:
- **API Limits**: 5,000 requests/hour
- **Repository Processing**: Individual API calls per user
- **Notification Accuracy**: Potential duplicates for shared repositories
- **Monitoring**: Basic execution logs

### After Scaling:
- **API Limits**: 30,000 requests/hour (6x improvement)
- **Repository Processing**: Grouped processing, optimized API usage
- **Notification Accuracy**: Perfect deduplication per user
- **Monitoring**: Real-time token status and performance metrics

## 🔍 Monitoring & Debugging

### Dashboard Token Status

The dashboard now shows:
- **Token Health**: Active/inactive status for each token
- **Usage Statistics**: Remaining requests per token
- **Reset Times**: When tokens will be refreshed
- **Last Used**: When each token was last utilized

### Function Logs

Enhanced logging provides:
- Token rotation events
- Rate limit updates
- User processing statistics
- Error tracking and recovery

### API Endpoints

- `GET /api/github/token-status`: Real-time token status
- Function execution logs: Available in Appwrite console

## 🚀 Benefits Achieved

1. **Scalability**: 6x increase in API request capacity
2. **Efficiency**: Reduced API calls through intelligent grouping
3. **Accuracy**: Eliminated duplicate notifications
4. **Reliability**: Automatic failover between tokens
5. **Monitoring**: Real-time visibility into system health
6. **User Experience**: Personalized notifications per user

## 🛠️ Troubleshooting

### Common Issues:

1. **No Tokens Available**:
   - Check token environment variables
   - Verify token permissions
   - Ensure tokens are from active GitHub accounts

2. **Rate Limits Still Hit**:
   - Verify all 6 tokens are configured
   - Check token rotation logs
   - Consider using tokens from different GitHub accounts

3. **Missing Notifications**:
   - Check user issue tracker creation
   - Verify label filtering logic
   - Review function execution logs

4. **Database Errors**:
   - Ensure new collection is created
   - Check collection permissions
   - Verify environment variable configuration

## 🔄 Maintenance

### Regular Tasks:
1. Monitor token status in dashboard
2. Rotate tokens periodically for security
3. Review function execution logs
4. Monitor database growth for user_issue_trackers

### Performance Tuning:
1. Adjust token rotation interval based on usage patterns
2. Optimize repository grouping logic
3. Fine-tune rate limit thresholds
4. Monitor and adjust polling frequency

This scaling implementation provides Gitify with enterprise-grade performance and reliability while maintaining the simplicity of the original system.

# 🚀 Gitify Database Setup Guide

## Quick Setup Steps

### 1. 📋 Create Database
1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Select your project (`6869279e003a73292e7d`)
3. Go to **Databases** → **Create Database**
4. **Database ID**: `gitify-main`
5. **Name**: `Gitify Main Database`

### 2. 📁 Create Collections

#### Collection 1: users
- **Collection ID**: `users`
- **Name**: `Users`
- **Permissions**: 
  - Create: `users`
  - Read: `users`
  - Update: `users`
  - Delete: `users`

**Attributes:**
```
email          | String  | Size: 255 | Required: Yes | Array: No
name           | String  | Size: 100 | Required: Yes | Array: No
auth_provider  | String  | Size: 50  | Required: Yes | Array: No | Default: email
github_username| String  | Size: 100 | Required: No  | Array: No
notification_frequency | String | Size: 20 | Required: Yes | Array: No | Default: immediate
```

**Indexes:**
```
email_index | Type: unique | Attributes: email
```

#### Collection 2: repositories  
- **Collection ID**: `repositories`
- **Name**: `Repositories`
- **Permissions**: Same as users

**Attributes:**
```
user_id        | String   | Size: 36  | Required: Yes | Array: No
repo_url       | String   | Size: 500 | Required: Yes | Array: No
repo_owner     | String   | Size: 100 | Required: Yes | Array: No  
repo_name      | String   | Size: 100 | Required: Yes | Array: No
labels         | String   | Size: 50  | Required: No  | Array: Yes
last_checked_at| DateTime |           | Required: No  | Array: No
last_issue_id  | Integer  |           | Required: No  | Array: No
notifications_enabled | Boolean |    | Required: Yes | Array: No | Default: true
```

**Indexes:**
```
user_repos_index     | Type: key    | Attributes: user_id
repo_unique_index    | Type: unique | Attributes: user_id, repo_owner, repo_name
```

#### Collection 3: notifications
- **Collection ID**: `notifications` 
- **Name**: `Notifications`
- **Permissions**: Same as users

**Attributes:**
```
user_id       | String   | Size: 36  | Required: Yes | Array: No
repository_id | String   | Size: 36  | Required: Yes | Array: No
issue_id      | Integer  |           | Required: Yes | Array: No
issue_title   | String   | Size: 500 | Required: Yes | Array: No
issue_url     | String   | Size: 500 | Required: Yes | Array: No
issue_labels  | String   | Size: 50  | Required: No  | Array: Yes
sent_at       | DateTime |           | Required: Yes | Array: No
email_status  | String   | Size: 20  | Required: Yes | Array: No | Default: pending
```

**Indexes:**
```
user_notifications_index | Type: key | Attributes: user_id
repo_notifications_index | Type: key | Attributes: repository_id
```

### 3. 🔐 Authentication Setup
1. Go to **Auth** → **Settings**
2. Enable **Email/Password** authentication
3. (Optional) Enable **GitHub OAuth**

### 4. ✅ Verification
Once created, you should see:
- Database: `gitify-main`
- Collections: `users`, `repositories`, `notifications`
- All attributes and indexes properly configured

### 5. 🧪 Test Your Setup
Run the database checker:
```bash
npm run check-db
```

## 🚨 Common Issues

### "Database not found" Error
- Make sure the database ID is exactly: `gitify-main`
- Check that you're in the right Appwrite project

### "Collection not found" Error  
- Verify all collection IDs match exactly
- Ensure permissions are set correctly

### "Permission denied" Error
- Check collection permissions include: users (CRUD)
- Verify your project settings

## 🎯 Quick Commands

Check if everything is set up:
```bash
node scripts/check-database.js
```

Your project should now work without 404 errors!

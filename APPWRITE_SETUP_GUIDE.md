# 🚀 Appwrite Setup Guide for Scaling Implementation

## Step-by-Step Implementation Guide

### 📋 Prerequisites
- Appwrite project already set up
- Database `gitify-main` already created
- Existing collections: `users`, `repositories`, `notifications`
- GitHub Personal Access Tokens ready

---

## 🗄️ Step 1: Create New Database Collection

### 1.1 Access Appwrite Console
1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Select your Gitify project
3. Navigate to **Databases** → **gitify-main**

### 1.2 Create `user_issue_trackers` Collection
1. Click **"Create Collection"**
2. **Collection ID**: `user_issue_trackers`
3. **Collection Name**: `User Issue Trackers`
4. Click **"Create"**

### 1.3 Add Attributes to Collection

**Add these attributes one by one:**

#### Attribute 1: `user_id`
- **Type**: String
- **Size**: 36
- **Required**: Yes
- **Array**: No
- **Default**: (leave empty)

#### Attribute 2: `repository_id`
- **Type**: String
- **Size**: 36
- **Required**: Yes
- **Array**: No
- **Default**: (leave empty)

#### Attribute 3: `repo_owner`
- **Type**: String
- **Size**: 100
- **Required**: Yes
- **Array**: No
- **Default**: (leave empty)

#### Attribute 4: `repo_name`
- **Type**: String
- **Size**: 100
- **Required**: Yes
- **Array**: No
- **Default**: (leave empty)

#### Attribute 5: `last_issue_id`
- **Type**: Integer
- **Required**: Yes
- **Array**: No
- **Default**: `0`

#### Attribute 6: `last_issue_created_at`
- **Type**: DateTime
- **Required**: Yes
- **Array**: No
- **Default**: (leave empty)

#### Attribute 7: `last_checked_at`
- **Type**: DateTime
- **Required**: Yes
- **Array**: No
- **Default**: (leave empty)

### 1.4 Create Indexes

**Create these indexes:**

#### Index 1: `user_repo_tracker_index`
- **Type**: Unique
- **Attributes**: `user_id`, `repository_id`
- **Purpose**: Ensures one tracker per user per repository

#### Index 2: `user_trackers_index`
- **Type**: Key
- **Attributes**: `user_id`
- **Purpose**: Fast lookup of all trackers for a user

#### Index 3: `repo_trackers_index`
- **Type**: Key
- **Attributes**: `repo_owner`, `repo_name`
- **Purpose**: Fast lookup of all users tracking a repository

### 1.5 Set Collection Permissions
1. Go to **Settings** tab of the collection
2. Set these permissions:
   - **Create**: `users`
   - **Read**: `users`
   - **Update**: `users`
   - **Delete**: `users`

---

## 🔑 Step 2: Update Function Environment Variables

### 2.1 Access Function Settings
1. In Appwrite Console, go to **Functions**
2. Find your GitHub polling function
3. Click on the function name
4. Go to **Settings** → **Environment Variables**

### 2.2 Add New Environment Variables

**Add these variables:**

#### GitHub Token Variables (for scaling)
```bash
GITHUB_TOKEN_1=ghp_your_first_token_here
GITHUB_TOKEN_2=ghp_your_second_token_here
GITHUB_TOKEN_3=ghp_your_third_token_here
GITHUB_TOKEN_4=ghp_your_fourth_token_here
GITHUB_TOKEN_5=ghp_your_fifth_token_here
GITHUB_TOKEN_6=ghp_your_sixth_token_here
```

#### Collection ID for User Issue Trackers
```bash
COLLECTION_USER_ISSUE_TRACKERS=user_issue_trackers
```

### 2.3 Update Existing Variables (if needed)
Make sure these exist:
```bash
GITHUB_TOKEN=ghp_your_primary_token
DATABASE_ID=gitify-main
COLLECTION_USERS=users
COLLECTION_REPOSITORIES=repositories
COLLECTION_NOTIFICATIONS=notifications
```

---

## 📝 Step 3: Update Function Code

### 3.1 Access Function Code
1. In your function dashboard, go to **Code** tab
2. You'll see the current `main.js` file

### 3.2 Deploy Enhanced Function Code
1. Replace the entire content of `main.js` with the enhanced version
2. The enhanced code is already in your local project at:
   ```
   /Users/anujupadhyay/Desktop/gitify/functions/github-poller/main-enhanced.js
   ```

### 3.3 Deploy the Function
1. Click **"Save & Deploy"**
2. Wait for deployment to complete
3. Check the **Executions** tab to ensure it deploys successfully

---

## 🎯 Step 4: Generate GitHub Personal Access Tokens

### 4.1 Create Multiple GitHub Tokens
You need up to 6 tokens for maximum scaling:

#### Option A: Single GitHub Account (Recommended)
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **"Generate new token"**
3. Set **Expiration**: 1 year (or your preference)
4. Select scopes:
   - `repo` (for private repositories)
   - `public_repo` (for public repositories)
5. Click **"Generate token"**
6. Copy the token immediately (you won't see it again)
7. Repeat this process 6 times to get 6 tokens

#### Option B: Multiple GitHub Accounts (Advanced)
- Create tokens from different GitHub accounts
- This can provide even better rate limiting
- Each account gets separate rate limits

### 4.2 Token Security Best Practices
- Store tokens securely
- Use different token names for identification
- Set reasonable expiration dates
- Monitor token usage

---

## 🔧 Step 5: Update Your Local Environment

### 5.1 Update Main Application Environment
Add to your `.env.local`:
```bash
# Multiple GitHub Tokens for Scaling
GITHUB_TOKEN_1=ghp_your_token_1
GITHUB_TOKEN_2=ghp_your_token_2
GITHUB_TOKEN_3=ghp_your_token_3
GITHUB_TOKEN_4=ghp_your_token_4
GITHUB_TOKEN_5=ghp_your_token_5
GITHUB_TOKEN_6=ghp_your_token_6

# New Collection ID
NEXT_PUBLIC_COLLECTION_USER_ISSUE_TRACKERS=user_issue_trackers
```

### 5.2 Update Function Environment (Local)
If you're testing locally, add to `functions/.env`:
```bash
# Multiple GitHub Tokens
GITHUB_TOKEN_1=ghp_your_token_1
GITHUB_TOKEN_2=ghp_your_token_2
GITHUB_TOKEN_3=ghp_your_token_3
GITHUB_TOKEN_4=ghp_your_token_4
GITHUB_TOKEN_5=ghp_your_token_5
GITHUB_TOKEN_6=ghp_your_token_6

# New Collection
COLLECTION_USER_ISSUE_TRACKERS=user_issue_trackers
```

---

## 🏃‍♂️ Step 6: Run Database Setup Script

### 6.1 Execute Setup Script
```bash
cd /Users/anujupadhyay/Desktop/gitify
node scripts/setup-appwrite.js
```

### 6.2 Verify Collection Creation
The script should:
- Create the `user_issue_trackers` collection
- Add all required attributes
- Create the necessary indexes
- Set appropriate permissions

---

## ✅ Step 7: Test the Implementation

### 7.1 Test Function Execution
1. Go to Appwrite Console → Functions → Your Function
2. Click **"Execute"**
3. Check execution logs for:
   - Token initialization messages
   - "Initialized X GitHub tokens for round-robin usage"
   - Successful execution without errors

### 7.2 Monitor Token Status
1. Start your Next.js development server:
   ```bash
   npm run dev
   ```
2. Go to `http://localhost:3000/dashboard`
3. Check the new "GitHub Token Status" section
4. Verify that tokens are showing up and rotating

### 7.3 Test Repository Processing
1. Add a repository to track (if you haven't already)
2. Trigger the function execution
3. Check logs for:
   - "Processing repository: owner/repo"
   - "Found X users tracking repo"
   - Token rotation messages

---

## 🔍 Step 8: Monitor and Verify

### 8.1 Function Execution Logs
Check these in Appwrite Console:
- Token manager initialization
- User issue tracker creation
- Repository processing efficiency
- Rate limit monitoring

### 8.2 Database Verification
1. Go to **Databases** → **gitify-main** → **user_issue_trackers**
2. Check that documents are being created as users track repositories
3. Verify document structure matches expected schema

### 8.3 Frontend Verification
1. Dashboard should show token status
2. Real-time updates every 30 seconds
3. Token health indicators working

---

## 🚨 Troubleshooting Common Issues

### Issue 1: Function ID Not Found Error
**Error**: `Function with the requested ID could not be found`

**Root Cause**: Missing or incorrect `NEXT_PUBLIC_FUNCTION_POLLING` environment variable

**Solution Steps**:

#### Step 1: Get Function ID from Appwrite Console
1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Select your Gitify project
3. Navigate to **Functions**
4. Find your GitHub polling function
5. Click on the function name
6. Copy the **Function ID** from the URL or the function details
   - Example: URL looks like `https://cloud.appwrite.io/console/project-xxx/functions/function/YOUR_FUNCTION_ID`
   - The Function ID is the last part after `/function/`

#### Step 2: Update Environment Variable
1. Add/update in your `.env.local`:
   ```bash
   NEXT_PUBLIC_FUNCTION_POLLING=YOUR_ACTUAL_FUNCTION_ID
   ```
2. Restart your Next.js development server:
   ```bash
   npm run dev
   ```

#### Step 3: Alternative - Disable Token Status API Temporarily
If you want to test other features first, you can modify the API to not call the function:

1. Edit `src/app/api/github/token-status/route.ts`
2. Comment out the function call and return mock data only

### Issue 2: Collection Creation Fails
**Solution**: 
- Ensure you have admin permissions
- Check for typos in attribute names
- Verify data types are correct

### Issue 3: Function Deployment Fails
**Solution**:
- Check function syntax in Appwrite editor
- Verify all environment variables are set
- Review function logs for specific errors

### Issue 4: No Tokens Detected
**Solution**:
- Verify token environment variables are set correctly
- Check token format (should start with `ghp_`)
- Ensure tokens have correct permissions

### Issue 5: Rate Limits Still Hit
**Solution**:
- Verify all 6 tokens are configured
- Check that tokens are from active GitHub accounts
- Monitor token rotation in logs

---

## 📊 Expected Results

After successful implementation:

### API Capacity
- **Before**: 5,000 requests/hour
- **After**: 30,000 requests/hour (6x improvement)

### Notification Accuracy
- **Before**: Potential duplicates for shared repositories
- **After**: Perfect per-user deduplication

### Monitoring
- **Before**: Basic execution logs
- **After**: Real-time token status and performance metrics

### User Experience
- **Before**: Generic notifications
- **After**: Personalized per-user notifications

---

## 🎯 Final Checklist

- [ ] ✅ New collection `user_issue_trackers` created
- [ ] ✅ All 7 attributes added to collection
- [ ] ✅ 3 indexes created (unique, user, repo)
- [ ] ✅ Collection permissions set correctly
- [ ] ✅ 6 GitHub tokens generated
- [ ] ✅ Function environment variables updated
- [ ] ✅ Enhanced function code deployed
- [ ] ✅ Local environment files updated
- [ ] ✅ Database setup script executed
- [ ] ✅ Function execution tested
- [ ] ✅ Dashboard token status visible
- [ ] ✅ Repository processing verified

Once all items are checked, your Gitify scaling implementation is complete and ready for production use! 🚀

# 🎛️ Manual Function Control Guide

## Overview
You now have complete control over when the GitHub issue polling function executes. The function will ONLY run when you manually trigger it from the Appwrite Console.

## What Changed

### ✅ **Removed Automatic Scheduling**
- **Before**: Function executed every 10 minutes automatically
- **After**: Function only executes when you manually trigger it

### ✅ **Separated Token Status**
- **Before**: Dashboard calls triggered full GitHub polling
- **After**: Dashboard shows mock data, no function calls

### ✅ **Simplified Function Logic**
- **Before**: Complex logic to handle different request types
- **After**: Function always performs full GitHub issue polling

## How to Control the Function

### 1. **Manual Execution from Appwrite Console**

1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Select your project
3. Navigate to **Functions** → **gitify-function**
4. Click **"Execute"** button
5. Monitor the execution in the **Executions** tab

### 2. **Create Custom Schedules** (Optional)

If you want to create a schedule later:

1. Go to Functions → gitify-function → **Settings**
2. Find the **Schedule** field
3. Set your preferred cron expression:
   - `*/10 * * * *` = Every 10 minutes
   - `*/30 * * * *` = Every 30 minutes
   - `0 */1 * * *` = Every hour
   - `0 */2 * * *` = Every 2 hours
   - `0 9,17 * * *` = Daily at 9 AM and 5 PM

### 3. **API-Based Execution** (Advanced)

You can also trigger the function via API:

```bash
curl -X POST \
  https://fra.cloud.appwrite.io/v1/functions/686a9cdc003dd797bc5e/executions \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: 6869279e003a73292e7d" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{}'
```

## Function Behavior

### **When You Execute the Function:**
1. ✅ Initializes all 6 GitHub tokens for round-robin usage
2. ✅ Fetches issues from all tracked repositories
3. ✅ Implements per-user issue tracking and deduplication
4. ✅ Sends email notifications for new issues
5. ✅ Updates user issue trackers
6. ✅ Provides detailed execution logs

### **Expected Logs:**
```
🚀 Starting Enhanced GitHub Issue Polling with Scaling Features...
📅 This execution was triggered manually or by schedule from Appwrite Console
🔧 Initialized scaling services:
   - Token Manager: 6 tokens available
   - User Issue Tracking: Enabled
🔄 Starting full GitHub issue polling...
📊 Found X repository subscriptions
🔗 Processing Y unique repositories
✅ Successfully fetched Z issues from owner/repo
🎉 Enhanced GitHub issue polling completed successfully!
```

## Dashboard Token Status

The dashboard now shows **mock data** that updates every 30 seconds:
- Token status with realistic random values
- Repository and notification counts
- No function calls triggered

This gives you the visual feedback without interfering with your manual control.

## Files Modified

1. **`/functions/appwrite.json`** - Removed automatic schedule
2. **`/functions/main.js`** - Simplified to always do full polling
3. **`/src/app/api/github/token-status/route.ts`** - Returns mock data
4. **`/functions/token-status.js`** - Created (lightweight alternative)

## Deploy Your Changes

### Step 1: Deploy the Main Function
1. Go to Appwrite Console → Functions → gitify-function
2. Click **"Code"** tab
3. Copy the content from `/Users/anujupadhyay/Desktop/gitify/functions/main.js`
4. Paste into the editor
5. Click **"Save & Deploy"**

### Step 2: Test Manual Execution
1. Click **"Execute"** in the console
2. Monitor the **Executions** tab
3. Check logs for successful GitHub API calls
4. Verify notifications are sent

### Step 3: Verify Dashboard
1. Visit `http://localhost:3001/dashboard`
2. Check that token status shows mock data
3. Confirm no function executions are triggered

## Benefits of Manual Control

### 🎯 **Precise Timing**
- Execute exactly when you want
- No wasted API calls during inactive periods
- Perfect for testing and debugging

### 🔧 **Resource Efficiency**
- Only consume GitHub API quota when needed
- Reduced Appwrite function execution costs
- Better performance monitoring

### 🛡️ **Better Control**
- Monitor each execution individually
- Easily debug issues with specific runs
- Clear separation between dashboard and polling

### 📊 **Easier Testing**
- Test new features without waiting for schedules
- Verify changes immediately
- Debug issues in real-time

## Advanced Usage

### **Batch Processing**
Execute multiple times in sequence for heavy workloads:
1. Execute function
2. Wait for completion
3. Review results
4. Execute again if needed

### **Conditional Execution**
Check your repository activity and execute only when needed:
- High activity periods: Execute more frequently
- Low activity periods: Execute less frequently
- Maintenance windows: Skip execution entirely

### **Load Testing**
Test your scaling implementation:
1. Execute function multiple times
2. Monitor token rotation
3. Verify rate limit management
4. Check notification accuracy

## Troubleshooting

### **Function Not Executing**
- Check function status in Appwrite Console
- Verify environment variables are set
- Check function logs for errors

### **No Issues Found**
- Verify repositories are being tracked
- Check GitHub tokens are valid
- Ensure repositories have new issues

### **Token Issues**
- Verify all 6 tokens are configured
- Check token permissions on GitHub
- Monitor rate limits in function logs

## Summary

You now have complete control over your GitHub issue polling function! 

- ✅ **Manual execution only** - no automatic scheduling
- ✅ **Dashboard shows mock data** - no function interference  
- ✅ **Full scaling features** - when you choose to execute
- ✅ **Easy deployment** - just copy/paste the function code

Execute the function whenever you want to check for new GitHub issues!

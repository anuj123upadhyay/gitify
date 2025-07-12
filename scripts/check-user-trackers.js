const { Client, Databases, Query } = require('node-appwrite');
require('dotenv').config({ path: '.env.local' });

async function checkUserTrackers() {
    try {
        console.log('🔍 Checking user issue trackers...');
        
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
            .setKey(process.env.APPWRITE_API_KEY);

        const databases = new Databases(client);
        const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID;
        const COLLECTION_USER_ISSUE_TRACKERS = process.env.NEXT_PUBLIC_COLLECTION_USER_ISSUE_TRACKERS;
        const COLLECTION_REPOSITORIES = process.env.NEXT_PUBLIC_COLLECTION_REPOSITORIES;

        // Get all user issue trackers
        const trackers = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_USER_ISSUE_TRACKERS,
            [Query.limit(100)]
        );

        console.log(`📊 Found ${trackers.documents.length} user issue trackers:`);
        console.log('───────────────────────────────────────────────────────────');

        for (const tracker of trackers.documents) {
            console.log(`👤 User: ${tracker.user_id}`);
            console.log(`📂 Repository: ${tracker.repo_owner}/${tracker.repo_name}`);
            console.log(`🔢 Last Issue ID: ${tracker.last_issue_id}`);
            console.log(`📅 Last Issue Date: ${new Date(tracker.last_issue_created_at).toLocaleString()}`);
            console.log(`🔍 Last Checked: ${new Date(tracker.last_checked_at).toLocaleString()}`);
            console.log('───────────────────────────────────────────────────────────');
        }

        // Get repositories being tracked
        const repositories = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_REPOSITORIES,
            [Query.equal('notifications_enabled', true), Query.limit(100)]
        );

        console.log(`\n📂 Repositories being tracked: ${repositories.documents.length}`);
        console.log('───────────────────────────────────────────────────────────');

        for (const repo of repositories.documents) {
            console.log(`📂 ${repo.repo_owner}/${repo.repo_name}`);
            console.log(`👤 User: ${repo.user_id}`);
            console.log(`🔔 Notifications: ${repo.notifications_enabled ? 'Enabled' : 'Disabled'}`);
            console.log(`🏷️  Labels: ${repo.labels || 'None'}`);
            console.log('───────────────────────────────────────────────────────────');
        }

        // Check if PHP_Assignment is being tracked
        const phpAssignmentRepos = repositories.documents.filter(repo => 
            repo.repo_name === 'PHP_Assignment' && repo.repo_owner === 'anuj123upadhyay'
        );

        if (phpAssignmentRepos.length > 0) {
            console.log('\n✅ PHP_Assignment repository is being tracked:');
            phpAssignmentRepos.forEach(repo => {
                console.log(`   - User: ${repo.user_id}`);
                console.log(`   - Notifications: ${repo.notifications_enabled}`);
                console.log(`   - Labels: ${repo.labels || 'None'}`);
            });
        } else {
            console.log('\n❌ PHP_Assignment repository is NOT being tracked by any user');
        }

        // Check trackers for PHP_Assignment
        const phpTrackers = trackers.documents.filter(tracker => 
            tracker.repo_name === 'PHP_Assignment' && tracker.repo_owner === 'anuj123upadhyay'
        );

        if (phpTrackers.length > 0) {
            console.log('\n✅ Issue trackers exist for PHP_Assignment:');
            phpTrackers.forEach(tracker => {
                console.log(`   - User: ${tracker.user_id}`);
                console.log(`   - Last Issue ID: ${tracker.last_issue_id}`);
                console.log(`   - Last Issue Date: ${new Date(tracker.last_issue_created_at).toLocaleString()}`);
                console.log(`   - Days since last issue: ${Math.floor((Date.now() - new Date(tracker.last_issue_created_at)) / (1000 * 60 * 60 * 24))}`);
            });
        } else {
            console.log('\n❌ No issue trackers found for PHP_Assignment');
        }

    } catch (error) {
        console.error('❌ Error checking user trackers:', error);
    }
}

checkUserTrackers();

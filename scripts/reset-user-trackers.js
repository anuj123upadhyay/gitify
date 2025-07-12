const { Client, Databases, Query } = require('node-appwrite');
require('dotenv').config({ path: '.env.local' });

async function resetUserTrackers() {
    try {
        console.log('🔄 Resetting user issue trackers...');
        
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
            .setKey(process.env.APPWRITE_API_KEY);

        const databases = new Databases(client);
        const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID;
        const COLLECTION_USER_ISSUE_TRACKERS = process.env.NEXT_PUBLIC_COLLECTION_USER_ISSUE_TRACKERS;

        // Get all user issue trackers with old dates
        const trackers = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_USER_ISSUE_TRACKERS,
            [Query.limit(100)]
        );

        console.log(`📊 Found ${trackers.documents.length} user issue trackers to reset`);
        
        // Reset date to 7 days ago
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        
        for (const tracker of trackers.documents) {
            const oldDate = new Date(tracker.last_issue_created_at);
            
            // Only reset if the date is really old (before 2024)
            if (oldDate.getFullYear() < 2024) {
                console.log(`🔄 Resetting tracker for ${tracker.repo_owner}/${tracker.repo_name} (User: ${tracker.user_id})`);
                console.log(`   - Old date: ${oldDate.toLocaleString()}`);
                console.log(`   - New date: ${weekAgo.toLocaleString()}`);
                
                await databases.updateDocument(
                    DATABASE_ID,
                    COLLECTION_USER_ISSUE_TRACKERS,
                    tracker.$id,
                    {
                        last_issue_created_at: weekAgo.toISOString(),
                        last_issue_id: 0,
                        last_checked_at: new Date().toISOString()
                    }
                );
                
                console.log(`   ✅ Updated successfully`);
            } else {
                console.log(`✅ Tracker for ${tracker.repo_owner}/${tracker.repo_name} already has recent date`);
            }
        }
        
        console.log('\n🎉 All user issue trackers have been reset!');
        console.log('📅 New trackers will look for issues from: ' + weekAgo.toLocaleString());
        console.log('🔄 Run the function again to detect and send notifications for recent issues');
        
    } catch (error) {
        console.error('❌ Error resetting user trackers:', error);
    }
}

resetUserTrackers();

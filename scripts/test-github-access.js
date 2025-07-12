const fetch = require('node-fetch');
require('dotenv').config({ path: '.env.local' });

async function testGitHubAccess() {
    console.log('🔍 Testing GitHub API access...');
    
    const tokens = [
        process.env.GITHUB_TOKEN,
        process.env.GITHUB_TOKEN_1,
        process.env.GITHUB_TOKEN_2,
        process.env.GITHUB_TOKEN_3,
        process.env.GITHUB_TOKEN_4,
        process.env.GITHUB_TOKEN_5,
        process.env.GITHUB_TOKEN_6
    ].filter(Boolean);
    
    console.log(`🔑 Testing ${tokens.length} GitHub tokens...`);
    
    const testRepo = 'anuj123upadhyay/PHP_Assignment';
    
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const tokenName = i === 0 ? 'Primary Token' : `Token ${i}`;
        
        try {
            console.log(`\n🔍 Testing ${tokenName}...`);
            
            // Test rate limit
            const rateLimitResponse = await fetch('https://api.github.com/rate_limit', {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Gitify-App/1.0'
                }
            });
            
            if (!rateLimitResponse.ok) {
                console.log(`❌ ${tokenName} rate limit check failed: ${rateLimitResponse.status}`);
                continue;
            }
            
            const rateLimitData = await rateLimitResponse.json();
            console.log(`✅ ${tokenName} rate limit: ${rateLimitData.resources.core.remaining}/${rateLimitData.resources.core.limit}`);
            
            // Test repository access
            const repoResponse = await fetch(`https://api.github.com/repos/${testRepo}`, {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Gitify-App/1.0'
                }
            });
            
            if (!repoResponse.ok) {
                console.log(`❌ ${tokenName} repository access failed: ${repoResponse.status} ${repoResponse.statusText}`);
                const errorBody = await repoResponse.text();
                console.log(`   Error: ${errorBody}`);
                continue;
            }
            
            const repoData = await repoResponse.json();
            console.log(`✅ ${tokenName} can access ${testRepo}`);
            console.log(`   - Private: ${repoData.private}`);
            console.log(`   - Open issues: ${repoData.open_issues_count}`);
            
            // Test issues access
            const issuesResponse = await fetch(`https://api.github.com/repos/${testRepo}/issues?state=all&per_page=10`, {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Gitify-App/1.0'
                }
            });
            
            if (!issuesResponse.ok) {
                console.log(`❌ ${tokenName} issues access failed: ${issuesResponse.status} ${issuesResponse.statusText}`);
                const errorBody = await issuesResponse.text();
                console.log(`   Error: ${errorBody}`);
                continue;
            }
            
            const issuesData = await issuesResponse.json();
            console.log(`✅ ${tokenName} can access issues: ${issuesData.length} issues found`);
            
            if (issuesData.length > 0) {
                console.log(`📋 Recent issues:`);
                issuesData.slice(0, 3).forEach(issue => {
                    console.log(`   - #${issue.number}: ${issue.title} (${issue.state}) - ${new Date(issue.created_at).toLocaleDateString()}`);
                });
            }
            
        } catch (error) {
            console.log(`❌ ${tokenName} test failed: ${error.message}`);
        }
    }
}

testGitHubAccess().catch(console.error);

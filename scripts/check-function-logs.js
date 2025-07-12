const { Client, Functions } = require('node-appwrite');
require('dotenv').config({ path: '.env.local' });

async function checkFunctionLogs() {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const functions = new Functions(client);
    const functionId = '686a9cdc003dd797bc5e';
    
    console.log('🔍 Checking function executions...');
    
    // Get recent executions
    const executions = await functions.listExecutions(functionId, [], 10);
    
    console.log(`📊 Found ${executions.total} recent executions:`);
    console.log('───────────────────────────────────────────────────────────');
    
    executions.executions.forEach((execution, index) => {
      const timestamp = new Date(execution.$createdAt).toLocaleString();
      const duration = execution.duration || 'N/A';
      const status = execution.status || 'unknown';
      
      console.log(`${index + 1}. ${timestamp}`);
      console.log(`   Status: ${status}`);
      console.log(`   Duration: ${duration}ms`);
      console.log(`   Trigger: ${execution.trigger || 'unknown'}`);
      
      if (execution.responseStatusCode) {
        console.log(`   Response Code: ${execution.responseStatusCode}`);
      }
      
      if (execution.stdout) {
        console.log(`   Logs: ${execution.stdout.substring(0, 200)}...`);
      }
      
      if (execution.stderr) {
        console.log(`   Errors: ${execution.stderr.substring(0, 200)}...`);
      }
      
      console.log('   ───────────────────────────────────────────────────');
    });
    
    // Get function details
    const func = await functions.get(functionId);
    console.log('\n🔧 Function Configuration:');
    console.log(`   Schedule: ${func.schedule || 'Not set'}`);
    console.log(`   Timeout: ${func.timeout}s`);
    console.log(`   Status: ${func.status}`);
    console.log(`   Events: ${func.events || 'None'}`);
    
  } catch (error) {
    console.error('❌ Error checking function logs:', error);
  }
}

checkFunctionLogs();

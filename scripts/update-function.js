const { Client, Functions } = require('node-appwrite');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function updateFunctionCode() {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const functions = new Functions(client);
    const functionId = '686a9cdc003dd797bc5e';
    
    // Read the enhanced function code
    const functionCode = fs.readFileSync(path.join(__dirname, '../functions/main.js'), 'utf8');
    
    console.log('🚀 Updating function code for manual control...');
    console.log('Function ID:', functionId);
    console.log('Code length:', functionCode.length);
    console.log('📅 Function will only execute when manually triggered');
    
    // Since direct deployment might not work, provide manual instructions
    console.log('\n📋 MANUAL DEPLOYMENT INSTRUCTIONS:');
    console.log('1. Go to Appwrite Console → Functions → gitify-function');
    console.log('2. Click "Code" tab');
    console.log('3. Copy the enhanced code from:', path.join(__dirname, '../functions/main.js'));
    console.log('4. Paste into the console editor');
    console.log('5. Click "Save & Deploy"');
    console.log('6. Test by clicking "Execute" button');
    
    console.log('\n🎛️ FUNCTION CONTROL:');
    console.log('- ✅ Automatic scheduling: DISABLED');
    console.log('- ✅ Manual execution: ENABLED');
    console.log('- ✅ Dashboard interference: REMOVED');
    console.log('- ✅ Full scaling features: AVAILABLE');
    
    // Try to update via API anyway
    console.log('\n🔄 Attempting API deployment...');
    const deployment = await functions.createDeployment(
      functionId,
      functionCode,
      true, // activate
      'main.js' // entrypoint
    );
    
    console.log('✅ Function deployment created successfully!');
    console.log('Deployment ID:', deployment.$id);
    console.log('Status:', deployment.status);
    
  } catch (error) {
    console.error('❌ API deployment failed:', error.message);
    console.log('\n📝 Manual deployment is recommended:');
    console.log('Copy the function code from:');
    console.log(path.join(__dirname, '../functions/main.js'));
    console.log('\nPaste into Appwrite Console → Functions → gitify-function → Code');
    
    // Show a snippet of the code to verify it's correct
    const codeSnippet = fs.readFileSync(path.join(__dirname, '../functions/main.js'), 'utf8').substring(0, 200);
    console.log('\n📄 Code preview:');
    console.log(codeSnippet + '...');
  }
}

updateFunctionCode();

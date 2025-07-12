const { Client, Functions } = require('node-appwrite');
require('dotenv').config({ path: '.env.local' });

async function listFunctions() {
  try {
    console.log('Endpoint:', process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT);
    console.log('Project ID:', process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
    console.log('API Key present:', !!process.env.APPWRITE_API_KEY);
    
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const functions = new Functions(client);
    const result = await functions.list();
    
    console.log('Available functions:');
    result.functions.forEach(func => {
      console.log(`- ID: ${func.$id}`);
      console.log(`  Name: ${func.name}`);
      console.log(`  Status: ${func.status}`);
      console.log(`  Runtime: ${func.runtime}`);
      console.log('---');
    });
    
    if (result.functions.length === 0) {
      console.log('No functions found in the project.');
    }
  } catch (error) {
    console.error('Error listing functions:', error);
  }
}

listFunctions();

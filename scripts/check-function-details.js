const { Client, Functions } = require('node-appwrite');
require('dotenv').config({ path: '.env.local' });

async function getFunctionDetails() {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const functions = new Functions(client);
    const functionId = '686a9cdc003dd797bc5e';
    
    // Get function details
    const func = await functions.get(functionId);
    console.log('Function Details:');
    console.log('- ID:', func.$id);
    console.log('- Name:', func.name);
    console.log('- Status:', func.status);
    console.log('- Runtime:', func.runtime);
    
    // Get function variables
    try {
      const variables = await functions.listVariables(functionId);
      console.log('\nFunction Variables:');
      variables.variables.forEach(variable => {
        console.log(`- ${variable.key}: ${variable.value ? '[SET]' : '[NOT SET]'}`);
      });
    } catch (error) {
      console.log('\nError getting function variables:', error.message);
    }
  } catch (error) {
    console.error('Error getting function details:', error);
  }
}

getFunctionDetails();

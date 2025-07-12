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
    
    console.log('🚀 Updating function code...');
    console.log('Function ID:', functionId);
    console.log('Code length:', functionCode.length);
    
    // Create a deployment
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
    console.error('❌ Error updating function:', error);
    
    // Try alternative method: update via file upload
    try {
      console.log('🔄 Trying alternative deployment method...');
      
      const fs = require('fs');
      const tar = require('tar');
      const tempDir = path.join(__dirname, '../temp');
      const tarPath = path.join(tempDir, 'function.tar.gz');
      
      // Create temp directory
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      
      // Create tar.gz file
      await tar.create(
        {
          gzip: true,
          file: tarPath,
          cwd: path.join(__dirname, '../functions')
        },
        ['main.js', 'package.json']
      );
      
      console.log('Created tar file:', tarPath);
      
      // Upload the tar file
      const fileBuffer = fs.readFileSync(tarPath);
      const deployment = await functions.createDeployment(
        functionId,
        fileBuffer,
        true,
        'main.js'
      );
      
      console.log('✅ Function deployment created via file upload!');
      console.log('Deployment ID:', deployment.$id);
      
      // Clean up temp files
      fs.unlinkSync(tarPath);
      fs.rmdirSync(tempDir);
      
    } catch (altError) {
      console.error('❌ Alternative deployment method also failed:', altError);
    }
  }
}

updateFunctionCode();

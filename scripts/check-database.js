#!/usr/bin/env node

/**
 * Database Setup Verification for Gitify
 * This script checks if your Appwrite database and collections are properly set up
 */

const { Client, Databases } = require('node-appwrite');
require('dotenv').config({ path: '.env.local' });

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID || 'gitify-main';
const EXPECTED_COLLECTIONS = [
  process.env.NEXT_PUBLIC_COLLECTION_USERS || 'users',
  process.env.NEXT_PUBLIC_COLLECTION_REPOSITORIES || 'repositories', 
  process.env.NEXT_PUBLIC_COLLECTION_NOTIFICATIONS || 'notifications'
];

async function checkDatabase() {
  console.log('🔍 Checking Appwrite database setup...\n');
  
  try {
    // Check if database exists
    console.log('📋 Checking database...');
    try {
      const database = await databases.get(DATABASE_ID);
      console.log(`✅ Database "${DATABASE_ID}" exists`);
    } catch (error) {
      if (error.code === 404) {
        console.log(`❌ Database "${DATABASE_ID}" not found`);
        console.log('\n📝 To fix this:');
        console.log('1. Go to your Appwrite console');
        console.log('2. Navigate to Databases');
        console.log('3. Create a new database with ID: gitify-main');
        return false;
      }
      throw error;
    }
    
    // Check collections
    console.log('\n📁 Checking collections...');
    const collections = await databases.listCollections(DATABASE_ID);
    const existingCollections = collections.documents.map(col => col.$id);
    
    let allCollectionsExist = true;
    
    for (const collectionId of EXPECTED_COLLECTIONS) {
      if (existingCollections.includes(collectionId)) {
        console.log(`✅ Collection "${collectionId}" exists`);
      } else {
        console.log(`❌ Collection "${collectionId}" not found`);
        allCollectionsExist = false;
      }
    }
    
    if (!allCollectionsExist) {
      console.log('\n📝 To fix missing collections:');
      console.log('1. Go to your Appwrite console');
      console.log('2. Navigate to Databases → gitify-main');
      console.log('3. Create the missing collections manually');
      console.log('4. Refer to the database setup guide in the README');
      return false;
    }
    
    console.log('\n🎉 All database components are properly set up!');
    return true;
    
  } catch (error) {
    console.error('❌ Error checking database:', error.message);
    
    if (error.code === 401) {
      console.log('\n🔑 Authentication Error:');
      console.log('- Make sure your project ID is correct');
      console.log('- Ensure you have the right permissions');
    }
    
    return false;
  }
}

async function checkProjectAccess() {
  console.log('🔑 Checking project access...\n');
  
  try {
    // Try to list databases to check access
    const databasesList = await databases.list();
    console.log(`✅ Successfully connected to project`);
    console.log(`📊 Found ${databasesList.total} database(s) in your project\n`);
    
    return true;
  } catch (error) {
    console.error('❌ Failed to connect to project:', error.message);
    
    if (error.code === 401) {
      console.log('\n🔧 Possible solutions:');
      console.log('1. Check your project ID in .env.local');
      console.log('2. Verify your Appwrite endpoint');
      console.log('3. Make sure the project exists and is accessible');
    }
    
    return false;
  }
}

async function main() {
  console.log('🚀 Gitify Database Setup Checker\n');
  
  // Validate environment variables
  if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) {
    console.error('❌ NEXT_PUBLIC_APPWRITE_ENDPOINT is not set in .env.local');
    process.exit(1);
  }
  
  if (!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
    console.error('❌ NEXT_PUBLIC_APPWRITE_PROJECT_ID is not set in .env.local');
    process.exit(1);
  }
  
  console.log('📋 Configuration:');
  console.log(`   Endpoint: ${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}`);
  console.log(`   Project ID: ${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`);
  console.log(`   Expected Database ID: ${DATABASE_ID}\n`);
  
  // Check project access first
  const hasAccess = await checkProjectAccess();
  if (!hasAccess) {
    process.exit(1);
  }
  
  // Check database setup
  const isSetupComplete = await checkDatabase();
  
  if (isSetupComplete) {
    console.log('\n✨ Your Gitify database is ready to use!');
    console.log('You can now:');
    console.log('- Register users in your app');
    console.log('- Add repositories to track');
    console.log('- Deploy the GitHub polling function');
  } else {
    console.log('\n⚠️  Database setup is incomplete.');
    console.log('Please follow the setup instructions above.');
  }
}

main().catch(console.error);

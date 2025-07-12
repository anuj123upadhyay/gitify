#!/usr/bin/env node

/**
 * Appwrite Setup Script for Gitify
 * This script helps you set up your Appwrite database and collections
 * Run with: node scripts/setup-appwrite.js
 */

const sdk = require('node-appwrite');
require('dotenv').config({ path: '.env.local' });

// Initialize Appwrite client
const client = new sdk.Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY); // You'll need to add this

const databases = new sdk.Databases(client);

const DATABASE_ID = 'gitify-main';

const collections = {
  USERS: {
    id: 'users',
    name: 'Users',
    attributes: [
      {
        key: 'email',
        type: 'string',
        size: 255,
        required: true,
        default: null,
        array: false
      },
      {
        key: 'name',
        type: 'string',
        size: 100,
        required: true,
        default: null,
        array: false
      },
      {
        key: 'auth_provider',
        type: 'string',
        size: 50,
        required: true,
        default: 'email',
        array: false
      },
      {
        key: 'github_username',
        type: 'string',
        size: 100,
        required: false,
        default: null,
        array: false
      },
      {
        key: 'notification_frequency',
        type: 'string',
        size: 20,
        required: true,
        default: 'immediate',
        array: false
      }
    ],
    indexes: [
      {
        key: 'email_index',
        type: 'unique',
        attributes: ['email']
      }
    ]
  },
  
  REPOSITORIES: {
    id: 'repositories',
    name: 'Repositories',
    attributes: [
      {
        key: 'user_id',
        type: 'string',
        size: 36,
        required: true,
        default: null,
        array: false
      },
      {
        key: 'repo_url',
        type: 'string',
        size: 500,
        required: true,
        default: null,
        array: false
      },
      {
        key: 'repo_owner',
        type: 'string',
        size: 100,
        required: true,
        default: null,
        array: false
      },
      {
        key: 'repo_name',
        type: 'string',
        size: 100,
        required: true,
        default: null,
        array: false
      },
      {
        key: 'labels',
        type: 'string',
        size: 50,
        required: false,
        default: null,
        array: true
      },
      {
        key: 'last_checked_at',
        type: 'datetime',
        required: false,
        default: null,
        array: false
      },
      {
        key: 'last_issue_id',
        type: 'integer',
        required: false,
        default: null,
        array: false
      },
      {
        key: 'notifications_enabled',
        type: 'boolean',
        required: true,
        default: true,
        array: false
      }
    ],
    indexes: [
      {
        key: 'user_repos_index',
        type: 'key',
        attributes: ['user_id']
      },
      {
        key: 'repo_unique_index',
        type: 'unique',
        attributes: ['user_id', 'repo_owner', 'repo_name']
      }
    ]
  },
  
  NOTIFICATIONS: {
    id: 'notifications',
    name: 'Notifications',
    attributes: [
      {
        key: 'user_id',
        type: 'string',
        size: 36,
        required: true,
        default: null,
        array: false
      },
      {
        key: 'repository_id',
        type: 'string',
        size: 36,
        required: true,
        default: null,
        array: false
      },
      {
        key: 'issue_id',
        type: 'integer',
        required: true,
        default: null,
        array: false
      },
      {
        key: 'issue_title',
        type: 'string',
        size: 500,
        required: true,
        default: null,
        array: false
      },
      {
        key: 'issue_url',
        type: 'string',
        size: 500,
        required: true,
        default: null,
        array: false
      },
      {
        key: 'issue_labels',
        type: 'string',
        size: 50,
        required: false,
        default: null,
        array: true
      },
      {
        key: 'sent_at',
        type: 'datetime',
        required: true,
        default: null,
        array: false
      },
      {
        key: 'email_status',
        type: 'string',
        size: 20,
        required: true,
        default: 'pending',
        array: false
      }
    ],
    indexes: [
      {
        key: 'user_notifications_index',
        type: 'key',
        attributes: ['user_id']
      },
      {
        key: 'repository_notifications_index',
        type: 'key',
        attributes: ['repository_id']
      }
    ]
  },
  
  USER_ISSUE_TRACKERS: {
    id: 'user_issue_trackers',
    name: 'User Issue Trackers',
    attributes: [
      {
        key: 'user_id',
        type: 'string',
        size: 36,
        required: true,
        default: null,
        array: false
      },
      {
        key: 'repository_id',
        type: 'string',
        size: 36,
        required: true,
        default: null,
        array: false
      },
      {
        key: 'repo_owner',
        type: 'string',
        size: 100,
        required: true,
        default: null,
        array: false
      },
      {
        key: 'repo_name',
        type: 'string',
        size: 100,
        required: true,
        default: null,
        array: false
      },
      {
        key: 'last_issue_id',
        type: 'integer',
        required: true,
        default: 0,
        array: false
      },
      {
        key: 'last_issue_created_at',
        type: 'datetime',
        required: true,
        default: null,
        array: false
      },
      {
        key: 'last_checked_at',
        type: 'datetime',
        required: true,
        default: null,
        array: false
      }
    ],
    indexes: [
      {
        key: 'user_repo_tracker_index',
        type: 'unique',
        attributes: ['user_id', 'repository_id']
      },
      {
        key: 'user_trackers_index',
        type: 'key',
        attributes: ['user_id']
      },
      {
        key: 'repo_trackers_index',
        type: 'key',
        attributes: ['repo_owner', 'repo_name']
      }
    ]
  }
};

async function createDatabase() {
  try {
    console.log('🗄️  Creating database...');
    await databases.create(DATABASE_ID, 'Gitify Main Database');
    console.log('✅ Database created successfully');
  } catch (error) {
    if (error.code === 409) {
      console.log('ℹ️  Database already exists');
    } else {
      console.error('❌ Error creating database:', error.message);
      throw error;
    }
  }
}

async function createCollection(collectionConfig) {
  try {
    console.log(`📁 Creating collection: ${collectionConfig.name}`);
    
    // Create collection
    const collection = await databases.createCollection(
      DATABASE_ID,
      collectionConfig.id,
      collectionConfig.name,
      [
        sdk.Permission.read(sdk.Role.users()),
        sdk.Permission.write(sdk.Role.users()),
        sdk.Permission.create(sdk.Role.users()),
        sdk.Permission.update(sdk.Role.users()),
        sdk.Permission.delete(sdk.Role.users())
      ]
    );
    
    // Add attributes
    for (const attr of collectionConfig.attributes) {
      console.log(`  ➕ Adding attribute: ${attr.key}`);
      
      switch (attr.type) {
        case 'string':
          await databases.createStringAttribute(
            DATABASE_ID,
            collectionConfig.id,
            attr.key,
            attr.size,
            attr.required,
            attr.default,
            attr.array
          );
          break;
        case 'integer':
          await databases.createIntegerAttribute(
            DATABASE_ID,
            collectionConfig.id,
            attr.key,
            attr.required,
            null, // min
            null, // max
            attr.default,
            attr.array
          );
          break;
        case 'boolean':
          await databases.createBooleanAttribute(
            DATABASE_ID,
            collectionConfig.id,
            attr.key,
            attr.required,
            attr.default,
            attr.array
          );
          break;
        case 'datetime':
          await databases.createDatetimeAttribute(
            DATABASE_ID,
            collectionConfig.id,
            attr.key,
            attr.required,
            attr.default,
            attr.array
          );
          break;
      }
      
      // Wait a bit to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Add indexes
    if (collectionConfig.indexes) {
      for (const index of collectionConfig.indexes) {
        console.log(`  🔍 Adding index: ${index.key}`);
        await databases.createIndex(
          DATABASE_ID,
          collectionConfig.id,
          index.key,
          index.type,
          index.attributes
        );
        
        // Wait a bit to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log(`✅ Collection ${collectionConfig.name} created successfully`);
    
  } catch (error) {
    if (error.code === 409) {
      console.log(`ℹ️  Collection ${collectionConfig.name} already exists`);
    } else {
      console.error(`❌ Error creating collection ${collectionConfig.name}:`, error.message);
      throw error;
    }
  }
}

async function setup() {
  console.log('🚀 Starting Appwrite setup for Gitify...\n');
  
  // Validate environment variables
  if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) {
    throw new Error('NEXT_PUBLIC_APPWRITE_ENDPOINT is required');
  }
  
  if (!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
    throw new Error('NEXT_PUBLIC_APPWRITE_PROJECT_ID is required');
  }
  
  if (!process.env.APPWRITE_API_KEY) {
    throw new Error('APPWRITE_API_KEY is required. Please add it to your .env.local file');
  }
  
  try {
    // Create database
    await createDatabase();
    
    // Create collections
    for (const [key, config] of Object.entries(collections)) {
      await createCollection(config);
    }
    
    console.log('\n🎉 Appwrite setup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Go to your Appwrite console');
    console.log('2. Check that all collections were created');
    console.log('3. Set up authentication providers (Email/Password, GitHub OAuth)');
    console.log('4. Configure email settings for notifications');
    console.log('5. Deploy the GitHub polling function');
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run setup
setup();

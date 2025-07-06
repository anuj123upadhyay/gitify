import { Client, Account, Databases, Functions } from 'appwrite';

if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) {
  throw new Error('NEXT_PUBLIC_APPWRITE_ENDPOINT is required');
}

if (!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
  throw new Error('NEXT_PUBLIC_APPWRITE_PROJECT_ID is required');
}

if (!process.env.NEXT_PUBLIC_DATABASE_ID) {
  throw new Error('NEXT_PUBLIC_DATABASE_ID is required');
}

if (!process.env.NEXT_PUBLIC_COLLECTION_USERS) {
  throw new Error('NEXT_PUBLIC_COLLECTION_USERS is required');
}

if (!process.env.NEXT_PUBLIC_COLLECTION_REPOSITORIES) {
  throw new Error('NEXT_PUBLIC_COLLECTION_REPOSITORIES is required');
}

if (!process.env.NEXT_PUBLIC_COLLECTION_NOTIFICATIONS) {
  throw new Error('NEXT_PUBLIC_COLLECTION_NOTIFICATIONS is required');
}

export const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const functions = new Functions(client);

// Database and Collection IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID!;
export const COLLECTIONS = {
  USERS: process.env.NEXT_PUBLIC_COLLECTION_USERS!,
  REPOSITORIES: process.env.NEXT_PUBLIC_COLLECTION_REPOSITORIES!,
  NOTIFICATIONS: process.env.NEXT_PUBLIC_COLLECTION_NOTIFICATIONS!,
} as const;

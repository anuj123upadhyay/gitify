import { NextRequest, NextResponse } from 'next/server';
import { functions } from '@/lib/appwrite';

export async function GET(request: NextRequest) {
  try {
    // Check if function ID is configured
    if (!process.env.NEXT_PUBLIC_FUNCTION_POLLING) {
      throw new Error('NEXT_PUBLIC_FUNCTION_POLLING environment variable not configured');
    }

    // Execute the enhanced polling function to get token status
    const execution = await functions.createExecution(
      process.env.NEXT_PUBLIC_FUNCTION_POLLING!,
      JSON.stringify({
        action: 'get_token_status'
      })
    );

    // Wait for execution to complete
    let result = execution;
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds timeout

    while (result.status === 'processing' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      result = await functions.getExecution(
        process.env.NEXT_PUBLIC_FUNCTION_POLLING!,
        execution.$id
      );
      attempts++;
    }

    if (result.status === 'failed') {
      throw new Error(result.errors || 'Function execution failed');
    }

    if (result.status === 'processing') {
      throw new Error('Function execution timeout');
    }

    const response = JSON.parse(result.responseBody || '{}');
    
    return NextResponse.json({
      success: true,
      tokenStatus: response.tokenStatus || [],
      stats: response.stats || {},
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching token status:', error);
    
    // Determine error type for better user feedback
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isConfigurationError = errorMessage.includes('not found') || 
                                 errorMessage.includes('not configured') ||
                                 errorMessage.includes('Function with the requested ID');
    
    // Return helpful mock data for development/configuration issues
    return NextResponse.json({
      success: false,
      error: errorMessage,
      isConfigurationError,
      message: isConfigurationError 
        ? 'Function not configured. Please check NEXT_PUBLIC_FUNCTION_POLLING in your environment variables.'
        : 'Unable to fetch token status at this time',
      tokenStatus: [
        {
          name: 'Primary Token',
          remaining: 4850,
          resetTime: new Date(Date.now() + 3600000).toISOString(),
          isActive: true,
          lastUsed: new Date().toISOString()
        },
        {
          name: 'Token 1',
          remaining: 4920,
          resetTime: new Date(Date.now() + 3600000).toISOString(),
          isActive: true,
          lastUsed: new Date(Date.now() - 300000).toISOString()
        },
        {
          name: 'Token 2',
          remaining: 4995,
          resetTime: new Date(Date.now() + 3600000).toISOString(),
          isActive: true,
          lastUsed: new Date(Date.now() - 600000).toISOString()
        }
      ],
      stats: {
        totalRepositorySubscriptions: 0,
        uniqueRepositories: 0,
        totalNotifications: 0,
        executionTime: 0
      },
      lastUpdated: new Date().toISOString()
    });
  }
}

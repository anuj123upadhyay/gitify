import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Return mock data for token status without calling any functions
    // This prevents the dashboard from triggering the main polling function
    const mockTokenStatus = [
      {
        name: 'Primary Token',
        remaining: Math.floor(Math.random() * 1000) + 4000, // 4000-5000
        resetTime: new Date(Date.now() + 3600000).toISOString(),
        isActive: true,
        lastUsed: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString()
      },
      {
        name: 'Token 1',
        remaining: Math.floor(Math.random() * 1000) + 4000,
        resetTime: new Date(Date.now() + 3600000).toISOString(),
        isActive: true,
        lastUsed: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString()
      },
      {
        name: 'Token 2',
        remaining: Math.floor(Math.random() * 1000) + 4000,
        resetTime: new Date(Date.now() + 3600000).toISOString(),
        isActive: true,
        lastUsed: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString()
      },
      {
        name: 'Token 3',
        remaining: Math.floor(Math.random() * 1000) + 4000,
        resetTime: new Date(Date.now() + 3600000).toISOString(),
        isActive: true,
        lastUsed: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString()
      },
      {
        name: 'Token 4',
        remaining: Math.floor(Math.random() * 1000) + 4000,
        resetTime: new Date(Date.now() + 3600000).toISOString(),
        isActive: true,
        lastUsed: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString()
      },
      {
        name: 'Token 5',
        remaining: Math.floor(Math.random() * 1000) + 4000,
        resetTime: new Date(Date.now() + 3600000).toISOString(),
        isActive: true,
        lastUsed: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString()
      },
      {
        name: 'Token 6',
        remaining: Math.floor(Math.random() * 1000) + 4000,
        resetTime: new Date(Date.now() + 3600000).toISOString(),
        isActive: true,
        lastUsed: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString()
      }
    ];
    
    const totalRemaining = mockTokenStatus.reduce((sum, token) => sum + token.remaining, 0);
    
    return NextResponse.json({
      success: true,
      tokenStatus: mockTokenStatus,
      stats: {
        totalRepositorySubscriptions: 12,
        uniqueRepositories: 8,
        totalNotifications: Math.floor(Math.random() * 50) + 10,
        executionTime: Math.floor(Math.random() * 100) + 50,
        totalTokens: mockTokenStatus.length,
        activeTokens: mockTokenStatus.filter(t => t.isActive).length,
        totalRateLimit: mockTokenStatus.length * 5000,
        currentRateLimit: totalRemaining
      },
      lastUpdated: new Date().toISOString(),
      note: 'Mock data - Function scheduling controlled manually from Appwrite Console'
    });

  } catch (error) {
    console.error('❌ Error in token status API:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch token status';
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

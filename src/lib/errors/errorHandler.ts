/**
 * Centralized error handling utility for async and sync operations.
 * Returns a user-friendly error message and logs details for debugging.
 */
export function handleError(error: unknown, contextMessage = 'Error occurred'): string {
  // Log the error details for debugging purposes
  // (Do not log sensitive data in production)
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${contextMessage}]`, error);
  }
  return 'An unexpected error occurred. Please try again later.';
}

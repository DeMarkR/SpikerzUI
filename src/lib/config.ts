/**
 * API configuration
 * Uses NEXT_PUBLIC_API_URL from environment variables with fallback to localhost
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';


import { UserStatus } from '../types';

/**
 * Calculate user status based on remaining and limit
 * @param remaining - Number of requests remaining
 * @param limit - Total request limit
 * @returns User status: 'Exceeded' if no requests remaining, 'Warning' if at or below 10% of limit, 'OK' otherwise
 */
export function calculateUserStatus(remaining: number, limit: number): UserStatus {
	if (remaining <= 0) return 'Exceeded';
	if (remaining <= limit * 0.2) return 'Warning';
	return 'OK';
}

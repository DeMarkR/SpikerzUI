import { UserListResponseDtoUsersInner } from './api-client';

// Socket.IO event payloads mirrored from backend
export interface RateLimitUpdateEventPayload {
	userId: string;
	count: number;
	limit: number;
	remaining: number;
	resetAt: string; // ISO string
	lastRequest: string; // ISO string
}

export interface UserRateData extends RateLimitUpdateEventPayload {
	status: 'OK' | 'Warning' | 'Exceeded';
}

export interface RateLimitExceededEventPayload {
	userId: string;
}

// Mapping of events the server emits to clients via socket.io
export interface ServerToClientEvents {
	'rate:update': (payload: RateLimitUpdateEventPayload) => void;
	'rate:limit_exceeded': (payload: RateLimitExceededEventPayload) => void;
}

// User status type
export type UserStatus = 'OK' | 'Warning' | 'Exceeded';

// User table row type
export type UserWithStatus = UserListResponseDtoUsersInner & { status: UserStatus };
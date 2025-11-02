import { useEffect } from 'react';
import { socket } from '../lib/socket';
import { RateLimitUpdateEventPayload, RateLimitExceededEventPayload } from '../types';
import { UserListResponseDtoUsersInner } from '../api-client';

interface UseWebSocketParams {
	updateUser: (userId: string, updates: Partial<UserListResponseDtoUsersInner>) => void;
}

export function useWebSocket({ updateUser }: UseWebSocketParams) {
	useEffect(() => {
		socket.on('rate:update', (payload: RateLimitUpdateEventPayload) => {
			console.log('rate limit updated', payload);
			updateUser(payload.userId, payload);
		});

		socket.on('rate:limit_exceeded', (payload: RateLimitExceededEventPayload) => {
			console.log('rate limit exceeded', payload);
			updateUser(payload.userId, { remaining: 0 });
		});

		return () => {
			socket.off('connect');
			socket.off('disconnect');
			socket.off('rate:update');
			socket.off('rate:limit_exceeded');
		};
	}, [updateUser]);
}

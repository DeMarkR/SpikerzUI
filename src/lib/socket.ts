import { io, Socket } from 'socket.io-client';
import type { ServerToClientEvents } from '../types';
import { API_BASE_URL } from './config';

export const socket: Socket<ServerToClientEvents> = io(API_BASE_URL, { transports: ['websocket'], autoConnect: true });
// basic connection debug logs
socket.on('connect', () => {
	console.log('[socket] connected', socket.id);
});
socket.on('disconnect', (reason) => {
	console.log('[socket] disconnected', reason);
});

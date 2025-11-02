'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container, Box, Typography, Card, CardContent, ToggleButtonGroup, ToggleButton, Divider, List, ListItem, ListItemText, IconButton, Stack } from '@mui/material';
import { socket } from '@/lib/socket';
import type { RateLimitUpdateEventPayload, UserRateData } from '@/types';
import dayjs from 'dayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UsersApi, UserStatsDto, UsersControllerHistoryRangeEnum } from '@/api-client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { calculateUserStatus } from '@/lib/utils';
import { API_BASE_URL } from '@/lib/config';

type HistoryRange = 'hour' | 'day';

type UserStats = UserRateData;

export default function UserDetailPage() {
	const params = useParams();
	const userId = useMemo(() => String(params.userId), [params.userId]);
	const [events, setEvents] = useState<string[]>([]);
	const [range, setRange] = useState<HistoryRange>('hour');
	const router = useRouter();
	const queryClient = useQueryClient();

	// Fetch user stats
	const { data: stats } = useQuery({
		queryKey: ['user-stats', userId],
		queryFn: async () => {
			const usersApi = new UsersApi(undefined, API_BASE_URL);
			const response = await usersApi.usersControllerStats(userId);
			const data = response.data;
			return {
				...data,
				status: calculateUserStatus(data.remaining, data.limit),
			} as UserStats;
		},
	});

	// Fetch user history
	const { data: history = [] } = useQuery({
		queryKey: ['user-history', userId, range],
		queryFn: async () => {
			const usersApi = new UsersApi(undefined, API_BASE_URL);
			const response = await usersApi.usersControllerHistory(
				userId,
				range as UsersControllerHistoryRangeEnum
			);
			return response.data.timestamps;
		},
	});

	const updateStats = useCallback(
		(updates: Partial<UserStatsDto>) => {
			queryClient.setQueryData<UserStats>(['user-stats', userId], (oldStats) => {
				if (!oldStats) return oldStats;
				const newStats = { ...oldStats, ...updates };
				return {
					...newStats,
					status: calculateUserStatus(newStats.remaining, newStats.limit),
				} as UserStats;
			});
		},
		[queryClient, userId]
	);

	const addToHistory = useCallback(
		(timestamp: string) => {
			queryClient.setQueryData<string[]>(['user-history', userId, range], (oldHistory = []) => {
				return [timestamp, ...oldHistory];
			});
		},
		[queryClient, userId, range]
	);

	useEffect(() => {
		const onUpdate = (payload: RateLimitUpdateEventPayload) => {
			if (payload.userId !== userId) return;
			updateStats(payload);
			setEvents((prev) => [`@${dayjs(payload.lastRequest).format('HH:mm:ss')} count=${payload.count} remaining=${payload.remaining}`, ...prev.slice(0, 99)]);
			addToHistory(payload.lastRequest);
		};
		socket.on('rate:update', onUpdate);
		return () => {
			socket.off('rate:update', onUpdate);
		};
	}, [userId, updateStats, addToHistory]);

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<Stack direction="row" spacing={2} sx={{ alignItems: 'center', marginBottom: 2 }}>
				<IconButton aria-label="Back to home" onClick={() => router.push('/')}>
					<ArrowBackIcon />
				</IconButton>
				<Box mb={3}>
					<Typography variant="h5">User: {userId}</Typography>
					<Typography variant="body2" color="text.secondary">
						Live stats and activity
					</Typography>
				</Box>
			</Stack>
			<Box display="grid" gap={2} sx={{ gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' } }}>
				<Box>
					<Card>
						<CardContent>
							<Typography variant="subtitle2">Remaining</Typography>
							<Typography variant="h5">{stats ? stats.remaining : '-'}</Typography>
						</CardContent>
					</Card>
				</Box>
				<Box>
					<Card>
						<CardContent>
							<Typography variant="subtitle2">Limit</Typography>
							<Typography variant="h5">{stats ? stats.limit : '-'}</Typography>
						</CardContent>
					</Card>
				</Box>
				<Box>
					<Card>
						<CardContent>
							<Typography variant="subtitle2">Status</Typography>
							<Typography variant="h5">{stats ? stats.status : '-'}</Typography>
						</CardContent>
					</Card>
				</Box>
				<Box>
					<Card>
						<CardContent>
							<Typography variant="subtitle2">Reset</Typography>
							<Typography variant="h6">{stats ? dayjs(stats.resetAt).format('HH:mm:ss') : '-'}</Typography>
						</CardContent>
					</Card>
				</Box>
			</Box>

			<Box mt={4}>
				<Typography variant="h6" gutterBottom>
					Activity History
				</Typography>
				<ToggleButtonGroup size="small" exclusive value={range} onChange={(_e, v) => v && setRange(v)}>
					<ToggleButton value="hour">Past Hour</ToggleButton>
					<ToggleButton value="day">Past Day</ToggleButton>
				</ToggleButtonGroup>
				<Divider sx={{ my: 2 }} />
				<List dense sx={{ overflow: 'auto', maxHeight: '300px' }}>
					{history.length === 0 && (
						<ListItem>
							<ListItemText primary="No activity in range" />
						</ListItem>
					)}
					{history.map((timestamp, index) => (
						<ListItem key={index}>
							<ListItemText primary={dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')} />
						</ListItem>
					))}
				</List>
			</Box>

			<Box mt={4}>
				<Typography variant="h6" gutterBottom>
					Live Event Stream
				</Typography>
				{events.length > 0 && (
					<List dense sx={{ backgroundColor: '#1e1e1e', borderRadius: 1, overflow: 'auto', maxHeight: '300px' }}>
						{events.map((event, index) => (
							<ListItem key={index}>
								<ListItemText primary={event} />
							</ListItem>
						))}
					</List>
				)}
			</Box>
		</Container>
	);
}

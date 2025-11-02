'use client';
import React, { useCallback, useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { UserWithStatus } from '../types';
import { calculateUserStatus } from '../lib/utils';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { UserListResponseDtoUsersInner, UsersApi } from '../api-client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useWebSocket } from '../hooks/useWebSocket';
import { API_BASE_URL } from '../lib/config';

export default function UserTable() {
	const router = useRouter();
	const queryClient = useQueryClient();

	const { data: users } = useQuery({
		queryKey: ['users'],
		queryFn: async () => {
			const usersApi = new UsersApi(undefined, API_BASE_URL);
			const response = await usersApi.usersControllerList();
			return response.data.users;
		},
	});

	const updateUser = useCallback(
		(userId: string, updates: Partial<UserListResponseDtoUsersInner>) => {
			queryClient.setQueryData<UserListResponseDtoUsersInner[]>(['users'], (oldUsers = []) => {
				const existingUser = oldUsers.find((u) => u.userId === userId);
				if (existingUser) {
					return oldUsers.map((u) => (u.userId === userId ? { ...u, ...updates } : u));
				}
				return [...oldUsers, { userId, ...updates } as UserListResponseDtoUsersInner];
			});
		},
		[queryClient]
	);

	useWebSocket({ updateUser });

	const columns = useMemo<MRT_ColumnDef<UserWithStatus>[]>(
		() => [
			{ accessorKey: 'userId', header: 'User ID' },
			{
				header: 'Remaining / Total',
				accessorFn: (row) => `${row.remaining} / ${row.limit}`,
				enableColumnFilter: false,
			},
			{
				header: 'Reset Time',
				accessorFn: (row) => dayjs(row.resetAt).format('HH:mm:ss'),
				enableColumnFilter: false,
			},
			{
				accessorKey: 'status',
				header: 'Status',
				filterVariant: 'select',
				filterSelectOptions: ['OK', 'Warning', 'Exceeded'],
			},
			{
				header: 'Last Request',
				accessorFn: (row) => (row.lastRequest ? dayjs(row.lastRequest).format('HH:mm:ss') : '-'),
				id: 'lastRequest',
				filterVariant: 'select',
				filterSelectOptions: ['5m', '15m', '1h', '24h'],
				filterFn: (row, _columnId, filterValue: string) => {
					if (!filterValue) return true;
					const last = row.original.lastRequest ? dayjs(row.original.lastRequest) : null;
					if (!last) return false;
					const now = dayjs();
					const map: Record<string, number> = { '5m': 5, '15m': 15, '1h': 60, '24h': 1440 };
					const minutes = map[filterValue] ?? 0;
					return last.isAfter(now.subtract(minutes, 'minute'));
				},
			},
		],
		[]
	);

	const mappedUsers = useMemo(
		() =>
			users?.map(
				(user): UserWithStatus => ({
					userId: user.userId,
					remaining: user.remaining,
					count: user.count,
					limit: user.limit,
					resetAt: user.resetAt,
					lastRequest: user.lastRequest,
					status: calculateUserStatus(user.remaining, user.limit),
				})
			) || [],
		[users]
	);

	const table = useMaterialReactTable({
		columns,
		data: mappedUsers,
		autoResetPageIndex: false,
		enableDensityToggle: false,
		enableFullScreenToggle: false,
		enableHiding: false,
		enableColumnFilters: true,
		enableGlobalFilter: true,
		initialState: { showGlobalFilter: true },
		muiTableBodyRowProps: ({ row }) => ({
			sx: {
				backgroundColor: row.original.status === 'Exceeded' ? 'rgba(255,0,0,0.15)' : row.original.status === 'Warning' ? 'rgba(255,255,0,0.1)' : undefined,
				cursor: 'pointer',
			},
			onClick: () => router.push(`/users/${row.original.userId}`),
		}),
	});

	return <MaterialReactTable table={table} />;
}

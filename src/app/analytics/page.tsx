'use client';

import { Container, Box, Typography, Card, CardContent, List, ListItem, ListItemText, IconButton, Stack } from '@mui/material';
import { AnalyticsApi } from '@/api-client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { API_BASE_URL } from '@/lib/config';

export default function AnalyticsPage() {
	const router = useRouter();

	const { data: summary } = useQuery({
		queryKey: ['analytics-summary'],
		queryFn: async () => {
			const api = new AnalyticsApi(undefined, API_BASE_URL);
			const response = await api.analyticsControllerSummary();
			return response.data;
		},
	});

	const { data: top = [] } = useQuery({
		queryKey: ['analytics-top'],
		queryFn: async () => {
			const api = new AnalyticsApi(undefined, API_BASE_URL);
			const response = await api.analyticsControllerTop();
			const data = response.data;
			return data.users;
		},
	});

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<Stack direction="row" spacing={2} sx={{ alignItems: 'center', marginBottom: 2 }}>
				<IconButton aria-label="Back to home" onClick={() => router.push('/')}>
					<ArrowBackIcon />
				</IconButton>
				<Box mb={3}>
					<Typography variant="h5">Analytics</Typography>
					<Typography variant="body2" color="text.secondary">
						Overview and top users
					</Typography>
				</Box>
			</Stack>
			<Box display="grid" gap={2} sx={{ gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' } }}>
				<Box>
					<Card>
						<CardContent>
							<Typography variant="subtitle2">Total Users</Typography>
							<Typography variant="h4">{summary?.totalUsers ?? '-'}</Typography>
						</CardContent>
					</Card>
				</Box>
				<Box>
					<Card>
						<CardContent>
							<Typography variant="subtitle2">% Near Limit</Typography>
							<Typography variant="h4">{summary?.percentNearLimit ?? '-'}%</Typography>
						</CardContent>
					</Card>
				</Box>
			</Box>

		<Box mt={4}>
			<Typography variant="h6" gutterBottom>
				Top Users
			</Typography>
			<Box display="flex" justifyContent="space-between" px={2} py={1} bgcolor="background.paper">
				<Typography variant="subtitle2" color="text.secondary">User ID</Typography>
				<Typography variant="subtitle2" color="text.secondary">Count</Typography>
			</Box>
			<List>
				{top.map((u) => (
					<ListItem key={u.userId} secondaryAction={<Typography>{u.count}</Typography>}>
						<ListItemText primary={u.userId} />
					</ListItem>
				))}
			</List>
		</Box>
		</Container>
	);
}

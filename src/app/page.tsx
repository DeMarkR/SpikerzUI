'use client';
import { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Link from 'next/link';
import UserTable from '../components/UserTable';
import AdminModal from '../components/AdminModal';

export default function Home() {
	const [adminModalOpen, setAdminModalOpen] = useState(false);

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<Box textAlign="center" mb={3}>
				<Typography variant="h4" gutterBottom>
					Spikerz Rate Limit Dashboard
				</Typography>
				<Typography variant="subtitle1">Live user requests — updated via WebSocket</Typography>
			</Box>
			<Box display="flex" justifyContent="center" gap={2} mb={3}>
				<Button onClick={() => setAdminModalOpen(true)} variant="outlined">
					Admin Controls
				</Button>
				<Button component={Link} href="/analytics" variant="outlined">
					Analytics
				</Button>
			</Box>
			<UserTable />
			<AdminModal open={adminModalOpen} onClose={() => setAdminModalOpen(false)} />
		</Container>
	);
}

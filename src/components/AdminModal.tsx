'use client';

import { useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Alert, InputAdornment, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { AdminRateLimitApi } from '@/api-client';
import CloseIcon from '@mui/icons-material/Close';
import { API_BASE_URL } from '@/lib/config';
import { useQueryClient } from '@tanstack/react-query';

interface AdminModalProps {
	open: boolean;
	onClose: () => void;
}

export default function AdminModal({ open, onClose }: AdminModalProps) {
	const [userId, setUserId] = useState('');
	const [adjustValue, setAdjustValue] = useState<number>(100);
	const [extra, setExtra] = useState<number>(10);
	const [suspendSeconds, setSuspendSeconds] = useState<number>(3600);
	const [message, setMessage] = useState<string>('');
	const queryClient = useQueryClient();

	const handleClose = () => {
		// Reset all values when modal closes
		setUserId('');
		setAdjustValue(100);
		setExtra(10);
		setSuspendSeconds(3600);
		setMessage('');
		onClose();
	};

	const withMsg = async (fn: () => Promise<void>) => {
		setMessage('');
		try {
			await fn();
			setMessage('Success');
			// Invalidate users query to refetch updated data
			queryClient.invalidateQueries({ queryKey: ['users'] });
		} catch {
			setMessage('Failed');
		}
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
			<DialogTitle>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Box>
						<Typography variant="h6">Admin Controls</Typography>
						<Typography variant="body2" color="text.secondary">
							Manage rate limits for a user
						</Typography>
					</Box>
					<IconButton aria-label="close" onClick={handleClose} size="small">
						<CloseIcon />
					</IconButton>
				</Box>
			</DialogTitle>
			<DialogContent>
				<Stack spacing={2} sx={{ mt: 1 }}>
					<Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
						<TextField label="User ID" fullWidth value={userId} onChange={(e) => setUserId(e.target.value)} />
						{/* Reset */}
						<Button
							variant="contained"
							onClick={() =>
								withMsg(async () => {
									const api = new AdminRateLimitApi(undefined, API_BASE_URL);
									await api.rateLimitAdminControllerReset(userId);
								})
							}
							disabled={!userId}
						>
							Reset
						</Button>
					</Stack>

					{/* Adjust */}
					<Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
						<TextField
							type="number"
							label="Adjust number of calls"
							fullWidth
							value={adjustValue}
							onChange={(e) => setAdjustValue(parseInt(e.target.value || '0', 10))}
						/>
						<Button
							variant="outlined"
							onClick={() =>
								withMsg(async () => {
									const api = new AdminRateLimitApi(undefined, API_BASE_URL);
									await api.rateLimitAdminControllerAdjust(userId, { value: adjustValue });
								})
							}
							disabled={!userId}
						>
							Adjust
						</Button>
					</Stack>

					{/* Add Extra */}
					<Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
						<TextField type="number" label="Add extra calls" fullWidth value={extra} onChange={(e) => setExtra(parseInt(e.target.value || '0', 10))} />
						<Button
							variant="outlined"
							onClick={() =>
								withMsg(async () => {
									const api = new AdminRateLimitApi(undefined, API_BASE_URL);
									await api.rateLimitAdminControllerAdd(userId, { extra });
								})
							}
							disabled={!userId}
							sx={{ flexShrink: 0 }}
						>
							Add Extra
						</Button>
					</Stack>

					{/* Suspend / Unsuspend */}
					<Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
						<TextField
							type="number"
							label="Suspend for"
							fullWidth
							value={suspendSeconds}
							onChange={(e) => setSuspendSeconds(parseInt(e.target.value || '0', 10))}
							slotProps={{
								input: {
									endAdornment: <InputAdornment position="end">seconds</InputAdornment>,
								},
							}}
						/>
						<Button
							color="warning"
							variant="contained"
							onClick={() =>
								withMsg(async () => {
									const api = new AdminRateLimitApi(undefined, API_BASE_URL);
									await api.rateLimitAdminControllerSuspend(userId, { seconds: suspendSeconds });
								})
							}
							disabled={!userId}
							sx={{ flexShrink: 0 }}
						>
							Suspend
						</Button>
						<Button
							color="success"
							variant="outlined"
							onClick={() =>
								withMsg(async () => {
									const api = new AdminRateLimitApi(undefined, API_BASE_URL);
									await api.rateLimitAdminControllerUnsuspend(userId);
								})
							}
							disabled={!userId}
							sx={{ flexShrink: 0 }}
						>
							Unsuspend
						</Button>
					</Stack>

					{message && <Alert severity={message === 'Success' ? 'success' : 'error'}>{message}</Alert>}
				</Stack>
			</DialogContent>
		</Dialog>
	);
}

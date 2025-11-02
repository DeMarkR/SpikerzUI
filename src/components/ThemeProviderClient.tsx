'use client';

import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/theme';

type Props = {
	children: React.ReactNode;
};

export default function ThemeProviderClient({ children }: Props) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}



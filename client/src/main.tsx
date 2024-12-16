import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'bootstrap/dist/css/bootstrap.min.css';

import '@/styles/globals.css';
import App from '@/App';
import queryClient from '@/services/queryClient';

const root = document.getElementById('root');

if (root) {
	createRoot(root!).render(
		<StrictMode>
			<CookiesProvider>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</CookiesProvider>
		</StrictMode>,
	);
} else {
	throw new Error('Root element is not exist !!!');
}

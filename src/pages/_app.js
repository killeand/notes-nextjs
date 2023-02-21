import { UserProvider } from '@/components/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import '@/styles/globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
    return (
        <UserProvider>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
                <ReactQueryDevtools />
            </QueryClientProvider>
        </UserProvider>
    );
}

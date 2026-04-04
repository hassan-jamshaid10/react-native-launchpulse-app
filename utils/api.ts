// src/utils/trpc.ts
import { QueryClient } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import 'react-native-url-polyfill/auto'; // required for React Native

// TODO: Replace 'any' with your AppRouter type from your server
export const trpc = createTRPCReact<any>();

export const queryClient = new QueryClient();

// Determine API base URL
const getBaseUrl = () => {
    if (process.env.EXPO_PUBLIC_API_URL) return process.env.EXPO_PUBLIC_API_URL;
    if (Platform.OS === 'android') return 'http://10.0.2.2:3000';
    if (Platform.OS === 'ios') return 'http://localhost:3000';
    return 'http://localhost:3000';
};

import superjson from 'superjson';

// tRPC client for React Native
export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: `${getBaseUrl()}/api/trpc`,
            transformer: superjson,
            async headers() {
                const token = await SecureStore.getItemAsync('user-token');
                return {
                    authorization: token ? `Bearer ${token}` : undefined,
                };
            },
        }),
    ],
});

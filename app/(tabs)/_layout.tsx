import { Tabs } from 'expo-router';
import {
    ClipboardCheck,
    LayoutDashboard,
    LayoutGrid,
    LineChart,
    MessageSquare
} from 'lucide-react-native';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <Tabs screenOptions={{
            headerShown: false, // Custom headers handled inside screens
            tabBarActiveTintColor: '#732ee4',
            tabBarInactiveTintColor: isDark ? '#94a3b8' : '#47464f',
            tabBarStyle: {
                backgroundColor: isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)',
                borderTopWidth: 1,
                borderTopColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(200,197,208,0.2)',
                height: 65,
                paddingBottom: 10,
                paddingTop: 10,
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.05,
                shadowRadius: 20,
                position: 'absolute', // for blur effect over content if supported
            },
            tabBarLabelStyle: {
                fontFamily: 'Inter_700Bold',
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginTop: 2,
            },
        }}>
            {/* New Main Tabs */}
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color }) => <LayoutDashboard color={color} size={24} />,
                }}
            />
            <Tabs.Screen
                name="evaluations"
                options={{
                    title: 'Evaluations',
                    tabBarIcon: ({ color }) => <ClipboardCheck color={color} size={24} />,
                }}
            />
            <Tabs.Screen
                name="startups"
                options={{
                    title: 'STARTUPS',
                    tabBarIcon: ({ color }) => <LayoutGrid color={color} size={24} />,
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: 'AI Chat',
                    tabBarIcon: ({ color }) => <MessageSquare color={color} size={24} />,
                }}
            />
            <Tabs.Screen
                name="insights"
                options={{
                    title: 'Insights',
                    tabBarIcon: ({ color }) => <LineChart color={color} size={24} />,
                }}
            />

            {/* Hidden / Internal Tabs */}
            <Tabs.Screen
                name="auth"
                options={{
                    title: 'Sign In',
                    href: null,
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="getting-started"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="dataset"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="evaluation-hub"
                options={{
                    title: 'Evaluation Hub',
                    href: null,
                }}
            />
            <Tabs.Screen
                name="evaluation-detail"
                options={{
                    title: 'Evaluation Detail',
                    href: null,
                }}
            />
            <Tabs.Screen
                name="startup-comparisons"
                options={{
                    title: 'Startup Comparisons',
                    href: null,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    href: null,
                }}
            />
            <Tabs.Screen
                name="team"
                options={{
                    title: 'Team',
                    href: null,
                }}
            />
            <Tabs.Screen
                name="deep-dive-analysis"
                options={{
                    title: 'Deep Dive Analysis',
                    href: null,
                }}
            />
            <Tabs.Screen
                name="team-workspace-members"
                options={{
                    title: 'Workspace Members',
                    href: null,
                }}
            />
            <Tabs.Screen
                name="workspaces"
                options={{
                    title: 'Workspaces',
                    href: null,
                }}
            />
        </Tabs>
    );
}

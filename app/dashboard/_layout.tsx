import DashboardHeader from '@/components/DashboardHeader';
import Sidebar from '@/components/Sidebar';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function DashboardLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                drawerContent={(props) => <Sidebar {...props} />}
                screenOptions={{
                    header: () => <DashboardHeader />,
                    headerShown: true,
                    drawerStyle: {
                        width: 280,
                    },
                }}
            >
                <Drawer.Screen
                    name="index"
                    options={{
                        title: 'Dashboard',
                        headerTitle: 'Dashboard',
                    }}
                />
                <Drawer.Screen
                    name="new-evaluation"
                    options={{
                        title: 'New Evaluation',
                        headerTitle: 'New Evaluation',
                    }}
                />
                <Drawer.Screen
                    name="startups"
                    options={{
                        title: 'My Startups',
                        headerTitle: 'My Startups',
                    }}
                />
                <Drawer.Screen
                    name="history"
                    options={{
                        title: 'History',
                        headerTitle: 'History',
                    }}
                />
                <Drawer.Screen
                    name="chat"
                    options={{
                        title: 'AI Assistant',
                        headerTitle: 'AI Assistant',
                    }}
                />
                <Drawer.Screen
                    name="portfolio"
                    options={{
                        title: 'Portfolio',
                        headerTitle: 'Portfolio',
                    }}
                />
                <Drawer.Screen
                    name="analytics"
                    options={{
                        title: 'Analytics',
                        headerTitle: 'Analytics',
                    }}
                />
                <Drawer.Screen
                    name="reports"
                    options={{
                        title: 'Reports',
                        headerTitle: 'Reports',
                    }}
                />
                <Drawer.Screen
                    name="team"
                    options={{
                        title: 'Team',
                        headerTitle: 'Team',
                    }}
                />
                <Drawer.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                        headerTitle: 'Settings',
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}

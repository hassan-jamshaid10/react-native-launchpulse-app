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
                <Drawer.Screen name="index" options={{ title: 'Dashboard' }} />
                <Drawer.Screen name="evaluations" options={{ title: 'Evaluations' }} />
                <Drawer.Screen name="startups" options={{ title: 'My Startups' }} />
                <Drawer.Screen name="analytics" options={{ title: 'Analytics' }} />
                <Drawer.Screen name="competitors" options={{ title: 'Competitors' }} />
                <Drawer.Screen name="competitors_deepdive" options={{ title: 'Deep Dive Analysis', drawerItemStyle: { display: 'none' } }} />
                <Drawer.Screen name="roadmap" options={{ title: 'Roadmap' }} />
                <Drawer.Screen name="chat" options={{ title: 'AI Assistant' }} />
                
                <Drawer.Screen name="reports" options={{ title: 'Reports' }} />
                <Drawer.Screen name="team" options={{ title: 'Team' }} />
                <Drawer.Screen name="documentation" options={{ title: 'Documentation' }} />
                <Drawer.Screen name="settings" options={{ title: 'Settings' }} />
            </Drawer>
        </GestureHandlerRootView>
    );
}

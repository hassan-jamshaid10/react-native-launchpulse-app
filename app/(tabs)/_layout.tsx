import { Tabs, useRouter } from 'expo-router';
import { BookOpen, Database, Home, Lightbulb, UserCircle } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function GetStartedButton({ onPress }: { onPress: () => void }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.btn} activeOpacity={0.7}>
            <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
    );
}

export default function TabLayout() {
    const router = useRouter();

    return (
        <Tabs screenOptions={{
            headerShown: true,
            headerTitle: 'LaunchPulse',
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: '#030712',
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(255,255,255,0.05)',
                elevation: 0,
                shadowOpacity: 0,
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
                fontFamily: 'Inter_900Black',
                fontSize: 22,
                letterSpacing: -0.5,
            },
            tabBarActiveTintColor: '#3b82f6',
            tabBarInactiveTintColor: '#6b7280',
            tabBarStyle: {
                backgroundColor: '#030712',
                borderTopWidth: 1,
                borderTopColor: 'rgba(255,255,255,0.05)',
                height: 65,
                paddingBottom: 10,
                paddingTop: 10,
                elevation: 0,
            },
            tabBarLabelStyle: {
                fontFamily: 'Inter_600SemiBold',
                fontSize: 11,
            },
        }}>
            {/* Home — has "Get Started" button in top-right header */}
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Home color={color} size={24} />,
                    headerRight: () => (
                        <GetStartedButton onPress={() => router.push('/(tabs)/auth')} />
                    ),
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    title: 'About',
                    tabBarIcon: ({ color }) => <Lightbulb color={color} size={24} />,
                }}
            />

            {/* Centre Sign In tab */}
            <Tabs.Screen
                name="auth"
                options={{
                    title: 'Sign In',
                    tabBarIcon: ({ color }) => <UserCircle color="#2563eb" size={32} />,
                }}
            />

            <Tabs.Screen
                name="getting-started"
                options={{
                    title: 'Start',
                    tabBarIcon: ({ color }) => <BookOpen color={color} size={24} />,
                }}
            />
            <Tabs.Screen
                name="dataset"
                options={{
                    title: 'Dataset',
                    tabBarIcon: ({ color }) => <Database color={color} size={24} />,
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    btn: {
        marginRight: 16,
        paddingHorizontal: 16,
        paddingVertical: 7,
        borderRadius: 999,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.5)',
        backgroundColor: 'transparent',
    },
    btnText: { fontFamily: 'Inter_600SemiBold', color: '#ffffff', fontSize: 13 },
});

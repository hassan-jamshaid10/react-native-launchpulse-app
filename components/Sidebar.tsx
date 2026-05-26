import { MAIN_NAVIGATION, NavigationItem, SETTINGS_NAVIGATION } from '@/constants/navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { usePathname, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Sidebar(props: DrawerContentComponentProps) {
    const router = useRouter();
    const pathname = usePathname();
    const insets = useSafeAreaInsets();

    const isActive = (route: string) => {
        if (route === '/dashboard') {
            return pathname === route;
        }
        return pathname?.startsWith(route);
    };

    const renderNavItem = (item: NavigationItem) => {
        const active = isActive(item.route);

        return (
            <TouchableOpacity
                key={item.id}
                onPress={() => {
                    router.push(item.route as any);
                }}
                style={[
                    styles.navItem,
                    active ? styles.navItemActive : styles.navItemInactive
                ]}
            >
                <View style={styles.navItemContent}>
                    <MaterialCommunityIcons
                        name={item.icon}
                        size={22}
                        color={active ? '#FFFFFF' : '#111827'}
                        style={styles.icon}
                    />
                    <Text style={[
                        styles.navText,
                        active ? styles.navTextActive : styles.navTextInactive
                    ]}>
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingTop: Math.max(insets.top, 20) + 10 }
                ]}
                scrollEnabled={true}
            >
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>MAIN MENU</Text>
                    <View style={styles.itemsContainer}>
                        {MAIN_NAVIGATION.map(renderNavItem)}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>SETTINGS</Text>
                    <View style={styles.itemsContainer}>
                        {SETTINGS_NAVIGATION.map(renderNavItem)}
                    </View>
                </View>
            </DrawerContentScrollView>

            {/* Footer or close button could go here if needed, but Drawer handles standard behavior */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRightWidth: 1,
        borderRightColor: '#E5E7EB', // gray-200
    },
    scrollContent: {
        paddingTop: 20,
        paddingHorizontal: 16,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#111827', // gray-900
        marginBottom: 12,
        paddingHorizontal: 12,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    itemsContainer: {
        gap: 4,
    },
    navItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 12, // rounded-xl
    },
    navItemActive: {
        backgroundColor: '#111827', // gray-900
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    navItemInactive: {
        backgroundColor: 'transparent',
    },
    navItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 12,
    },
    navText: {
        fontSize: 14,
        fontWeight: '500',
    },
    navTextActive: {
        color: '#FFFFFF',
    },
    navTextInactive: {
        color: '#111827', // gray-900
    },
});

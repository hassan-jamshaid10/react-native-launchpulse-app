import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { usePathname, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import {
    Activity, BookOpen, Bot, Briefcase, FileText,
    LayoutDashboard, Map, Settings, Users, LogOut
} from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/* ── Stitch Colors ── */
const C = {
    primary: '#110031',
    tint: '#732ee4',
    tintEnd: '#2d0069',
    secondary: '#5b598c',
    onSurfaceVariant: '#47464f',
    surface: '#f7f9fb',
    surfaceLow: '#f2f4f6',
    surfaceContainer: '#eceef0',
    white: '#ffffff',
    outline: '#c8c5d0',
};

const MAIN_NAV = [
    { name: 'Dashboard', route: '/dashboard', Icon: LayoutDashboard },
    { name: 'Evaluations', route: '/dashboard/evaluations', Icon: Activity },
    { name: 'My Startups', route: '/dashboard/startups', Icon: Briefcase },
    { name: 'Analytics', route: '/dashboard/analytics', Icon: Activity },
    { name: 'Competitors', route: '/dashboard/competitors', Icon: Activity },
    { name: 'Roadmap', route: '/dashboard/roadmap', Icon: Map },
    { name: 'AI Assistant', route: '/dashboard/chat', Icon: Bot },
];

const SETTINGS_NAV = [
    { name: 'Reports', route: '/dashboard/reports', Icon: FileText },
    { name: 'Teams', route: '/dashboard/team', Icon: Users },
    { name: 'Documentation', route: '/dashboard/documentation', Icon: BookOpen },
    { name: 'Settings', route: '/dashboard/settings', Icon: Settings },
];

export default function Sidebar(props: DrawerContentComponentProps) {
    const router = useRouter();
    const pathname = usePathname();
    const insets = useSafeAreaInsets();

    const isActive = (route: string) => {
        if (route === '/dashboard') return pathname === route || pathname === '/dashboard/';
        return pathname?.startsWith(route);
    };

    const renderItem = (item: typeof MAIN_NAV[0]) => {
        const active = isActive(item.route);

        return (
            <TouchableOpacity
                key={item.name}
                onPress={() => router.push(item.route as any)}
                activeOpacity={0.8}
                style={[s.navItem, active && s.navItemActive]}
            >
                <item.Icon 
                    size={20} 
                    color={active ? C.tint : C.onSurfaceVariant} 
                    style={s.navIcon} 
                />
                <Text style={[s.navText, active && s.navTextActive]}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={s.container}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ paddingTop: Math.max(insets.top, 24), paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Brand */}
                <View style={s.brandBox}>
                    <View style={s.brandRow}>
                        <LinearGradient colors={[C.tint, C.tintEnd]} style={s.brandIcon} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                            <MaterialIcons name="token" size={20} color="#fff" />
                        </LinearGradient>
                        <Text style={s.brandText}>LaunchPulse</Text>
                    </View>
                    <Text style={s.brandSub}>STARTUP SUCCESS EVALUATOR</Text>
                </View>

                {/* Main Navigation */}
                <View style={s.navGroup}>
                    {MAIN_NAV.map(renderItem)}
                </View>

                {/* Divider */}
                <View style={s.divider} />

                {/* Settings Navigation */}
                <View style={s.navGroup}>
                    {SETTINGS_NAV.map(renderItem)}
                </View>

            </DrawerContentScrollView>

            <View style={[s.userSection, { paddingBottom: Math.max(insets.bottom, 24) }]}>
                <View style={s.userBlock}>
                    <LinearGradient colors={[C.tint, C.tintEnd]} style={s.avatar} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                        <Text style={s.avatarText}>US</Text>
                    </LinearGradient>
                    <View style={{ flex: 1 }}>
                        <Text style={s.userName} numberOfLines={1}>User Account</Text>
                        <Text style={s.userEmail} numberOfLines={1}>user@example.com</Text>
                    </View>
                    <TouchableOpacity 
                        style={s.signOutBtn} 
                        activeOpacity={0.7} 
                        onPress={() => router.replace('/')}
                    >
                        <LogOut size={18} color="#ef4444" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: C.surfaceLow, // Light gray Ivory Meridian background
        borderRightWidth: 1,
        borderRightColor: 'transparent',
    },
    brandBox: { paddingHorizontal: 24, marginBottom: 32 },
    brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
    brandIcon: { width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    brandText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 20, color: C.primary, letterSpacing: -0.5 },
    brandSub: { fontFamily: 'Manrope_700Bold', fontSize: 10, color: C.onSurfaceVariant, letterSpacing: 1.5, opacity: 0.7 },

    navGroup: { gap: 4 },
    navItem: {
        flexDirection: 'row', alignItems: 'center',
        paddingVertical: 12, paddingHorizontal: 16,
        marginLeft: 16, borderTopLeftRadius: 12, borderBottomLeftRadius: 12,
        transition: 'all 0.2s',
    },
    navItemActive: {
        backgroundColor: C.white,
        shadowColor: '#191c1e', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
    },
    navIcon: { marginRight: 12 },
    navText: { fontFamily: 'Manrope_600SemiBold', fontSize: 14, color: C.onSurfaceVariant },
    navTextActive: { fontFamily: 'Manrope_700Bold', color: C.primary },

    divider: { height: 1, backgroundColor: 'rgba(200,197,208,0.3)', marginVertical: 16, marginHorizontal: 24 },

    userSection: {
        paddingHorizontal: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(200,197,208,0.3)',
    },
    userBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    avatar: {
        width: 36, height: 36, borderRadius: 10,
        alignItems: 'center', justifyContent: 'center'
    },
    avatarText: { fontFamily: 'Manrope_700Bold', color: '#fff', fontSize: 13 },
    userName: { fontFamily: 'Manrope_700Bold', fontSize: 13, color: C.primary },
    userEmail: { fontFamily: 'Manrope_500Medium', fontSize: 11, color: C.onSurfaceVariant, marginTop: 2 },
    signOutBtn: { padding: 8, backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: 8 },
});

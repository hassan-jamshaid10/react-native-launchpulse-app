import {
    ArrowLeft,
    Bell,
    BellRing,
    ChevronRight,
    Edit2,
    FileText,
    HelpCircle,
    Lock,
    LogOut,
    Shield,
    User,
} from 'lucide-react-native';
import { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useColorScheme,
} from 'react-native';

export default function SettingsScreen() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const colors = {
        background: isDark ? '#1a1d21' : '#f7f9fb',
        headerBg: isDark ? '#0f172a' : '#ffffff',
        textPrimary: isDark ? '#ffffff' : '#110031',
        textSecondary: isDark ? '#9ca3af' : '#5b598c',
        textMuted: isDark ? '#64748b' : '#47464f',
        surfaceLowest: isDark ? '#2d3133' : '#ffffff',
        surfaceLow: isDark ? '#3d4143' : '#f2f4f6',
        surfaceContainer: isDark ? '#4b5563' : '#eceef0',
        tint: '#732ee4',
        error: isDark ? '#f87171' : '#ba1a1a',
        border: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(200,197,208,0.2)',
    };

    const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
            {/* TopAppBar */}
            <View style={[styles.header, { backgroundColor: isDark ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.85)' }]}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <ArrowLeft color={colors.textPrimary} size={24} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Meridian Analyst</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Bell color={colors.textPrimary} size={24} />
                    </TouchableOpacity>
                    <View style={[styles.headerAvatarWrap, { backgroundColor: colors.surfaceContainer }]}>
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-T0SUFSt7sObsNAJ0ZjRClzMc2h5A0IMEGFtKp3nUmpyuEqUZRdfEdy-hTKkniVFGdfJRrOMDc9HXfy1opbjMfN3-xhJ_BJ5FtERJA6X1_85pIG1yyF1XpZ0XUDfTnF-O2KVo6l32FKPScyM0QIW9GA0FDmxodhCj-THb51eomy423UHwdXdWz2VeTclfOvBWtlYUhqrE__kW6rko8YXx0_a-XQfEDNvlQF77Smqd8U0ebjrouNQT6aKT43EQw1FQpu83mo12P9A' }}
                            style={styles.avatarImage}
                        />
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Profile Header Section */}
                <View style={styles.profileSection}>
                    <View style={styles.mainAvatarContainer}>
                        <View style={[styles.mainAvatarWrap, { backgroundColor: colors.surfaceLowest }]}>
                            <Image
                                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqmLhHQwS_P2zoMm3HSdvEFW4nBCH-PkLd6VvHfJUonktsZxCW0vhoElL_wgVURBZ6fLVG90b-g268JeO8ZVr3Yx9tGHPILQw5YO7iKbWHrB0Bg_d18y6noYMwPICpstoHARbYwCm1Xk7Z7dJGHFthQB4MdJXoeLn1z014lI1OZPkHKOHycGljl1t_CUbuikK8hq1aQ7JZBMoCafjddC7MLzfTVU5AIdCY3jMD7VnGA8bGBxrPHm5qjtPhK5dQxIatoTERAMlkZM8' }}
                                style={styles.avatarImage}
                            />
                        </View>
                        <TouchableOpacity style={[styles.editBtn, { backgroundColor: colors.tint, borderColor: colors.surfaceLowest }]} activeOpacity={0.8}>
                            <Edit2 color="#ffffff" size={14} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.profileName, { color: colors.textPrimary }]}>Elena Moretti</Text>
                    <Text style={[styles.profileRole, { color: colors.textMuted }]}>Senior Portfolio Manager</Text>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <View style={[styles.statCard, { backgroundColor: colors.surfaceLowest }]}>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>EVALUATIONS</Text>
                        <Text style={[styles.statValue, { color: colors.textPrimary }]}>128</Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: colors.surfaceLowest }]}>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>ACTIVE DEALS</Text>
                        <Text style={[styles.statValue, { color: colors.textPrimary }]}>12</Text>
                    </View>
                </View>

                {/* Settings Lists */}
                <View style={styles.settingsContainer}>

                    {/* Category: Account */}
                    <View style={styles.listGroup}>
                        <Text style={[styles.groupLabel, { color: colors.textSecondary }]}>ACCOUNT</Text>
                        <View style={[styles.listWrapper, { backgroundColor: colors.surfaceLowest }]}>
                            <TouchableOpacity style={styles.listItem} activeOpacity={0.7}>
                                <View style={styles.listItemLeft}>
                                    <View style={[styles.listIconBox, { backgroundColor: colors.surfaceLow }]}>
                                        <User color={colors.textPrimary} size={20} />
                                    </View>
                                    <Text style={[styles.listItemText, { color: colors.textPrimary }]}>Personal Information</Text>
                                </View>
                                <ChevronRight color={colors.textMuted} size={20} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.listItem} activeOpacity={0.7}>
                                <View style={styles.listItemLeft}>
                                    <View style={[styles.listIconBox, { backgroundColor: colors.surfaceLow }]}>
                                        <BellRing color={colors.textPrimary} size={20} />
                                    </View>
                                    <Text style={[styles.listItemText, { color: colors.textPrimary }]}>Notification Settings</Text>
                                </View>
                                <ChevronRight color={colors.textMuted} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Category: Security & Privacy */}
                    <View style={styles.listGroup}>
                        <Text style={[styles.groupLabel, { color: colors.textSecondary }]}>SECURITY & PRIVACY</Text>
                        <View style={[styles.listWrapper, { backgroundColor: colors.surfaceLowest }]}>
                            <TouchableOpacity style={styles.listItem} activeOpacity={0.7}>
                                <View style={styles.listItemLeft}>
                                    <View style={[styles.listIconBox, { backgroundColor: colors.surfaceLow }]}>
                                        <Lock color={colors.textPrimary} size={20} />
                                    </View>
                                    <Text style={[styles.listItemText, { color: colors.textPrimary }]}>Privacy Center</Text>
                                </View>
                                <ChevronRight color={colors.textMuted} size={20} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.listItem}
                                activeOpacity={0.7}
                                onPress={() => setTwoFactorEnabled(!twoFactorEnabled)}
                            >
                                <View style={styles.listItemLeft}>
                                    <View style={[styles.listIconBox, { backgroundColor: colors.surfaceLow }]}>
                                        <Shield color={colors.textPrimary} size={20} />
                                    </View>
                                    <Text style={[styles.listItemText, { color: colors.textPrimary }]}>Two-Factor Auth</Text>
                                </View>
                                <View style={[
                                    styles.switchTrack,
                                    { backgroundColor: twoFactorEnabled ? colors.tint : colors.surfaceContainer }
                                ]}>
                                    <View style={[styles.switchThumb, twoFactorEnabled ? styles.switchThumbOn : null]} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Category: Support */}
                    <View style={styles.listGroup}>
                        <Text style={[styles.groupLabel, { color: colors.textSecondary }]}>SUPPORT</Text>
                        <View style={[styles.listWrapper, { backgroundColor: colors.surfaceLowest }]}>
                            <TouchableOpacity style={styles.listItem} activeOpacity={0.7}>
                                <View style={styles.listItemLeft}>
                                    <View style={[styles.listIconBox, { backgroundColor: colors.surfaceLow }]}>
                                        <HelpCircle color={colors.textPrimary} size={20} />
                                    </View>
                                    <Text style={[styles.listItemText, { color: colors.textPrimary }]}>Help Center</Text>
                                </View>
                                <ChevronRight color={colors.textMuted} size={20} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.listItem} activeOpacity={0.7}>
                                <View style={styles.listItemLeft}>
                                    <View style={[styles.listIconBox, { backgroundColor: colors.surfaceLow }]}>
                                        <FileText color={colors.textPrimary} size={20} />
                                    </View>
                                    <Text style={[styles.listItemText, { color: colors.textPrimary }]}>Terms & Conditions</Text>
                                </View>
                                <ChevronRight color={colors.textMuted} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

                {/* Logout Button */}
                <View style={styles.footerSection}>
                    <TouchableOpacity style={[styles.logoutBtn, { backgroundColor: colors.surfaceLow }]} activeOpacity={0.8}>
                        <LogOut color={colors.error} size={20} />
                        <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
                    </TouchableOpacity>
                    <Text style={[styles.versionText, { color: colors.textMuted }]}>Version 4.2.1-Ivory</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        zIndex: 50,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconBtn: { padding: 4 },
    headerTitle: {
        fontFamily: 'Inter_900Black', // Equivalent to extrabold
        fontSize: 18,
        letterSpacing: -0.5,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    headerAvatarWrap: {
        width: 32,
        height: 32,
        borderRadius: 16,
        overflow: 'hidden',
    },
    avatarImage: { width: '100%', height: '100%', resizeMode: 'cover' },

    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 100, // accommodate bottom navigation bar
        maxWidth: 448,
        alignSelf: 'center',
        width: '100%',
    },

    profileSection: {
        alignItems: 'center',
        paddingVertical: 32,
    },
    mainAvatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    mainAvatarWrap: {
        width: 96,
        height: 96,
        borderRadius: 48,
        overflow: 'hidden',
        borderWidth: 4,
        borderColor: '#ffffff', // using literal per HTML 'ring-4 ring-white'
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.06,
        shadowRadius: 24,
        elevation: 4,
    },
    editBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 6,
        borderRadius: 16,
        borderWidth: 2,
    },
    profileName: {
        fontFamily: 'Inter_900Black',
        fontSize: 24,
        letterSpacing: -0.5,
    },
    profileRole: {
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
        marginTop: 4,
    },

    statsGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    statCard: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.06,
        shadowRadius: 24,
        elevation: 2,
    },
    statLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    statValue: {
        fontFamily: 'Inter_700Bold',
        fontSize: 20,
    },

    settingsContainer: {
        gap: 24,
    },
    listGroup: {
        flexDirection: 'column',
    },
    groupLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 12,
        paddingHorizontal: 16,
    },
    listWrapper: {
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.06,
        shadowRadius: 24,
        elevation: 2,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    listItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    listIconBox: {
        width: 40,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listItemText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 14,
    },

    switchTrack: {
        width: 48,
        height: 24,
        borderRadius: 12,
        padding: 2,
        justifyContent: 'center',
    },
    switchThumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#ffffff',
    },
    switchThumbOn: {
        alignSelf: 'flex-end',
    },

    footerSection: {
        paddingTop: 16,
        paddingBottom: 32,
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 16,
        borderRadius: 12,
    },
    logoutText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
    },
    versionText: {
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        letterSpacing: 0.5,
        marginTop: 24,
    },
});

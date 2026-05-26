import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    Bell,
    Building2,
    CheckCircle2,
    ChevronRight,
    FlaskConical,
    PenTool,
    PlusCircle,
    Search,
    ShieldCheck,
    Stethoscope,
} from 'lucide-react-native';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useColorScheme,
} from 'react-native';

export default function WorkspacesScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const colors = {
        background: isDark ? '#1a1d21' : '#f7f9fb',
        headerBg: isDark ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.85)',
        textPrimary: isDark ? '#ffffff' : '#110031',
        textSecondary: isDark ? '#9ca3af' : '#5b598c',
        textTertiary: isDark ? '#64748b' : '#47464f',
        surfaceLowest: isDark ? '#2d3133' : '#ffffff',
        surfaceLow: isDark ? '#3d4143' : '#f2f4f6',
        surfaceContainerHigh: isDark ? '#4b5563' : '#e6e8ea',
        tint: '#732ee4',
        btnGradStart: '#732ee4',
        btnGradEnd: '#2d0069',
        border: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(200,197,208,0.15)',
        primaryContainer: '#2d0069',
        primaryFixed: '#eaddff',
        onPrimaryFixed: '#25005a',
        outlineVariant: '#c8c5d0',
    };

    const WORKSPACES = [
        {
            id: '1',
            title: 'Main Clinical HQ',
            subtitle: '12 Team Members • Active Now',
            icon: <Building2 color={colors.onPrimaryFixed} size={24} />,
            active: true,
            iconBg: colors.primaryFixed,
        },
        {
            id: '2',
            title: 'R&D Lab Alpha',
            subtitle: '4 Team Members • 2 days ago',
            icon: <FlaskConical color={colors.textSecondary} size={24} />,
            active: false,
            iconBg: colors.surfaceContainerHigh,
        },
        {
            id: '3',
            title: 'Emergency Response',
            subtitle: '8 Team Members • Last week',
            icon: <Stethoscope color={colors.textSecondary} size={24} />,
            active: false,
            iconBg: colors.surfaceContainerHigh,
        },
        {
            id: '4',
            title: 'Design System Dev',
            subtitle: '2 Team Members • Last month',
            icon: <PenTool color={colors.textSecondary} size={24} />,
            active: false,
            iconBg: colors.surfaceContainerHigh,
        },
    ];

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
            {/* TopAppBar */}
            <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
                <View style={styles.headerLeft}>
                    <Search color={colors.textPrimary} size={20} />
                    <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Meridian Analyst</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
                        <Bell color={colors.textPrimary} size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.avatarWrap, { borderColor: colors.border }]}
                        activeOpacity={0.8}
                        onPress={() => router.push('/settings')}
                    >
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGjc-Iok8ge3pqj1tVSO2Czep7bwvoUV5LL8uDwXvMSXuVbdexRi60vIpvWLzFqK3ACLQBrvWtpurc-ZGh2ZI_lcw3De55st1mIQaiY-UaTILBB7xEm4jcDkbr8FNF3mCYZGCfZP64a6fDONzQujvER_NfpIE49I7Zj8iVttsWYeZ7cx9zoZ8CfakDrMhZacjktLL_4nnIu3KLKvLGLrrQ3YswLdSot-1Eq4lo7Tx_Hkv8aIJcFPMFWsNfT5YJWNgKlQU7nmI6WX4' }}
                            style={styles.avatarImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* Header Section */}
                <View style={styles.headerSection}>
                    <Text style={[styles.pageTitle, { color: colors.textPrimary }]}>Workspaces</Text>
                    <Text style={[styles.pageSubtitle, { color: colors.textTertiary }]}>Select an environment to begin your architectural workflow or create a new clinical space.</Text>
                </View>

                {/* Workspace List */}
                <View style={styles.listContainer}>
                    {WORKSPACES.map((ws) => (
                        <TouchableOpacity
                            key={ws.id}
                            style={[
                                styles.workspaceCard,
                                { backgroundColor: colors.surfaceLowest, borderColor: colors.border },
                            ]}
                            activeOpacity={0.8}
                        >
                            {ws.active && (
                                <LinearGradient
                                    colors={[colors.btnGradStart, colors.btnGradEnd]}
                                    style={styles.activePill}
                                    start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                                />
                            )}
                            
                            <View style={styles.cardInner}>
                                <View style={styles.cardLeft}>
                                    <View style={[styles.iconBox, { backgroundColor: ws.iconBg }]}>
                                        {ws.icon}
                                    </View>
                                    <View>
                                        <Text style={[styles.wsTitle, { color: colors.textPrimary }]}>{ws.title}</Text>
                                        <Text style={[styles.wsSubtitle, { color: colors.textTertiary }]}>{ws.subtitle}</Text>
                                    </View>
                                </View>
                                
                                {ws.active ? (
                                    <CheckCircle2 color={colors.tint} size={24} />
                                ) : (
                                    <ChevronRight color={colors.outlineVariant} size={24} />
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Create New Area */}
                <View style={[styles.newWrap, { backgroundColor: colors.surfaceLow, borderColor: colors.border }]}>
                    <View style={styles.newHeaderBox}>
                        <View style={styles.newIconWrap}>
                            <PlusCircle color={colors.tint} size={28} />
                        </View>
                        <Text style={[styles.newTitle, { color: colors.textPrimary }]}>New Workspace</Text>
                        <Text style={[styles.newSubtitle, { color: colors.textTertiary }]}>Initialize a fresh clinical environment.</Text>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>WORKSPACE NAME</Text>
                        <TextInput
                            style={[styles.inputField, { backgroundColor: colors.surfaceLowest, color: colors.textPrimary }]}
                            placeholder="e.g. Clinical Trials Phase II"
                            placeholderTextColor={colors.outlineVariant}
                        />

                        <View style={styles.btnRow}>
                            <TouchableOpacity style={styles.createBtn} activeOpacity={0.8}>
                                <LinearGradient
                                    colors={[colors.btnGradStart, colors.btnGradEnd]}
                                    style={styles.createBtnGradient}
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                                >
                                    <Text style={styles.createBtnText}>Create Workspace</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.cancelBtn, { borderColor: colors.border }]} activeOpacity={0.7} >
                                <Text style={[styles.cancelBtnText, { color: colors.textSecondary }]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Decorative Info Card */}
                <View style={[styles.infoCard, { backgroundColor: colors.primaryContainer }]}>
                    <View style={styles.infoRelativeZ}>
                        <View style={[styles.infoBadge, { backgroundColor: colors.tint }]}>
                            <Text style={styles.infoBadgeText}>ENTERPRISE POWER</Text>
                        </View>
                        <Text style={styles.infoTitle}>Architecture Ready</Text>
                        <Text style={styles.infoDesc}>
                            All workspaces feature end-to-end encryption and real-time clinical data synchronization as standard.
                        </Text>
                    </View>
                    <View style={styles.shieldWatermark}>
                        <ShieldCheck color="#ffffff" size={160} opacity={0.1} />
                    </View>
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
        height: 64,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        zIndex: 40,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerTitle: {
        fontFamily: 'Inter_900Black', // Maintaining original Top Bar styling
        fontSize: 18,
        letterSpacing: -0.5,
        textTransform: 'uppercase',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconBtn: { padding: 4 },
    avatarWrap: {
        width: 32,
        height: 32,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
    },
    avatarImage: { width: '100%', height: '100%', resizeMode: 'cover' },

    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 140, // accommodate bottom navigation properly
        maxWidth: 512,
        alignSelf: 'center',
        width: '100%',
    },

    headerSection: {
        marginBottom: 32,
    },
    pageTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 30,
        letterSpacing: -0.5,
        marginBottom: 8,
    },
    pageSubtitle: {
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
        lineHeight: 20,
    },

    listContainer: {
        gap: 16,
    },
    workspaceCard: {
        position: 'relative',
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 1,
    },
    activePill: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 6,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
    },
    cardInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wsTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        marginBottom: 2,
    },
    wsSubtitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
    },

    newWrap: {
        marginTop: 40,
        padding: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderStyle: 'dashed',
    },
    newHeaderBox: {
        alignItems: 'center',
        marginBottom: 24,
    },
    newIconWrap: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
        marginBottom: 12,
    },
    newTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        marginBottom: 4,
    },
    newSubtitle: {
        fontFamily: 'Inter_500Medium',
        fontSize: 12,
    },
    formGroup: {
        gap: 16,
    },
    inputLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
    inputField: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 8,
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
    },
    btnRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },
    createBtn: {
        flex: 1,
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#732ee4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    createBtnGradient: {
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    createBtnText: {
        color: '#ffffff',
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
    },
    cancelBtn: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 8,
        borderWidth: 1,
        justifyContent: 'center',
    },
    cancelBtnText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
    },

    infoCard: {
        marginTop: 32,
        padding: 24,
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
    },
    infoRelativeZ: {
        zIndex: 10,
    },
    infoBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginBottom: 12,
    },
    infoBadgeText: {
        color: '#ffffff',
        fontFamily: 'Inter_900Black',
        fontSize: 10,
        letterSpacing: -0.2,
    },
    infoTitle: {
        color: '#ffffff',
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        marginBottom: 8,
    },
    infoDesc: {
        color: 'rgba(255,255,255,0.85)',
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        lineHeight: 18,
    },
    shieldWatermark: {
        position: 'absolute',
        right: -32,
        bottom: -32,
        zIndex: 0,
    },
});

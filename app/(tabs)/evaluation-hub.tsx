import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    Bell,
    Cloud,
    HelpCircle,
    Leaf,
    Plus,
    Rocket,
    Search,
    Wallet,
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

export default function EvaluationHubScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const colors = {
        background: isDark ? '#1a1d21' : '#f7f9fb',
        headerBg: isDark ? '#0f172a' : '#ffffff',
        textPrimary: isDark ? '#ffffff' : '#110031',
        textSecondary: isDark ? '#9ca3af' : '#47464f',
        textMuted: isDark ? '#64748b' : '#64748b',
        surfaceLowest: isDark ? '#2d3133' : '#ffffff',
        surfaceLow: isDark ? '#3d4143' : '#f2f4f6',
        surfaceContainer: isDark ? '#4b5563' : '#eceef0',
        tint: '#732ee4',
        btnGradStart: '#732ee4',
        btnGradEnd: '#2d0069',
        border: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(200,197,208,0.2)',
        outline: isDark ? '#64748b' : '#787680',
    };

    const DATA = [
        {
            id: 1,
            title: 'Lumina Core AI',
            date: 'Assessed June 14, 2024',
            status: 'Approved',
            statusBg: isDark ? 'rgba(21,128,61,0.2)' : '#f0fdf4',
            statusText: isDark ? '#4ade80' : '#15803d',
            score: '8.4',
            icon: Rocket,
        },
        {
            id: 2,
            title: 'Veridian Bio',
            date: 'Assessed June 10, 2024',
            status: 'Pending',
            statusBg: isDark ? 'rgba(180,83,9,0.2)' : '#fffbeb',
            statusText: isDark ? '#fbbf24' : '#b45309',
            score: '6.9',
            icon: Leaf,
        },
        {
            id: 3,
            title: 'FinSphere Pay',
            date: 'Assessed May 28, 2024',
            status: 'Declined',
            statusBg: isDark ? 'rgba(185,28,28,0.2)' : '#fef2f2',
            statusText: isDark ? '#f87171' : '#b91c1c',
            score: '4.2',
            icon: Wallet,
        },
        {
            id: 4,
            title: 'Stratus Infra',
            date: 'Assessed May 22, 2024',
            status: 'Approved',
            statusBg: isDark ? 'rgba(21,128,61,0.2)' : '#f0fdf4',
            statusText: isDark ? '#4ade80' : '#15803d',
            score: '9.1',
            icon: Cloud,
        },
    ];

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
            {/* TopAppBar Execution */}
            <View style={[styles.header, { backgroundColor: isDark ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.85)' }]}>
                <View style={styles.headerLeft}>
                    <Text style={[styles.headerTitle, { color: isDark ? '#e0e7ff' : '#312e81' }]}>Meridian Analyst</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
                        <Bell color={colors.textMuted} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
                        <HelpCircle color={colors.textMuted} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.avatarWrap} activeOpacity={0.8} onPress={() => router.push('/settings')}>
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2mvyXCuUrmEWYnMp-8hOO18U3nos5YoiyvVCS6oSGpeID6zj3MUBPOBy7ygBE7E6u3rS3wj_tsQGzXV3elBEtfO2MkYL2biGjYIFALMnMMV62mj6Bcg0C3Dw5dPzXvLsZvaWsPGgVYtY8Syvcr2Bk1fX4x7ZGKiXsV-I7ADOYykka_C7_sxXX0QqDj0UNPAFp2TwJJQByse9ZnE8lEJiKq4Z8BtOtbyqsoDSHYM0o2AhGq70rXCk8rO5NtMA3dOPjjFpp2RB-0GU' }}
                            style={styles.avatarImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Section Header */}
                <View style={styles.pageHeader}>
                    <Text style={[styles.pageTitle, { color: colors.textPrimary }]}>Evaluations Hub</Text>
                    <Text style={[styles.pageSub, { color: colors.textSecondary }]}>
                        Reviewing 24 historical assessments for Q3 Portfolio.
                    </Text>
                </View>

                {/* Search & Filter Area */}
                <View style={[styles.searchBox, { backgroundColor: colors.surfaceLowest }]}>
                    <Search color={colors.outline} size={20} />
                    <TextInput
                        style={[styles.searchInput, { color: colors.textPrimary }]}
                        placeholder="Search startups..."
                        placeholderTextColor={colors.outline}
                    />
                </View>

                {/* Evaluations List */}
                <View style={styles.listContainer}>
                    {DATA.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            activeOpacity={0.8}
                            style={[
                                styles.card,
                                { backgroundColor: colors.surfaceLowest, borderColor: colors.border }
                            ]}
                        >
                            <View style={styles.cardTop}>
                                <View style={styles.cardHeaderLeft}>
                                    <View style={[styles.iconContainer, { backgroundColor: colors.surfaceContainer }]}>
                                        <item.icon color={colors.tint} size={20} />
                                    </View>
                                    <View>
                                        <Text style={[styles.itemTitle, { color: colors.textPrimary }]}>{item.title}</Text>
                                        <Text style={[styles.itemDate, { color: colors.textSecondary }]}>{item.date}</Text>
                                    </View>
                                </View>
                                <View style={[styles.badge, { backgroundColor: item.statusBg }]}>
                                    <Text style={[styles.badgeText, { color: item.statusText }]}>{item.status}</Text>
                                </View>
                            </View>

                            <View style={[styles.cardBottom, { borderColor: colors.surfaceContainer }]}>
                                <View style={styles.scoreBox}>
                                    <Text style={[styles.scoreEyebrow, { color: colors.textSecondary }]}>SCORE INDEX</Text>
                                    <Text style={[styles.scoreValue, { color: colors.textPrimary }]}>
                                        {item.score}<Text style={styles.scoreMax}>/10</Text>
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.detailsBtn} activeOpacity={0.7}>
                                    <Text style={styles.detailsText}>Details</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.fab} activeOpacity={0.9}>
                <LinearGradient
                    colors={[colors.btnGradStart, colors.btnGradEnd]}
                    style={styles.fabGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Plus color="#ffffff" size={24} />
                </LinearGradient>
            </TouchableOpacity>
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
    headerLeft: { justifyContent: 'center' },
    headerTitle: {
        fontFamily: 'Inter_900Black', // Approximate to Manrope Extrabold
        fontSize: 18,
        letterSpacing: -0.5,
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
        backgroundColor: '#eceef0',
    },
    avatarImage: { width: '100%', height: '100%', resizeMode: 'cover' },

    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 120, // Space for bottom navigation
        maxWidth: 512,
        alignSelf: 'center',
        width: '100%',
    },

    pageHeader: { marginBottom: 32 },
    pageTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 30,
        letterSpacing: -0.5,
        marginBottom: 8,
    },
    pageSub: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 22,
    },

    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginBottom: 40,
        shadowColor: '#191c1e',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 1,
        gap: 12,
    },
    searchInput: {
        flex: 1,
        fontFamily: 'Inter_400Regular',
        fontSize: 15,
        paddingVertical: 4, // iOS centering
    },

    listContainer: { gap: 24 },
    card: {
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 8,
        elevation: 1,
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    cardHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        flex: 1,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
    },
    itemDate: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        marginTop: 2,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    badgeText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
    },
    scoreBox: { flexDirection: 'column' },
    scoreEyebrow: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    scoreValue: {
        fontFamily: 'Inter_900Black',
        fontSize: 24,
    },
    scoreMax: {
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
        color: '#787680',
    },
    detailsBtn: {
        backgroundColor: '#2d0069', // primary-container
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    detailsText: {
        fontFamily: 'Inter_600SemiBold',
        color: '#9d6bff', // on-primary-container
        fontSize: 14,
    },

    fab: {
        position: 'absolute',
        bottom: 85, // Above bottom nav
        right: 24,
        width: 56,
        height: 56,
        shadowColor: '#732ee4',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
        borderRadius: 28,
        zIndex: 50,
    },
    fabGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

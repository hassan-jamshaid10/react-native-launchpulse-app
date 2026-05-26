import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    Activity,
    ArrowRight,
    Bot,
    FilePlus,
    Rocket,
    Sparkles,
} from 'lucide-react-native';
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

export default function DashboardPage() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    // Theme matching the Evaluator Pro config
    const colors = {
        background: isDark ? '#1a1d21' : '#f7f9fb',
        headerBg: isDark ? '#0f172a' : '#ffffff',
        textPrimary: isDark ? '#ffffff' : '#110031',
        textSecondary: isDark ? '#9ca3af' : '#47464f', // on-surface-variant
        cardSub: isDark ? '#818cf8' : '#5b598c',
        surfaceLowest: isDark ? '#2d3133' : '#ffffff',
        surfaceLow: isDark ? '#3d4143' : '#f2f4f6',
        surfaceContainer: isDark ? '#4b5563' : '#eceef0',
        tint: '#732ee4',
        btnGradStart: '#732ee4',
        btnGradEnd: '#2d0069',
        border: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(200,197,208,0.1)',
        positive: '#10b981', // green
        negative: '#ba1a1a', // error
    };

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
                <View style={styles.headerLeft}>
                    <Activity color={colors.tint} size={24} />
                    <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Evaluator Pro</Text>
                </View>
                <TouchableOpacity style={styles.avatarWrap} activeOpacity={0.8} onPress={() => router.push('/settings')}>
                    <Image
                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBzg44yLe_P678c2TicctA4PpTqJPL5BYasiPQkQSdj862FL46TF3rOBF6muZ40jTo7vDNBIc1BXhmqP_BQYVHNiTM-U7NbifctTw1aTPLuX0I0VBHvONSqE-zCa8M1Z6c351odAw1kKqXTPTNKROGHtO5lTQHtkQjxl8mj2g-tvtbbrfC1autYzE02BA7ZfshrJwngLE3Ub5xQsSUl1JFzbJm4uBE-3f4La0vZl8nmnLzqIVVYFq1rFLSAU-axrmtNN2MezSIuKw' }}
                        style={styles.avatarImage}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Welcome Section */}
                <View style={styles.welcomeSect}>
                    <Text style={[styles.welcomeGreeting, { color: colors.textSecondary }]}>Welcome back, Alexander</Text>
                    <Text style={[styles.pageTitle, { color: colors.textPrimary }]}>Dashboard</Text>
                </View>

                {/* Quick Actions Bento */}
                <View style={styles.bentoRow}>
                    <TouchableOpacity style={styles.bentoBtn} activeOpacity={0.9}>
                        <LinearGradient
                            colors={[colors.btnGradStart, colors.btnGradEnd]}
                            style={styles.gradientAction}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <View style={styles.iconBgWhite}>
                                <FilePlus color="#fff" size={20} />
                            </View>
                            <Text style={styles.bentoGradText}>New Evaluation</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={[styles.bentoBtn, styles.bentoWhite, { backgroundColor: colors.surfaceLowest, borderColor: colors.border }]} activeOpacity={0.9}>
                        <View style={[styles.iconBgTint, { backgroundColor: 'rgba(115,46,228,0.1)' }]}>
                            <Bot color={colors.tint} size={20} />
                        </View>
                        <Text style={[styles.bentoWhiteText, { color: colors.textPrimary }]}>AI Assistant</Text>
                    </TouchableOpacity>
                </View>

                {/* Active Project Status */}
                <View style={[styles.card, styles.projectCard, { backgroundColor: colors.surfaceLowest, borderColor: 'transparent' }]}>
                    {/* Watermark Icon */}
                    <View style={styles.watermarkWrap}>
                        <Rocket color={colors.textSecondary} size={150} opacity={0.06} />
                    </View>

                    <View style={styles.relativeZ}>
                        <View style={styles.projHeader}>
                            <View>
                                <Text style={[styles.projEyebrow, { color: colors.cardSub }]}>ACTIVE EVALUATION</Text>
                                <Text style={[styles.projTitle, { color: colors.textPrimary }]}>Stellar Systems Inc.</Text>
                            </View>
                            <View style={[styles.badge, { backgroundColor: colors.tint }]}>
                                <Text style={styles.badgeText}>SERIES A</Text>
                            </View>
                        </View>

                        <View style={styles.progressSect}>
                            <View style={styles.progressRow}>
                                <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>Review Progress</Text>
                                <Text style={[styles.progressVal, { color: colors.textPrimary }]}>82%</Text>
                            </View>
                            <View style={[styles.progressTrack, { backgroundColor: colors.surfaceContainer }]}>
                                <View style={[styles.progressFill, { backgroundColor: colors.tint, width: '82%' }]} />
                            </View>
                        </View>

                        <View style={styles.reviewersRow}>
                            <View style={styles.avatarStack}>
                                <Image
                                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmTm-uukFuFLrZcX7TBc9kpGgXvILaKiwqtIDhpIFtz610J-9bdRA8Uc-QJdZbb0YMLG4Nzz1uRavd1i8LgRxRdyYQkW9AClhNVm6e1yNi5LKLa3vU1NQMZiH9sN5IpQwpkcHuZ8wK5xWuXdWXPdqcHf0zikJRhw0flysAYMjSN1SIC62jZpy0Fh5Qv93sRBm37I53ky_cRqPC7Go52xbW5HKJWh_PVjur0hdZStqGUZaDBs-IL7uFQWVTI6U25OgB_C-G6-J4xpY' }}
                                    style={[styles.stackImage, styles.stackBorder1]}
                                />
                                <Image
                                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAl_NcvB48GHz8Tmt0Na3zr7EW2MtRfpdO1RczVEh9ab3qq444hVpNeqK20PkCVpAEg7-dXUO3ACMRS-y2TwifNAcIvMtR2hL3az_Ksqh8UnR3VhjNhJv3AuELlUgZz1GCsp061629t9PwV2MZ_HGLSvM47QES_3m9-9b9vzXSgsJRaLs0oRfOPuy5wauhCtcyxNPb6FAZmN9gdFhn5kpGBQXScAs1U0y2x1CTgazqiLu4M_quNZtDwJmZS_UyydWW1vwQX56Se8Ho' }}
                                    style={[styles.stackImage, styles.stackBorder2]}
                                />
                                <View style={[styles.stackCount, { backgroundColor: colors.surfaceContainer }]}>
                                    <Text style={[styles.stackCountText, { color: colors.cardSub }]}>+3</Text>
                                </View>
                            </View>
                            <Text style={[styles.reviewersDesc, { color: colors.textSecondary }]}>Analyst team reviewing documents</Text>
                        </View>
                    </View>
                </View>

                {/* AI Insight Card */}
                <View style={[styles.card, styles.insightCard]}>
                    {/* Glowing effect emulation */}
                    <View style={styles.blurBlob1} />
                    <View style={styles.blurBlob2} />

                    <View style={styles.relativeZ}>
                        <View style={styles.insightHeader}>
                            <Sparkles color="#a78bfa" size={20} />
                            <Text style={styles.insightEyebrow}>AI MARKET PULSE</Text>
                        </View>
                        <Text style={styles.insightText}>
                            "Stellar Systems shows a <Text style={styles.insightHighlight}>42% higher retention</Text> rate than industry peers in the Fintech sector."
                        </Text>
                        <TouchableOpacity style={styles.insightBtn} activeOpacity={0.8}>
                            <Text style={styles.insightBtnText}>View Detailed Prediction</Text>
                            <ArrowRight color="#a78bfa" size={14} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Recent Startups Mini List */}
                <View style={styles.watchlistSect}>
                    <View style={styles.watchlistHeader}>
                        <Text style={[styles.watchlistTitle, { color: colors.textPrimary }]}>Watchlist</Text>
                        <TouchableOpacity>
                            <Text style={[styles.watchlistSeeAll, { color: colors.tint }]}>SEE ALL</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.watchGrid}>
                        {/* Item 1 */}
                        <TouchableOpacity style={[styles.watchItem, { backgroundColor: colors.surfaceLowest }]} activeOpacity={0.7}>
                            <View style={styles.watchLeft}>
                                <View style={[styles.watchIconBg, { backgroundColor: colors.surfaceContainer }]}>
                                    <Text style={styles.watchLetter}>N</Text>
                                </View>
                                <View>
                                    <Text style={[styles.watchItemTitle, { color: colors.textPrimary }]}>Nebula Cloud</Text>
                                    <Text style={[styles.watchItemSub, { color: colors.textSecondary }]}>Infrastructure • Pre-Seed</Text>
                                </View>
                            </View>
                            <View style={styles.watchRight}>
                                <Text style={[styles.watchScore, { color: colors.textPrimary }]}>8.4</Text>
                                <Text style={[styles.watchTrendUp, { color: colors.positive }]}>+1.2 pts</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Item 2 */}
                        <TouchableOpacity style={[styles.watchItem, { backgroundColor: colors.surfaceLowest }]} activeOpacity={0.7}>
                            <View style={styles.watchLeft}>
                                <View style={[styles.watchIconBg, { backgroundColor: colors.surfaceContainer }]}>
                                    <Text style={styles.watchLetter}>V</Text>
                                </View>
                                <View>
                                    <Text style={[styles.watchItemTitle, { color: colors.textPrimary }]}>Vortex Robotics</Text>
                                    <Text style={[styles.watchItemSub, { color: colors.textSecondary }]}>Hardware • Series B</Text>
                                </View>
                            </View>
                            <View style={styles.watchRight}>
                                <Text style={[styles.watchScore, { color: colors.textPrimary }]}>7.1</Text>
                                <Text style={[styles.watchTrendDown, { color: colors.negative }]}>-0.4 pts</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 15,
        elevation: 3,
        zIndex: 50,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 18,
        letterSpacing: -0.5,
    },
    avatarWrap: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#eceef0',
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    // Main Layout
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 120, // ample space for tabs
        maxWidth: 512,
        alignSelf: 'center',
        width: '100%',
    },

    // Welcome
    welcomeSect: {
        gap: 4,
        marginBottom: 32,
    },
    welcomeGreeting: {
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
        letterSpacing: -0.2,
    },
    pageTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 30,
        letterSpacing: -0.6,
    },

    // Quick Actions
    bentoRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 32,
    },
    bentoBtn: {
        flex: 1,
        borderRadius: 16,
        overflow: 'hidden',
    },
    gradientAction: {
        flex: 1,
        padding: 20,
        gap: 16,
        alignItems: 'flex-start',
    },
    iconBgWhite: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 8,
        borderRadius: 10,
    },
    bentoGradText: {
        fontFamily: 'Inter_700Bold',
        color: '#fff',
        fontSize: 14,
        lineHeight: 18,
    },
    bentoWhite: {
        padding: 20,
        alignItems: 'flex-start',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 2,
        gap: 16,
    },
    iconBgTint: {
        padding: 8,
        borderRadius: 10,
    },
    bentoWhiteText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        lineHeight: 18,
    },

    // Global Card
    card: {
        borderRadius: 20,
        padding: 24,
        overflow: 'hidden',
        marginBottom: 32,
    },
    relativeZ: { zIndex: 10 },

    // Project Card
    projectCard: {
        shadowColor: '#191c1e',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.06,
        shadowRadius: 24,
        elevation: 5,
    },
    watermarkWrap: {
        position: 'absolute',
        top: -20,
        right: -20,
        zIndex: 0,
    },
    projHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    projEyebrow: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        letterSpacing: 1.5,
        marginBottom: 4,
    },
    projTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 20,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
    },
    badgeText: {
        fontFamily: 'Inter_900Black',
        color: '#ffffff',
        fontSize: 10,
        letterSpacing: -0.2,
    },
    progressSect: {
        marginBottom: 16,
    },
    progressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressLabel: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 12,
    },
    progressVal: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
    },
    progressTrack: {
        height: 8,
        borderRadius: 4,
        width: '100%',
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    reviewersRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        paddingTop: 8,
    },
    avatarStack: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stackImage: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#ffffff', // typical stack border
    },
    stackBorder1: { zIndex: 3 },
    stackBorder2: { marginLeft: -12, zIndex: 2 },
    stackCount: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -12,
        zIndex: 1,
    },
    stackCountText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
    },
    reviewersDesc: {
        fontFamily: 'Inter_500Medium',
        fontSize: 12,
        flex: 1,
    },

    // AI Insight Card
    insightCard: {
        backgroundColor: '#110031', // primary specific
        minHeight: 180,
    },
    blurBlob1: {
        position: 'absolute',
        top: -60,
        left: -60,
        width: 150,
        height: 150,
        backgroundColor: 'rgba(115,46,228,0.25)', // tint color blob
        borderRadius: 100,
    },
    blurBlob2: {
        position: 'absolute',
        bottom: -40,
        right: -40,
        width: 100,
        height: 100,
        backgroundColor: 'rgba(45,0,105,0.4)', // primary container blob
        borderRadius: 50,
    },
    insightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    insightEyebrow: {
        fontFamily: 'Inter_700Bold',
        color: '#a78bfa',
        fontSize: 12,
        letterSpacing: 1.5,
    },
    insightText: {
        fontFamily: 'Inter_500Medium',
        color: '#ffffff',
        fontSize: 18,
        lineHeight: 26,
        marginBottom: 16,
    },
    insightHighlight: {
        color: '#d2bbff',
    },
    insightBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    insightBtnText: {
        fontFamily: 'Inter_700Bold',
        color: '#a78bfa',
        fontSize: 12,
    },

    // Watchlist
    watchlistSect: {
        gap: 16,
    },
    watchlistHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    watchlistTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
    },
    watchlistSeeAll: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
        letterSpacing: 0.5,
    },
    watchGrid: {
        gap: 12,
    },
    watchItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 16,
    },
    watchLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    watchIconBg: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    watchLetter: {
        fontFamily: 'Inter_900Black',
        color: '#2d0069',
        fontSize: 18,
    },
    watchItemTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        marginBottom: 2,
    },
    watchItemSub: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
    },
    watchRight: {
        alignItems: 'flex-end',
    },
    watchScore: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        marginBottom: 2,
    },
    watchTrendUp: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
    },
    watchTrendDown: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
    },
});

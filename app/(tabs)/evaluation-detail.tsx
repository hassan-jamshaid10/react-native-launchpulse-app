import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    Activity,
    AlertTriangle,
    ChevronRight,
    Lightbulb,
    MinusCircle,
    PlusCircle,
    Sparkles,
    TrendingUp,
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
import Svg, { Circle } from 'react-native-svg';

export default function EvaluationDetailScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const colors = {
        background: isDark ? '#1a1d21' : '#f7f9fb',
        headerBg: isDark ? '#0f172a' : '#ffffff',
        textPrimary: isDark ? '#ffffff' : '#110031',
        textSecondary: isDark ? '#9ca3af' : '#47464f',
        surfaceLowest: isDark ? '#2d3133' : '#ffffff',
        surfaceLow: isDark ? '#3d4143' : '#f2f4f6',
        surfaceContainer: isDark ? '#4b5563' : '#eceef0',
        surfaceHigh: isDark ? '#6b7280' : '#e6e8ea',
        tint: '#732ee4',
        btnGradStart: '#732ee4',
        btnGradEnd: '#2d0069',
        border: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(200,197,208,0.15)',
        emerald: isDark ? '#4ade80' : '#10b981',
        emeraldBg: isDark ? 'rgba(16,185,129,0.2)' : '#d1fae5',
        warning: isDark ? '#fbbf24' : '#f59e0b',
        blue: isDark ? '#60a5fa' : '#3b82f6',
        primaryCont: '#2d0069',
    };

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
            {/* TopAppBar */}
            <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
                <View style={styles.headerLeft}>
                    <Activity color={colors.textPrimary} size={24} />
                    <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Evaluator Pro</Text>
                </View>
                <TouchableOpacity style={[styles.avatarWrap, { backgroundColor: colors.surfaceHigh }]} activeOpacity={0.8} onPress={() => router.push('/settings')}>
                    <Image
                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNbuWPrgCjMHODkwgwJdPFUCOt4TWqIz7lWTBDyUETGb1L27xp-u9KWNImXk-MN11UgOCSD1NAocMhPVgwObjeVMjwqR1zkwV-HOBJCev-h4xIYlSPGmzfh-hA-SYGvyxV4Nor9wsd84xn0lxbgS492YTVLzTYeHwWwhyX_uo6WdP7TmO1PFH5D6_qjeqcKdy-l_SLVSJYcjWmFhH1VSpB-vRrPo_Vb0K98VcmG2oKvSAEHs-vOZFH487WPCh0CH1m_0aNS5BWLMs' }}
                        style={styles.avatarImage}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* Success Score & Status */}
                <View style={[styles.section, styles.scoreCard, { backgroundColor: colors.surfaceLowest }]}>
                    <Text style={[styles.scoreLabel, { color: colors.cardSub }]}>INVESTMENT READINESS</Text>
                    
                    <View style={styles.ringWrapper}>
                        <Svg height="128" width="128" viewBox="0 0 128 128">
                            <Circle 
                                cx="64" cy="64" r="58"
                                stroke={colors.surfaceHigh} 
                                strokeWidth="8" fill="transparent" 
                            />
                            <Circle 
                                cx="64" cy="64" r="58"
                                stroke={colors.tint} 
                                strokeWidth="8" fill="transparent"
                                strokeDasharray="364.4" strokeDashoffset="65.6" 
                                strokeLinecap="round"
                                rotation="-90" origin="64, 64" 
                            />
                        </Svg>
                        <View style={styles.ringInnerLayout}>
                            <Text style={[styles.scoreValue, { color: colors.textPrimary }]}>82</Text>
                            <Text style={[styles.scoreSub, { color: colors.textSecondary }]}>OUT OF 100</Text>
                        </View>
                    </View>

                    <View style={[styles.potentialBadge, { backgroundColor: colors.emeraldBg }]}>
                        <TrendingUp color={colors.emerald} size={14} />
                        <Text style={[styles.potentialText, { color: colors.emerald }]}>High Potential</Text>
                    </View>
                </View>

                {/* Key Metrics Grid */}
                <View style={styles.grid2x2}>
                    {/* Fit */}
                    <View style={[styles.metricBox, { backgroundColor: colors.surfaceLowest }]}>
                        <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>MARKET FIT</Text>
                        <Text style={[styles.metricValue, { color: colors.textPrimary }]}>
                            9.2<Text style={[styles.metricSub, { color: colors.textSecondary }]}>/10</Text>
                        </Text>
                    </View>
                    {/* Risk */}
                    <View style={[styles.metricBox, { backgroundColor: colors.surfaceLowest }]}>
                        <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>RISK LEVEL</Text>
                        <View style={styles.metricRowWrap}>
                            <Text style={[styles.metricValue, { color: colors.textPrimary }]}>Med</Text>
                            <AlertTriangle color={colors.warning} size={16} style={{ marginLeft: 4 }} />
                        </View>
                    </View>
                    {/* Scalability */}
                    <View style={[styles.metricBox, { backgroundColor: colors.surfaceLowest }]}>
                        <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>SCALABILITY</Text>
                        <Text style={[styles.metricValue, { color: colors.textPrimary }]}>High</Text>
                    </View>
                    {/* Burn */}
                    <View style={[styles.metricBox, { backgroundColor: colors.surfaceLowest }]}>
                        <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>BURN RATE</Text>
                        <Text style={[styles.metricValue, { color: colors.textPrimary }]}>
                            $45k<Text style={[styles.metricSub, { color: colors.textSecondary }]}>/mo</Text>
                        </Text>
                    </View>
                </View>

                {/* SWOT Analysis */}
                <View style={styles.sectionMargin}>
                    <View style={styles.sectionHeaderWrap}>
                        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>SWOT Analysis</Text>
                        <Text style={[styles.scrollHint, { color: colors.textSecondary }]}>SCROLL FOR DETAILS</Text>
                    </View>
                    
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.swotScroll} snapToInterval={276} decelerationRate="fast">
                        {/* Strengths */}
                        <View style={[styles.swotCard, { backgroundColor: colors.surfaceLowest, borderTopColor: colors.emerald }]}>
                            <View style={styles.swotCardHeader}>
                                <PlusCircle color={colors.emerald} size={20} fill={colors.emeraldBg} />
                                <Text style={[styles.swotCardTitle, { color: colors.textPrimary }]}>Strengths</Text>
                            </View>
                            <View style={styles.swotItem}>
                                <Text style={[styles.swotBullet, { color: colors.emerald }]}>•</Text>
                                <Text style={[styles.swotText, { color: colors.textSecondary }]}>Proprietary ML algorithms for predictive maintenance.</Text>
                            </View>
                            <View style={styles.swotItem}>
                                <Text style={[styles.swotBullet, { color: colors.emerald }]}>•</Text>
                                <Text style={[styles.swotText, { color: colors.textSecondary }]}>Founders have 2x successful exits in deep tech.</Text>
                            </View>
                        </View>

                        {/* Weaknesses */}
                        <View style={[styles.swotCard, { backgroundColor: colors.surfaceLowest, borderTopColor: colors.warning }]}>
                            <View style={styles.swotCardHeader}>
                                <MinusCircle color={colors.warning} size={20} fill={isDark ? 'rgba(251,191,36,0.2)' : '#fef3c7'} />
                                <Text style={[styles.swotCardTitle, { color: colors.textPrimary }]}>Weaknesses</Text>
                            </View>
                            <View style={styles.swotItem}>
                                <Text style={[styles.swotBullet, { color: colors.warning }]}>•</Text>
                                <Text style={[styles.swotText, { color: colors.textSecondary }]}>High dependency on a single hardware partner.</Text>
                            </View>
                            <View style={styles.swotItem}>
                                <Text style={[styles.swotBullet, { color: colors.warning }]}>•</Text>
                                <Text style={[styles.swotText, { color: colors.textSecondary }]}>Slow enterprise sales cycle (average 9 months).</Text>
                            </View>
                        </View>

                        {/* Opportunities */}
                        <View style={[styles.swotCard, { backgroundColor: colors.surfaceLowest, borderTopColor: colors.blue }]}>
                            <View style={styles.swotCardHeader}>
                                <Lightbulb color={colors.blue} size={20} fill={isDark ? 'rgba(96,165,250,0.2)' : '#dbeafe'} />
                                <Text style={[styles.swotCardTitle, { color: colors.textPrimary }]}>Opportunities</Text>
                            </View>
                            <View style={styles.swotItem}>
                                <Text style={[styles.swotBullet, { color: colors.blue }]}>•</Text>
                                <Text style={[styles.swotText, { color: colors.textSecondary }]}>Expansion into the APAC energy market.</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                {/* AI Recommendations */}
                <View style={styles.sectionMargin}>
                    <View style={styles.insightHeaderWrap}>
                        <Sparkles color={colors.tint} size={24} />
                        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>AI Insights</Text>
                    </View>

                    {/* Primary Insight */}
                    <View style={[styles.aiPrimaryBox, { backgroundColor: colors.primaryCont }]}>
                        {/* Decorative Blob */}
                        <View style={styles.insightBlob} />
                        <View style={styles.relativeZ}>
                            <Text style={styles.aiPrimaryTitle}>Critical Move: Diversify Partnerships</Text>
                            <Text style={styles.aiPrimaryText}>
                                Mitigate hardware dependency by integrating with Siemens or ABB protocols within Q3.
                            </Text>
                            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.tint }]} activeOpacity={0.8}>
                                <Text style={styles.actionBtnText}>ACTION PLAN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Secondary Insight */}
                    <View style={[styles.aiSecondaryBox, { backgroundColor: colors.surfaceLowest, borderLeftColor: colors.tint }]}>
                        <Text style={[styles.aiSecondaryTitle, { color: colors.textPrimary }]}>Scale Sales Team</Text>
                        <Text style={[styles.aiSecondaryText, { color: colors.textSecondary }]}>
                            Increase SDR headcount by 30% to handle the rising inbound from European utilities.
                        </Text>
                        <View style={styles.aiSecondaryFooter}>
                            <Text style={[styles.roiText, { color: colors.tint }]}>ESTIMATED ROI: 4.2X</Text>
                            <ChevronRight color={colors.textSecondary} size={16} />
                        </View>
                    </View>
                </View>

                {/* Financial Projections */}
                <View style={[styles.section, styles.financeCard, { backgroundColor: colors.surfaceLowest }]}>
                    <Text style={[styles.sectionTitle, { color: colors.textPrimary, marginBottom: 16 }]}>Financial Projections</Text>
                    
                    <View style={styles.progressionArea}>
                        <View style={styles.progHeaderRow}>
                            <Text style={[styles.progEyebrow, { color: colors.textSecondary }]}>REVENUE (PROJ.)</Text>
                            <Text style={[styles.progValue, { color: colors.textPrimary }]}>$2.4M</Text>
                        </View>
                        
                        <View style={[styles.progTrack, { backgroundColor: colors.surfaceHigh }]}>
                            <LinearGradient
                                colors={[colors.btnGradStart, colors.btnGradEnd]}
                                style={[styles.progFill, { width: '65%' }]}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            />
                        </View>

                        <View style={styles.progFooterRow}>
                            <Text style={[styles.progMetaText, { color: colors.textSecondary }]}>Current: $1.2M</Text>
                            <Text style={[styles.progMetaText, { color: colors.textSecondary }]}>Target: $4.0M</Text>
                        </View>
                    </View>

                    <View style={styles.financeGrid}>
                        <View style={styles.finCol}>
                            <Text style={[styles.finEyebrow, { color: colors.textSecondary }]}>MARGIN</Text>
                            <Text style={[styles.finValue, { color: colors.textPrimary }]}>62%</Text>
                            <Text style={[styles.finTrend, { color: colors.emerald }]}>+5% YoY</Text>
                        </View>
                        <View style={styles.finCol}>
                            <Text style={[styles.finEyebrow, { color: colors.textSecondary }]}>CAC</Text>
                            <Text style={[styles.finValue, { color: colors.textPrimary }]}>$420</Text>
                            <Text style={[styles.finTrendDef, { color: colors.textSecondary }]}>Avg. Industry: $580</Text>
                        </View>
                    </View>
                </View>

                {/* Vision Image Callout */}
                <View style={styles.visionCard}>
                    <Image
                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY5HjLEE2nVn6u7rMrpX7wXRNwedN1HywATyJxPG_SAuPKiXAOwtPiDBcb289X9j1WYufbuTLopxxQJJmGsIu45roKiCU-6-PZEzPwhysI2G3J-4Ja9TU_SqUHB7ehPRDhfUZvXD2z01cICi88BKtB5BMTxwH4Zy4qZdSyf5CFvp_R6FHK9_UbJzhzQ-e0XbVEoFgmBUZWpO62Az8UM3kqcwySBvShb29LfrYuYFcUIo7H3ZNFZHmh1h-Cfdw18RHU4rrYIhc9HLE' }}
                        style={StyleSheet.absoluteFill}
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(17,0,49,0.9)']}
                        style={styles.visionMask}
                    >
                        <Text style={styles.visionTitle}>Market Vision 2030</Text>
                        <Text style={styles.visionSub}>Exploring the potential for $500M market cap expansion.</Text>
                    </LinearGradient>
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
        width: 32,
        height: 32,
        borderRadius: 16,
        overflow: 'hidden',
    },
    avatarImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 100, // accommodate layout tabs
        maxWidth: 512,
        alignSelf: 'center',
        width: '100%',
    },

    section: { marginBottom: 16 },
    sectionMargin: { marginBottom: 32 },

    // Top Score Card
    scoreCard: {
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 2,
    },
    scoreLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 16,
    },
    ringWrapper: {
        width: 128,
        height: 128,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    ringInnerLayout: {
        position: 'absolute',
        alignItems: 'center',
    },
    scoreValue: {
        fontFamily: 'Inter_900Black',
        fontSize: 36,
        letterSpacing: -1,
    },
    scoreSub: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        marginTop: 2,
    },
    potentialBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        gap: 6,
    },
    potentialText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
    },

    // Metrics Grid
    grid2x2: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 32,
    },
    metricBox: {
        width: '48%',
        flexGrow: 1,
        borderRadius: 12,
        padding: 16,
    },
    metricLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 6,
    },
    metricRowWrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metricValue: {
        fontFamily: 'Inter_900Black',
        fontSize: 20,
    },
    metricSub: {
        fontFamily: 'Inter_500Medium',
        fontSize: 12,
        marginLeft: 2,
    },

    // SWOT
    sectionHeaderWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 12,
    },
    sectionTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 18,
        letterSpacing: -0.5,
    },
    scrollHint: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        textTransform: 'uppercase',
    },
    swotScroll: {
        gap: 16,
        paddingBottom: 8,
    },
    swotCard: {
        width: 260,
        borderRadius: 12,
        borderTopWidth: 4,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    swotCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    swotCardTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
    },
    swotItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
        gap: 8,
    },
    swotBullet: {
        fontFamily: 'Inter_900Black',
        fontSize: 14,
    },
    swotText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        flex: 1,
        lineHeight: 20,
    },

    // AI Recommendations
    insightHeaderWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    relativeZ: { zIndex: 10 },
    aiPrimaryBox: {
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        position: 'relative',
        overflow: 'hidden',
    },
    insightBlob: {
        position: 'absolute',
        top: -40,
        right: -40,
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: '#732ee4',
        opacity: 0.2, // emulate blur / glow effect
    },
    aiPrimaryTitle: {
        fontFamily: 'Inter_700Bold',
        color: '#ffffff',
        fontSize: 16,
        marginBottom: 8,
    },
    aiPrimaryText: {
        fontFamily: 'Inter_400Regular',
        color: 'rgba(255,255,255,0.9)',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 16,
    },
    actionBtn: {
        alignSelf: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    actionBtnText: {
        fontFamily: 'Inter_700Bold',
        color: '#ffffff',
        fontSize: 12,
        letterSpacing: 1,
    },

    aiSecondaryBox: {
        borderRadius: 12,
        padding: 20,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    aiSecondaryTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        marginBottom: 6,
    },
    aiSecondaryText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
    },
    aiSecondaryFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    roiText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        letterSpacing: 1,
    },

    // Finance Projections
    financeCard: {
        borderRadius: 12,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    progressionArea: {
        marginBottom: 24,
    },
    progHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 8,
    },
    progEyebrow: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        letterSpacing: 1,
    },
    progValue: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
    },
    progTrack: {
        height: 8,
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 6,
    },
    progFill: {
        height: '100%',
        borderRadius: 4,
    },
    progFooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progMetaText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 10,
    },

    financeGrid: {
        flexDirection: 'row',
        gap: 24,
    },
    finCol: {
        flex: 1,
    },
    finEyebrow: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        letterSpacing: 1,
        marginBottom: 4,
    },
    finValue: {
        fontFamily: 'Inter_900Black',
        fontSize: 20,
        marginBottom: 2,
    },
    finTrend: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
    },
    finTrendDef: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
    },

    // Vision Image Callout
    visionCard: {
        height: 192,
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
    },
    visionMask: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        padding: 24,
    },
    visionTitle: {
        fontFamily: 'Inter_900Black',
        color: '#ffffff',
        fontSize: 20,
        letterSpacing: -0.5,
        marginBottom: 4,
    },
    visionSub: {
        fontFamily: 'Inter_400Regular',
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
    },
});

import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    Bell,
    BrainCircuit,
    CheckCircle2,
    Search,
    Share,
    ShieldAlert,
    ShieldCheck,
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

export default function DeepDiveAnalysisScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    // Tailored Evaluator Pro Color theme tracking html classes properly
    const colors = {
        background: isDark ? '#1a1d21' : '#f7f9fb',
        headerBg: isDark ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.85)',
        primary: isDark ? '#ffffff' : '#110031',
        primaryDark: '#110031',
        primaryContainer: '#2d0069',
        onPrimaryContainer: '#9d6bff',
        surfaceLowest: isDark ? '#2d3133' : '#ffffff',
        surfaceLow: isDark ? '#3d4143' : '#f2f4f6',
        surfaceHigh: isDark ? '#4b5563' : '#e6e8ea',
        surfaceHighest: isDark ? '#6b7280' : '#e0e3e5',
        textPrimary: isDark ? '#ffffff' : '#110031',
        textSecondary: isDark ? '#9ca3af' : '#47464f',
        textTertiary: isDark ? '#64748b' : '#5b598c',
        tint: '#732ee4',
        btnGradStart: '#732ee4',
        btnGradEnd: '#2d0069',
        border: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(200,197,208,0.15)',
        error: '#ba1a1a',
        errorContainer: '#ffdad6',
        onErrorContainer: '#93000a',
        onPrimary: '#ffffff',
    };

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
            {/* TopAppBar Standardised */}
            <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
                <View style={styles.headerLeft}>
                    <Search color={colors.textPrimary} size={20} />
                    <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Meridian Analyst</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Bell color={colors.textPrimary} size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.avatarWrap, { borderColor: colors.border }]}
                        onPress={() => router.push('/settings')}
                        activeOpacity={0.8}
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
                <View style={styles.pageHeaderBox}>
                    <View style={styles.pageHeaderLeft}>
                        <Text style={[styles.eyebrow, { color: colors.textTertiary }]}>RAG PIPELINE OUTPUT</Text>
                        <Text style={[styles.pageTitle, { color: colors.primary }]}>Deep Dive Analysis: QuantumFlow AI</Text>
                        <Text style={[styles.pageSubtitle, { color: colors.textSecondary }]}>
                            A comprehensive architectural audit and market viability report synthesized from 1.2M data points across venture datasets and technical whitepapers.
                        </Text>
                    </View>
                    <View style={styles.actionBtns}>
                        <TouchableOpacity style={[styles.exportBtn, { borderColor: colors.border }]} activeOpacity={0.7}>
                            <Text style={[styles.exportBtnText, { color: colors.textTertiary }]}>Export PDF</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shareBtnWrap} activeOpacity={0.9}>
                            <LinearGradient
                                colors={[colors.btnGradStart, colors.btnGradEnd]}
                                style={styles.shareBtnGradient}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            >
                                <Share color="#ffffff" size={16} />
                                <Text style={styles.shareBtnText}>Share Report</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Dashboard Grid Container */}
                <View style={styles.gridWrap}>
                    
                    {/* Row 1 */}
                    <View style={styles.rowLayout}>
                        {/* AI Strategic Summary */}
                        <View style={[styles.card, styles.flex2, { backgroundColor: colors.surfaceLowest, borderColor: colors.border }]}>
                            <View style={styles.watermarkIcon}>
                                <BrainCircuit color={colors.textPrimary} size={150} opacity={0.03} />
                            </View>
                            
                            <View style={styles.relativeZ}>
                                <View style={styles.cardHeader}>
                                    <View style={[styles.iconBox, { backgroundColor: colors.primaryContainer }]}>
                                        <Sparkles color={colors.onPrimaryContainer} size={20} />
                                    </View>
                                    <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>AI Strategic Summary</Text>
                                </View>

                                <View style={styles.summaryTwoCol}>
                                    <View style={styles.summaryLeft}>
                                        <Text style={[styles.summaryTextBold, { color: colors.primary }]}>
                                            QuantumFlow AI exhibits a rare technical moat in the LLM orchestration layer. Our RAG analysis identifies three core pillars of their strategic advantage:
                                        </Text>
                                        <View style={styles.summaryList}>
                                            <View style={styles.listItem}>
                                                <CheckCircle2 color={colors.tint} size={16} />
                                                <Text style={[styles.listText, { color: colors.textSecondary }]}>Proprietary vector-sharding protocol reduces latency by 40% compared to industry benchmarks.</Text>
                                            </View>
                                            <View style={styles.listItem}>
                                                <CheckCircle2 color={colors.tint} size={16} />
                                                <Text style={[styles.listText, { color: colors.textSecondary }]}>Unique "Contextual Anchor" logic prevents hallucination in high-stakes financial environments.</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={[styles.sentimentCard, { backgroundColor: colors.surfaceLow, borderColor: colors.border }]}>
                                        <Text style={[styles.sentimentTitle, { color: colors.primary }]}>MARKET SENTIMENT SCORE</Text>
                                        <View style={styles.scoreRow}>
                                            <Text style={[styles.scoreHuge, { color: colors.primary }]}>9.4</Text>
                                            <Text style={[styles.scoreMax, { color: colors.textSecondary }]}>/ 10</Text>
                                        </View>
                                        <View style={[styles.progressBarBase, { backgroundColor: colors.surfaceHigh }]}>
                                            <View style={[styles.progressBarFill, { backgroundColor: colors.tint, width: '94%' }]} />
                                        </View>
                                        <Text style={[styles.sentimentSub, { color: colors.textSecondary }]}>
                                            Aggregated from 14 top-tier VC sentiment analyses and technical github audits.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Growth Projections */}
                        <View style={[styles.card, styles.flex1, { backgroundColor: colors.primaryDark, borderColor: colors.border }]}>
                            <Text style={styles.growthTitle}>Growth Projections</Text>
                            <View style={styles.growthList}>
                                <View style={[styles.growthItem, { borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
                                    <Text style={styles.growthLabel}>Projected ARR (Y3)</Text>
                                    <Text style={styles.growthVal}>$42.5M</Text>
                                </View>
                                <View style={[styles.growthItem, { borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
                                    <Text style={styles.growthLabel}>Market Penetration</Text>
                                    <Text style={styles.growthVal}>12.4%</Text>
                                </View>
                                <View style={styles.growthItemFlexEnd}>
                                    <Text style={styles.growthLabel}>Capital Efficiency</Text>
                                    <Text style={styles.growthVal}>High</Text>
                                </View>
                            </View>

                            <Image
                                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuActQCBulkpOg5lj6315qi0cV--ONJSiCCSu9ohHtEwmKcJ_din12Qi5DBALfLKVA0fxJtyEEtYc9fxqVV06vv_ARXj--9-qx-Nf2yUvGhZHCScSh6CFNm6ruS2QdPmQAnjSomDuqpMwUkbyc8tYg_S4pVIdst6WCfE9qI0pryEI1Qx1vjbUweyHwAHDInvYpdVK4KaMijDzEZ6KFc0yqOE5B3hwk_VXDihJYndwB6Rrb3GC86c7rJjBNFjyz4dP2o4EeYcpt9S_Sg' }}
                                style={styles.growthChartImage}
                            />
                        </View>
                    </View>

                    {/* Row 2 */}
                    <View style={styles.rowLayout}>
                        {/* Competitive Matrix */}
                        <View style={[styles.card, styles.flex1, { backgroundColor: colors.surfaceLowest, borderColor: colors.border }]}>
                            <View style={styles.matrixHeader}>
                                <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Competitive Matrix</Text>
                                <View style={styles.matrixBadge}>
                                    <Text style={styles.matrixBadgeText}>QUADRANT ALPHA</Text>
                                </View>
                            </View>

                            <View style={[styles.matrixGraphBox, { borderLeftColor: colors.surfaceHigh, borderBottomColor: colors.surfaceHigh }]}>
                                {/* Axis Labels */}
                                <View style={styles.yAxisLabelBox}>
                                    <Text style={[styles.axisLabel, { color: colors.textSecondary }]}>EXECUTION POWER</Text>
                                </View>
                                <View style={styles.xAxisLabelBox}>
                                    <Text style={[styles.axisLabel, { color: colors.textSecondary }]}>INNOVATION INDEX</Text>
                                </View>
                                
                                {/* Inner Grid Lines */}
                                <View style={[styles.gridHLine, { backgroundColor: colors.surfaceHigh }]} />
                                <View style={[styles.gridVLine, { backgroundColor: colors.surfaceHigh }]} />

                                {/* Competitor 1: QF */}
                                <View style={[styles.plotPoint, { top: '15%', left: '75%', zIndex: 10 }]}>
                                    <LinearGradient colors={[colors.btnGradStart, colors.btnGradEnd]} style={styles.plotGradientWrap}>
                                        <View style={[styles.plotInner, { backgroundColor: colors.primary }]}>
                                            <Text style={styles.plotTextWhite}>QF</Text>
                                        </View>
                                    </LinearGradient>
                                    <View style={[styles.plotLabelBox, { backgroundColor: colors.surfaceLowest }]}>
                                        <Text style={[styles.plotLabelName, { color: colors.primary }]}>QuantumFlow</Text>
                                    </View>
                                </View>

                                {/* Competitor 2: L2 */}
                                <View style={[styles.plotPoint, { top: '45%', left: '30%', opacity: 0.8 }]}>
                                    <View style={[styles.plotInactiveWrap, { backgroundColor: colors.surfaceHighest, borderColor: colors.outlineVariant }]}>
                                        <Text style={[styles.plotTextDark, { color: colors.textTertiary }]}>L2</Text>
                                    </View>
                                    <Text style={[styles.plotLabelNameMuted, { color: colors.textTertiary }]}>Legacy Player</Text>
                                </View>

                                {/* Competitor 3: SN */}
                                <View style={[styles.plotPoint, { top: '80%', left: '15%', opacity: 0.8 }]}>
                                    <View style={[styles.plotInactiveWrap, { backgroundColor: colors.surfaceHighest, borderColor: colors.outlineVariant }]}>
                                        <Text style={[styles.plotTextDark, { color: colors.textTertiary }]}>SN</Text>
                                    </View>
                                    <Text style={[styles.plotLabelNameMuted, { color: colors.textTertiary }]}>SoftNet</Text>
                                </View>

                            </View>
                        </View>

                        {/* Risk/Opportunity Heatmap */}
                        <View style={[styles.card, styles.flex1, { backgroundColor: colors.surfaceLowest, borderColor: colors.border }]}>
                            <Text style={[styles.cardTitle, { color: colors.textPrimary, marginBottom: 24 }]}>Risk/Opportunity Heatmap</Text>
                            
                            <View style={styles.heatmapSplitRow}>
                                <View style={[styles.heatmapGridBox, { backgroundColor: colors.surfaceLow }]}>
                                    <View style={styles.hmRow}>
                                        <View style={[styles.hmCell, { backgroundColor: 'rgba(186,26,26,0.2)' }]} />
                                        <View style={[styles.hmCell, { backgroundColor: 'rgba(186,26,26,0.1)' }]} />
                                        <View style={[styles.hmCell, { backgroundColor: 'rgba(115,46,228,0.3)' }]} />
                                    </View>
                                    <View style={styles.hmRow}>
                                        <View style={[styles.hmCell, { backgroundColor: 'rgba(186,26,26,0.1)' }]} />
                                        <View style={[styles.hmCell, { backgroundColor: 'rgba(115,46,228,0.4)' }]} />
                                        <View style={[styles.hmCell, { backgroundColor: 'rgba(115,46,228,0.6)' }]} />
                                    </View>
                                    <View style={styles.hmRow}>
                                        <View style={[styles.hmCell, { backgroundColor: 'rgba(115,46,228,0.2)' }]} />
                                        <View style={[styles.hmCell, { backgroundColor: 'rgba(115,46,228,0.5)' }]} />
                                        <View style={[styles.hmCell, { backgroundColor: 'rgba(115,46,228,0.9)' }]} />
                                    </View>
                                </View>

                                <View style={styles.heatmapLegendBox}>
                                    <View style={styles.hmLegendItem}>
                                        <View style={styles.hmLegendLabelRow}>
                                            <View style={[styles.hmDot, { backgroundColor: colors.tint }]} />
                                            <Text style={[styles.hmLegendTitle, { color: colors.primary }]}>Opportunity Zone</Text>
                                        </View>
                                        <Text style={[styles.hmLegendDesc, { color: colors.textSecondary }]}>High potential for expansion into APAC markets with localized agents.</Text>
                                    </View>
                                    
                                    <View style={styles.hmLegendItem}>
                                        <View style={styles.hmLegendLabelRow}>
                                            <View style={[styles.hmDot, { backgroundColor: colors.error }]} />
                                            <Text style={[styles.hmLegendTitle, { color: colors.primary }]}>Critical Risk Zone</Text>
                                        </View>
                                        <Text style={[styles.hmLegendDesc, { color: colors.textSecondary }]}>Dependency on NVIDIA H100 supply chains could impact Y2 scaling.</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.detailedRiskWrap}>
                                <Text style={[styles.riskHeading, { color: colors.primary }]}>DETAILED RISK ASSESSMENT</Text>
                                
                                <View style={[styles.riskItemCard, { backgroundColor: isDark ? 'rgba(186,26,26,0.1)' : colors.errorContainer }]}>
                                    <ShieldAlert color={isDark ? '#ffb4ab' : colors.onErrorContainer} size={20} />
                                    <View style={styles.riskItemTextContent}>
                                        <Text style={[styles.riskItemTitle, { color: isDark ? '#ffb4ab' : colors.onErrorContainer }]}>Data Sovereignty Compliance</Text>
                                        <Text style={[styles.riskItemDesc, { color: isDark ? 'rgba(255,180,171,0.8)' : 'rgba(147,0,10,0.8)' }]}>
                                            GDPR framework alignment in current architecture requires refinement for EU expansion.
                                        </Text>
                                    </View>
                                </View>

                                <View style={[styles.riskItemCard, { backgroundColor: isDark ? 'rgba(115,46,228,0.15)' : 'rgba(45,0,105,0.1)' }]}>
                                    <ShieldCheck color={colors.tint} size={20} />
                                    <View style={styles.riskItemTextContent}>
                                        <Text style={[styles.riskItemTitle, { color: colors.onPrimaryContainer }]}>IP Strength</Text>
                                        <Text style={[styles.riskItemDesc, { color: 'rgba(157,107,255,0.8)' }]}>
                                            4 core patents filed in sub-tokenization logic provide significant defensive moat.
                                        </Text>
                                    </View>
                                </View>
                            </View>

                        </View>
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
        zIndex: 50,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerTitle: {
        fontFamily: 'Inter_900Black', // Standard app styling
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
        paddingBottom: 140, // clear bottom nav
        maxWidth: 1440, // allows large sprawl matching html mapping logic
        alignSelf: 'center',
        width: '100%',
    },

    pageHeaderBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: 20,
        marginBottom: 40,
    },
    pageHeaderLeft: {
        flex: 1,
        minWidth: 300,
    },
    eyebrow: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    pageTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 32,
        letterSpacing: -0.5,
        marginBottom: 8,
    },
    pageSubtitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        lineHeight: 24,
        maxWidth: 700,
    },
    actionBtns: {
        flexDirection: 'row',
        gap: 12,
    },
    exportBtn: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    exportBtnText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
    },
    shareBtnWrap: {
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#732ee4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    shareBtnGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    shareBtnText: {
        color: '#ffffff',
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
    },

    gridWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
    },
    rowLayout: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 24,
    },
    flex1: {
        flex: 1,
        minWidth: 320,
    },
    flex2: {
        flex: 2,
        minWidth: 320,
    },
    card: {
        borderRadius: 16,
        padding: 32,
        borderWidth: 1,
        position: 'relative',
        overflow: 'hidden',
    },
    relativeZ: {
        zIndex: 10,
    },
    watermarkIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 0,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 20,
        letterSpacing: -0.2,
    },

    summaryTwoCol: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 32,
    },
    summaryLeft: {
        flex: 1,
        minWidth: 260,
    },
    summaryTextBold: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 16,
    },
    summaryList: {
        gap: 12,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    listText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        flex: 1,
        lineHeight: 20,
    },
    sentimentCard: {
        flex: 1,
        minWidth: 260,
        padding: 24,
        borderRadius: 12,
        borderWidth: 1,
    },
    sentimentTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
        letterSpacing: 0.5,
        marginBottom: 16,
    },
    scoreRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
        marginBottom: 16,
    },
    scoreHuge: {
        fontFamily: 'Inter_900Black',
        fontSize: 48,
        lineHeight: 48,
    },
    scoreMax: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        marginBottom: 4,
    },
    progressBarBase: {
        height: 8,
        borderRadius: 4,
        width: '100%',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    sentimentSub: {
        fontFamily: 'Inter_500Medium',
        fontSize: 12,
        marginTop: 16,
        lineHeight: 18,
    },

    // Growth Projections Block
    growthTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 20,
        color: '#ffffff',
        marginBottom: 24,
    },
    growthList: {
        gap: 16,
    },
    growthItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 16,
        borderBottomWidth: 1,
    },
    growthItemFlexEnd: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    growthLabel: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: 'rgba(255,255,255,0.6)',
    },
    growthVal: {
        fontFamily: 'Inter_700Bold',
        fontSize: 20,
        color: '#ffffff',
    },
    growthChartImage: {
        height: 80,
        width: '100%',
        marginTop: 32,
        borderRadius: 8,
        opacity: 0.5, // mimic mix-blend logic
    },

    // Competitive Matrix
    matrixHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    matrixBadge: {
        backgroundColor: 'rgba(199,195,254,0.2)', // secondary-container base
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
    },
    matrixBadgeText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        color: '#c4c1fb', // dim text
    },
    matrixGraphBox: {
        aspectRatio: 1,
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        position: 'relative',
        marginLeft: 24,
        marginBottom: 24,
    },
    yAxisLabelBox: {
        position: 'absolute',
        top: '50%',
        left: -80,
        transform: [{ translateY: -20 }, { rotate: '-90deg' }],
        width: 120, // ample width for label
    },
    xAxisLabelBox: {
        position: 'absolute',
        bottom: -32,
        left: '50%',
        transform: [{ translateX: -60 }],
        width: 120,
        alignItems: 'center',
    },
    axisLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        letterSpacing: 1.5,
    },
    gridHLine: {
        position: 'absolute',
        top: '50%',
        left: 0,
        width: '100%',
        height: 1,
    },
    gridVLine: {
        position: 'absolute',
        left: '50%',
        top: 0,
        height: '100%',
        width: 1,
    },
    plotPoint: {
        position: 'absolute',
        alignItems: 'center',
        width: 48,
        marginLeft: -24,
        marginTop: -24,
    },
    plotGradientWrap: {
        width: 48,
        height: 48,
        borderRadius: 24,
        padding: 2,
        shadowColor: '#732ee4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    plotInner: {
        width: '100%',
        height: '100%',
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    plotTextWhite: {
        color: '#ffffff',
        fontFamily: 'Inter_900Black',
        fontSize: 12,
    },
    plotLabelBox: {
        position: 'absolute',
        top: 56,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    plotLabelName: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        textTransform: 'uppercase',
    },
    plotInactiveWrap: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    plotTextDark: {
        fontFamily: 'Inter_900Black',
        fontSize: 10,
    },
    plotLabelNameMuted: {
        position: 'absolute',
        top: 48,
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        textTransform: 'uppercase',
        width: 100,
        textAlign: 'center',
    },

    // Heatmap
    heatmapSplitRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    heatmapGridBox: {
        flex: 1,
        minWidth: 200,
        aspectRatio: 16 / 9,
        borderRadius: 12,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 300,
    },
    hmRow: {
        flexDirection: 'row',
        flex: 1,
        gap: 8,
        width: '100%',
        marginBottom: 8,
    },
    hmCell: {
        flex: 1,
        borderRadius: 6,
    },
    heatmapLegendBox: {
        flex: 1,
        minWidth: 200,
        justifyContent: 'center',
        gap: 16,
    },
    hmLegendItem: {
        gap: 4,
    },
    hmLegendLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    hmDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    hmLegendTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
    },
    hmLegendDesc: {
        fontFamily: 'Inter_400Regular',
        fontSize: 11,
        lineHeight: 16,
    },

    detailedRiskWrap: {
        marginTop: 32,
        gap: 16,
    },
    riskHeading: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        letterSpacing: 1,
        marginBottom: 8,
    },
    riskItemCard: {
        flexDirection: 'row',
        gap: 16,
        padding: 16,
        borderRadius: 8,
        alignItems: 'flex-start',
    },
    riskItemTextContent: {
        flex: 1,
        gap: 4,
    },
    riskItemTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
    },
    riskItemDesc: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        lineHeight: 18,
    },

});

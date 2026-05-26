import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    Activity,
    ArrowRight,
    Bell,
    Filter,
    MoreHorizontal,
    Rocket,
    Search,
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
import Svg, { Circle, Defs, Path, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';

export default function AnalyticsScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    // Same baseline color extraction as original HTML using tailwind equivalents
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
        border: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(200,197,208,0.2)',
        positive: '#10b981',
        negative: '#ef4444',
        primaryContainer: '#2d0069',
        secondaryContainer: '#c7c3fe',
        tintLight: 'rgba(115, 46, 228, 0.3)',
    };

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
            {/* Consistent Top Nav */}
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
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcz_lOrlnsl-5n-qbxWNLrK4boVZnnSCVAdIC91TOElm5KVwzJpWrTP1sJRfYXPZcSWcpTv3y3WGU_bySkE4FPixZjcBl4irmdfOICh_rUDcRfnrXg0otfH8ToNUragw8SuZp1z3DKTOmmYhS4SQmvTyQxa_yK98RTPiyolWSovZOHUbHqBoN-_VrzRZSnbHntuyPzGFRhCLJCAoVm7ue27gUySKcXaWd_udiNdGqDdCUk2CHjjkEDxeJ5k4ZhtADpMEpcTVxDOI0' }}
                            style={styles.avatarImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Header & Timeframe Selector */}
                <View style={styles.topSection}>
                    <View style={styles.heroTitles}>
                        <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>Analysis</Text>
                        <Text style={[styles.heroSub, { color: colors.textTertiary }]}>Real-time performance metrics</Text>
                    </View>
                    <View style={[styles.timeframeTabs, { backgroundColor: colors.surfaceLow, borderColor: colors.border }]}>
                        {['1W', '1M', '3M', '1Y'].map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                style={[
                                    styles.tfTab,
                                    tab === '1M' && { backgroundColor: colors.surfaceLowest, borderColor: colors.border, elevation: 1 }
                                ]}
                            >
                                <Text style={[styles.tfText, { color: tab === '1M' ? colors.textPrimary : colors.textTertiary }]}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Pulse Score Card */}
                <View style={[styles.card, { backgroundColor: colors.surfaceLowest, borderColor: colors.border }]}>
                    {/* Background Gradient SVG Effect mockup */}
                    <View style={styles.pulseCardGradientWrap}>
                        <LinearGradient
                            colors={[colors.tintLight, 'transparent']}
                            style={styles.pulseCardGradient}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 1 }}
                        />
                    </View>

                    <View style={styles.pulseHeader}>
                        <View>
                            <Text style={[styles.cardSupraText, { color: colors.textSecondary }]}>PULSE SCORE</Text>
                            <View style={styles.pulseScoreRow}>
                                <Text style={[styles.pulseScoreText, { color: colors.textPrimary }]}>94.2</Text>
                                <View style={[styles.trendBadge, { backgroundColor: colors.tintLight }]}>
                                    <TrendingUp color={colors.tint} size={14} />
                                    <Text style={[styles.trendBadgeText, { color: colors.tint }]}>+22%</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.pulseIconBox, { backgroundColor: colors.surfaceContainerHigh }]}>
                            <Activity color={colors.textPrimary} size={20} />
                        </View>
                    </View>

                    <View style={styles.sparklineContainer}>
                        <Svg style={styles.sparklineOuter} preserveAspectRatio="none" viewBox="0 0 400 100">
                            <Defs>
                                <SvgLinearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                                    <Stop offset="0%" stopColor={colors.tint} stopOpacity="0.2" />
                                    <Stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                                </SvgLinearGradient>
                            </Defs>
                            <Path
                                d="M0 80 Q 50 60, 100 70 T 200 40 T 300 30 T 400 10 L 400 100 L 0 100 Z"
                                fill="url(#grad)"
                            />
                            <Path
                                d="M0 80 Q 50 60, 100 70 T 200 40 T 300 30 T 400 10"
                                fill="none"
                                stroke={colors.tint}
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            <Circle cx="100" cy="70" fill={colors.surfaceLowest} r="4" stroke={colors.tint} strokeWidth="2" />
                            <Circle cx="200" cy="40" fill={colors.surfaceLowest} r="4" stroke={colors.tint} strokeWidth="2" />
                            <Circle cx="300" cy="30" fill={colors.surfaceLowest} r="4" stroke={colors.tint} strokeWidth="2" />
                            <Circle cx="400" cy="10" fill={colors.tint} r="6" />
                        </Svg>
                    </View>
                </View>

                {/* Secondary Metric: Active Launches */}
                <View style={[styles.card, { backgroundColor: colors.surfaceLowest, borderColor: colors.border }]}>
                    <View style={styles.launchesHeader}>
                        <Text style={[styles.cardSupraText, { color: colors.textSecondary }]}>ACTIVE LAUNCHES</Text>
                        <Rocket color={colors.textSecondary} size={20} />
                    </View>
                    <Text style={[styles.largeMetricText, { color: colors.textPrimary }]}>18</Text>

                    <View style={[styles.progressSection, { borderTopColor: colors.border }]}>
                        <View style={styles.progressRow}>
                            <Text style={[styles.progressLabel, { color: colors.textTertiary }]}>Success Rate</Text>
                            <Text style={[styles.progressValue, { color: colors.textPrimary }]}>89%</Text>
                        </View>
                        <View style={[styles.progressBarBG, { backgroundColor: colors.surfaceContainerHigh }]}>
                            <View style={[styles.progressBarFill, { backgroundColor: colors.textPrimary, width: '89%' }]} />
                        </View>
                    </View>
                </View>

                {/* Charts Area Block */}
                <View style={styles.sideBySideDesktopWrap}>

                    {/* Market Momentum (Bar Chart Area) */}
                    <View style={[styles.card, { backgroundColor: colors.surfaceLowest, borderColor: colors.border, flex: 1 }]}>
                        <View style={styles.chartHeaderRow}>
                            <Text style={[styles.chartTitle, { color: colors.textPrimary }]}>Market Momentum</Text>
                            <TouchableOpacity>
                                <MoreHorizontal color={colors.textSecondary} size={20} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.barChartContainer}>
                            {/* Horizontal guide lines representation */}
                            <View style={styles.chartGuides}>
                                <View style={[styles.guideLine, { borderBottomColor: colors.border, borderBottomStyle: 'dashed' }]} />
                                <View style={[styles.guideLine, { borderBottomColor: colors.border, borderBottomStyle: 'dashed' }]} />
                                <View style={[styles.guideLine, { borderBottomColor: colors.border, borderBottomStyle: 'dashed' }]} />
                                <View style={[styles.guideLineSolid, { borderBottomColor: colors.border }]} />
                            </View>

                            <View style={styles.barsContainer}>
                                <View style={styles.barWrap}>
                                    <View style={[styles.barCore, { height: '40%', backgroundColor: colors.surfaceContainerHigh }]} />
                                    <Text style={[styles.barLabel, { color: colors.textSecondary }]}>Q1</Text>
                                </View>
                                <View style={styles.barWrap}>
                                    <View style={[styles.barCore, { height: '65%', backgroundColor: colors.surfaceContainerHigh }]} />
                                    <Text style={[styles.barLabel, { color: colors.textSecondary }]}>Q2</Text>
                                </View>
                                <View style={styles.barWrap}>
                                    <View style={[styles.barCore, { height: '45%', backgroundColor: colors.surfaceContainerHigh }]} />
                                    <Text style={[styles.barLabel, { color: colors.textSecondary }]}>Q3</Text>
                                </View>
                                <View style={styles.barWrap}>
                                    <LinearGradient
                                        colors={[colors.tint, colors.primaryContainer]}
                                        style={[styles.barCore, { height: '85%' }]}
                                        start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                                    />
                                    <Text style={[styles.barLabel, { color: colors.textPrimary, fontFamily: 'Inter_700Bold' }]}>Q4</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Portfolio Distribution */}
                    <View style={[styles.card, { backgroundColor: colors.surfaceLowest, borderColor: colors.border, flex: 1 }]}>
                        <View style={styles.chartHeaderRow}>
                            <Text style={[styles.chartTitle, { color: colors.textPrimary }]}>Portfolio Distribution</Text>
                            <TouchableOpacity>
                                <Filter color={colors.textSecondary} size={18} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.portfolioList}>
                            <View style={styles.portfolioItem}>
                                <View style={styles.portItemLeft}>
                                    <View style={[styles.portDot, { backgroundColor: colors.primaryContainer }]} />
                                    <View>
                                        <Text style={[styles.portItemTitle, { color: colors.textPrimary }]}>Enterprise SaaS</Text>
                                        <Text style={[styles.portItemSub, { color: colors.textTertiary }]}>B2B Core</Text>
                                    </View>
                                </View>
                                <View style={styles.portItemRight}>
                                    <Text style={[styles.portPercent, { color: colors.textPrimary }]}>42%</Text>
                                    <Text style={[styles.portChange, { color: colors.tint }]}>+5.2%</Text>
                                </View>
                            </View>

                            <View style={styles.portfolioItem}>
                                <View style={styles.portItemLeft}>
                                    <View style={[styles.portDot, { backgroundColor: colors.tint }]} />
                                    <View>
                                        <Text style={[styles.portItemTitle, { color: colors.textPrimary }]}>FinTech Solutions</Text>
                                        <Text style={[styles.portItemSub, { color: colors.textTertiary }]}>Emerging Markets</Text>
                                    </View>
                                </View>
                                <View style={styles.portItemRight}>
                                    <Text style={[styles.portPercent, { color: colors.textPrimary }]}>28%</Text>
                                    <Text style={[styles.portChange, { color: colors.tint }]}>+1.8%</Text>
                                </View>
                            </View>

                            <View style={styles.portfolioItem}>
                                <View style={styles.portItemLeft}>
                                    <View style={[styles.portDot, { backgroundColor: colors.secondaryContainer }]} />
                                    <View>
                                        <Text style={[styles.portItemTitle, { color: colors.textPrimary }]}>HealthTech</Text>
                                        <Text style={[styles.portItemSub, { color: colors.textTertiary }]}>Regulated</Text>
                                    </View>
                                </View>
                                <View style={styles.portItemRight}>
                                    <Text style={[styles.portPercent, { color: colors.textPrimary }]}>15%</Text>
                                    <Text style={[styles.portChange, { color: colors.textTertiary }]}>-0.4%</Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity style={[styles.reportBtn, { borderColor: colors.border }]} activeOpacity={0.7}>
                            <Text style={[styles.reportBtnText, { color: colors.textPrimary }]}>View Full Report</Text>
                            <ArrowRight color={colors.textPrimary} size={18} />
                        </TouchableOpacity>

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
        fontFamily: 'Inter_900Black',
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
        paddingTop: 16,
        paddingBottom: 120, // Accommodate standard navigation bar
        maxWidth: 768,
        alignSelf: 'center',
        width: '100%',
        gap: 16, // Spacing between cards vertically
    },

    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 8,
    },
    heroTitles: {
        flex: 1,
        minWidth: 200,
    },
    heroTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 32,
        letterSpacing: -0.5,
    },
    heroSub: {
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
        marginTop: 4,
    },
    timeframeTabs: {
        flexDirection: 'row',
        padding: 4,
        borderRadius: 10,
        borderWidth: 1,
    },
    tfTab: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 6,
    },
    tfText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 12,
    },

    card: {
        padding: 24,
        borderRadius: 16,
        borderWidth: 1,
        shadowColor: '#191c1e',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.03,
        shadowRadius: 24,
        elevation: 2,
        overflow: 'hidden',
    },
    pulseCardGradientWrap: {
        position: 'absolute',
        top: -64,
        right: -64,
        width: 128,
        height: 128,
        borderBottomLeftRadius: 100,
        overflow: 'hidden',
        zIndex: 0,
    },
    pulseCardGradient: {
        flex: 1,
    },
    pulseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        zIndex: 1,
    },
    cardSupraText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
    pulseScoreRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 8,
    },
    pulseScoreText: {
        fontFamily: 'Inter_900Black',
        fontSize: 48,
        letterSpacing: -1,
    },
    trendBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        gap: 4,
    },
    trendBadgeText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
    },
    pulseIconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sparklineContainer: {
        height: 96,
        marginTop: 16,
        width: '100%',
        zIndex: 1,
    },
    sparklineOuter: {
        width: '100%',
        height: '100%',
    },

    launchesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    largeMetricText: {
        fontFamily: 'Inter_900Black',
        fontSize: 36,
        letterSpacing: -1,
    },
    progressSection: {
        marginTop: 24,
        paddingTop: 16,
        borderTopWidth: 1,
    },
    progressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressLabel: {
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
    },
    progressValue: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
    },
    progressBarBG: {
        height: 6,
        borderRadius: 3,
        width: '100%',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },

    sideBySideDesktopWrap: {
        flexDirection: 'column',
        gap: 16,
    },
    chartHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    chartTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
    },

    barChartContainer: {
        height: 256,
        position: 'relative',
        paddingHorizontal: 8,
        paddingBottom: 24,
    },
    chartGuides: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-between',
        paddingBottom: 24,
    },
    guideLine: {
        width: '100%',
        borderBottomWidth: 1,
    },
    guideLineSolid: {
        width: '100%',
        borderBottomWidth: 1,
    },
    barsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        zIndex: 2,
    },
    barWrap: {
        width: '20%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
    },
    barCore: {
        width: '100%',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    barLabel: {
        position: 'absolute',
        bottom: -24,
        fontFamily: 'Inter_500Medium',
        fontSize: 12,
    },

    portfolioList: {
        gap: 4,
    },
    portfolioItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
    },
    portItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    portDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    portItemTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
    },
    portItemSub: {
        fontFamily: 'Inter_500Medium',
        fontSize: 12,
    },
    portItemRight: {
        alignItems: 'flex-end',
    },
    portPercent: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
    },
    portChange: {
        fontFamily: 'Inter_500Medium',
        fontSize: 12,
    },
    reportBtn: {
        marginTop: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    reportBtnText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
    },
});

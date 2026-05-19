import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    Activity,
    ArrowLeft,
    ChevronDown,
    Info,
    Network,
    PlusCircle,
    Rocket,
    Users,
    Wallet,
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

export default function StartupComparisonsScreen() {
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
        outline: isDark ? '#64748b' : '#787680',
    };

    const FEED = [
        {
            id: 1,
            name: 'Nexus',
            tag: 'Enterprise AI',
            team: '150+ Team',
            funding: '$45M Series B',
            logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMRYawkeawn9mkOsTpYPh0OK3Me9YL3M2--VL59s_dShVSH12lx-Htt3tHcIEqBnHB0KS4wDd2SjQfITQ4CajG0sSmKrX6lL7uqxpX6ivsi-ZQ3lAIrtbqwjjOO5Kngj735IXYEEn-fE3u0QoMY3uSazKOiYWpoRX5X930JBpf79MzOH-EWm8ZQRfis_JQF0NzCh5YEwRHFJW6sYjKysJxvVkYF2M-4nXXFtbZ8pcbAmY0xyohY3u1zAdnVaFlVCrzH3HQd-dXKSM',
            sentiment: [1, 1, 1, 1, 0], // 1=active, 0=inactive
            selected: true,
        },
        {
            id: 2,
            name: 'Vortex',
            tag: 'Cloud Native',
            team: '80+ Team',
            funding: '$12M Series A',
            logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1qCFKpdf0O7QAfa1zLxQAWwxfjcPKBNdi8GbV_DEpbFi0qiLayIQOiybAR1z1BhkH8K-vNpzn5mOXPsu4Bh2jgT54jUZ8pZzbKQnFLrWCTL7tdx5TLMOgScReC2NLfIpUuVtTizNUhiknXjrd3ezeuiLOjFyr_SIJhRs8OMNZgSR5fOEcth9GwWHW2kw7tmPvr9Di8tEJvGZlZK5jEGXGU0X61JcmVqzbrtg3Pe5MRLv252x1UdcpUI9rtZem29_HyLgJWTC1uRI',
            sentiment: [1, 1, 0, 0, 0],
            selected: false,
        },
        {
            id: 3,
            name: 'Legacy',
            tag: 'FinTech',
            team: '500+ Team',
            funding: 'Publicly Traded',
            logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDULHraTNDgv26dIOFvTWG_qwIbm2o8x55kOY5dGZ5YWGjj4xbX4tV1RKDZP4AQvZnkxZcniSMhigj9dCs8B1B7nULpDOWaTH7HR26JTLHRH8wZMvexzJvfU09xFuhRUwQZGCpnTdtCO3pC9oO7fFIIJEIseQB1F7UrIhtM7F0nRDpcPpgpzYmysPYr92sum6b-zupgvZ8LTT7s2oOeRf-kNCdyrzQkqu7yvlUCHAUT9_cga-_4OO_jTc-7l7lif3qc2VdOHh3NWZ0',
            sentiment: [1, 1, 1, 0, 0],
            selected: true,
        },
    ];

    const [competitors, setCompetitors] = useState(FEED);

    const toggleCompetitor = (id: number) => {
        setCompetitors(comps => comps.map(c => c.id === id ? { ...c, selected: !c.selected } : c));
    };

    const selectedCount = competitors.filter(c => c.selected).length;

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity style={styles.backBtn}>
                        <ArrowLeft color={colors.textPrimary} size={24} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>LaunchPulse</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.avatarWrap} activeOpacity={0.8} onPress={() => router.push('/settings')}>
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPw9EITGOxggyLLYbgyZH_pem_ml2E_sp88Zalbo_MWWXC2gUoUB0JYqjtFi_RchOq4jowmsnWk2n4tQ9t03hu9aE8PY04ULdY46ajVv3LrAhDlNZF8bW4QrH6JKHPtd-tB42T7lrO4jW-Xw7czZvSNU_Kl_efhxoEu2nZmnh5mCsxliOcvVasgD4W_bXb1PT4_oAnTv3GRGYBq_w1Il8FGW6gxCwznVCZz_TMgusPgoR-q4xHUWg9XTJ_PGitVthv8DdWNJ0rk9A' }}
                            style={styles.avatarImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* Page Header */}
                <View style={styles.pageHeader}>
                    <Text style={[styles.pageTitle, { color: colors.textPrimary }]}>Startup Comparison</Text>
                    <Text style={[styles.pageSub, { color: colors.textSecondary }]}>
                        Select your entity and benchmark against the live landscape.
                    </Text>
                </View>

                {/* Left Column Eq (Top on Mobile) */}
                <View style={styles.subjectWrapper}>
                    <View style={[styles.subjectCard, { backgroundColor: colors.surfaceLowest }]}>
                        <View style={styles.watermark}>
                            <Rocket color={colors.textSecondary} size={120} opacity={0.05} />
                        </View>
                        
                        <Text style={[styles.subjectEyebrow, { color: colors.cardSub || colors.textSecondary }]}>SUBJECT STARTUP</Text>
                        
                        <TouchableOpacity style={[styles.selectBtn, { backgroundColor: colors.surfaceLow }]} activeOpacity={0.8}>
                            <View style={styles.selectBtnLeft}>
                                <View style={[styles.selectIconWrap, { backgroundColor: '#ffffff' }]}>
                                    <Network color={colors.tint} size={24} />
                                </View>
                                <View>
                                    <Text style={[styles.selectTitle, { color: colors.textPrimary }]}>QuantumFlow</Text>
                                    <Text style={[styles.selectSub, { color: colors.textSecondary }]}>AI Infrastructure • San Francisco</Text>
                                </View>
                            </View>
                            <ChevronDown color={colors.outline} size={20} />
                        </TouchableOpacity>

                        <View style={styles.miniStatsGrid}>
                            <View style={[styles.miniStatBox, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(242,244,246,0.5)' }]}>
                                <Text style={[styles.miniStatEyebrow, { color: colors.textSecondary }]}>PULSE SCORE</Text>
                                <Text style={[styles.miniStatValue, { color: colors.textPrimary }]}>94.2</Text>
                            </View>
                            <View style={[styles.miniStatBox, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(242,244,246,0.5)' }]}>
                                <Text style={[styles.miniStatEyebrow, { color: colors.textSecondary }]}>GROWTH</Text>
                                <Text style={[styles.miniStatValue, { color: colors.textPrimary }]}>+22%</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.infoBox, { backgroundColor: isDark ? 'rgba(230,232,234,0.1)' : 'rgba(230,232,234,0.3)', borderColor: colors.border }]}>
                        <View style={styles.infoHeader}>
                            <Info color={colors.tint} size={16} />
                            <Text style={[styles.infoTitle, { color: colors.textPrimary }]}>Comparison Mode</Text>
                        </View>
                        <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                            Benchmarking utilizes 48 distinct metrics including market penetration, team velocity, and technical debt estimation.
                        </Text>
                    </View>
                </View>

                {/* Right Column Eq (Live Competitor Feed) */}
                <View style={styles.feedWrapper}>
                    <View style={styles.feedHeader}>
                        <Text style={[styles.feedTitle, { color: colors.textPrimary }]}>Live Competitor Feed</Text>
                        <View style={styles.sortWrap}>
                            <Text style={[styles.sortLabel, { color: colors.textSecondary }]}>SORT BY:</Text>
                            <TouchableOpacity style={styles.sortBtn}>
                                <Text style={[styles.sortBtnText, { color: colors.tint }]}>Momentum</Text>
                                <ChevronDown color={colors.tint} size={16} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.feedList}>
                        {competitors.map((comp) => (
                            <TouchableOpacity 
                                key={comp.id} 
                                style={[styles.compCard, { backgroundColor: colors.surfaceLowest }]}
                                activeOpacity={0.8}
                                onPress={() => toggleCompetitor(comp.id)}
                            >
                                <View style={styles.compLeft}>
                                    <View style={[styles.compLogoWrap, { backgroundColor: colors.surfaceLow }]}>
                                        <Image source={{ uri: comp.logo }} style={styles.compLogo} />
                                    </View>
                                    <View>
                                        <View style={styles.compTitleRow}>
                                            <Text style={[styles.compName, { color: colors.textPrimary }]}>{comp.name}</Text>
                                            <View style={[styles.compTagWrap, { backgroundColor: colors.surfaceHigh }]}>
                                                <Text style={[styles.compTag, { color: colors.textSecondary }]}>{comp.tag}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.compMetaRow}>
                                            <View style={styles.compMetaItem}>
                                                <Users color={colors.textSecondary} size={14} />
                                                <Text style={[styles.compMetaText, { color: colors.textSecondary }]}>{comp.team}</Text>
                                            </View>
                                            <View style={styles.compMetaItem}>
                                                <Wallet color={colors.textSecondary} size={14} />
                                                <Text style={[styles.compMetaText, { color: colors.textSecondary }]}>{comp.funding}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.compRight}>
                                    <View style={styles.sentimentWrap}>
                                        <Text style={[styles.sentimentLabel, { color: colors.textSecondary }]}>SENTIMENT</Text>
                                        <View style={styles.sentimentBars}>
                                            {comp.sentiment.map((s, i) => (
                                                <View 
                                                    key={i} 
                                                    style={[styles.semBar, { backgroundColor: s ? colors.tint : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(200,197,208,0.3)' }]} 
                                                />
                                            ))}
                                        </View>
                                    </View>
                                    {/* Toggle Switch */}
                                    <View style={[styles.switchTrack, { backgroundColor: comp.selected ? colors.tint : colors.surfaceHigh }]}>
                                        <View style={[styles.switchThumb, comp.selected ? styles.switchThumbOn : null]} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={[styles.addCompBtn, { borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(200,197,208,0.4)', backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'transparent' }]} activeOpacity={0.7}>
                            <PlusCircle color={colors.textSecondary} size={28} />
                            <Text style={[styles.addCompText, { color: colors.textSecondary }]}>Track New Competitor</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>

            {/* Fixed Bottom Action Bar */}
            <View style={styles.fixedActionWrap}>
                <View style={[styles.actionPanel, { backgroundColor: isDark ? 'rgba(30,41,59,0.85)' : 'rgba(255,255,255,0.85)' }]}>
                    <View style={styles.actionLeft}>
                        {/* Avatar stack */}
                        <View style={styles.actionAvatars}>
                            {competitors.filter(c => c.selected).slice(0, 2).map((c, i) => (
                                <View key={c.id} style={[styles.actionAvatarWrap, { borderColor: isDark ? '#1e293b' : '#ffffff', zIndex: 10 - i, marginLeft: i > 0 ? -12 : 0 }]}>
                                    <Image source={{ uri: c.logo }} style={styles.actionAvatar} />
                                </View>
                            ))}
                        </View>
                        <Text style={[styles.actionCount, { color: colors.textPrimary }]}>
                            {selectedCount} Competitors selected for benchmark
                        </Text>
                    </View>
                    
                    <TouchableOpacity activeOpacity={0.8} style={styles.generateBtnWrap}>
                        <LinearGradient
                            colors={[colors.btnGradStart, colors.btnGradEnd]}
                            style={styles.generateBtn}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        >
                            <Activity color="#ffffff" size={20} />
                            <Text style={styles.generateText}>Generate Deep Dive</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
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
        gap: 16,
    },
    backBtn: { padding: 4 },
    headerTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 20,
        letterSpacing: -0.5,
    },
    headerRight: { flexDirection: 'row' },
    avatarWrap: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(200,197,208,0.2)',
    },
    avatarImage: { width: '100%', height: '100%', resizeMode: 'cover' },

    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 32,
        paddingBottom: 160, // accommodate bottom bar + action bar
        maxWidth: 768,
        alignSelf: 'center',
        width: '100%',
    },

    pageHeader: { marginBottom: 32 },
    pageTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 32,
        letterSpacing: -0.5,
        marginBottom: 8,
    },
    pageSub: {
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
    },

    subjectWrapper: {
        marginBottom: 32,
    },
    subjectCard: {
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.05,
        shadowRadius: 24,
        elevation: 3,
        position: 'relative',
        overflow: 'hidden',
    },
    watermark: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
    subjectEyebrow: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        letterSpacing: 2,
        marginBottom: 20,
    },
    selectBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    selectBtnLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    selectIconWrap: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    selectTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        marginBottom: 2,
    },
    selectSub: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
    },
    miniStatsGrid: {
        flexDirection: 'row',
        gap: 16,
    },
    miniStatBox: {
        flex: 1,
        borderRadius: 12,
        padding: 16,
    },
    miniStatEyebrow: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        letterSpacing: 1,
        marginBottom: 6,
    },
    miniStatValue: {
        fontFamily: 'Inter_900Black',
        fontSize: 24,
    },

    infoBox: {
        padding: 24,
        borderRadius: 16,
        borderWidth: 1,
    },
    infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    infoTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
    },
    infoText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 22,
    },

    feedWrapper: {},
    feedHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    feedTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        letterSpacing: -0.2,
    },
    sortWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    sortLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
    },
    sortBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    sortBtnText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
    },
    feedList: {
        gap: 16,
    },
    compCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 1,
    },
    compLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        flex: 1,
    },
    compLogoWrap: {
        width: 56,
        height: 56,
        borderRadius: 16,
        overflow: 'hidden',
    },
    compLogo: { width: '100%', height: '100%', resizeMode: 'cover' },
    compTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 6,
    },
    compName: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
    },
    compTagWrap: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    compTag: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        textTransform: 'uppercase',
    },
    compMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    compMetaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    compMetaText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
    },
    compRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
    },
    sentimentWrap: {
        alignItems: 'flex-end',
        display: 'flex', // would hide on smaller screens in responsive web, but fine to show on mobile if space allows. If it overflows, consider hiding.
    },
    sentimentLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        marginBottom: 6,
    },
    sentimentBars: {
        flexDirection: 'row',
        gap: 2,
    },
    semBar: {
        width: 16,
        height: 4,
        borderRadius: 2,
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
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    switchThumbOn: {
        alignSelf: 'flex-end',
    },

    addCompBtn: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderStyle: 'dashed',
        gap: 8,
        marginTop: 8,
    },
    addCompText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
    },

    // Fixed Action Bar
    fixedActionWrap: {
        position: 'absolute',
        bottom: 80, // sits just above the main tab bar (usually height 60-70)
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingHorizontal: 16,
        zIndex: 60,
    },
    actionPanel: {
        width: '100%',
        maxWidth: 700,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
        elevation: 8,
    },
    actionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    actionAvatars: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionAvatarWrap: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        overflow: 'hidden',
    },
    actionAvatar: { width: '100%', height: '100%', resizeMode: 'cover' },
    actionCount: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        flexShrink: 1,
    },
    generateBtnWrap: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    generateBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 24,
        paddingVertical: 14,
    },
    generateText: {
        fontFamily: 'Inter_700Bold',
        color: '#ffffff',
        fontSize: 14,
    },
});

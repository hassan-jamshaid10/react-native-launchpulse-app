// Converted 1:1 from hero.tsx + features.tsx
// bg-[#030712], dot grid, animate-pulse blobs, Inter fonts
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    Activity,
    ArrowRight,
    BarChart3,
    Brain,
    Database,
    LineChart,
    PieChart,
    Play,
    Sparkles,
    Target,
    TrendingUp,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// From hero.tsx
const METRICS = [
    { value: '92%', label: 'Market Fit', colors: ['#3b82f6', '#2563eb'] as [string, string] },
    { value: '88%', label: 'Growth Rate', colors: ['#8b5cf6', '#7c3aed'] as [string, string] },
    { value: '95%', label: 'Innovation', colors: ['#10b981', '#059669'] as [string, string] },
];
const COMPANIES = ['Shark Tank', 'Y Combinator', 'TechStars', '500 Startups', 'Sequoia'];

// From features.tsx tabs[]
const FEATURE_TABS = [
    {
        title: 'Idea Evaluation', Icon: Brain,
        description: 'AI-powered analysis of your business concept',
        features: ['Market viability assessment', 'Competition analysis', 'Target audience identification', 'Revenue potential estimation'],
        stats: [{ label: 'Accuracy', value: '92%' }, { label: 'Speed', value: '2 min' }, { label: 'Insights', value: '50+' }],
        btnColors: ['#2563eb', '#1d4ed8'] as [string, string],
    },
    {
        title: 'Market Simulator', Icon: BarChart3,
        description: 'Real-time market scenario simulations',
        features: ['Multiple scenario testing', 'Risk factor analysis', 'Financial projections', 'Market condition modeling'],
        stats: [{ label: 'Scenarios', value: '100+' }, { label: 'Accuracy', value: '88%' }, { label: 'Depth', value: 'Advanced' }],
        btnColors: ['#7c3aed', '#6d28d9'] as [string, string],
    },
    {
        title: 'Trend Forecasting', Icon: TrendingUp,
        description: 'Predict future market trends and opportunities',
        features: ['3-5 year market predictions', 'Industry trend analysis', 'Technology adoption curves', 'Consumer behavior patterns'],
        stats: [{ label: 'Timeframe', value: '5 yrs' }, { label: 'Data Points', value: '10M+' }, { label: 'Accuracy', value: '85%' }],
        btnColors: ['#059669', '#047857'] as [string, string],
    },
];

// From features.tsx mainFeatures[]
const MAIN_FEATURES = [
    { Icon: Brain, title: 'AI-Powered Intelligence', description: 'Advanced machine learning models trained on thousands of successful and failed startups', iconBg: '#eff6ff', iconColor: '#2563eb' },
    { Icon: Database, title: 'Real-Time Data', description: 'Access to live market data, industry trends, and competitive intelligence from multiple sources', iconBg: '#f5f3ff', iconColor: '#7c3aed' },
    { Icon: Target, title: 'Precision Targeting', description: 'Identify your ideal customer segments with demographic and psychographic analysis', iconBg: '#f0fdf4', iconColor: '#059669' },
    { Icon: Activity, title: 'Success Metrics', description: 'Track key performance indicators and success probability with interactive dashboards', iconBg: '#fff7ed', iconColor: '#f97316' },
];

export default function HomePage() {
    const [activeMetric, setActiveMetric] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const router = useRouter();

    useEffect(() => {
        // Cycle metric like web (every 3s)
        const mt = setInterval(() => setActiveMetric(p => (p + 1) % METRICS.length), 3000);
        return () => { clearInterval(mt); };
    }, []);

    const tab = FEATURE_TABS[activeTab]!;

    return (
        <View style={s.root}>
            {/* bg-[#030712] — exact same as getting-started */}
            <LinearGradient colors={['#030712', '#030712']} style={StyleSheet.absoluteFill} />

            {/* Exact same blobs as getting-started: blue top-left, violet bottom-right */}
            <View style={[s.blob, { top: 0, left: -60 }]}>
                <LinearGradient colors={['rgba(59,130,246,0.08)', 'transparent']} style={[StyleSheet.absoluteFill, { borderRadius: 999 }]} />
            </View>
            <View style={[s.blob, s.blobSm, { bottom: 0, right: -40 }]}>
                <LinearGradient colors={['rgba(139,92,246,0.08)', 'transparent']} style={[StyleSheet.absoluteFill, { borderRadius: 999 }]} />
            </View>

            <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

                {/* ──────── HERO SECTION (from hero.tsx) ──────── */}
                <View style={s.heroSection}>
                    {/* Badge — bg-white/80 backdrop-blur shadow-lg border-gray-200/50 */}
                    <View style={s.badge}>
                        <Sparkles color="#2563eb" size={16} />
                        <Text style={s.badgeText}>Powered by Advanced AI Models</Text>
                    </View>

                    {/* h1 — text-5xl md:text-7xl lg:text-8xl font-black text-white */}
                    <Text style={s.h1}>Turn Your</Text>
                    <Text style={s.h1Gradient}>Ideas Into{'\n'}Reality</Text>

                    <Text style={s.heroSub}>
                        Validate your startup with AI-powered market analysis, success predictions, and real-time simulations. Make data-driven decisions before you launch.
                    </Text>

                    {/* Floating metric card — mimics the success rate card from web */}
                    <View style={s.metricCard}>
                        <View style={s.metricCardTop}>
                            <Text style={s.metricCardLabel}>SUCCESS RATE</Text>
                            <View style={s.liveChip}><View style={s.liveDot} /><Text style={s.liveText}>LIVE</Text></View>
                        </View>
                        <LinearGradient colors={METRICS[activeMetric]!.colors} style={s.metricCircle}>
                            <Text style={s.metricValue}>{METRICS[activeMetric]!.value}</Text>
                            <Text style={s.metricSub}>Growth Rate</Text>
                        </LinearGradient>
                        {METRICS.map((m, i) => (
                            <View key={i} style={s.metricRow}>
                                <Text style={s.metricRowLabel}>{m.label}</Text>
                                <Text style={[s.metricRowVal, i === activeMetric && { color: '#3b82f6' }]}>{m.value}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Mini stat cards — AI Analysis, Predictions, Insights */}
                    <View style={s.miniStatsRow}>
                        {[
                            { Icon: Brain, label: 'AI Analysis', bg: 'rgba(59,130,246,0.1)', color: '#3b82f6' },
                            { Icon: LineChart, label: 'Predictions', bg: 'rgba(139,92,246,0.1)', color: '#a78bfa' },
                            { Icon: PieChart, label: 'Insights', bg: 'rgba(16,185,129,0.1)', color: '#34d399' },
                        ].map(({ Icon, label, bg, color }, i) => (
                            <View key={i} style={s.miniStat}>
                                <View style={[s.miniStatIcon, { backgroundColor: bg }]}>
                                    <Icon color={color} size={18} />
                                </View>
                                <Text style={s.miniStatLabel}>{label}</Text>
                            </View>
                        ))}
                    </View>

                    {/* CTAs — Get Started Free + Watch Demo */}
                    <View style={s.ctaRow}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => router.push('/(tabs)/auth')}>
                            <LinearGradient colors={['#111827', '#172554', '#2e1065']} style={s.ctaPrimary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                                <Text style={s.ctaPrimaryText}>Get Started Free</Text>
                                <ArrowRight color="#fff" size={16} />
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.ctaSecondary} onPress={() => router.push('/(tabs)/auth')}>
                            <Play color="#ffffff" size={14} />
                            <Text style={s.ctaSecondaryText}>Watch Demo</Text>
                        </TouchableOpacity>
                    </View>

                    {/* TRUSTED BY DATA FROM */}
                    <Text style={s.trustLabel}>TRUSTED BY DATA FROM</Text>
                    <View style={s.trustRow}>
                        {COMPANIES.map((c, i) => (
                            <Text key={i} style={s.trustBrand}>{c}</Text>
                        ))}
                    </View>
                </View>

                {/* ──────── FEATURES SECTION (from features.tsx) ──────── */}
                <View style={s.featuresSection}>
                    {/* Section badge */}
                    <View style={s.featuresBadge}>
                        <Sparkles color="#60a5fa" size={13} />
                        <Text style={s.featuresBadgeText}>POWERFUL FEATURES</Text>
                    </View>
                    <Text style={s.featH2}>Everything You Need to</Text>
                    {/* from-blue-400 via-purple-400 to-pink-400 gradient italic */}
                    <Text style={s.featH2Gradient}>Validate Your Idea</Text>
                    <Text style={s.featSub}>
                        From concept to launch, our AI-powered platform guides you through every step with data-driven insights.
                    </Text>

                    {/* Tabs — Idea Evaluation / Market Simulator / Trend Forecasting */}
                    <View style={s.tabsRow}>
                        {FEATURE_TABS.map((t, i) => (
                            <TouchableOpacity
                                key={i}
                                onPress={() => setActiveTab(i)}
                                style={[s.tabBtn, activeTab === i && s.tabBtnActive]}
                            >
                                {activeTab === i && (
                                    <LinearGradient colors={t.btnColors} style={[StyleSheet.absoluteFill, { borderRadius: 999 }]} />
                                )}
                                <t.Icon color={activeTab === i ? '#fff' : '#9ca3af'} size={14} />
                                <Text style={[s.tabBtnText, activeTab === i && { color: '#fff' }]}>{t.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Active tab content — bg-white/5 border-white/10 rounded-2xl */}
                    <View style={s.tabContent}>
                        <Text style={s.tabTitle}>{tab.title.toUpperCase()}</Text>
                        <Text style={s.tabDesc}>{tab.description}</Text>
                        {tab.features.map((f, i) => (
                            <View key={i} style={s.featureItem}>
                                <View style={s.featDot} />
                                <Text style={s.featureItemText}>{f}</Text>
                            </View>
                        ))}
                        {/* Stats */}
                        <View style={s.tabStatsRow}>
                            {tab.stats.map((st, i) => (
                                <View key={i} style={s.tabStat}>
                                    <Text style={s.tabStatLabel}>{st.label.toUpperCase()}</Text>
                                    <Text style={s.tabStatValue}>{st.value}</Text>
                                </View>
                            ))}
                        </View>
                        <TouchableOpacity onPress={() => router.push('/(tabs)/auth')}>
                            <View style={s.tryBtn}>
                                <Text style={s.tryBtnText}>Try This Feature</Text>
                                <ArrowRight color="#fff" size={14} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Main feature cards grid */}
                    <View style={s.mainFeatGrid}>
                        {MAIN_FEATURES.map(({ Icon, title, description, iconBg, iconColor }, i) => (
                            <View key={i} style={s.mainFeatCard}>
                                <View style={[s.mainFeatIcon, { backgroundColor: iconBg }]}>
                                    <Icon color={iconColor} size={24} />
                                </View>
                                <Text style={s.mainFeatTitle}>{title}</Text>
                                <Text style={s.mainFeatDesc}>{description}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* ──────── CTA BANNER (from hero.tsx final CTA) ──────── */}
                <View style={s.finalCta}>
                    <LinearGradient colors={['#111827', '#172554', '#2e1065']} style={[StyleSheet.absoluteFill, { borderRadius: 24 }]} />
                    <Text style={s.finalCtaTitle}>Ready to Launch Your Idea?</Text>
                    <Text style={s.finalCtaSub}>Get AI-powered insights and validate your business idea with data-driven predictions.</Text>
                    <TouchableOpacity style={s.finalCtaBtn} onPress={() => router.push('/(tabs)/auth')}>
                        <Text style={s.finalCtaBtnText}>START FREE EVALUATION</Text>
                        <ArrowRight color="#fff" size={14} />
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#030712' },
    scroll: { paddingBottom: 60 },

    // Dot grid (kept for structure)
    dotGrid: { display: 'none' },

    // Blobs — exact same sizes as getting-started
    blob: { position: 'absolute', width: 340, height: 220, borderRadius: 999, overflow: 'hidden' },
    blobSm: { width: 220, height: 220 },

    // ── HERO ──
    heroSection: { paddingHorizontal: 20, paddingTop: 32, alignItems: 'center', marginBottom: 60, zIndex: 10 },

    // Badge — bg-white/80 border border-gray-200/50 rounded-full
    badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.85)', borderWidth: 1, borderColor: 'rgba(229,231,235,0.5)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999, marginBottom: 28, gap: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 20 },
    badgeText: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: '#7c3aed' },

    // h1 — text-7xl font-black text-white tracking-tight
    h1: { fontFamily: 'Inter_900Black', fontSize: 52, color: '#ffffff', textAlign: 'center', lineHeight: 56, letterSpacing: -2 },
    // Gradient italic — from-blue-400 via-purple-500 to-pink-500
    h1Gradient: { fontFamily: 'Inter_900Black', fontSize: 52, color: '#a78bfa', fontStyle: 'italic', textAlign: 'center', lineHeight: 58, letterSpacing: -2, marginBottom: 20 },
    heroSub: { fontFamily: 'Inter_400Regular', fontSize: 15, color: '#9ca3af', textAlign: 'center', lineHeight: 26, marginBottom: 28, maxWidth: 340 },

    // Success rate card
    metricCard: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: 20, width: '100%', marginBottom: 20 },
    metricCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    metricCardLabel: { fontFamily: 'Inter_700Bold', color: '#9ca3af', fontSize: 10, letterSpacing: 2 },
    liveChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(16,185,129,0.15)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, gap: 4 },
    liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10b981' },
    liveText: { fontFamily: 'Inter_700Bold', fontSize: 9, color: '#10b981' },
    metricCircle: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 16 },
    metricValue: { fontFamily: 'Inter_900Black', color: '#fff', fontSize: 20 },
    metricSub: { fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.7)', fontSize: 9 },
    metricRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
    metricRowLabel: { fontFamily: 'Inter_400Regular', color: '#9ca3af', fontSize: 13 },
    metricRowVal: { fontFamily: 'Inter_700Bold', color: '#ffffff', fontSize: 13 },

    // Mini stats
    miniStatsRow: { flexDirection: 'row', gap: 10, marginBottom: 24, width: '100%' },
    miniStat: { flex: 1, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', padding: 14, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', gap: 8 },
    miniStatIcon: { padding: 8, borderRadius: 10 },
    miniStatLabel: { fontFamily: 'Inter_700Bold', color: '#9ca3af', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center' },

    // CTAs
    ctaRow: { flexDirection: 'row', gap: 12, width: '100%', marginBottom: 28 },
    ctaPrimary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 999, gap: 8 },
    ctaPrimaryText: { fontFamily: 'Inter_700Bold', color: '#ffffff', fontSize: 15 },
    ctaSecondary: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 16, paddingVertical: 14, borderRadius: 999, gap: 8 },
    ctaSecondaryText: { fontFamily: 'Inter_600SemiBold', color: '#ffffff', fontSize: 14 },

    // Trust
    trustLabel: { fontFamily: 'Inter_700Bold', fontSize: 9, color: '#4b5563', letterSpacing: 3, marginBottom: 12 },
    trustRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'center', opacity: 0.5 },
    trustBrand: { fontFamily: 'Inter_700Bold', color: '#9ca3af', fontSize: 12 },

    // ── FEATURES ──
    featuresSection: { paddingHorizontal: 20, zIndex: 10 },
    featuresBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(59,130,246,0.1)', borderWidth: 1, borderColor: 'rgba(59,130,246,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, marginBottom: 16, gap: 6, alignSelf: 'center' },
    featuresBadgeText: { fontFamily: 'Inter_700Bold', color: '#60a5fa', fontSize: 10, letterSpacing: 2 },
    featH2: { fontFamily: 'Inter_900Black', fontSize: 32, color: '#ffffff', textAlign: 'center', letterSpacing: -0.5 },
    featH2Gradient: { fontFamily: 'Inter_900Black', fontSize: 32, color: '#a78bfa', fontStyle: 'italic', textAlign: 'center', textDecorationLine: 'underline', letterSpacing: -0.5, marginBottom: 12 },
    featSub: { fontFamily: 'Inter_400Regular', fontSize: 14, color: '#6b7280', textAlign: 'center', lineHeight: 22, marginBottom: 28 },

    // Tabs row
    tabsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
    tabBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', gap: 6, overflow: 'hidden', position: 'relative' },
    tabBtnActive: { borderColor: 'transparent' },
    tabBtnText: { fontFamily: 'Inter_600SemiBold', color: '#9ca3af', fontSize: 13 },

    // Tab content
    tabContent: { backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 20, padding: 20, marginBottom: 28 },
    tabTitle: { fontFamily: 'Inter_900Black', color: '#ffffff', fontSize: 16, letterSpacing: 1, marginBottom: 4 },
    tabDesc: { fontFamily: 'Inter_400Regular', color: '#9ca3af', fontSize: 13, marginBottom: 16 },
    featureItem: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
    featDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#3b82f6' },
    featureItemText: { fontFamily: 'Inter_400Regular', color: '#d1d5db', fontSize: 14 },
    tabStatsRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 16, marginBottom: 16, paddingTop: 16, borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
    tabStat: { alignItems: 'center' },
    tabStatLabel: { fontFamily: 'Inter_700Bold', color: '#6b7280', fontSize: 9, letterSpacing: 1, marginBottom: 4 },
    tabStatValue: { fontFamily: 'Inter_900Black', color: '#ffffff', fontSize: 20 },
    tryBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999, alignSelf: 'flex-start' },
    tryBtnText: { fontFamily: 'Inter_600SemiBold', color: '#ffffff', fontSize: 13 },

    // main features grid
    mainFeatGrid: { gap: 14, marginBottom: 40 },
    mainFeatCard: { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 20, padding: 20 },
    mainFeatIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
    mainFeatTitle: { fontFamily: 'Inter_700Bold', fontSize: 16, color: '#ffffff', marginBottom: 6 },
    mainFeatDesc: { fontFamily: 'Inter_400Regular', fontSize: 13, color: '#9ca3af', lineHeight: 20 },

    // Final CTA
    finalCta: { marginHorizontal: 20, borderRadius: 24, padding: 32, alignItems: 'center', overflow: 'hidden', position: 'relative' },
    finalCtaTitle: { fontFamily: 'Inter_900Black', color: '#ffffff', fontSize: 26, textAlign: 'center', marginBottom: 10, letterSpacing: -0.5 },
    finalCtaSub: { fontFamily: 'Inter_400Regular', color: '#9ca3af', fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 20 },
    finalCtaBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 999 },
    finalCtaBtnText: { fontFamily: 'Inter_700Bold', color: '#ffffff', fontSize: 13, letterSpacing: 1 },
});

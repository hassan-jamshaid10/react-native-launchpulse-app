import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    Activity, ArrowLeft, Download, Share, Lightbulb, CheckCircle, AlertTriangle, TrendingUp, DollarSign, Rocket, MoreVertical
} from 'lucide-react-native';
import {
    ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions
} from 'react-native';
import { trpc } from '@/utils/api';
import Svg, { Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

const C = {
    primary: '#110031',
    primaryContainer: '#2d0069',
    tint: '#732ee4',
    secondary: '#5b598c',
    onSurfaceVariant: '#47464f',
    surface: '#f7f9fb',
    surfaceLow: '#f2f4f6',
    surfaceContainer: '#eceef0',
    white: '#ffffff',
    outline: '#c8c5d0',
    green: '#10b981',
    amber: '#f59e0b',
    error: '#ba1a1a',
};

function parseAi(raw: unknown): any {
    if (!raw || typeof raw !== 'object') return {};
    return raw;
}

export default function EvaluationDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isTablet = width >= 768;

    const { data: ev, isLoading, isError } = trpc.evaluation.getById.useQuery(
        { id: Number(id) },
        { enabled: !!id }
    );

    const dummyEv = {
        id: Number(id),
        idea_title: 'NebulaSystems',
        industry: 'Cloud Orchestration',
        score: 82,
        status: 'completed',
        created_at: new Date().toISOString(),
        idea_summary: 'NebulaSystems is a revolutionary cloud orchestration platform designed to automate multi-cloud deployments seamlessly using machine learning.',
        ai_evaluation_result: {
            success_score: 82,
            summary: 'NebulaSystems shows strong product-market fit in a rapidly growing multi-cloud orchestration sector. The implementation of ML-driven auto-scaling provides a significant competitive moat.',
            market_intelligence: {
                tam_estimate: '$12.5B',
                sam_estimate: '$3.2B',
                som_estimate: '$450M',
                market_growth_rate: '22% CAGR',
                similar_startups: 14
            },
            swot: {
                strengths: ['Proprietary ML orchestration algorithm', 'Experienced founding team with 2 previous exits', 'Strong early enterprise traction'],
                weaknesses: ['High customer acquisition cost (CAC)', 'Requires lengthy integration cycles'],
                opportunities: ['Expansion into European tech sector', 'Strategic partnership with AWS or Azure'],
                threats: ['Open-source alternatives gaining traction', 'Potential regulatory changes in data sovereignty']
            },
            recommendations: [
                { title: 'Accelerate Enterprise Sales', desc: 'Hire 2 additional senior Account Executives focusing on Fortune 500 tech companies.' },
                { title: 'Open-Source Tier', desc: 'Release a freemium open-source tier to combat emerging free alternatives and build a developer community.' }
            ]
        }
    };

    const evData = ev || dummyEv;

    // Bypassing loading/error for dummy data demonstration
    // if (isLoading) { ... }
    // if (isError || !evData) { ... }

    const ai = parseAi(evData.ai_evaluation_result);
    const score = typeof evData.score === 'number' ? evData.score : (ai.success_score || 0);
    const circumference = 2 * Math.PI * 58;
    const strokeDashoffset = Math.max(0, circumference - (score / 100) * circumference);
    const isHigh = score >= 75;

    return (
        <SafeAreaView style={s.root}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
                
                {/* Hero / Cover */}
                <View style={s.heroCard}>
                    <LinearGradient colors={[C.primary, C.primaryContainer]} style={StyleSheet.absoluteFill} />
                    
                    <View style={s.embeddedHeader}>
                        <TouchableOpacity onPress={() => router.back()} style={s.embeddedBtn}>
                            <ArrowLeft color={C.white} size={24} />
                        </TouchableOpacity>
                        <View style={s.embeddedRight}>
                            <TouchableOpacity style={s.embeddedBtn}><Download size={20} color={C.white} /></TouchableOpacity>
                            <TouchableOpacity style={s.embeddedBtn}><Share size={20} color={C.white} /></TouchableOpacity>
                        </View>
                    </View>
                    <View style={s.heroContent}>
                        <Text style={s.heroBrand}>LAUNCHPAD AI</Text>
                        <Text style={s.heroTitle}>{evData.idea_title || 'Untitled Idea'}</Text>
                        <View style={s.tagRow}>
                            <View style={s.tag}><Text style={s.tagText}>{evData.industry || 'Unknown'}</Text></View>
                            <View style={s.tag}><Text style={s.tagText}>{evData.status || 'Draft'}</Text></View>
                            <View style={s.tag}><Text style={s.tagText}>{new Date(evData.created_at).toLocaleDateString()}</Text></View>
                        </View>
                    </View>
                </View>

                {/* Main Stats Row */}
                <View style={[s.flexRow, { flexDirection: isTablet ? 'row' : 'column' }]}>
                    
                    {/* Score Ring */}
                    <View style={[s.card, isTablet && { flex: 1 }]}>
                        <View style={s.scoreBox}>
                            <View style={s.ringWrapper}>
                                <Svg height="128" width="128" viewBox="0 0 128 128" style={{ transform: [{ rotate: '-90deg' }] }}>
                                    <Circle cx="64" cy="64" r="58" stroke={C.surfaceContainer} strokeWidth="8" fill="transparent" />
                                    <Circle 
                                        cx="64" cy="64" r="58"
                                        stroke={isHigh ? C.green : C.amber} 
                                        strokeWidth="8" fill="transparent"
                                        strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} 
                                        strokeLinecap="round"
                                    />
                                </Svg>
                                <View style={s.ringInnerLayout}>
                                    <Text style={s.scoreValue}>{score}</Text>
                                    <Text style={s.scoreSub}>/ 100</Text>
                                </View>
                            </View>
                            <Text style={s.scoreLabel}>Success Probability</Text>
                            <View style={[s.badge, { backgroundColor: isHigh ? '#dcfce7' : '#fef3c7' }]}>
                                <Text style={[s.badgeText, { color: isHigh ? '#15803d' : '#b45309' }]}>{isHigh ? 'High Potential' : 'Needs Work'}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Meta Grid */}
                    <View style={[s.card, isTablet && { flex: 1.5 }]}>
                        <Text style={s.cardTitle}>Market Intelligence</Text>
                        <View style={s.metaGrid}>
                            <View style={s.metaItem}>
                                <Text style={s.metaLabel}>TAM Estimate</Text>
                                <Text style={s.metaVal}>{ai.market_intelligence?.tam_estimate || '—'}</Text>
                            </View>
                            <View style={s.metaItem}>
                                <Text style={s.metaLabel}>SAM Estimate</Text>
                                <Text style={s.metaVal}>{ai.market_intelligence?.sam_estimate || '—'}</Text>
                            </View>
                            <View style={s.metaItem}>
                                <Text style={s.metaLabel}>Growth Rate</Text>
                                <Text style={s.metaVal}>{ai.market_intelligence?.market_growth_rate || '—'}</Text>
                            </View>
                            <View style={s.metaItem}>
                                <Text style={s.metaLabel}>Similar Startups</Text>
                                <Text style={s.metaVal}>{ai.market_intelligence?.similar_startups || 0}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Summary */}
                {(ai.summary || evData.idea_summary) && (
                    <View style={s.card}>
                        <Text style={s.cardTitle}>Executive Summary</Text>
                        <Text style={s.paragraph}>{ai.summary || evData.idea_summary}</Text>
                    </View>
                )}

                {/* SWOT Analysis */}
                {ai.swot && (
                    <View style={s.card}>
                        <Text style={s.cardTitle}>SWOT Analysis</Text>
                        <View style={[s.flexRow, { flexDirection: isTablet ? 'row' : 'column', flexWrap: 'wrap' }]}>
                            {['strengths', 'weaknesses', 'opportunities', 'threats'].map(key => {
                                const items = ai.swot[key];
                                if (!items || !items.length) return null;
                                const isPos = key === 'strengths' || key === 'opportunities';
                                return (
                                    <View key={key} style={[s.swotBox, { width: isTablet ? '48%' : '100%', borderTopColor: isPos ? C.green : C.error }]}>
                                        <Text style={s.swotTitle}>{key.toUpperCase()}</Text>
                                        {items.map((item: string, i: number) => (
                                            <View key={i} style={s.bulletRow}>
                                                <Text style={[s.bullet, { color: isPos ? C.green : C.error }]}>•</Text>
                                                <Text style={s.bulletText}>{item}</Text>
                                            </View>
                                        ))}
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                )}

                {/* Recommendations */}
                {ai.recommendations && ai.recommendations.length > 0 && (
                    <View style={s.card}>
                        <Text style={s.cardTitle}>AI Recommendations</Text>
                        {ai.recommendations.map((rec: any, i: number) => {
                            const isObj = typeof rec === 'object';
                            const title = isObj ? rec.title : `Recommendation ${i + 1}`;
                            const desc = isObj ? rec.desc : rec;
                            return (
                                <View key={i} style={s.recItem}>
                                    <View style={s.recIconWrap}><Lightbulb size={18} color={C.tint} /></View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={s.recTitle}>{title}</Text>
                                        <Text style={s.recDesc}>{desc}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                )}

            </ScrollView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: C.surface },
    centerBox: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
    
    errorTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 18, color: C.primary, marginTop: 16 },
    errorSub: { fontFamily: 'Manrope_500Medium', fontSize: 14, color: C.onSurfaceVariant, marginTop: 8 },

    scroll: { padding: 16, paddingBottom: 100 },
    flexRow: { gap: 16 },

    heroCard: { borderRadius: 16, overflow: 'hidden', marginBottom: 16, position: 'relative' },
    embeddedHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 16 },
    embeddedBtn: { padding: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8 },
    embeddedRight: { flexDirection: 'row', gap: 8 },
    heroContent: { padding: 24, paddingTop: 16 },
    heroBrand: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: 'rgba(255,255,255,0.7)', letterSpacing: 1.5, marginBottom: 8 },
    heroTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 24, color: C.white, marginBottom: 16 },
    tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    tag: { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
    tagText: { fontFamily: 'Manrope_700Bold', fontSize: 10, color: C.white, textTransform: 'uppercase' },

    card: { backgroundColor: C.white, borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: C.surfaceContainer },
    cardTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 16, color: C.primary, marginBottom: 16 },
    paragraph: { fontFamily: 'Manrope_500Medium', fontSize: 14, color: C.onSurfaceVariant, lineHeight: 22 },

    scoreBox: { alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
    ringWrapper: { width: 128, height: 128, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
    ringInnerLayout: { position: 'absolute', alignItems: 'center' },
    scoreValue: { fontFamily: 'Manrope_800ExtraBold', fontSize: 36, color: C.primary },
    scoreSub: { fontFamily: 'Manrope_700Bold', fontSize: 10, color: C.onSurfaceVariant, marginTop: -4 },
    scoreLabel: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: C.primary, marginBottom: 8 },
    badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    badgeText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 11, textTransform: 'uppercase' },

    metaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
    metaItem: { width: '45%', marginBottom: 8 },
    metaLabel: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, color: C.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
    metaVal: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: C.primary },

    swotBox: { backgroundColor: C.surfaceLow, borderRadius: 12, padding: 16, borderTopWidth: 3, marginBottom: 16 },
    swotTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 12, color: C.primary, marginBottom: 12 },
    bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8, gap: 8 },
    bullet: { fontFamily: 'Manrope_800ExtraBold', fontSize: 16, lineHeight: 18 },
    bulletText: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: C.onSurfaceVariant, flex: 1, lineHeight: 18 },

    recItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: C.surfaceLow },
    recIconWrap: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#f3e8ff', alignItems: 'center', justifyContent: 'center', marginTop: 2 },
    recTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 14, color: C.primary, marginBottom: 4 },
    recDesc: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: C.onSurfaceVariant, lineHeight: 20 },
});

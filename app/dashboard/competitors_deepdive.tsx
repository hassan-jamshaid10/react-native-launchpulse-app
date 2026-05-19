import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    ArrowUpRight, BrainCircuit, ChevronRight, Download, Share2, AlertTriangle, Lightbulb, TrendingUp
} from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/* ── Stitch Colors ── */
const C = {
    primary: '#110031',
    tint: '#732ee4',
    secondary: '#5b598c',
    onSurfaceVariant: '#47464f',
    surface: '#f7f9fb',
    surfaceLow: '#f2f4f6',
    surfaceContainer: '#eceef0',
    white: '#ffffff',
    outline: '#c8c5d0',
};

const METRICS = [
    { label: 'Projected ARR', value: '$42.5M', sub: '+118% YoY Growth', subColor: '#059669', border: true },
    { label: 'Market Penetration', value: '12.4%', sub: 'TAM: $3.4B (Direct Pharma)', subColor: C.onSurfaceVariant },
    { label: 'Burn Multiplier', value: '0.82x', sub: 'Efficient scaling index', subColor: C.onSurfaceVariant },
];

const HEAD_TO_HEAD = [
    { dim: 'Business Model', yours: 'Proprietary neuromorphic routing SaaS', competitor: 'Open-core cloud platform with managed services', holder: 'yours' },
    { dim: 'Target Market', yours: 'Pharmaceutical enterprises (regulated)', competitor: 'General enterprise AI workloads', holder: 'yours' },
    { dim: 'Revenue Model', yours: 'Usage-based + annual contracts', competitor: 'Seat-based subscription tiers', holder: 'neutral' },
    { dim: 'Tech Moat', yours: '40% lower inference latency, patent pending', competitor: 'Large open-source community, plugin ecosystem', holder: 'yours' },
    { dim: 'Pricing Strategy', yours: 'Premium ($2,500/mo enterprise)', competitor: 'Freemium + $99/mo pro tier', holder: 'competitor' },
    { dim: 'Funding Stage', yours: 'Series A ($18M raised)', competitor: 'Series B ($45M raised)', holder: 'competitor' },
    { dim: 'Geographic Focus', yours: 'US + EU (AI Act compliant)', competitor: 'US-only, expanding APAC', holder: 'yours' },
];

const RISKS = [
    { code: 'C1', label: 'Critical Risk: GPU Scarcity', desc: 'Dependency on H100 availability poses a 6-month delay risk for scaling clusters.', color: 'red' },
    { code: 'O1', label: 'Opportunity: EU Expansion', desc: 'Early compliance with EU AI Act provides 12-month first-mover advantage over US competitors.', color: 'green' },
    { code: 'M1', label: 'Market: Talent Retention', desc: 'High demand for founding engineers in the Bay Area remains a moderate operational risk.', color: 'primary' },
];

export default function DeepDiveAnalysisScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isTablet = width >= 768;

    return (
        <SafeAreaView style={s.root} edges={['bottom']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
                
                {/* ── Page Header ── */}
                <View style={s.headerWrap}>
                    <View style={s.breadcrumb}>
                        <TouchableOpacity onPress={() => router.back()}><Text style={s.breadcrumbLink}>Competitors</Text></TouchableOpacity>
                        <ChevronRight size={14} color={C.onSurfaceVariant} />
                        <Text style={s.breadcrumbCurrent}>Deep Dive</Text>
                    </View>
                    <Text style={s.pageTitle}>Deep Dive Analysis: QuantumFlow AI</Text>
                    <View style={s.headerActions}>
                        <TouchableOpacity style={s.btnSecondary} activeOpacity={0.8}>
                            <Share2 size={16} color={C.primary} />
                            <Text style={s.btnSecondaryText}>Share Report</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.btnPrimary} activeOpacity={0.8}>
                            <LinearGradient colors={[C.tint, '#2d0069']} style={StyleSheet.absoluteFill} start={{x:0,y:0}} end={{x:1,y:1}} borderRadius={12} />
                            <Download size={16} color="#fff" />
                            <Text style={s.btnPrimaryText}>Export PDF</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ── Top Section ── */}
                <View style={[s.bentoGrid, isTablet && s.bentoGridTablet]}>
                    <View style={[s.cardOuter, isTablet && { flex: 2, marginRight: 24 }]}>
                        <View style={s.aiSummaryHeader}>
                            <View style={s.aiIconBox}>
                                <BrainCircuit size={28} color="#9d6bff" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={s.cardTitle}>AI Strategic Summary</Text>
                                <Text style={s.p}>
                                    QuantumFlow AI demonstrates a significant <Text style={s.strong}>technical moat</Text> through its proprietary neuromorphic routing algorithms. Unlike traditional LLM wrappers, their infrastructure layer achieves a 40% reduction in inference latency. The core defensive advantage lies in their <Text style={s.strong}>closed-loop data acquisition strategy</Text> within the pharmaceutical sector, creating a high-entry barrier for generic AI competitors.
                                </Text>
                                <View style={s.tagsRow}>
                                    {['High Conviction', 'Series B Ready', 'Patent Pending'].map(t => (
                                        <View key={t} style={s.tagBox}><Text style={s.tagText}>{t}</Text></View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={[s.scoreCard, isTablet && { flex: 1 }]}>
                        <Text style={s.scoreEyebrow}>MARKET SENTIMENT</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 8 }}>
                            <Text style={s.scoreValue}>9.4</Text>
                            <Text style={s.scoreMax}>/10</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <TrendingUp size={14} color="#9d6bff" />
                            <Text style={s.scoreSub}>Top 1% of sector percentile</Text>
                        </View>
                        <View style={s.scoreFooter}>
                            <View>
                                <Text style={s.scoreFooterLabel}>SIGNAL STRENGTH</Text>
                                <Text style={s.scoreFooterVal}>Institutional Grade</Text>
                            </View>
                            <View style={s.barsWrap}>
                                {[4, 6, 8, 10].map((h, i) => (
                                    <View key={i} style={[s.bar, { height: h * 4, backgroundColor: i === 3 ? '#9d6bff' : `rgba(255,255,255,${0.2 + i*0.2})` }]} />
                                ))}
                            </View>
                        </View>
                        <View style={s.scoreAmbient} />
                    </View>
                </View>

                {/* ── Key Metrics ── */}
                <View style={[s.bentoGrid, isTablet && s.bentoGridTablet, { marginTop: 0 }]}>
                    {METRICS.map(m => (
                        <View key={m.label} style={[s.metricCard, m.border && s.metricCardBorder, isTablet && { flex: 1 }]}>
                            <Text style={s.metricLabel}>{m.label}</Text>
                            <Text style={s.metricValue}>{m.value}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                {m.label === 'Projected ARR' && <ArrowUpRight size={14} color={m.subColor} />}
                                <Text style={[s.metricSub, { color: m.subColor }]}>{m.sub}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* ── Head to Head Table ── */}
                <View style={[s.cardOuter, { padding: 0, marginTop: 24, overflow: 'hidden' }]}>
                    <View style={s.tableHeaderBox}>
                        <Text style={s.cardTitle}>Head-to-Head: QuantumFlow vs NeuralNode</Text>
                        <Text style={[s.p, { marginBottom: 0 }]}>Dimension-by-dimension competitive analysis across 7 key vectors</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={{ minWidth: 800 }}>
                            <View style={s.trHead}>
                                <Text style={[s.th, { width: 160 }]}>DIMENSION</Text>
                                <Text style={[s.th, { flex: 1, color: C.tint }]}>QUANTUMFLOW (YOU)</Text>
                                <Text style={[s.th, { flex: 1 }]}>NEURALNODE</Text>
                                <Text style={[s.th, { width: 100, textAlign: 'center' }]}>EDGE</Text>
                            </View>
                            {HEAD_TO_HEAD.map((row, i) => (
                                <View key={i} style={s.tr}>
                                    <Text style={[s.tdLabel, { width: 160 }]}>{row.dim}</Text>
                                    <Text style={[s.tdText, { flex: 1, paddingRight: 16 }]}>{row.yours}</Text>
                                    <Text style={[s.tdText, { flex: 1, paddingRight: 16 }]}>{row.competitor}</Text>
                                    <View style={[s.tdCenter, { width: 100 }]}>
                                        <View style={[s.edgeBadge, row.holder === 'yours' ? s.edgeYours : row.holder === 'competitor' ? s.edgeThem : s.edgeNeutral]}>
                                            <Text style={[s.edgeText, row.holder === 'yours' ? s.edgeYoursText : row.holder === 'competitor' ? s.edgeThemText : s.edgeNeutralText]}>
                                                {row.holder === 'yours' ? '✓ You' : row.holder === 'competitor' ? 'Them' : 'Neutral'}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* ── Risks & Recommendations ── */}
                <View style={[s.bentoGrid, isTablet && s.bentoGridTablet, { marginTop: 24 }]}>
                    <View style={[s.cardOuter, isTablet && { flex: 1, marginRight: 24 }]}>
                        <View style={s.cardIconHeader}>
                            <Lightbulb size={20} color={C.tint} />
                            <Text style={s.cardTitle}>Strategic Recommendation</Text>
                        </View>
                        <Text style={s.p}>
                            Focus on deepening the pharmaceutical vertical before expanding horizontally. The patent-pending neuromorphic routing gives you a defensible 18-month moat. Prioritize enterprise sales over self-serve to maintain high ACV and justify premium pricing against NeuralNode's freemium strategy. Consider strategic partnerships with top-5 CROs for data acquisition lock-in.
                        </Text>
                    </View>
                    <View style={[s.cardOuter, isTablet && { flex: 1 }]}>
                        <View style={s.cardIconHeader}>
                            <AlertTriangle size={20} color="#f59e0b" />
                            <Text style={s.cardTitle}>Opportunity Gap</Text>
                        </View>
                        <Text style={s.p}>
                            NeuralNode has zero presence in regulated industries (pharma, biotech, clinical trials). Their general-purpose approach means they can't offer HIPAA/GxP compliance out of the box. This creates a significant white-space for QuantumFlow to dominate the $3.4B pharma AI infrastructure market with minimal direct competition for the next 12-18 months.
                        </Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: C.surface },
    scroll: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 80, maxWidth: 1200, alignSelf: 'center', width: '100%' },
    
    headerWrap: { flexDirection: 'column', marginBottom: 32, gap: 16 },
    breadcrumb: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
    breadcrumbLink: { fontFamily: 'Manrope_600SemiBold', fontSize: 12, color: C.onSurfaceVariant },
    breadcrumbCurrent: { fontFamily: 'Manrope_700Bold', fontSize: 12, color: C.primary },
    pageTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 24, color: C.primary, letterSpacing: -0.5 },
    
    headerActions: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
    btnSecondary: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, backgroundColor: C.white, borderWidth: 1, borderColor: C.surfaceContainer },
    btnSecondaryText: { fontFamily: 'Manrope_700Bold', fontSize: 13, color: C.primary },
    btnPrimary: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, shadowColor: C.tint, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
    btnPrimaryText: { fontFamily: 'Manrope_700Bold', fontSize: 13, color: '#fff' },

    bentoGrid: { flexDirection: 'column', gap: 24, marginBottom: 24 },
    bentoGridTablet: { flexDirection: 'row' },
    
    cardOuter: { backgroundColor: C.white, borderRadius: 16, padding: 24, borderWidth: 1, borderColor: C.surfaceContainer, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 1 },
    aiSummaryHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 16 },
    aiIconBox: { width: 56, height: 56, borderRadius: 16, backgroundColor: '#2d0069', alignItems: 'center', justifyContent: 'center' },
    cardTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 20, color: C.primary, marginBottom: 12 },
    p: { fontFamily: 'Manrope_500Medium', fontSize: 14, color: C.onSurfaceVariant, lineHeight: 22, marginBottom: 16 },
    strong: { fontFamily: 'Manrope_700Bold', color: C.primary },
    tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    tagBox: { backgroundColor: C.surfaceContainer, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 4 },
    tagText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, color: C.primary, textTransform: 'uppercase', letterSpacing: 1 },

    scoreCard: { backgroundColor: '#2d0069', borderRadius: 16, padding: 24, justifyContent: 'space-between', overflow: 'hidden' },
    scoreEyebrow: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: '#9d6bff', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 },
    scoreValue: { fontFamily: 'Manrope_800ExtraBold', fontSize: 48, color: '#fff' },
    scoreMax: { fontFamily: 'Manrope_500Medium', fontSize: 20, color: 'rgba(255,255,255,0.6)' },
    scoreSub: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: '#9d6bff' },
    scoreFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 20, marginTop: 32 },
    scoreFooterLabel: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
    scoreFooterVal: { fontFamily: 'Manrope_600SemiBold', fontSize: 14, color: '#fff' },
    barsWrap: { flexDirection: 'row', alignItems: 'flex-end', gap: 2 },
    bar: { width: 6, borderRadius: 3 },
    scoreAmbient: { position: 'absolute', bottom: -50, right: -50, width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(115,46,228,0.2)', zIndex: -1 },

    metricCard: { backgroundColor: C.white, borderRadius: 16, padding: 24, borderWidth: 1, borderColor: C.surfaceContainer, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 1 },
    metricCardBorder: { borderLeftWidth: 4, borderLeftColor: C.tint },
    metricLabel: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
    metricValue: { fontFamily: 'Manrope_800ExtraBold', fontSize: 28, color: C.primary, marginBottom: 4 },
    metricSub: { fontFamily: 'Manrope_700Bold', fontSize: 11 },

    tableHeaderBox: { padding: 24, borderBottomWidth: 1, borderBottomColor: C.surfaceContainer },
    trHead: { flexDirection: 'row', backgroundColor: C.surfaceLow, paddingHorizontal: 24, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(200,197,208,0.2)' },
    th: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, color: C.secondary, textTransform: 'uppercase', letterSpacing: 1.5 },
    tr: { flexDirection: 'row', paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(200,197,208,0.1)', alignItems: 'center' },
    tdLabel: { fontFamily: 'Manrope_800ExtraBold', fontSize: 13, color: C.primary },
    tdText: { fontFamily: 'Manrope_500Medium', fontSize: 12, color: C.onSurfaceVariant },
    tdCenter: { alignItems: 'center' },
    edgeBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 },
    edgeYours: { backgroundColor: '#f0fdf4' },
    edgeThem: { backgroundColor: '#fef2f2' },
    edgeNeutral: { backgroundColor: C.surfaceContainer },
    edgeText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, textTransform: 'uppercase', letterSpacing: 1 },
    edgeYoursText: { color: '#15803d' },
    edgeThemText: { color: '#b91c1c' },
    edgeNeutralText: { color: C.onSurfaceVariant },

    cardIconHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
});

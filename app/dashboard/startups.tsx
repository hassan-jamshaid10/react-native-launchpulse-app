import { trpc } from '@/utils/api';
import { useRouter } from 'expo-router';
import { ArrowRight, ArrowUpDown, Filter, Plus, TrendingUp } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import {
    ActivityIndicator, ScrollView, StyleSheet, Text,
    TouchableOpacity, View, useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

/* ── Stitch Design System ── */
const C = {
    primary: '#110031',
    primaryContainer: '#2d0069',
    tint: '#732ee4',
    tintEnd: '#2d0069',
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

function scoreColor(score: number | null) {
    if (score === null) return C.secondary;
    if (score >= 80) return C.green;
    if (score >= 65) return C.amber;
    return C.error;
}

export default function StartupsPage() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const [sortBy, setSortBy] = useState<'score' | 'name'>('score');
    const [industry, setIndustry] = useState('All');

    const { data: startups, isLoading } = trpc.startup.getAll.useQuery();

    const rawStartups = startups || [];
    const dummyStartups = [
        { id: 101, idea_title: 'NebulaSystems', industry: 'Cloud Orchestration', score: 82, created_at: new Date().toISOString(), ai_data: { success_score: 82 } },
        { id: 102, idea_title: 'NeuralNode', industry: 'Cognitive Computing', score: 91, created_at: new Date(Date.now() - 86400000).toISOString(), ai_data: { success_score: 91 } },
        { id: 103, idea_title: 'BioStream', industry: 'Sustainable Logistics', score: 45, created_at: new Date(Date.now() - 86400000*2).toISOString(), ai_data: { success_score: 45 } },
        { id: 104, idea_title: 'MediSync', industry: 'HealthTech', score: 68, created_at: new Date(Date.now() - 86400000*3).toISOString(), ai_data: { success_score: 68 } },
        { id: 105, idea_title: 'AgriSense', industry: 'AgriTech', score: 55, created_at: new Date(Date.now() - 86400000*4).toISOString(), ai_data: { success_score: 55 } },
    ];
    const STARTUPS = rawStartups.length > 0 ? rawStartups : dummyStartups as any[];
    const industries = ['All', ...Array.from(new Set(STARTUPS.map(s => s.industry).filter(Boolean)))] as string[];

    const filtered = useMemo(() => {
        return [...STARTUPS]
            .filter(s => industry === 'All' || s.industry === industry)
            .sort((a, b) => {
                if (sortBy === 'score') {
                    const scoreA = a.score ?? a.ai_data?.success_score ?? 0;
                    const scoreB = b.score ?? b.ai_data?.success_score ?? 0;
                    return scoreB - scoreA;
                }
                return (a.idea_title || '').localeCompare(b.idea_title || '');
            });
    }, [STARTUPS, industry, sortBy]);

    const validScores = STARTUPS.map(s => s.score ?? s.ai_data?.success_score ?? 0).filter(s => s > 0);
    const avgScore = validScores.length > 0
        ? Math.round(validScores.reduce((acc, s) => acc + s, 0) / validScores.length)
        : 0;

    const isTablet = width >= 768;

    return (
        <SafeAreaView style={s.root} edges={['bottom']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

                {/* ── Hero Cover ── */}
                <View style={s.heroCard}>
                    <LinearGradient colors={[C.primary, C.primaryContainer]} style={StyleSheet.absoluteFill} />
                    <View style={s.heroContent}>
                        <Text style={s.heroBrand}>PORTFOLIO</Text>
                        <Text style={s.heroTitle}>My Startups</Text>
                        <Text style={s.heroDesc}>Monitoring {STARTUPS.length} high-growth startups with integrated risk metrics and market intelligence.</Text>
                        
                        <View style={s.heroActions}>
                            <TouchableOpacity style={s.newBtn} activeOpacity={0.8} onPress={() => router.push('/dashboard/evaluations/new' as any)}>
                                <Plus size={16} color={C.primary} />
                                <Text style={s.newBtnText}>New Evaluation</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={s.sortBtn} activeOpacity={0.7} onPress={() => setSortBy(s => s === 'score' ? 'name' : 'score')}>
                                <ArrowUpDown size={14} color={C.white} />
                                <Text style={s.sortBtnText}>{sortBy === 'score' ? 'By Score' : 'By Name'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* ── Stats ── */}
                <View style={[s.statsGrid, isTablet && s.statsGridTablet]}>
                    {[
                        { label: 'AVG SCORE', value: avgScore > 0 ? avgScore.toFixed(1) : '—', trend: null },
                        { label: 'CAPITAL', value: '$42.8M', trend: null },
                        { label: 'PENDING', value: '03', trend: null },
                        { label: 'RISK INDEX', value: 'Low', trend: null },
                    ].map((stat, i) => (
                        <View key={i} style={[s.statCard, isTablet && s.statCardTablet]}>
                            <Text style={s.statLabel}>{stat.label}</Text>
                            <Text style={s.statValue}>{stat.value}</Text>
                        </View>
                    ))}
                </View>

                {/* ── Grid ── */}
                {isLoading && rawStartups.length === 0 ? (
                    <View style={s.loadingBox}>
                        <ActivityIndicator size="large" color={C.tint} />
                    </View>
                ) : (
                    <View>
                        {filtered.map((sItem, i) => {
                            const score = sItem.score ?? sItem.ai_data?.success_score ?? null;
                            const name = sItem.idea_title || 'Unnamed Startup';
                            const tags = sItem.industry || 'Uncategorized';
                            const abbr = name.substring(0, 2).toUpperCase();
                            const isLast = i === filtered.length - 1;
                            
                            return (
                                <TouchableOpacity 
                                    key={sItem.id} 
                                    style={s.startupRowCard} 
                                    onPress={() => router.push(`/dashboard/startups/${sItem.id}` as any)}
                                    activeOpacity={0.7}
                                >
                                    <View style={s.evalInfoRow}>
                                        <View style={s.evalAbbr}>
                                            <Text style={s.evalAbbrText}>{abbr}</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                                <Text style={s.evalName} numberOfLines={1}>{name}</Text>
                                                <View style={[s.evalTag]}>
                                                    <Text style={[s.evalTagText]}>ACTIVE</Text>
                                                </View>
                                            </View>
                                            <Text style={s.evalMeta}>{tags} • {new Date(sItem.created_at).toLocaleDateString()}</Text>
                                        </View>
                                    </View>
                                    
                                    <View style={s.evalActionsRow}>
                                        <View style={s.evalScoreWrap}>
                                            <Text style={s.evalScoreLabel}>PULSE SCORE</Text>
                                            <Text style={[s.evalScoreVal, { color: scoreColor(score) }]}>{score ?? '—'}</Text>
                                        </View>
                                        <View style={s.evalBtn}>
                                            <Text style={s.evalBtnText}>View Details</Text>
                                            <TrendingUp size={14} color={C.primary} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
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
    scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },

    heroCard: { borderRadius: 24, overflow: 'hidden', marginBottom: 24, position: 'relative' },
    heroContent: { padding: 24 },
    heroBrand: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: 'rgba(255,255,255,0.7)', letterSpacing: 1.5, marginBottom: 8 },
    heroTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 24, color: C.white, marginBottom: 8 },
    heroDesc: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 20, marginBottom: 20 },
    heroActions: { flexDirection: 'row', gap: 10, alignItems: 'center' },
    newBtn: { flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center', gap: 6, backgroundColor: C.white, paddingHorizontal: 12, paddingVertical: 11, borderRadius: 12 },
    newBtnText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 12, color: C.primary },
    sortBtn: { flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 12, paddingVertical: 11, borderRadius: 12 },
    sortBtnText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 12, color: C.white },

    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
    statsGridTablet: { flexWrap: 'nowrap' },
    statCard: { width: '48%', backgroundColor: C.white, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(200,197,208,0.1)' },
    statCardTablet: { flex: 1 },
    statLabel: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.secondary, letterSpacing: 0.5, marginBottom: 4 },
    statValue: { fontFamily: 'Manrope_800ExtraBold', fontSize: 24, color: C.primary },

    tableCard: {
        backgroundColor: C.white, borderRadius: 16, marginBottom: 20,
        shadowColor: '#191c1e', shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.06, shadowRadius: 24, elevation: 3, overflow: 'hidden',
    },
    evalRow: { padding: 20, borderBottomWidth: 1, borderBottomColor: C.surfaceLow, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
    evalRowLast: { borderBottomWidth: 0 },
    startupRowCard: {
        backgroundColor: C.white, borderRadius: 16, marginBottom: 16, padding: 20,
        flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        shadowColor: '#191c1e', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.06, shadowRadius: 20, elevation: 3,
    },
    evalInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 16, flex: 1, minWidth: 220 },
    evalAbbr: { width: 44, height: 44, borderRadius: 12, backgroundColor: C.surfaceLow, alignItems: 'center', justifyContent: 'center' },
    evalAbbrText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 16, color: C.primary },
    evalName: { fontFamily: 'Manrope_800ExtraBold', fontSize: 16, color: C.primary },
    evalTag: { backgroundColor: '#dcfce7', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
    evalTagText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, color: '#15803d', textTransform: 'uppercase' },
    evalMeta: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: C.onSurfaceVariant },
    evalActionsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16, flex: 1, minWidth: 200 },
    evalScoreWrap: { alignItems: 'flex-start', justifyContent: 'center' },
    evalScoreLabel: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, color: C.secondary, letterSpacing: 0.5, marginBottom: 2 },
    evalScoreVal: { fontFamily: 'Manrope_800ExtraBold', fontSize: 24, lineHeight: 28 },
    evalBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.surface, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(200,197,208,0.3)' },
    evalBtnText: { fontFamily: 'Manrope_700Bold', fontSize: 13, color: C.primary },

    loadingBox: { padding: 40, alignItems: 'center', justifyContent: 'center' },
});

import { trpc } from '@/utils/api';
import { useRouter } from 'expo-router';
import { Activity, ArrowUpRight, Building2, Calendar, CheckCircle, ChevronRight, MapPin, Target, Zap } from 'lucide-react-native';
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

export default function AnalyticsPage() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isTablet = width >= 768;

    const { data: rawEvals = [], isLoading } = trpc.evaluation.getAll.useQuery({ workspace_id: undefined });

    const kpis = useMemo(() => {
        const total = rawEvals.length;
        const completed = rawEvals.filter(e => e.status === 'completed').length;
        const completedScores = rawEvals.filter(e => e.status === 'completed' && e.score).map(e => e.score || 0);
        const avgScore = completedScores.length ? Math.round(completedScores.reduce((a, b) => a + b, 0) / completedScores.length) : 0;
        const active = rawEvals.filter(e => e.status !== 'completed').length;
        return { total, completed, avgScore, active };
    }, [rawEvals]);

    const pipelineData = useMemo(() => {
        const initial = rawEvals.length;
        const review = rawEvals.filter(e => e.status !== 'draft').length;
        const completed = rawEvals.filter(e => e.status === 'completed').length;
        return [
            { stage: 'Total Ideas', count: initial, pct: initial ? 100 : 0 },
            { stage: 'Under Review', count: review, pct: initial ? Math.round((review / initial) * 100) : 0 },
            { stage: 'Completed', count: completed, pct: initial ? Math.round((completed / initial) * 100) : 0 },
        ];
    }, [rawEvals]);

    const weeklyData = useMemo(() => {
        const counts = [0, 0, 0, 0, 0, 0, 0];
        rawEvals.forEach(ev => counts[new Date(ev.created_at).getDay()]++);
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => ({ day, v: counts[i] }));
    }, [rawEvals]);

    const maxWeekly = Math.max(...weeklyData.map(d => d.v), 1);

    const recentEvals = useMemo(() => {
        return [...rawEvals].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5).map(ev => ({
            id: ev.id,
            title: ev.idea_title || 'Untitled',
            industry: ev.industry || 'Unknown',
            score: ev.score || 0,
            status: ev.status || 'draft',
            date: new Date(ev.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
        }));
    }, [rawEvals]);

    return (
        <SafeAreaView style={s.root} edges={['bottom']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

                {/* ── Hero Card ── */}
                <View style={s.heroCard}>
                    <LinearGradient colors={['#110031', '#2d0069']} style={StyleSheet.absoluteFill} />
                    <View style={s.heroContent}>
                        <Text style={s.heroBrand}>INTELLIGENCE DASHBOARD</Text>
                        <Text style={s.heroTitle}>Analytics & Insights</Text>
                        <Text style={s.heroDesc}>Real-time performance metrics and AI-driven intelligence across your portfolio.</Text>
                        <View style={s.heroChips}>
                            <View style={s.heroChip}>
                                <View style={[s.chipDot, { backgroundColor: '#a78bfa' }]} />
                                <Text style={s.heroChipText}>{kpis.completed} COMPLETED</Text>
                            </View>
                            <View style={s.heroChip}>
                                <View style={[s.chipDot, { backgroundColor: 'rgba(255,255,255,0.5)' }]} />
                                <Text style={s.heroChipText}>{kpis.active} ACTIVE</Text>
                            </View>
                            <View style={s.heroChip}>
                                <View style={[s.chipDot, { backgroundColor: C.amber }]} />
                                <Text style={s.heroChipText}>AVG {kpis.avgScore}%</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {isLoading ? (
                    <View style={s.loadingBox}>
                        <ActivityIndicator size="large" color={C.tint} />
                    </View>
                ) : (
                    <>
                        {/* ── KPI Grid ── */}
                        <View style={[s.kpiGrid, isTablet && s.kpiGridTablet]}>
                            {[
                                { label: 'TOTAL EVALS', value: kpis.total, icon: Activity, col: C.primaryContainer },
                                { label: 'COMPLETED', value: kpis.completed, icon: CheckCircle, col: C.green },
                                { label: 'AVG SCORE', value: `${kpis.avgScore}%`, icon: Target, col: C.secondary },
                                { label: 'ACTIVE', value: kpis.active, icon: Zap, col: C.amber },
                            ].map((stat, i) => (
                                <View key={i} style={[s.kpiCard, isTablet && s.kpiCardTablet]}>
                                    <View style={s.kpiIconBox}>
                                        <stat.icon size={20} color={stat.col} />
                                    </View>
                                    <Text style={s.kpiVal}>{stat.value}</Text>
                                    <Text style={s.kpiLabel}>{stat.label}</Text>
                                </View>
                            ))}
                        </View>

                        {/* ── Charts Row ── */}
                        <View style={isTablet ? s.rowContainer : null}>
                            
                            {/* Pipeline Funnel */}
                            <View style={[s.card, isTablet && { flex: 1, marginRight: 16 }]}>
                                <Text style={s.cardTitle}>Venture Funnel</Text>
                                <Text style={s.cardSub}>CONVERSION BY STAGE</Text>
                                
                                <View style={{ marginTop: 24, gap: 20 }}>
                                    {pipelineData.map((p, i) => (
                                        <View key={i}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                                <Text style={s.funnelStageText}>{p.stage}</Text>
                                                <Text style={s.funnelCountText}>{p.count}</Text>
                                            </View>
                                            <View style={s.funnelTrack}>
                                                <LinearGradient 
                                                    colors={[C.tint, C.tintEnd]} 
                                                    style={[s.funnelFill, { width: `${p.pct}%` as any, opacity: 1 - i * 0.2 }]} 
                                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} 
                                                />
                                            </View>
                                        </View>
                                    ))}
                                </View>
                                <View style={{ marginTop: 24, paddingTop: 16, borderTopWidth: 1, borderTopColor: C.surfaceLow }}>
                                    <Text style={s.completionLabel}>COMPLETION RATE</Text>
                                    <Text style={s.completionVal}>{pipelineData[2]?.pct || 0}%</Text>
                                </View>
                            </View>

                            {/* Weekly Pulse (Native Bar Chart Simulation) */}
                            <View style={[s.card, isTablet && { flex: 1 }]}>
                                <Text style={s.cardTitle}>Weekly Pulse</Text>
                                <Text style={s.cardSub}>ACTION FREQUENCY BY DAY</Text>
                                
                                <View style={s.barChartWrap}>
                                    {weeklyData.map((d, i) => {
                                        const hPct = d.v > 0 ? (d.v / maxWeekly) * 100 : 0;
                                        return (
                                            <View key={i} style={s.barCol}>
                                                <View style={s.barTrack}>
                                                    <View style={[s.barFill, { height: `${hPct}%` as any, backgroundColor: hPct === 100 ? C.primaryContainer : C.secondary }]} />
                                                </View>
                                                <Text style={s.barLabel}>{d.day}</Text>
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        </View>

                        {/* ── Recent Activity ── */}
                        <View style={s.card}>
                            <View style={s.recentHeader}>
                                <View>
                                    <Text style={s.cardTitle}>Recent Evaluations</Text>
                                    <Text style={s.cardSub}>LATEST INTELLIGENCE REPORTS</Text>
                                </View>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => router.push('/dashboard/evaluations' as any)}>
                                    <Text style={s.viewAllText}>View All</Text>
                                    <ChevronRight size={14} color={C.primaryContainer} />
                                </TouchableOpacity>
                            </View>
                            
                            {recentEvals.map((ev, i) => (
                                <TouchableOpacity key={i} style={[s.evalRow, i === recentEvals.length - 1 && { borderBottomWidth: 0 }]} onPress={() => router.push('/dashboard/evaluation-detail' as any)}>
                                    <View style={{ flex: 1, marginRight: 12 }}>
                                        <Text style={s.evalTitle} numberOfLines={1}>{ev.title}</Text>
                                        <Text style={s.evalDate}>{ev.date}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={s.evalIndustry}>{ev.industry}</Text>
                                    </View>
                                    <View style={{ alignItems: 'flex-end', gap: 4 }}>
                                        <View style={[s.scoreBadge, ev.status === 'draft' && { backgroundColor: 'transparent', borderWidth: 0 }]}>
                                            <Text style={[s.scoreText, ev.status === 'draft' && { color: C.outline }]}>{ev.status === 'draft' ? 'Draft' : `${ev.score}%`}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: C.surface },
    scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
    loadingBox: { padding: 40, alignItems: 'center', justifyContent: 'center' },

    heroCard: { borderRadius: 24, overflow: 'hidden', marginBottom: 24, position: 'relative' },
    heroContent: { padding: 24 },
    heroBrand: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: 'rgba(255,255,255,0.7)', letterSpacing: 1.5, marginBottom: 8 },
    heroTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 26, color: '#fff', letterSpacing: -0.5, marginBottom: 8 },
    heroDesc: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 20, marginBottom: 20 },
    heroChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    heroChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.12)', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20 },
    chipDot: { width: 8, height: 8, borderRadius: 4 },
    heroChipText: { fontFamily: 'Manrope_700Bold', fontSize: 10, color: '#fff', letterSpacing: 0.5 },

    kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
    kpiGridTablet: { flexWrap: 'nowrap' },
    kpiCard: { width: '48%', backgroundColor: C.white, padding: 20, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(200,197,208,0.1)' },
    kpiCardTablet: { flex: 1 },
    kpiIconBox: { width: 40, height: 40, borderRadius: 10, backgroundColor: C.surfaceLow, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
    kpiVal: { fontFamily: 'Manrope_800ExtraBold', fontSize: 24, color: C.primary, marginBottom: 2 },
    kpiLabel: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.secondary, letterSpacing: 0.5 },

    rowContainer: { flexDirection: 'row', alignItems: 'flex-start' },

    card: {
        backgroundColor: C.white, borderRadius: 16, padding: 20, marginBottom: 20,
        shadowColor: '#191c1e', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.04, shadowRadius: 16, elevation: 2,
    },
    cardTitle: { fontFamily: 'Manrope_700Bold', fontSize: 18, color: C.primary, marginBottom: 2 },
    cardSub: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.secondary, letterSpacing: 1 },

    funnelStageText: { fontFamily: 'Manrope_700Bold', fontSize: 12, color: C.primary },
    funnelCountText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.primaryContainer, backgroundColor: 'rgba(45,0,105,0.05)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
    funnelTrack: { height: 8, backgroundColor: C.surfaceLow, borderRadius: 4, overflow: 'hidden' },
    funnelFill: { height: '100%', borderRadius: 4 },
    completionLabel: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.secondary, letterSpacing: 1, marginBottom: 4 },
    completionVal: { fontFamily: 'Manrope_800ExtraBold', fontSize: 24, color: C.primary },

    barChartWrap: { height: 180, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 32, paddingHorizontal: 8 },
    barCol: { alignItems: 'center', height: '100%', width: 28 },
    barTrack: { flex: 1, width: 28, backgroundColor: 'transparent', justifyContent: 'flex-end' },
    barFill: { width: 28, borderTopLeftRadius: 6, borderTopRightRadius: 6 },
    barLabel: { fontFamily: 'Manrope_700Bold', fontSize: 10, color: C.secondary, marginTop: 12 },

    recentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: C.surfaceLow, paddingBottom: 16, marginBottom: 12 },
    viewAllText: { fontFamily: 'Manrope_700Bold', fontSize: 12, color: C.primaryContainer, marginRight: 2 },
    
    evalRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.surfaceLow },
    evalTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, color: C.primary, marginBottom: 4 },
    evalDate: { fontFamily: 'Manrope_500Medium', fontSize: 10, color: C.secondary },
    evalIndustry: { fontFamily: 'Manrope_700Bold', fontSize: 11, color: C.secondary },
    scoreBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: 'rgba(200,197,208,0.3)', borderRadius: 8 },
    scoreText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 12, color: C.primary },
});

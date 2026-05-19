import { trpc } from '@/utils/api';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
    Activity, Eye, Filter, MoreVertical, Plus, Search, Share, TrendingUp, Grid, Briefcase, Zap, HeartPulse, Building2, Leaf, Globe
} from 'lucide-react-native';
import { useMemo, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,
    View, useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/* ── Stitch Colors ── */
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

function statusMeta(status: string) {
    if (status === 'completed') return { label: 'Completed', bg: '#dcfce7', col: '#15803d' };
    if (status === 'draft') return { label: 'Draft', bg: '#eceef0', col: '#5b598c' };
    return { label: 'Review', bg: '#fffbeb', col: '#b45309' };
}

function getIconForIndustry(industry: string) {
    const ind = industry?.toLowerCase() || '';
    if (ind.includes('fintech') || ind.includes('finance')) return { Icon: Briefcase, bg: '#e0e7ff', col: '#4f46e5' };
    if (ind.includes('health')) return { Icon: HeartPulse, bg: '#fce7f3', col: '#db2777' };
    if (ind.includes('farm') || ind.includes('agri') || ind.includes('eco')) return { Icon: Leaf, bg: '#dcfce7', col: '#15803d' };
    if (ind.includes('saas') || ind.includes('cloud')) return { Icon: Globe, bg: '#f3e8ff', col: '#9333ea' };
    return { Icon: Zap, bg: '#ede9fe', col: '#7c3aed' };
}

export default function EvaluationsHub() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const [search, setSearch] = useState('');

    const { data: rawEvals, isLoading } = trpc.evaluation.getAll.useQuery({ workspace_id: undefined });

    const dataToUse = rawEvals || [
        { id: 991, idea_title: 'NebulaSystems', industry: 'Cloud Orchestration', score: 82, status: 'completed', created_at: new Date().toISOString() },
        { id: 992, idea_title: 'NeuralNode', industry: 'Cognitive Computing', score: 91, status: 'completed', created_at: new Date(Date.now() - 86400000).toISOString() },
        { id: 993, idea_title: 'BioStream', industry: 'Sustainable Logistics', score: 45, status: 'draft', created_at: new Date(Date.now() - 86400000*2).toISOString() },
        { id: 994, idea_title: 'MediSync', industry: 'HealthTech', score: 68, status: 'review', created_at: new Date(Date.now() - 86400000*3).toISOString() },
        { id: 995, idea_title: 'AgriSense', industry: 'AgriTech', score: 55, status: 'draft', created_at: new Date(Date.now() - 86400000*4).toISOString() },
    ];

    const evaluations = useMemo(() => {
        return dataToUse.filter((ev) => {
            const term = search.trim().toLowerCase();
            if (!term) return true;
            return ev.idea_title?.toLowerCase().includes(term) || ev.industry?.toLowerCase().includes(term);
        });
    }, [dataToUse, search]);

    const avgScore = useMemo(() => {
        const scores = dataToUse.map(e => e.score ?? 0).filter(s => s > 0);
        if (!scores.length) return '0.0';
        return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
    }, [dataToUse]);

    const pendingCount = dataToUse.filter(e => e.status !== 'completed').length;
    const completedCount = dataToUse.filter(e => e.status === 'completed').length;
    const totalAssets = dataToUse.length;

    const isTablet = width >= 768;

    return (
        <SafeAreaView style={s.root} edges={['bottom']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

                {/* ── Bento Dashboard Intro ── */}
                <View style={s.bentoGrid}>
                    <View style={[s.bentoCard, s.heroBentoCard, { width: isTablet ? '48%' : '100%' }]}>
                        <LinearGradient colors={['#110031', '#2d0069']} style={StyleSheet.absoluteFill} />
                        <Text style={[s.bentoTitle, { color: '#fff' }]}>Evaluations Hub</Text>
                        <Text style={[s.bentoDesc, { color: 'rgba(255,255,255,0.75)' }]}>
                            Welcome back. You have {pendingCount} pending reviews to complete this week.
                        </Text>
                        <View style={s.bentoChips}>
                            <View style={[s.chip, { backgroundColor: 'rgba(255,255,255,0.12)' }]}>
                                <View style={[s.chipDot, { backgroundColor: '#a78bfa' }]} />
                                <Text style={[s.chipText, { color: '#fff' }]}>{completedCount} COMPLETED</Text>
                            </View>
                            <View style={[s.chip, { backgroundColor: 'rgba(255,255,255,0.12)' }]}>
                                <View style={[s.chipDot, { backgroundColor: 'rgba(255,255,255,0.5)' }]} />
                                <Text style={[s.chipText, { color: '#fff' }]}>{pendingCount} DRAFTS</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[s.bentoCard, { width: isTablet ? '24%' : '48%' }]}>
                        <Text style={s.bentoLabel}>PORTFOLIO AVERAGE</Text>
                        <Text style={s.bentoStat}>{avgScore}</Text>
                        <View style={s.bentoTrend}>
                            <TrendingUp size={12} color={C.green} />
                            <Text style={s.bentoTrendText}>+4.2% from last quarter</Text>
                        </View>
                        <Activity size={80} color="rgba(0,0,0,0.03)" style={s.bentoBgIcon} />
                    </View>

                    <View style={[s.bentoCard, { width: isTablet ? '24%' : '48%' }]}>
                        <Text style={s.bentoLabel}>TOTAL ASSETS</Text>
                        <Text style={s.bentoStat}>{totalAssets}</Text>
                        <Text style={s.bentoTrendText}>Active startup monitoring</Text>
                        <Grid size={80} color="rgba(0,0,0,0.03)" style={s.bentoBgIcon} />
                    </View>
                </View>

                {/* ── Table Container ── */}
                <View style={s.tableCard}>
                    <View style={s.tableHeader}>
                        <Text style={s.tableTitle}>Recent Evaluations</Text>
                        <View style={s.tableActions}>
                            <View style={s.searchBox}>
                                <Search size={16} color={C.outline} style={s.searchIcon} />
                                <TextInput
                                    style={s.searchInput}
                                    placeholder="Search entries..."
                                    placeholderTextColor={C.outline}
                                    value={search}
                                    onChangeText={setSearch}
                                />
                            </View>
                            <TouchableOpacity style={s.iconBtn}>
                                <Filter size={18} color={C.onSurfaceVariant} />
                            </TouchableOpacity>
                            <TouchableOpacity style={s.addBtn} onPress={() => router.push('/dashboard/evaluations/new' as any)}>
                                <Plus size={18} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {isLoading ? (
                        <View style={s.loadingBox}>
                            <ActivityIndicator size="large" color={C.tint} />
                        </View>
                    ) : evaluations.length === 0 ? (
                        <View style={s.emptyBox}>
                            <Text style={s.emptyText}>No evaluations found. Create your first one to get started.</Text>
                        </View>
                    ) : (
                        evaluations.map((ev, i) => {
                            const sm = statusMeta(ev.status || 'draft');
                            const iconSet = getIconForIndustry(ev.industry || '');
                            return (
                                <TouchableOpacity
                                    key={ev.id}
                                    style={[s.row, i === evaluations.length - 1 && s.rowLast]}
                                    onPress={() => router.push(`/dashboard/evaluations/${ev.id}` as any)}
                                    activeOpacity={0.7}
                                >
                                        <View style={s.rowInfo}>
                                            <View style={[s.rowIconBox, { backgroundColor: iconSet.bg }]}>
                                                <iconSet.Icon size={20} color={iconSet.col} />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                                    <Text style={s.rowTitle} numberOfLines={1}>{ev.idea_title || 'Untitled Assessment'}</Text>
                                                    <View style={[s.badge, { backgroundColor: sm.bg }]}>
                                                        <Text style={[s.badgeText, { color: sm.col }]}>{sm.label}</Text>
                                                    </View>
                                                </View>
                                                <Text style={s.rowMeta}>{ev.industry || 'Venture'} • {new Date(ev.created_at).toLocaleDateString()}</Text>
                                            </View>
                                        </View>
                                        
                                        <View style={s.rowActions}>
                                            <View style={s.scoreWrap}>
                                                <Text style={s.scoreLabel}>PULSE SCORE</Text>
                                                <Text style={s.scoreVal}>{ev.score || 0}</Text>
                                            </View>
                                            <TouchableOpacity 
                                                style={s.actionBtn} 
                                                activeOpacity={0.8}
                                                onPress={() => router.push(`/dashboard/evaluations/${ev.id}` as any)}
                                            >
                                                <Text style={s.actionBtnText}>View Details</Text>
                                                <TrendingUp size={14} color={C.primary} />
                                            </TouchableOpacity>
                                        </View>
                                </TouchableOpacity>
                            );
                        })
                    )}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: C.surface },
    scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 100 },

    bentoGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 8 },
    bentoCard: {
        backgroundColor: C.white, borderRadius: 16, padding: 20, marginBottom: 16,
        shadowColor: '#191c1e', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.04, shadowRadius: 16, elevation: 2,
        position: 'relative', overflow: 'hidden', justifyContent: 'space-between', minHeight: 140,
    },
    heroBentoCard: { overflow: 'hidden' },
    bentoTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 24, color: C.primary, letterSpacing: -0.5, marginBottom: 8 },
    bentoDesc: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: C.onSurfaceVariant, lineHeight: 18, marginBottom: 16 },
    bentoChips: { flexDirection: 'row', gap: 12 },
    chip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.surfaceLow, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    chipDot: { width: 8, height: 8, borderRadius: 4 },
    chipText: { fontFamily: 'Manrope_700Bold', fontSize: 10, color: C.primary, letterSpacing: 0.5 },
    
    bentoLabel: { fontFamily: 'Manrope_700Bold', fontSize: 10, color: C.secondary, letterSpacing: 1, marginBottom: 12 },
    bentoStat: { fontFamily: 'Manrope_800ExtraBold', fontSize: 32, color: C.primary, marginBottom: 4 },
    bentoTrend: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
    bentoTrendText: { fontFamily: 'Manrope_500Medium', fontSize: 11, color: C.onSurfaceVariant },
    bentoBgIcon: { position: 'absolute', right: -16, bottom: -16 },

    tableCard: {
        backgroundColor: C.white, borderRadius: 16,
        shadowColor: '#191c1e', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.04, shadowRadius: 16, elevation: 2,
        overflow: 'hidden',
    },
    tableHeader: {
        flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        padding: 20, borderBottomWidth: 1, borderBottomColor: C.surfaceLow,
    },
    tableTitle: { fontFamily: 'Manrope_700Bold', fontSize: 18, color: C.primary },
    tableActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.surfaceLow, borderRadius: 20, paddingHorizontal: 12, height: 36, width: 140 },
    searchIcon: { marginRight: 6 },
    searchInput: { flex: 1, fontFamily: 'Manrope_500Medium', fontSize: 13, color: C.primary, padding: 0 },
    iconBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: C.surfaceLow, alignItems: 'center', justifyContent: 'center' },
    addBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: C.tint, alignItems: 'center', justifyContent: 'center' },

    loadingBox: { padding: 40, alignItems: 'center', justifyContent: 'center' },
    emptyBox: { padding: 40, alignItems: 'center', justifyContent: 'center' },
    emptyText: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: C.onSurfaceVariant, textAlign: 'center' },

    row: { padding: 20, borderBottomWidth: 1, borderBottomColor: C.surfaceLow, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
    rowLast: { borderBottomWidth: 0 },
    rowInfo: { flexDirection: 'row', alignItems: 'center', gap: 16, flex: 1, minWidth: 220 },
    rowIconBox: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    rowTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 16, color: C.primary },
    badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
    badgeText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, textTransform: 'uppercase' },
    rowMeta: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: C.onSurfaceVariant },
    
    rowActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16, flex: 1, minWidth: 200 },
    scoreWrap: { alignItems: 'flex-start', justifyContent: 'center' },
    scoreLabel: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, color: C.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1 },
    scoreVal: { fontFamily: 'Manrope_800ExtraBold', fontSize: 24, color: C.tint, marginTop: -2 },
    actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: C.surfaceLow, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: C.surfaceContainer },
    actionBtnText: { fontFamily: 'Manrope_700Bold', fontSize: 12, color: C.primary },
});

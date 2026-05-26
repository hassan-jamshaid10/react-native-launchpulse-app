import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
    Activity, CheckCircle, ChevronRight, FileText,
    Lightbulb, Map, PlayCircle, TrendingUp, Users, Zap,
} from 'lucide-react-native';
import { useMemo } from 'react';
import {
    ScrollView, StyleSheet, Text, TouchableOpacity, View,
    useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { trpc } from '@/utils/api';

/* ── Stitch Design System colours ── */
const C = {
    primary: '#110031',
    primaryContainer: '#2d0069',
    tint: '#732ee4',
    secondary: '#5b598c',
    onSurface: '#191c1e',
    onSurfaceVariant: '#47464f',
    surface: '#f7f9fb',
    surfaceLow: '#f2f4f6',
    surfaceContainer: '#eceef0',
    white: '#ffffff',
    outline: '#c8c5d0',
    green: '#10b981',
    error: '#ba1a1a',
};

function greet() {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

const quickActions = [
    { name: 'New Evaluation', desc: 'Evaluate a new startup', route: '/dashboard/evaluation-hub', from: '#732ee4', to: '#2d0069', Icon: Lightbulb },
    { name: 'AI Assistant', desc: 'Chat with your AI advisor', route: '/dashboard/chat', from: '#5b598c', to: '#110031', Icon: Zap },
    { name: 'Analytics', desc: 'Deep dive into metrics', route: '/dashboard/analytics', from: '#10b981', to: '#0d8f67', Icon: Activity },
    { name: 'Reports', desc: 'Download reports', route: '/dashboard/reports', from: '#f59e0b', to: '#d97706', Icon: FileText },
    { name: 'Roadmap', desc: 'Track execution milestones', route: '/dashboard/startups', from: '#3b82f6', to: '#2563eb', Icon: Map },
    { name: 'Competitors', desc: 'Market intelligence', route: '/dashboard/startup-comparisons', from: '#6366f1', to: '#4f46e5', Icon: TrendingUp },
];

const recentActivityData = [
    { label: 'Evaluation completed', desc: 'AI-Powered Marketing Platform — 85% score', time: '2h ago', Icon: CheckCircle, bg: '#dcfce7', col: '#15803d' },
    { label: 'Project started', desc: 'HealthTech Wearable Device', time: '5h ago', Icon: PlayCircle, bg: '#f2f4f6', col: '#732ee4' },
    { label: 'Team member joined', desc: 'Sarah Johnson joined your team', time: '1d ago', Icon: Users, bg: '#eceef0', col: '#5b598c' },
    { label: 'Report generated', desc: 'Sustainable Fashion Marketplace', time: '2d ago', Icon: FileText, bg: '#fff7ed', col: '#ea580c' },
];

export default function DashboardHome() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isTablet = width >= 768;

    const { data: dbEvaluations, isLoading } = trpc.evaluation.getAll.useQuery({ workspace_id: undefined });

    const recentEvals = useMemo(() => {
        const evals = dbEvaluations || [
            { id: 991, idea_title: 'NebulaSystems', industry: 'Cloud Orchestration', score: 82, status: 'completed', created_at: new Date().toISOString() },
            { id: 992, idea_title: 'NeuralNode', industry: 'Cognitive Computing', score: 91, status: 'completed', created_at: new Date(Date.now() - 86400000).toISOString() },
            { id: 993, idea_title: 'BioStream', industry: 'Sustainable Logistics', score: 45, status: 'draft', created_at: new Date(Date.now() - 86400000*2).toISOString() },
        ];
        
        return evals.slice(0, 4).map(ev => ({
            id: ev.id,
            abbr: (ev.idea_title || 'UN').substring(0, 2).toUpperCase(),
            name: ev.idea_title || 'Untitled Assessment',
            sector: ev.industry || 'Unknown',
            score: ev.score || 0,
            status: ev.status === 'completed' ? 'Completed' : ev.status === 'draft' ? 'Draft' : 'Review',
            statusBg: ev.status === 'completed' ? '#dcfce7' : ev.status === 'draft' ? '#eceef0' : '#ffdad6',
            statusCol: ev.status === 'completed' ? '#15803d' : ev.status === 'draft' ? '#5b598c' : '#ba1a1a',
            date: new Date(ev.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        }));
    }, [dbEvaluations]);

    const numCols = isTablet ? 3 : 2;

    const quickActionRows = useMemo(() => {
        const rows = [];
        for (let i = 0; i < quickActions.length; i += numCols) {
            rows.push(quickActions.slice(i, i + numCols));
        }
        return rows;
    }, [numCols]);

    return (
        <SafeAreaView style={s.root} edges={['bottom']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

                {/* Welcome */}
                <View style={s.welcomeSec}>
                    <Text style={s.welcomeTitle}>{greet()}, Alex.</Text>
                    <Text style={s.welcomeSub}>Here's what's happening across your portfolio today.</Text>
                </View>

                {/* Quick Actions */}
                <View style={s.sectionHeader}>
                    <Text style={s.sectionTitle}>Quick Actions</Text>
                </View>
                <View style={{ marginBottom: 16 }}>
                    {quickActionRows.map((row, i) => (
                        <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                            {row.map(a => (
                                <TouchableOpacity
                                    key={a.name}
                                    onPress={() => router.push(a.route as any)}
                                    activeOpacity={0.85}
                                    style={{ width: isTablet ? '31%' : '48%', borderRadius: 16, overflow: 'hidden' }}
                                >
                                    <LinearGradient
                                        colors={[a.from, a.to]}
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                                        style={s.actionCard}
                                    >
                                        <a.Icon color="#fff" size={24} style={{ opacity: 0.9 }} />
                                        <View style={{ marginTop: 16 }}>
                                            <Text style={s.actionName} numberOfLines={2}>{a.name}</Text>
                                            <Text style={s.actionDesc} numberOfLines={2}>{a.desc}</Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            ))}
                            {row.length < numCols && Array.from({ length: numCols - row.length }).map((_, j) => (
                                <View key={`empty-${j}`} style={{ width: isTablet ? '31%' : '48%' }} />
                            ))}
                        </View>
                    ))}
                </View>

                {/* Recent Evaluations Table */}
                <View style={s.card}>
                    <View style={s.cardHeader}>
                        <Text style={s.cardTitle}>Recent Evaluations</Text>
                        <TouchableOpacity onPress={() => router.push('/dashboard/evaluations' as any)} style={s.viewAllBtn}>
                            <Text style={s.viewAllText}>View All</Text>
                            <ChevronRight color={C.tint} size={16} />
                        </TouchableOpacity>
                    </View>

                    {isLoading && (
                        <View style={s.emptyState}>
                            <Text style={s.emptyText}>Loading evaluations…</Text>
                        </View>
                    )}
                    {!isLoading && recentEvals.map(ev => (
                        <View key={ev.id} style={s.evalRow}>
                            <View style={s.evalInfoRow}>
                                <View style={s.evalAbbr}>
                                    <Text style={s.evalAbbrText}>{ev.abbr}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                        <Text style={s.evalName} numberOfLines={1}>{ev.name}</Text>
                                        <View style={[s.evalTag, { backgroundColor: ev.statusBg }]}>
                                            <Text style={[s.evalTagText, { color: ev.statusCol }]}>{ev.status}</Text>
                                        </View>
                                    </View>
                                    <Text style={s.evalMeta}>{ev.sector} • {ev.date}</Text>
                                </View>
                            </View>
                            
                            <View style={s.evalActionsRow}>
                                <View style={s.evalScoreWrap}>
                                    <Text style={s.evalScoreLabel}>PULSE SCORE</Text>
                                    <Text style={s.evalScoreVal}>{ev.score}</Text>
                                </View>
                                <TouchableOpacity 
                                    style={s.evalBtn} 
                                    activeOpacity={0.8}
                                    onPress={() => router.push(`/dashboard/evaluations/${ev.id}` as any)}
                                >
                                    <Text style={s.evalBtnText}>View Details</Text>
                                    <ChevronRight size={14} color={C.primary} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Recent Activity */}
                <View style={s.card}>
                    <View style={s.cardHeader}>
                        <Text style={s.cardTitle}>Recent Activity</Text>
                    </View>
                    {recentActivityData.map((item, i) => (
                        <View key={i} style={s.activityRow}>
                            <View style={[s.activityIconWrap, { backgroundColor: item.bg }]}>
                                <item.Icon color={item.col} size={18} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={s.activityLabel}>{item.label}</Text>
                                <Text style={s.activityDesc} numberOfLines={1}>{item.desc}</Text>
                                <Text style={s.activityTime}>{item.time}</Text>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: C.surface },
    scroll: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 100 },

    welcomeSec: { marginBottom: 24, marginTop: 8 },
    welcomeTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 28, color: C.primary, letterSpacing: -0.5, marginBottom: 4 },
    welcomeSub: { fontFamily: 'Manrope_500Medium', fontSize: 14, color: C.onSurfaceVariant },

    sectionHeader: { marginBottom: 12 },
    sectionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 16, color: C.primary },

    actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 8 },
    actionCard: { padding: 16, minHeight: 135, justifyContent: 'space-between' },
    actionName: { fontFamily: 'Manrope_700Bold', color: '#fff', fontSize: 13, marginBottom: 4 },
    actionDesc: { fontFamily: 'Manrope_500Medium', color: 'rgba(255,255,255,0.8)', fontSize: 11, lineHeight: 16 },

    card: {
        backgroundColor: C.white, borderRadius: 16, marginBottom: 20,
        shadowColor: '#191c1e', shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.06, shadowRadius: 24, elevation: 3, overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 20, paddingVertical: 16,
        borderBottomWidth: 1, borderBottomColor: C.surfaceLow,
    },
    cardTitle: { fontFamily: 'Manrope_700Bold', fontSize: 16, color: C.primary },
    viewAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 2 },
    viewAllText: { fontFamily: 'Manrope_700Bold', fontSize: 12, color: C.tint },

    emptyState: { padding: 24 },
    emptyText: { fontFamily: 'Manrope_400Regular', fontSize: 13, color: C.onSurfaceVariant },

    evalRow: { padding: 20, borderBottomWidth: 1, borderBottomColor: C.surfaceLow, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
    evalInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 16, flex: 1, minWidth: 220 },
    evalAbbr: { width: 44, height: 44, borderRadius: 12, backgroundColor: C.surfaceLow, alignItems: 'center', justifyContent: 'center' },
    evalAbbrText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 16, color: C.primary },
    evalName: { fontFamily: 'Manrope_800ExtraBold', fontSize: 16, color: C.primary },
    evalTag: { backgroundColor: C.surfaceContainer, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
    evalTagText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, color: C.onSurfaceVariant, textTransform: 'uppercase' },
    evalMeta: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: C.onSurfaceVariant },
    evalActionsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16, flex: 1, minWidth: 200 },
    evalScoreWrap: { alignItems: 'flex-start', justifyContent: 'center' },
    evalScoreLabel: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, color: C.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1 },
    evalScoreVal: { fontFamily: 'Manrope_800ExtraBold', fontSize: 24, color: C.tint, marginTop: -2 },
    evalBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: C.surfaceLow, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: C.surfaceContainer },
    evalBtnText: { fontFamily: 'Manrope_700Bold', fontSize: 12, color: C.primary },

    activityRow: {
        flexDirection: 'row', alignItems: 'flex-start', gap: 12,
        paddingHorizontal: 20, paddingVertical: 12,
        borderBottomWidth: 1, borderBottomColor: C.surfaceLow,
    },
    activityIconWrap: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 },
    activityLabel: { fontFamily: 'Manrope_700Bold', fontSize: 13, color: C.primary, marginBottom: 2 },
    activityDesc: { fontFamily: 'Manrope_400Regular', fontSize: 11, color: C.onSurfaceVariant, marginBottom: 3 },
    activityTime: { fontFamily: 'Manrope_400Regular', fontSize: 10, color: '#787680' },
});

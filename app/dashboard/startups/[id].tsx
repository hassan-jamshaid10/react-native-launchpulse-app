import { trpc } from '@/utils/api';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Building2, Globe, HeartPulse, Leaf, Zap, Briefcase } from 'lucide-react-native';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
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

function getIconForIndustry(industry: string) {
    const ind = industry?.toLowerCase() || '';
    if (ind.includes('fintech') || ind.includes('finance')) return { Icon: Briefcase, bg: '#e0e7ff', col: '#4f46e5' };
    if (ind.includes('health')) return { Icon: HeartPulse, bg: '#fce7f3', col: '#db2777' };
    if (ind.includes('farm') || ind.includes('agri') || ind.includes('eco')) return { Icon: Leaf, bg: '#dcfce7', col: '#15803d' };
    if (ind.includes('saas') || ind.includes('cloud')) return { Icon: Globe, bg: '#f3e8ff', col: '#9333ea' };
    return { Icon: Zap, bg: '#ede9fe', col: '#7c3aed' };
}

export default function StartupDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { width } = useWindowDimensions();

    const { data: startupRaw, isLoading } = trpc.startup.getById.useQuery({ id: Number(id) }, { enabled: !!id });

    const dummyStartup = {
        id: Number(id),
        idea_title: 'NebulaSystems',
        industry: 'Cloud Orchestration',
        score: 82,
        problem_statement: 'Managing multi-cloud deployments is incredibly complex, manual, and prone to configuration errors which leads to massive downtime for enterprise platforms.',
        target_audience: 'Enterprise DevOps teams and Site Reliability Engineers managing $1M+ annual cloud spend.',
        proposed_solution: 'An ML-driven orchestration layer that automatically analyzes traffic, optimizes compute targets across AWS/GCP, and auto-scales with zero downtime.',
        ai_data: { success_score: 82 }
    };

    const startup = startupRaw || dummyStartup as any;

    const { Icon, bg, col } = getIconForIndustry(startup.industry || '');

    return (
        <SafeAreaView style={s.root} edges={['bottom']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
                
                {/* Header Navigation */}
                <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
                    <ArrowLeft size={16} color={C.primary} />
                    <Text style={s.backText}>Back to Portfolio</Text>
                </TouchableOpacity>

                {/* Hero */}
                <View style={s.heroBox}>
                    <View style={[s.iconWrap, { backgroundColor: bg }]}>
                        <Icon size={40} color={col} />
                    </View>
                    <View style={s.heroInfo}>
                        <Text style={s.title}>{startup.idea_title || 'Unnamed Project'}</Text>
                        <Text style={s.industry}>{startup.industry}</Text>
                    </View>
                    <View style={s.scoreBox}>
                        <Text style={s.scoreLabel}>SUCCESS SCORE</Text>
                        <Text style={s.scoreVal}>{startup.score || startup.ai_data?.success_score || '—'}</Text>
                    </View>
                </View>

                {/* Details Bento Grid */}
                <View style={s.grid}>
                    <View style={[s.card, s.bentoCard, { width: width >= 768 ? '48%' : '100%' }]}>
                        <Text style={s.cardTitle}>Problem Statement</Text>
                        <Text style={s.cardDesc}>{startup.ai_data?.problem_statement || startup.problem_statement || 'No description provided.'}</Text>
                    </View>
                    <View style={[s.card, s.bentoCard, { width: width >= 768 ? '48%' : '100%' }]}>
                        <Text style={s.cardTitle}>Target Audience</Text>
                        <Text style={s.cardDesc}>{startup.ai_data?.target_audience || startup.target_audience || 'No description provided.'}</Text>
                    </View>
                </View>
                
                <View style={s.card}>
                    <Text style={s.cardTitle}>Proposed Solution</Text>
                    <Text style={s.cardDesc}>{startup.ai_data?.proposed_solution || startup.proposed_solution || 'No description provided.'}</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: C.surface },
    scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },

    backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 24, paddingVertical: 8 },
    backText: { fontFamily: 'Manrope_700Bold', fontSize: 13, color: C.primary },

    heroBox: { flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 32 },
    iconWrap: { width: 80, height: 80, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    heroInfo: { flex: 1, minWidth: 200, justifyContent: 'center', height: 80 },
    title: { fontFamily: 'Manrope_800ExtraBold', fontSize: 24, color: C.primary, marginBottom: 4 },
    industry: { fontFamily: 'Manrope_600SemiBold', fontSize: 14, color: C.secondary },
    
    scoreBox: { backgroundColor: C.white, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: C.surfaceLow },
    scoreLabel: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.secondary, letterSpacing: 0.5, marginBottom: 4 },
    scoreVal: { fontFamily: 'Manrope_800ExtraBold', fontSize: 32, color: C.tint },

    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    bentoCard: { marginBottom: 16 },
    card: { backgroundColor: C.white, padding: 24, borderRadius: 20, shadowColor: '#191c1e', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 12, elevation: 2, marginBottom: 16 },
    cardTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 14, color: C.primary, marginBottom: 12 },
    cardDesc: { fontFamily: 'Manrope_500Medium', fontSize: 14, color: C.onSurfaceVariant, lineHeight: 22 },
});

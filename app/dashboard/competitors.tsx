import { trpc } from '@/utils/api';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    Activity, ChevronDown, Rocket, Sparkles, Network, ArrowRight
} from 'lucide-react-native';
import { useState } from 'react';
import {
    ScrollView, StyleSheet, Text,
    TouchableOpacity, View, useWindowDimensions, ActivityIndicator, Image
} from 'react-native';
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

const COMPETITORS = [
    {
        id: 1, name: 'NebulaSystems', sub: 'Cloud Orchestration',
        team: 142, stage: 'Series B', score: 82.1, enabled: false, logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMRYawkeawn9mkOsTpYPh0OK3Me9YL3M2--VL59s_dShVSH12lx-Htt3tHcIEqBnHB0KS4wDd2SjQfITQ4CajG0sSmKrX6lL7uqxpX6ivsi-ZQ3lAIrtbqwjjOO5Kngj735IXYEEn-fE3u0QoMY3uSazKOiYWpoRX5X930JBpf79MzOH-EWm8ZQRfis_JQF0NzCh5YEwRHFJW6sYjKysJxvVkYF2M-4nXXFtbZ8pcbAmY0xyohY3u1zAdnVaFlVCrzH3HQd-dXKSM'
    },
    {
        id: 2, name: 'NeuralNode', sub: 'Cognitive Computing',
        team: 28, stage: 'Series A', score: 91.4, enabled: true, logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1qCFKpdf0O7QAfa1zLxQAWwxfjcPKBNdi8GbV_DEpbFi0qiLayIQOiybAR1z1BhkH8K-vNpzn5mOXPsu4Bh2jgT54jUZ8pZzbKQnFLrWCTL7tdx5TLMOgScReC2NLfIpUuVtTizNUhiknXjrd3ezeuiLOjFyr_SIJhRs8OMNZgSR5fOEcth9GwWHW2kw7tmPvr9Di8tEJvGZlZK5jEGXGU0X61JcmVqzbrtg3Pe5MRLv252x1UdcpUI9rtZem29_HyLgJWTC1uRI'
    },
    {
        id: 3, name: 'BioStream', sub: 'Sustainable Logistics',
        team: 56, stage: 'Seed', score: 76.5, enabled: false, logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDULHraTNDgv26dIOFvTWG_qwIbm2o8x55kOY5dGZ5YWGjj4xbX4tV1RKDZP4AQvZnkxZcniSMhigj9dCs8B1B7nULpDOWaTH7HR26JTLHRH8wZMvexzJvfU09xFuhRUwQZGCpnTdtCO3pC9oO7fFIIJEIseQB1F7UrIhtM7F0nRDpcPpgpzYmysPYr92sum6b-zupgvZ8LTT7s2oOeRf-kNCdyrzQkqu7yvlUCHAUT9_cga-_4OO_jTc-7l7lif3qc2VdOHh3NWZ0'
    },
    {
        id: 4, name: 'CortexLabs', sub: 'Neural Interfaces',
        team: 89, stage: 'Series A', score: 88.3, enabled: false, logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPw9EITGOxggyLLYbgyZH_pem_ml2E_sp88Zalbo_MWWXC2gUoUB0JYqjtFi_RchOq4jowmsnWk2n4tQ9t03hu9aE8PY04ULdY46ajVv3LrAhDlNZF8bW4QrH6JKHPtd-tB42T7lrO4jW-Xw7czZvSNU_Kl_efhxoEu2nZmnh5mCsxliOcvVasgD4W_bXb1PT4_oAnTv3GRGYBq_w1Il8FGW6gxCwznVCZz_TMgusPgoR-q4xHUWg9XTJ_PGitVthv8DdWNJ0rk9A'
    }
];

export default function StartupComparisonsScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isTablet = width >= 768;
    const [selectedEvalId, setSelectedEvalId] = useState<number | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { data: rawEvals, isLoading } = trpc.evaluation.getAll.useQuery(
        { workspace_id: 1 },
        { refetchOnWindowFocus: false }
    );

    const completed = (rawEvals || []).filter(e => e.status === 'completed');
    const selectedEval = completed.find(e => e.id === selectedEvalId) || completed[0];

    return (
        <SafeAreaView style={s.root} edges={['bottom']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
                
                {/* ── Hero Card with Selector ── */}
                <View style={s.heroCard}>
                    <LinearGradient colors={['#110031', '#2d0069']} style={StyleSheet.absoluteFill} />
                    <View style={s.heroContent}>
                        <Text style={s.heroBrand}>INTELLIGENCE</Text>
                        <Text style={s.heroTitle}>Competitors</Text>
                        <Text style={s.heroDesc}>Select a completed evaluation to surface similar startups via AI analysis.</Text>

                        <Text style={s.selectorLabel}>EVALUATION PROFILE</Text>
                        <TouchableOpacity style={s.selectorBtn} onPress={() => setDropdownOpen(!dropdownOpen)} activeOpacity={0.8}>
                            {isLoading ? (
                                <ActivityIndicator size="small" color={C.tint} />
                            ) : completed.length === 0 ? (
                                <Text style={s.selectorBtnText}>No completed evaluations</Text>
                            ) : (
                                <>
                                    <View style={{ flex: 1 }}>
                                        <Text style={s.selectorValueTitle} numberOfLines={1}>{selectedEval?.idea_title || 'Select Evaluation'}</Text>
                                        <Text style={s.selectorValueSub}>{selectedEval?.industry || 'Unknown Sector'}</Text>
                                    </View>
                                    <ChevronDown size={20} color={C.primary} />
                                </>
                            )}
                        </TouchableOpacity>

                        {dropdownOpen && completed.length > 0 && (
                            <View style={s.dropdownMenu}>
                                {completed.map(ev => (
                                    <TouchableOpacity
                                        key={ev.id}
                                        style={s.dropdownItem}
                                        onPress={() => { setSelectedEvalId(ev.id); setDropdownOpen(false); }}
                                    >
                                        <Text style={s.dropdownItemTitle}>{ev.idea_title}</Text>
                                        <Text style={s.dropdownItemSub}>{ev.industry}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        {selectedEval && (
                            <View style={s.selectedDetailsBox}>
                                <View style={s.detailRow}>
                                    <Text style={s.detailLabel}>PULSE SCORE</Text>
                                    <Text style={s.detailValueScore}>{selectedEval.score}/100</Text>
                                </View>
                                <View style={s.detailRow}>
                                    <Text style={s.detailLabel}>SECTOR</Text>
                                    <Text style={s.detailValue}>{selectedEval.industry}</Text>
                                </View>
                                <View style={s.detailRow}>
                                    <Text style={s.detailLabel}>LAST SYNC</Text>
                                    <Text style={s.detailValue}>{new Date(selectedEval.updated_at).toLocaleDateString()}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                </View>

                {/* Feed */}
                <View style={s.feedCard}>
                    <View style={s.feedHeader}>
                        <Text style={s.feedTitle}>Live Competitor Feed</Text>
                        <Text style={s.feedSub}>Real-time tracking based on semantic similarity to {selectedEval?.idea_title || 'your startup'}.</Text>
                    </View>

                    <View style={s.feedList}>
                        {COMPETITORS.map((comp, idx) => (
                            <View key={comp.id} style={[s.compRow, idx === COMPETITORS.length - 1 && s.compRowLast]}>
                                <View style={s.compInfoRow}>
                                    <Image source={{ uri: comp.logo }} style={s.compLogo} />
                                    <View style={{ flex: 1 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                                            <Text style={s.compName} numberOfLines={1}>{comp.name}</Text>
                                            <View style={s.compTag}><Text style={s.compTagText}>{comp.sub}</Text></View>
                                        </View>
                                        <Text style={s.compMeta}>{comp.stage} • {comp.team} Employees</Text>
                                    </View>
                                </View>
                                
                                <View style={s.compActionsRow}>
                                    <View style={s.compScoreWrap}>
                                        <Text style={s.compScoreLabel}>THREAT SCORE</Text>
                                        <Text style={s.compScoreVal}>{comp.score}</Text>
                                    </View>
                                    <TouchableOpacity 
                                        style={s.deepDiveBtn} 
                                        activeOpacity={0.8}
                                        onPress={() => router.push('/dashboard/competitors_deepdive')}
                                    >
                                        <Text style={s.deepDiveBtnText}>Deep Dive</Text>
                                        <ArrowRight size={14} color={C.primary} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: C.surface },
    scroll: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 60, maxWidth: 1200, alignSelf: 'center', width: '100%' },
    
    heroCard: { borderRadius: 24, overflow: 'hidden', marginBottom: 20, position: 'relative' },
    heroContent: { padding: 24 },
    heroBrand: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: 'rgba(255,255,255,0.6)', letterSpacing: 1.5, marginBottom: 8 },
    heroTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 28, color: '#fff', letterSpacing: -0.5, marginBottom: 8 },
    heroDesc: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 20, marginBottom: 24 },

    selectorLabel: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 },
    selectorBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.95)', padding: 14, borderRadius: 12 },
    selectorBtnText: { fontFamily: 'Manrope_600SemiBold', fontSize: 14, color: C.onSurfaceVariant },
    selectorValueTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15, color: C.primary, marginBottom: 2 },
    selectorValueSub: { fontFamily: 'Manrope_500Medium', fontSize: 12, color: C.secondary },
    dropdownMenu: { backgroundColor: C.white, borderRadius: 12, marginTop: 8, overflow: 'hidden', borderWidth: 1, borderColor: C.surfaceContainer },
    dropdownItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: C.surfaceLow },
    dropdownItemTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: C.primary },
    dropdownItemSub: { fontFamily: 'Manrope_500Medium', fontSize: 11, color: C.onSurfaceVariant, marginTop: 2 },
    selectedDetailsBox: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 14, borderRadius: 12, marginTop: 12, gap: 10 },
    detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    detailLabel: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' },
    detailValue: { fontFamily: 'Manrope_700Bold', fontSize: 12, color: '#fff' },
    detailValueScore: { fontFamily: 'Manrope_800ExtraBold', fontSize: 14, color: '#6ee7b7' },

    feedCard: { backgroundColor: C.white, borderRadius: 16, borderWidth: 1, borderColor: C.surfaceContainer, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 1, overflow: 'hidden' },
    feedHeader: { padding: 20, borderBottomWidth: 1, borderBottomColor: C.surfaceLow },
    feedTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 18, color: C.primary, marginBottom: 4 },
    feedSub: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: C.onSurfaceVariant },
    feedList: { flexDirection: 'column' },
    compRow: { padding: 20, borderBottomWidth: 1, borderBottomColor: C.surfaceLow, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
    compRowLast: { borderBottomWidth: 0 },
    compInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1, minWidth: 200 },
    compLogo: { width: 44, height: 44, borderRadius: 12, backgroundColor: C.surfaceLow },
    compName: { fontFamily: 'Manrope_800ExtraBold', fontSize: 15, color: C.primary, flexShrink: 1 },
    compTag: { backgroundColor: C.surfaceContainer, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
    compTagText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, color: C.onSurfaceVariant, textTransform: 'uppercase' },
    compMeta: { fontFamily: 'Manrope_500Medium', fontSize: 12, color: C.onSurfaceVariant },
    
    compActionsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16, flex: 1, minWidth: 180 },
    compScoreWrap: { alignItems: 'flex-start' },
    compScoreLabel: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, color: C.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 },
    compScoreVal: { fontFamily: 'Manrope_800ExtraBold', fontSize: 24, color: C.tint, lineHeight: 28 },
    deepDiveBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.surfaceLow, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: C.surfaceContainer },
    deepDiveBtnText: { fontFamily: 'Manrope_700Bold', fontSize: 12, color: C.primary },
});

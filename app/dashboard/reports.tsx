import { trpc } from '@/utils/api';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    Activity, ChevronLeft, ChevronRight, Download, Filter, 
    MoreHorizontal, Plus, Search, Sparkles, Share2, Eye, HelpCircle
} from 'lucide-react-native';
import {
    ActivityIndicator, ScrollView, StyleSheet, Text,
    TouchableOpacity, View, useWindowDimensions
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
};

export default function ReportsScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isTablet = width >= 768;

    const { data: rawEvals, isLoading } = trpc.evaluation.getAll.useQuery(
        { workspace_id: 1 }, // Hardcoded for parity with team mock
        { refetchOnWindowFocus: false }
    );

    const finalizedReports = (rawEvals || []).filter(e => e.status === 'completed');
    const activeDrafts = (rawEvals || []).filter(e => e.status !== 'completed');

    return (
        <SafeAreaView style={s.root} edges={['bottom']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
                
                {/* ── Page Header ── */}
                <View style={s.headerWrap}>
                    <View>
                        <Text style={s.kicker}>Central Repository</Text>
                        <Text style={s.pageTitle}>Venture Intelligence</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => router.push('/dashboard/evaluations/new')}>
                        <LinearGradient colors={[C.tint, C.primaryContainer]} style={s.newReportBtn} start={{x:0, y:0}} end={{x:1,y:1}}>
                            <Plus size={16} color="#fff" />
                            <Text style={s.newReportBtnText}>New Report</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* ── Active Drafts ── */}
                <View style={s.section}>
                    <View style={s.sectionHeader}>
                        <View style={s.dotTint} />
                        <Text style={s.sectionTitle}>Active Drafts</Text>
                    </View>

                    <View style={isTablet ? s.draftsRow : s.draftsCol}>
                        {/* Main Draft */}
                        <View style={[s.mainDraftCard, isTablet && { flex: 7, marginRight: 20 }]}>
                            {activeDrafts.length > 0 ? (
                                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                    <View>
                                        <View style={s.mainDraftHeaderRow}>
                                            <View style={s.draftTagWrap}>
                                                <Text style={s.draftTag}>{activeDrafts[0].industry || 'STARTUP'}</Text>
                                            </View>
                                            <Text style={s.draftMetaText}>Last synced recently</Text>
                                        </View>
                                        <Text style={s.mainDraftTitle} numberOfLines={1}>{activeDrafts[0].idea_title || 'Untitled Assessment'}</Text>
                                        <Text style={s.mainDraftDesc} numberOfLines={2}>Evaluation currently processing through the unified AI inference pipeline.</Text>
                                    </View>
                                    <View style={s.mainDraftFooter}>
                                        <View style={s.evaluatorBadge}><Text style={s.evaluatorBadgeText}>ME</Text></View>
                                        <TouchableOpacity 
                                            style={s.continueBtn}
                                            onPress={() => router.push(`/dashboard/evaluations/${activeDrafts[0].id}` as any)}
                                        >
                                            <Text style={s.continueBtnText}>Continue Editing</Text>
                                            <ChevronRight size={16} color={C.primary} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <View style={s.emptyDraftBox}>
                                    <Activity size={32} color={C.onSurfaceVariant} style={{ marginBottom: 12 }} />
                                    <Text style={s.emptyDraftTitle}>No Active Drafts</Text>
                                    <Text style={s.emptyDraftSub}>Start a new evaluation to see it here.</Text>
                                </View>
                            )}
                        </View>

                        {/* Minor Drafts */}
                        <View style={[s.minorDraftsCol, isTablet && { flex: 5 }]}>
                            {activeDrafts.slice(1, 3).map(draft => (
                                <TouchableOpacity key={draft.id} style={s.minorDraftCard} activeOpacity={0.8}>
                                    <View>
                                        <View style={s.minorDraftHeader}>
                                            <Text style={s.minorDraftTag}>{draft.industry || 'DRAFT'}</Text>
                                            <MoreHorizontal size={18} color={C.outline} />
                                        </View>
                                        <Text style={s.minorDraftTitle} numberOfLines={1}>{draft.idea_title || 'Untitled'}</Text>
                                    </View>
                                    <View style={s.progressBarTrack}>
                                        <View style={[s.progressBarFill, { width: '50%' }]} />
                                    </View>
                                </TouchableOpacity>
                            ))}
                            {activeDrafts.length < 2 && Array.from({ length: 2 - activeDrafts.slice(1,3).length }).map((_, i) => (
                                <View key={i} style={s.emptyMinorDraftBox}>
                                    <Text style={s.emptyMinorDraftText}>Empty Draft Slot</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* ── Finalized Reports ── */}
                <View style={s.section}>
                    <View style={s.reportsHeaderWrap}>
                        <View style={s.sectionHeader}>
                            <View style={s.dotGrey} />
                            <Text style={s.sectionTitle}>Finalized Reports</Text>
                        </View>
                        <View style={s.actionsWrap}>
                            <TouchableOpacity style={s.actionBtn} activeOpacity={0.8}>
                                <Filter size={14} color={C.primary} />
                                <Text style={s.actionBtnText}>Filter</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={s.actionBtn} activeOpacity={0.8}>
                                <Download size={14} color={C.primary} />
                                <Text style={s.actionBtnText}>Export All</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={s.tableCard}>
                        {/* Table Header */}
                        {isTablet && (
                            <View style={s.tableHeaderRow}>
                                <Text style={[s.th, { flex: 2 }]}>REPORT NAME</Text>
                                <Text style={[s.th, { flex: 1 }]}>OWNER</Text>
                                <Text style={[s.th, { flex: 1 }]}>SCORE</Text>
                                <Text style={[s.th, { flex: 1 }]}>DATE PUBLISHED</Text>
                                <Text style={[s.th, { flex: 1, textAlign: 'right' }]}>ACTIONS</Text>
                            </View>
                        )}
                        
                        {isLoading ? (
                            <View style={{ padding: 40, alignItems: 'center' }}><ActivityIndicator size="small" color={C.tint} /></View>
                        ) : finalizedReports.length === 0 ? (
                            <View style={{ padding: 40, alignItems: 'center' }}>
                                <Text style={s.emptyDraftSub}>No finalized reports yet. Let's create one.</Text>
                            </View>
                        ) : (
                            finalizedReports.map((report) => (
                                <View key={report.id} style={s.tableRow}>
                                    <View style={[s.tdFlex, isTablet && { flex: 2, paddingVertical: 16 }]}>
                                        <View style={s.tdIconWrap}><Text style={{ color: C.tint, opacity: 0.8 }}>📄</Text></View>
                                        <View>
                                            <Text style={s.tdTitle} numberOfLines={1}>{report.idea_title || 'Untitled'}</Text>
                                            <Text style={s.tdSub}>{report.industry || 'General'}</Text>
                                        </View>
                                    </View>
                                    
                                    <View style={[s.tdCol, isTablet && { flex: 1 }]}>
                                        {!isTablet && <Text style={s.thMobile}>OWNER</Text>}
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                            <View style={s.evaluatorBadge}><Text style={s.evaluatorBadgeText}>ID</Text></View>
                                            <Text style={s.tdText}>Evaluator</Text>
                                        </View>
                                    </View>

                                    <View style={[s.tdCol, isTablet && { flex: 1 }]}>
                                        {!isTablet && <Text style={s.thMobile}>SCORE</Text>}
                                        <View style={s.scoreBadge}><Text style={s.scoreBadgeText}>{report.score || 0}/100</Text></View>
                                    </View>

                                    <View style={[s.tdCol, isTablet && { flex: 1 }]}>
                                        {!isTablet && <Text style={s.thMobile}>DATE PUBLISHED</Text>}
                                        <Text style={s.tdText}>{new Date(report.created_at).toLocaleDateString()}</Text>
                                    </View>

                                    <View style={[s.tdActions, isTablet && { flex: 1, justifyContent: 'flex-end' }]}>
                                        <TouchableOpacity style={s.actionIconBtn} onPress={() => router.push(`/dashboard/evaluations/${report.id}` as any)}>
                                            <Eye size={18} color={C.onSurfaceVariant} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={s.actionIconBtn}><Download size={18} color={C.onSurfaceVariant} /></TouchableOpacity>
                                        <TouchableOpacity style={s.actionIconBtn}><Share2 size={18} color={C.onSurfaceVariant} /></TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        )}

                        <View style={s.tableFooter}>
                            <Text style={s.footerText}>SHOWING {finalizedReports.length} REPORTS</Text>
                            <View style={{ flexDirection: 'row', gap: 6 }}>
                                <View style={[s.paginationBtn, { opacity: 0.5 }]}><ChevronLeft size={16} color={C.primary} /></View>
                                <View style={[s.paginationBtn, { backgroundColor: C.primary }]}><Text style={{ color: '#fff', fontFamily: 'Manrope_700Bold', fontSize: 12 }}>1</Text></View>
                                <View style={s.paginationBtn}><ChevronRight size={16} color={C.primary} /></View>
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>

            {/* Floating Quick Action Fab */}
            <View style={s.fabContainer}>
                <TouchableOpacity style={s.fabBtn}><Search size={18} color={C.onSurfaceVariant} /></TouchableOpacity>
                <TouchableOpacity style={[s.fabBtn, { backgroundColor: 'rgba(115,46,228,0.1)' }]}><Sparkles size={18} color={C.tint} /></TouchableOpacity>
                <TouchableOpacity style={s.fabBtn}><HelpCircle size={18} color={C.onSurfaceVariant} /></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: C.surface },
    scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 100 },
    
    headerWrap: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, gap: 16 },
    kicker: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.secondary, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 },
    pageTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 28, color: C.primary, letterSpacing: -0.5 },
    newReportBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12, gap: 8, shadowColor: C.tint, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
    newReportBtnText: { fontFamily: 'Manrope_700Bold', fontSize: 13, color: '#fff' },

    section: { marginBottom: 48 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
    dotTint: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.tint },
    dotGrey: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.outline },
    sectionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 16, color: C.primary },

    draftsRow: { flexDirection: 'row', alignItems: 'stretch' },
    draftsCol: { flexDirection: 'column', gap: 20 },
    
    mainDraftCard: { backgroundColor: C.white, borderRadius: 16, padding: 24, borderWidth: 1, borderColor: C.surfaceLow, minHeight: 200, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 1, marginBottom: 20 },
    mainDraftHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
    draftTagWrap: { backgroundColor: C.surfaceLow, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4, borderWidth: 1, borderColor: C.surfaceContainer },
    draftTag: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, color: C.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 0.5 },
    draftMetaText: { fontFamily: 'Manrope_600SemiBold', fontSize: 10, color: C.onSurfaceVariant },
    mainDraftTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 20, color: C.primary, marginBottom: 8 },
    mainDraftDesc: { fontFamily: 'Manrope_500Medium', fontSize: 12, color: C.onSurfaceVariant, lineHeight: 18, marginBottom: 24 },
    mainDraftFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    evaluatorBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: C.surfaceContainer, borderWidth: 2, borderColor: C.white, alignItems: 'center', justifyContent: 'center' },
    evaluatorBadgeText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, color: C.primary },
    continueBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    continueBtnText: { fontFamily: 'Manrope_700Bold', fontSize: 13, color: C.primary },
    emptyDraftBox: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 200, opacity: 0.5 },
    emptyDraftTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: C.primary },
    emptyDraftSub: { fontFamily: 'Manrope_500Medium', fontSize: 12, color: C.onSurfaceVariant, marginTop: 4 },

    minorDraftsCol: { gap: 20 },
    minorDraftCard: { backgroundColor: C.white, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: C.surfaceLow, minHeight: 120, justifyContent: 'space-between', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 1 },
    minorDraftHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    minorDraftTag: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.tint, textTransform: 'uppercase' },
    minorDraftTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15, color: C.primary, marginBottom: 16 },
    progressBarTrack: { width: '100%', height: 6, borderRadius: 3, backgroundColor: C.surfaceLow, overflow: 'hidden' },
    progressBarFill: { height: '100%', backgroundColor: C.tint, borderRadius: 3 },
    emptyMinorDraftBox: { backgroundColor: 'transparent', borderRadius: 16, padding: 20, borderWidth: 2, borderColor: C.surfaceContainer, borderStyle: 'dashed', minHeight: 120, alignItems: 'center', justifyContent: 'center', opacity: 0.5 },
    emptyMinorDraftText: { fontFamily: 'Manrope_700Bold', fontSize: 12, color: C.onSurfaceVariant },

    reportsHeaderWrap: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 16 },
    actionsWrap: { flexDirection: 'row', gap: 12 },
    actionBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, borderWidth: 1, borderColor: C.surfaceContainer, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, gap: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
    actionBtnText: { fontFamily: 'Manrope_700Bold', fontSize: 12, color: C.primary },

    tableCard: { backgroundColor: C.white, borderRadius: 16, borderWidth: 1, borderColor: C.surfaceLow, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 1 },
    tableHeaderRow: { flexDirection: 'row', backgroundColor: 'rgba(242,244,246,0.5)', borderBottomWidth: 1, borderBottomColor: C.surfaceContainer, paddingHorizontal: 24, paddingVertical: 16 },
    th: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.secondary, textTransform: 'uppercase', letterSpacing: 1 },
    tableRow: { flexDirection: 'row', flexWrap: 'wrap', borderBottomWidth: 1, borderBottomColor: C.surfaceLow, paddingHorizontal: 24, paddingVertical: 16, gap: 16 },
    thMobile: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.secondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
    tdFlex: { flexDirection: 'row', alignItems: 'center', gap: 12, width: '100%' },
    tdIconWrap: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: C.surfaceLow, borderRadius: 8 },
    tdTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: C.primary, marginBottom: 2 },
    tdSub: { fontFamily: 'Manrope_600SemiBold', fontSize: 10, color: C.onSurfaceVariant, textTransform: 'uppercase' },
    tdCol: { width: '45%' }, // mobile layout column
    tdText: { fontFamily: 'Manrope_600SemiBold', fontSize: 12, color: C.onSurfaceVariant },
    scoreBadge: { backgroundColor: 'rgba(34,197,94,0.1)', borderWidth: 1, borderColor: 'rgba(34,197,94,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start' },
    scoreBadgeText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: '#15803d' },
    tdActions: { flexDirection: 'row', alignItems: 'center', gap: 4, width: '100%', justifyContent: 'flex-start', marginTop: 8 },
    actionIconBtn: { padding: 8, borderRadius: 8, backgroundColor: 'transparent' },

    tableFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16, backgroundColor: C.white, borderTopWidth: 1, borderTopColor: C.surfaceLow },
    footerText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.secondary, textTransform: 'uppercase', letterSpacing: 1 },
    paginationBtn: { width: 28, height: 28, borderRadius: 8, borderWidth: 1, borderColor: C.surfaceContainer, alignItems: 'center', justifyContent: 'center' },

    fabContainer: { position: 'absolute', bottom: 32, right: 32, flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.9)', padding: 6, borderRadius: 24, borderWidth: 1, borderColor: C.surfaceLow, gap: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5 },
    fabBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
});

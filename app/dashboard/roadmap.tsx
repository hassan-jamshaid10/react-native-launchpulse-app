import { LinearGradient } from 'expo-linear-gradient';
import {
    Calendar, CheckCircle, ChevronRight, Clock, Download,
    Sparkles, TrendingUp, Zap
} from 'lucide-react-native';
import { useState } from 'react';
import {
    ScrollView, StyleSheet, Text,
    TouchableOpacity, View, useWindowDimensions
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

const WORKSTREAMS = [
    {
        iconColor: '#732ee4', iconBg: 'rgba(115,46,228,0.1)',
        name: 'Product Core', sub: 'Architecture & Logic',
        bars: [
            { status: 'done', tag: 'MVP Release', title: 'Kernel v1.0 Launch', w: '25%' },
            { status: 'active', tag: 'Scaling Phase', title: 'API Infrastructure Expansion', pct: 75, w: '50%' },
            { status: 'planned', tag: 'Optimization', title: 'AI Model Tuning', w: '25%' },
        ],
    },
    {
        iconColor: '#ea580c', iconBg: '#ffedd5',
        name: 'Go-to-Market', sub: 'Growth & Expansion',
        bars: [
            { status: 'done', tag: 'Initial Outreach', title: 'Closed Beta Onboarding', w: '45%' },
            { status: 'active', tag: 'Regional Launch', title: 'EU/APAC Market Entry', w: '30%' },
            { status: 'planned', tag: 'Publicity', title: 'Web Summit Keynote', w: '20%' },
        ],
    },
    {
        iconColor: '#2563eb', iconBg: '#dbeafe',
        name: 'Funding', sub: 'Capital & Rounds',
        bars: [
            { status: 'done', tag: 'Series A', title: 'Round Completion ($12M)', w: '25%' },
            { status: 'planned', tag: '', title: '', w: '25%' },
            { status: 'active', tag: 'Bridge', title: 'Strategic Convertible', w: '25%' },
            { status: 'planned', tag: 'Series B', title: 'Roadshow Prep', w: '25%' },
        ],
    },
];

const INSIGHTS = [
    {
        icon: Sparkles, iconColor: '#732ee4', borderColor: '#732ee4',
        tag: 'Velocity Alert', body: 'Product development is outpacing GTM readiness in the EU region. Suggest reallocating 15% of engineering focus to localized compliance features to prevent launch delays.',
    },
    {
        icon: TrendingUp, iconColor: '#10b981', borderColor: '#10b981',
        tag: 'Funding Outlook', body: 'Current burn rate and runway metrics suggest an optimal Series B window opening in late Q4. Investor interest indices are up 22% this quarter.',
    },
];

const RISKS = [
    { level: 'HIGH', levelColor: '#f87171', title: 'Regulatory Headwinds (APAC)', body: 'Pending policy shift in Singapore might delay market entry by 3-4 months.' },
    { level: 'MED', levelColor: '#fb923c', title: 'Talent Acquisition Lag', body: 'Shortfall in AI Engineering hires may throttle optimization milestones in Q4.' },
];

const ACTIVITY = [
    { color: '#10b981', label: 'Kernel v1.0 Marked Complete', time: '2d ago' },
    { color: '#732ee4', label: 'New Task: API Docs Refactor', time: '5h ago' },
    { color: '#ef4444', label: 'Risk Flag: APAC Regulation', time: '1h ago' },
];

export default function RoadmapScreen() {
    const { width } = useWindowDimensions();
    const isTablet = width >= 768;
    const [activeView, setActiveView] = useState<'timeline' | 'list'>('timeline');

    return (
        <SafeAreaView style={s.root} edges={['bottom']}>
            {/* Ambient Backgrounds */}
            <View style={[StyleSheet.absoluteFill, { overflow: 'hidden', zIndex: -1 }]}>
                <View style={s.ambientTop} />
                <View style={s.ambientBottom} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
                
                {/* ── Page Header ── */}
                <View style={s.headerWrap}>
                    <View>
                        <View style={s.breadcrumb}>
                            <Text style={s.breadcrumbText}>Venture Portfolio</Text>
                            <ChevronRight size={14} color={C.onSurfaceVariant} />
                            <Text style={[s.breadcrumbText, { color: C.tint }]}>Strategic Roadmap 2024</Text>
                        </View>
                        <Text style={s.pageTitle}>Master Vision Pipeline</Text>
                        <Text style={s.pageSub}>Synchronized cross-functional milestones for the fiscal year.</Text>
                    </View>

                    <View style={s.headerActions}>
                        <View style={s.toggleWrap}>
                            <TouchableOpacity style={[s.toggleBtn, activeView === 'timeline' && s.toggleBtnActive]} onPress={() => setActiveView('timeline')}>
                                <Text style={[s.toggleText, activeView === 'timeline' && s.toggleTextActive]}>Timeline</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[s.toggleBtn, activeView === 'list' && s.toggleBtnActive]} onPress={() => setActiveView('list')}>
                                <Text style={[s.toggleText, activeView === 'list' && s.toggleTextActive]}>List</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={s.exportBtn} activeOpacity={0.8}>
                            <Download size={14} color={C.primary} />
                            <Text style={s.exportBtnText}>Export PDF</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ── Stats Bento ── */}
                <View style={[s.bentoGrid, isTablet && s.bentoGridTablet]}>
                    <View style={s.statCard}>
                        <Text style={s.statEyebrow}>Completion</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                            <Text style={s.statValue}>64%</Text>
                            <Text style={s.statBadge}>+12% vs last month</Text>
                        </View>
                        <View style={s.statTrack}>
                            <View style={[s.statFill, { width: '64%' }]} />
                        </View>
                    </View>

                    <View style={s.statCard}>
                        <Text style={s.statEyebrow}>Active Workstreams</Text>
                        <Text style={s.statValue}>03</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <View style={s.dotTint} />
                            <Text style={s.statMeta}>Core, GTM, Funding</Text>
                        </View>
                    </View>

                    <View style={s.statCard}>
                        <Text style={s.statEyebrow}>Upcoming Milestones</Text>
                        <Text style={s.statValue}>12</Text>
                        <Text style={s.statMeta}>Next due: Oct 14th</Text>
                    </View>

                    <LinearGradient colors={[C.tint, '#2d0069']} style={s.statusCard} start={{ x:0, y:0 }} end={{ x:1, y:1 }}>
                        <Text style={s.statusEyebrow}>System Status</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                            <Zap size={32} color="#fff" />
                            <Text style={s.statusText}>Optimized for Q3 Velocity</Text>
                        </View>
                        <Text style={s.statusFooter}>Last updated 2 hours ago</Text>
                    </LinearGradient>
                </View>

                {/* ── Timeline Container ── */}
                <View style={s.timelineCard}>
                    {isTablet && (
                        <View style={s.timelineHeaderRow}>
                            <View style={[s.timelineHeaderCol, { flex: 3 }]}><Text style={s.thText}>WORKSTREAM</Text></View>
                            {[
                                { label: 'Quarter 01', p: 'Jan – Mar' },
                                { label: 'Quarter 02', p: 'Apr – Jun' },
                                { label: 'Quarter 03', p: 'Jul – Sep', current: true },
                                { label: 'Quarter 04', p: 'Oct – Dec' }
                            ].map((q, i) => (
                                <View key={i} style={[s.timelineHeaderCol, { flex: 2, alignItems: 'center' }, q.current && s.thCurrentBg]}>
                                    <Text style={[s.thText, q.current && { color: C.tint }]}>{q.label}</Text>
                                    <Text style={s.thSub}>{q.p}</Text>
                                    {q.current && <View style={s.thBadge}><Text style={s.thBadgeText}>CURRENT</Text></View>}
                                </View>
                            ))}
                        </View>
                    )}

                    {WORKSTREAMS.map((ws, i) => (
                        <View key={i} style={[s.wsRow, isTablet && s.wsRowTablet]}>
                            <View style={[s.wsInfo, isTablet && { flex: 3 }]}>
                                <View style={[s.wsIconWrap, { backgroundColor: ws.iconBg }]}>
                                    <CheckCircle size={20} color={ws.iconColor} />
                                </View>
                                <View>
                                    <Text style={s.wsName}>{ws.name}</Text>
                                    <Text style={s.wsSub}>{ws.sub}</Text>
                                </View>
                            </View>
                            <View style={[s.wsBarsWrap, isTablet && { flex: 8 }]}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 12, paddingHorizontal: isTablet ? 0 : 24, gap: 8 }}>
                                    {ws.bars.map((bar, bi) => {
                                        if (bar.status === 'done') {
                                            return (
                                                <View key={bi} style={[s.barDone, { width: isTablet ? bar.w : 200 } as any]}>
                                                    <CheckCircle size={20} color="#059669" />
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={s.barDoneTag}>{bar.tag}</Text>
                                                        <Text style={s.barTitle} numberOfLines={1}>{bar.title}</Text>
                                                    </View>
                                                </View>
                                            );
                                        }
                                        if (bar.status === 'active') {
                                            return (
                                                <View key={bi} style={[s.barActive, { width: isTablet ? bar.w : 240 } as any]}>
                                                    <Clock size={20} color={C.tint} />
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={s.barActiveTag}>{bar.tag}</Text>
                                                        <Text style={s.barTitle} numberOfLines={1}>{bar.title}</Text>
                                                    </View>
                                                    {bar.pct && (
                                                        <View style={s.pctBadge}><Text style={s.pctText}>{bar.pct}%</Text></View>
                                                    )}
                                                </View>
                                            );
                                        }
                                        return (
                                            <View key={bi} style={[s.barPlanned, { width: isTablet ? bar.w : 160 } as any]}>
                                                {bar.title ? (
                                                    <>
                                                        <Calendar size={20} color={C.onSurfaceVariant} />
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={s.barPlannedTag}>{bar.tag}</Text>
                                                            <Text style={s.barTitle} numberOfLines={1}>{bar.title}</Text>
                                                        </View>
                                                    </>
                                                ) : null}
                                            </View>
                                        );
                                    })}
                                </ScrollView>
                            </View>
                        </View>
                    ))}
                </View>

                {/* ── Insights & Risk ── */}
                <View style={[s.bentoGrid, isTablet && s.bentoGridTablet, { marginBottom: 40 }]}>
                    <View style={[s.cardOuter, isTablet && { flex: 2 }]}>
                        <View style={s.cardHeader}>
                            <Text style={s.cardTitle}>Key Strategic Insights</Text>
                            <TouchableOpacity><Text style={s.cardLink}>View Deep Dive</Text></TouchableOpacity>
                        </View>
                        <View style={[s.bentoGrid, isTablet && s.bentoGridTablet, { marginBottom: 0 }]}>
                            {INSIGHTS.map((ins, i) => (
                                <View key={i} style={[s.insightBox, { borderLeftColor: ins.borderColor }, isTablet && { flex: 1 }]}>
                                    <View style={s.insightHeader}>
                                        <ins.icon size={20} color={ins.iconColor} />
                                        <Text style={s.insightTag}>{ins.tag}</Text>
                                    </View>
                                    <Text style={s.insightBody}>{ins.body}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={[s.riskCard, isTablet && { flex: 1 }]}>
                        <Text style={s.riskTitle}>Execution Risk Matrix</Text>
                        <View style={s.riskList}>
                            {RISKS.map((risk, i) => (
                                <View key={i} style={s.riskRow}>
                                    <View style={s.riskLevelWrap}><Text style={[s.riskLevelText, { color: risk.levelColor }]}>{risk.level}</Text></View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={s.riskRowTitle}>{risk.title}</Text>
                                        <Text style={s.riskRowBody}>{risk.body}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                        <TouchableOpacity style={{ alignItems: 'center', marginTop: 16 }}>
                            <Text style={s.riskLink}>CONFIGURE RISK THRESHOLDS</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ── Activity Footer ── */}
                <View style={s.activityFooter}>
                    <View style={s.activityHeader}>
                        <View style={s.activityLine} />
                        <Text style={s.activityLabel}>RECENT ACTIVITY LOG</Text>
                        <View style={s.activityLine} />
                    </View>
                    <View style={s.activityList}>
                        {ACTIVITY.map((a, i) => (
                            <View key={i} style={s.actRow}>
                                <View style={[s.actDot, { backgroundColor: a.color }]} />
                                <Text style={s.actText}>{a.label}</Text>
                                <Text style={s.actTime}>{a.time}</Text>
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
    ambientTop: { position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: 150, backgroundColor: 'rgba(115,46,228,0.05)', transform: [{ scale: 1.5 }] },
    ambientBottom: { position: 'absolute', bottom: -50, left: -50, width: 250, height: 250, borderRadius: 125, backgroundColor: 'rgba(91,89,140,0.05)', transform: [{ scale: 1.5 }] },
    scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 60 },
    
    headerWrap: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, gap: 16 },
    breadcrumb: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
    breadcrumbText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1.2 },
    pageTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 32, color: C.primary, letterSpacing: -0.5, marginBottom: 4 },
    pageSub: { fontFamily: 'Manrope_500Medium', fontSize: 16, color: C.onSurfaceVariant },

    headerActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    toggleWrap: { flexDirection: 'row', backgroundColor: C.surfaceLow, borderRadius: 12, padding: 4, borderWidth: 1, borderColor: C.surfaceContainer },
    toggleBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
    toggleBtnActive: { backgroundColor: C.white, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
    toggleText: { fontFamily: 'Manrope_600SemiBold', fontSize: 12, color: C.onSurfaceVariant },
    toggleTextActive: { fontFamily: 'Manrope_700Bold', color: C.primary },
    exportBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.white, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: C.surfaceContainer, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
    exportBtnText: { fontFamily: 'Manrope_700Bold', fontSize: 12, color: C.primary },

    bentoGrid: { flexDirection: 'column', gap: 16, marginBottom: 24 },
    bentoGridTablet: { flexDirection: 'row' },
    statCard: { flex: 1, backgroundColor: C.white, borderRadius: 16, padding: 24, borderWidth: 1, borderColor: C.surfaceContainer, justifyContent: 'space-between', height: 140 },
    statEyebrow: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.secondary, textTransform: 'uppercase', letterSpacing: 1 },
    statValue: { fontFamily: 'Manrope_800ExtraBold', fontSize: 32, color: C.primary },
    statBadge: { fontFamily: 'Manrope_700Bold', fontSize: 10, color: '#059669' },
    statTrack: { height: 6, backgroundColor: C.surfaceContainer, borderRadius: 3, overflow: 'hidden' },
    statFill: { height: '100%', backgroundColor: C.tint, borderRadius: 3 },
    dotTint: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.tint },
    statMeta: { fontFamily: 'Manrope_600SemiBold', fontSize: 10, color: C.onSurfaceVariant },
    statusCard: { flex: 1, borderRadius: 16, padding: 24, justifyContent: 'space-between', height: 140, shadowColor: C.tint, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 16, elevation: 6 },
    statusEyebrow: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: '#fff', opacity: 0.7, textTransform: 'uppercase', letterSpacing: 1 },
    statusText: { flex: 1, fontFamily: 'Manrope_700Bold', fontSize: 16, color: '#fff', lineHeight: 22 },
    statusFooter: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: '#fff', opacity: 0.6, textTransform: 'uppercase' },

    timelineCard: { backgroundColor: C.white, borderRadius: 16, borderWidth: 1, borderColor: C.surfaceContainer, overflow: 'hidden', marginBottom: 24 },
    timelineHeaderRow: { flexDirection: 'row', backgroundColor: C.surfaceLow, borderBottomWidth: 1, borderBottomColor: C.surfaceContainer },
    timelineHeaderCol: { padding: 20, borderRightWidth: 1, borderRightColor: C.surfaceContainer, justifyContent: 'center' },
    thCurrentBg: { backgroundColor: 'rgba(115,46,228,0.05)' },
    thText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.primary, textTransform: 'uppercase', letterSpacing: 1 },
    thSub: { fontFamily: 'Manrope_700Bold', fontSize: 12, color: C.primary },
    thBadge: { marginTop: 8, backgroundColor: C.tint, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
    thBadgeText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, color: '#fff', letterSpacing: 1 },
    wsRow: { borderTopWidth: 1, borderTopColor: C.surfaceContainer },
    wsRowTablet: { flexDirection: 'row' },
    wsInfo: { padding: 20, flexDirection: 'row', alignItems: 'center', gap: 12, borderRightWidth: 1, borderRightColor: C.surfaceContainer, backgroundColor: C.white },
    wsIconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    wsName: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: C.primary },
    wsSub: { fontFamily: 'Manrope_500Medium', fontSize: 11, color: C.onSurfaceVariant },
    wsBarsWrap: { backgroundColor: C.surface },
    
    barDone: { height: 48, backgroundColor: '#f0fdf4', borderWidth: 1, borderColor: '#dcfce7', borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 12 },
    barDoneTag: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, color: '#15803d', textTransform: 'uppercase', letterSpacing: 0.5 },
    barActive: { height: 48, backgroundColor: 'rgba(115,46,228,0.05)', borderWidth: 1, borderColor: 'rgba(115,46,228,0.2)', borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
    barActiveTag: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, color: C.tint, textTransform: 'uppercase', letterSpacing: 0.5 },
    pctBadge: { backgroundColor: '#fff', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    pctText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.primary },
    barPlanned: { height: 48, backgroundColor: C.surfaceLow, borderWidth: 1, borderColor: 'rgba(200,197,208,0.4)', borderStyle: 'dashed', borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 12, opacity: 0.6 },
    barPlannedTag: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, color: C.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 0.5 },
    barTitle: { fontFamily: 'Manrope_700Bold', fontSize: 11, color: C.primary },

    cardOuter: { backgroundColor: C.white, borderRadius: 16, padding: 24, borderWidth: 1, borderColor: C.surfaceContainer },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    cardTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 18, color: C.primary, letterSpacing: -0.5 },
    cardLink: { fontFamily: 'Manrope_700Bold', fontSize: 12, color: C.tint },
    insightBox: { backgroundColor: C.surfaceLow, padding: 20, borderRadius: 12, borderLeftWidth: 4 },
    insightHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
    insightTag: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.primary, textTransform: 'uppercase', letterSpacing: 1 },
    insightBody: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: C.onSurfaceVariant, lineHeight: 20 },

    riskCard: { backgroundColor: C.primary, borderRadius: 16, padding: 24, shadowColor: C.primary, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.15, shadowRadius: 24, elevation: 8 },
    riskTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 18, color: '#fff', letterSpacing: -0.5, marginBottom: 20 },
    riskList: { gap: 20 },
    riskRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
    riskLevelWrap: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
    riskLevelText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10 },
    riskRowTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, color: '#fff', marginBottom: 4 },
    riskRowBody: { fontFamily: 'Manrope_500Medium', fontSize: 11, color: 'rgba(255,255,255,0.6)', lineHeight: 16 },
    riskLink: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 },

    activityFooter: { opacity: 0.8 },
    activityHeader: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 20 },
    activityLine: { flex: 1, height: 1, backgroundColor: C.surfaceContainer },
    activityLabel: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.onSurfaceVariant, letterSpacing: 1 },
    activityList: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 24 },
    actRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    actDot: { width: 8, height: 8, borderRadius: 4 },
    actText: { fontFamily: 'Manrope_700Bold', fontSize: 11, color: C.primary },
    actTime: { fontFamily: 'Manrope_500Medium', fontSize: 10, color: C.onSurfaceVariant },
});

import { LinearGradient } from 'expo-linear-gradient';
import { BookOpen } from 'lucide-react-native';
import { useRef, useState } from 'react';
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

const SECTIONS = [
    { id: 'getting-started', title: 'Getting Started' },
    { id: 'home', title: 'Home (Dashboard)' },
    { id: 'evaluations', title: 'Evaluations' },
    { id: 'startups', title: 'My Startups' },
    { id: 'analytics', title: 'Analytics' },
    { id: 'competitors', title: 'Competitors' },
    { id: 'teams', title: 'Teams & Workspaces' },
    { id: 'reports', title: 'Reports & Exports' },
];

export default function DocumentationScreen() {
    const { width } = useWindowDimensions();
    const isTablet = width >= 1024;
    const [activeSection, setActiveSection] = useState('getting-started');
    const scrollRef = useRef<ScrollView>(null);
    const [layouts, setLayouts] = useState<Record<string, number>>({});

    const scrollTo = (id: string) => {
        setActiveSection(id);
        const y = layouts[id];
        if (y !== undefined && scrollRef.current) {
            scrollRef.current.scrollTo({ y: y - 24, animated: true });
        }
    };

    return (
        <SafeAreaView style={s.root} edges={['bottom']}>
            <View style={[s.container, isTablet && s.containerTablet]}>
                
                {/* Main Content Area */}
                <ScrollView 
                    ref={scrollRef}
                    style={[s.mainContent, isTablet && { flex: 1 }]} 
                    contentContainerStyle={s.mainScrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={s.pageHeader}>
                        <Text style={s.pageTitle}>Documentation</Text>
                        <Text style={s.pageSub}>
                            Welcome to the LaunchPulse User Manual. This comprehensive guide details everything you need to know to effectively evaluate startups, analyze competitors, and manage your intelligence portfolio.
                        </Text>
                    </View>

                    {/* Section: Getting Started */}
                    <View style={s.section} onLayout={e => { const y = e.nativeEvent.layout.y; setLayouts(p => ({ ...p, 'getting-started': y })) }}>
                        <Text style={s.h2}>Getting Started</Text>
                        <Text style={s.p}>
                            LaunchPulse is the premier AI-powered platform tailored to help founders, venture capitalists, and product managers rapidly evaluate and validate startup ideas. The platform utilizes advanced <Text style={s.strong}>Retrieval-Augmented Generation (RAG)</Text> to cross-reference your business models against vast repositories of market intelligence, financial benchmarks, and competitor data.
                        </Text>
                        <Text style={s.p}>
                            To begin, ensure you are operating within the correct <Text style={s.strong}>Workspace</Text> (selectable from the top header). Workspaces act as isolated silos; all data, evaluations, and team members are scoped exclusively to the active workspace.
                        </Text>
                        <View style={s.proTip}>
                            <Text style={[s.strong, { marginBottom: 8 }]}>Pro Tip:</Text>
                            <Text style={s.p}>Start by navigating to the <Text style={{ fontStyle: 'italic' }}>Evaluations</Text> tab and clicking "New Evaluation". The AI will guide you step-by-step through validating your first startup idea.</Text>
                        </View>
                    </View>

                    {/* Section: Home */}
                    <View style={s.section} onLayout={e => { const y = e.nativeEvent.layout.y; setLayouts(p => ({ ...p, 'home': y })) }}>
                        <Text style={s.h2}>Home (Dashboard)</Text>
                        <Text style={s.p}>The Home page serves as your central command center, offering a high-level overview of your entire workspace's health and activity.</Text>
                        <View style={s.ul}>
                            <View style={s.li}>
                                <View style={s.liBullet} />
                                <Text style={s.liText}><Text style={s.strong}>Quick Actions:</Text> A grid of highly visible shortcuts allowing you to jump straight into creating new evaluations, viewing analytics, or consulting the AI Assistant.</Text>
                            </View>
                            <View style={s.li}>
                                <View style={s.liBullet} />
                                <Text style={s.liText}><Text style={s.strong}>Recent Evaluations:</Text> A fast-access table displaying your most recently updated startup ideas. You can quickly see the assigned AI Success Score, the sector, and whether the evaluation is currently in Draft or Completed status.</Text>
                            </View>
                            <View style={s.li}>
                                <View style={s.liBullet} />
                                <Text style={s.liText}><Text style={s.strong}>Evaluation Activity Chart:</Text> A dynamic area chart that visualizes your workspace's assessment volume over a rolling 6-month period, categorizing them by Completed vs. Draft workflows.</Text>
                            </View>
                            <View style={s.li}>
                                <View style={s.liBullet} />
                                <Text style={s.liText}><Text style={s.strong}>Recent Activity Feed:</Text> A real-time audit log of actions taken by you or your team members, such as adding new startups or generating PDF reports.</Text>
                            </View>
                        </View>
                    </View>

                    {/* Section: Evaluations */}
                    <View style={s.section} onLayout={e => { const y = e.nativeEvent.layout.y; setLayouts(p => ({ ...p, 'evaluations': y })) }}>
                        <Text style={s.h2}>Evaluations</Text>
                        <Text style={s.p}>The Evaluations module is the core intelligence engine of LaunchPulse. This is where raw concepts are transformed into data-backed business profiles.</Text>
                        
                        <Text style={s.h3}>Creating a New Evaluation</Text>
                        <Text style={s.p}>When you create a new evaluation, you must first input basic parameters: Industry, Idea Title, Target Location, Target Audience, and Monetization strategy. Once submitted, our AI dynamically generates a set of <Text style={s.strong}>context-aware questions</Text> tailored specifically to probe the weaknesses and strengths of your exact concept.</Text>

                        <Text style={s.h3}>Answering & Analysis</Text>
                        <Text style={s.p}>By answering these generated questions, you provide the AI with the nuanced context it needs. Upon final submission, the RAG pipeline processes your input and returns a comprehensive report containing:</Text>
                        <View style={s.ul}>
                            <View style={s.li}>
                                <View style={s.liBullet} />
                                <Text style={s.liText}><Text style={s.strong}>Success Probability Score (0-100):</Text> A benchmarked score indicating the likelihood of market viability.</Text>
                            </View>
                            <View style={s.li}>
                                <View style={s.liBullet} />
                                <Text style={s.liText}><Text style={s.strong}>Score Breakdown:</Text> Individual scores for Revenue Model, Team Execution, Competitive Edge, and Market Opportunity.</Text>
                            </View>
                            <View style={s.li}>
                                <View style={s.liBullet} />
                                <Text style={s.liText}><Text style={s.strong}>SWOT Analysis:</Text> Actionable insights categorized into Strengths, Weaknesses, Opportunities, and Threats.</Text>
                            </View>
                            <View style={s.li}>
                                <View style={s.liBullet} />
                                <Text style={s.liText}><Text style={s.strong}>Market Intelligence:</Text> AI-estimated Total Addressable Market (TAM), Serviceable Addressable Market (SAM), and Compound Annual Growth Rate (CAGR).</Text>
                            </View>
                            <View style={s.li}>
                                <View style={s.liBullet} />
                                <Text style={s.liText}><Text style={s.strong}>Financial Projections:</Text> Estimated revenue milestones for Years 1, 3, and 5.</Text>
                            </View>
                        </View>

                        <Text style={s.h3}>Re-Evaluation (Pivoting)</Text>
                        <Text style={s.p}>If your startup idea pivots or your strategy changes, you do not need to create a new evaluation from scratch. Simply open the evaluation details and click <Text style={s.strong}>"Edit Answers"</Text> or <Text style={s.strong}>"Re-Evaluate Idea"</Text>. Modifying your responses will trigger a fresh analysis pipeline.</Text>
                    </View>

                    {/* Section: Startups */}
                    <View style={s.section} onLayout={e => { const y = e.nativeEvent.layout.y; setLayouts(p => ({ ...p, 'startups': y })) }}>
                        <Text style={s.h2}>My Startups</Text>
                        <Text style={s.p}>Once an Evaluation transitions to "Completed" status, it is automatically synchronized into your <Text style={s.strong}>My Startups</Text> portfolio. This module acts as your CRM for managing active, validated startup projects.</Text>
                        <View style={s.ul}>
                            <View style={s.li}>
                                <View style={s.liBullet} />
                                <Text style={s.liText}><Text style={s.strong}>Portfolio Grid:</Text> View all your active startups as high-density bento cards, featuring their AI success score, industry sector, and foundational metrics.</Text>
                            </View>
                            <View style={s.li}>
                                <View style={s.liBullet} />
                                <Text style={s.liText}><Text style={s.strong}>Startup Detail Page:</Text> Dive deep into the startup's specific operational metrics, such as Employee Count, Burn Rate, Revenue, and Customer Retention percentage.</Text>
                            </View>
                            <View style={s.li}>
                                <View style={s.liBullet} />
                                <Text style={s.liText}><Text style={s.strong}>Live Synchronization:</Text> The "Update Analysis" button on a startup's page explicitly fetches the latest insights from the Evaluations engine and syncs them directly into the startup's permanent record.</Text>
                            </View>
                        </View>
                    </View>

                    {/* Section: Analytics */}
                    <View style={s.section} onLayout={e => { const y = e.nativeEvent.layout.y; setLayouts(p => ({ ...p, 'analytics': y })) }}>
                        <Text style={s.h2}>Analytics</Text>
                        <Text style={s.p}>The Analytics dashboard provides deep, aggregate insights across all the startups and evaluations within your workspace, allowing you to identify macro trends.</Text>
                        <View style={s.ul}>
                            <View style={s.li}>
                                <View style={s.liBullet} />
                                <Text style={s.liText}><Text style={s.strong}>Portfolio Performance:</Text> Visualize the average success scores of your portfolio over time using interactive trendlines.</Text>
                            </View>
                            <View style={s.li}>
                                <View style={s.liBullet} />
                                <Text style={s.liText}><Text style={s.strong}>Industry Breakdown:</Text> Understand your workspace's sector exposure. Radar charts and pie charts illustrate which industries dominate your portfolio.</Text>
                            </View>
                            <View style={s.li}>
                                <View style={s.liBullet} />
                                <Text style={s.liText}><Text style={s.strong}>Success Probability Distribution:</Text> Analyze the health of your pipeline by grouping startups into performance cohorts.</Text>
                            </View>
                        </View>
                    </View>

                    {/* Section: Competitors */}
                    <View style={s.section} onLayout={e => { const y = e.nativeEvent.layout.y; setLayouts(p => ({ ...p, 'competitors': y })) }}>
                        <Text style={s.h2}>Competitors</Text>
                        <Text style={s.p}>The Competitor Analysis module lets you benchmark your validated startups against known industry rivals.</Text>
                        <Text style={s.p}>By providing a competitor's name and basic details, LaunchPulse will initiate a <Text style={s.strong}>Head-to-Head AI Analysis</Text> against your selected startup. The engine generates a comparative Feature Matrix, highlights relative strengths and weaknesses, and uncovers gaps in the competitor's armor to help you capitalize on your Unique Selling Proposition (USP).</Text>
                    </View>

                    {/* Section: Teams */}
                    <View style={s.section} onLayout={e => { const y = e.nativeEvent.layout.y; setLayouts(p => ({ ...p, 'teams': y })) }}>
                        <Text style={s.h2}>Teams & Workspaces</Text>
                        <Text style={s.p}>LaunchPulse is built for collaboration. You can invite co-founders, analysts, and investors directly into your workspace.</Text>
                        <View style={s.ul}>
                            <View style={s.li}>
                                <View style={s.liBullet} />
                                <Text style={s.liText}><Text style={s.strong}>Workspace Management:</Text> You can create and switch between multiple workspaces using the dropdown menu in the top header. Each workspace has its own distinct billing and data silo.</Text>
                            </View>
                            <View style={s.li}>
                                <View style={s.liBullet} />
                                <Text style={s.liText}><Text style={s.strong}>Role-Based Access Control:</Text> When inviting a new member via email, you must assign them a role. <Text style={{ fontStyle: 'italic' }}>Admins</Text> have full control, <Text style={{ fontStyle: 'italic' }}>Editors</Text> can create and modify evaluations, and <Text style={{ fontStyle: 'italic' }}>Viewers</Text> have read-only access.</Text>
                            </View>
                        </View>
                    </View>

                    {/* Section: Reports */}
                    <View style={s.section} onLayout={e => { const y = e.nativeEvent.layout.y; setLayouts(p => ({ ...p, 'reports': y })) }}>
                        <Text style={s.h2}>Reports & Exports</Text>
                        <Text style={s.p}>Access all auto-generated and manually saved reports in one consolidated repository.</Text>
                        <Text style={s.p}>Whenever an evaluation completes, a detailed profile is constructed. You can export this profile as a highly-styled, professional PDF document directly from the Evaluation Details page. The Reports module acts as a centralized archive where you can browse past exports to track the historical evolution of your ideas.</Text>
                    </View>
                </ScrollView>

                {/* Table of Contents (Right Side - Tablet only) */}
                {isTablet && (
                    <View style={s.tocContainer}>
                        <Text style={s.tocEyebrow}>CONTENTS</Text>
                        <View style={s.tocList}>
                            {SECTIONS.map(sec => (
                                <TouchableOpacity 
                                    key={sec.id} 
                                    style={[s.tocItem, activeSection === sec.id && s.tocItemActive]}
                                    onPress={() => scrollTo(sec.id)}
                                >
                                    <Text style={[s.tocText, activeSection === sec.id && s.tocTextActive]}>
                                        {sec.title}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: C.surface },
    container: { flex: 1, flexDirection: 'column' },
    containerTablet: { flexDirection: 'row-reverse', alignItems: 'flex-start', paddingHorizontal: 40 },
    
    mainContent: { width: '100%' },
    mainScrollContent: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 120, maxWidth: 800, alignSelf: 'center', width: '100%' },
    
    pageHeader: { borderBottomWidth: 1, borderBottomColor: C.surfaceLow, paddingBottom: 32, marginBottom: 32 },
    pageTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 32, color: C.primary, letterSpacing: -0.5, marginBottom: 12 },
    pageSub: { fontFamily: 'Manrope_500Medium', fontSize: 16, color: C.onSurfaceVariant, lineHeight: 26 },

    section: { marginBottom: 48 },
    h2: { fontFamily: 'Manrope_700Bold', fontSize: 24, color: C.primary, marginBottom: 16 },
    h3: { fontFamily: 'Manrope_700Bold', fontSize: 18, color: C.primary, marginTop: 32, marginBottom: 12 },
    p: { fontFamily: 'Manrope_500Medium', fontSize: 15, color: C.onSurfaceVariant, lineHeight: 24, marginBottom: 16 },
    strong: { fontFamily: 'Manrope_700Bold', color: C.primary },
    
    proTip: { backgroundColor: C.surfaceLow, padding: 20, borderRadius: 12, borderWidth: 1, borderColor: C.surfaceContainer, marginTop: 8 },
    
    ul: { paddingLeft: 8, gap: 16, marginTop: 8 },
    li: { flexDirection: 'row', alignItems: 'flex-start' },
    liBullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.primary, marginTop: 10, marginRight: 12 },
    liText: { flex: 1, fontFamily: 'Manrope_500Medium', fontSize: 15, color: C.onSurfaceVariant, lineHeight: 24 },

    tocContainer: { width: 220, position: 'absolute', right: 40, top: 40 },
    tocEyebrow: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.secondary, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16, paddingHorizontal: 12 },
    tocList: { borderLeftWidth: 2, borderLeftColor: C.surfaceLow },
    tocItem: { paddingVertical: 8, paddingHorizontal: 12, marginLeft: -2, borderLeftWidth: 2, borderLeftColor: 'transparent' },
    tocItemActive: { borderLeftColor: C.tint, backgroundColor: 'rgba(242,244,246,0.5)' },
    tocText: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: C.onSurfaceVariant },
    tocTextActive: { fontFamily: 'Manrope_700Bold', color: C.tint },
});

// Dataset page — dark #030712 bg, same as all other pages
import { LinearGradient } from 'expo-linear-gradient';
import { Database, Globe, RefreshCw, Table2 } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DATASETS = [
    { label: 'Evaluations', description: 'AI-powered evaluation results for startup ideas.', color: '#f97316', tag: 'Analytics', rows: 9, cols: 11 },
    { label: 'Startups', description: 'Startup profiles submitted for evaluation on the platform.', color: '#10b981', tag: 'Core Data', rows: 41866, cols: 21 },
    { label: 'Launchpulse Bert', description: 'Data table: launchpulse_bert', color: '#60a5fa', tag: 'Data', rows: 1692, cols: 7 },
    { label: 'Launchpulse Mock Data', description: 'Data table: launchpulse_mock_data', color: '#60a5fa', tag: 'Data', rows: 500, cols: 13 },
    { label: 'Launchpulse Phi2', description: 'Data table: launchpulse_phi2', color: '#60a5fa', tag: 'Data', rows: 6592, cols: 6 },
    { label: 'Launchpulse Rag', description: 'Data table: launchpulse_rag', color: '#60a5fa', tag: 'Data', rows: 44808, cols: 7 },
    { label: 'Teams', description: 'Team composition and member data for startup projects.', color: '#06b6d4', tag: 'Core Data', rows: 1, cols: 4 },
    { label: 'Reports', description: 'Generated analytical reports and export logs.', color: '#f43f5e', tag: 'Analytics', rows: 0, cols: 0 },
];

const STATS = [
    { Icon: Database, label: 'Datasets', value: '13', color: '#3b82f6' },
    { Icon: Table2, label: 'Total Records', value: '95,473', color: '#10b981' },
    { Icon: RefreshCw, label: 'Total Columns', value: '120', color: '#f97316' },
    { Icon: Globe, label: 'Data Source', value: 'Live', color: '#8b5cf6' },
];

export default function DatasetPage() {
    return (
        <View style={s.root}>
            {/* bg-[#030712] — same as all pages */}
            <LinearGradient colors={['#030712', '#030712']} style={StyleSheet.absoluteFill} />

            <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

                {/* Header */}
                <View style={s.hero}>
                    <View style={s.badge}>
                        <Database color="#60a5fa" size={14} />
                        <Text style={s.badgeText}>PUBLIC DATASETS</Text>
                    </View>
                    <Text style={s.h1}>LaunchPulse Datasets</Text>
                    <Text style={s.sub}>
                        Explore open datasets from the LaunchPulse platform. Browse tables, preview data, and download records from our Supabase-powered database.
                    </Text>
                </View>

                {/* Stats row */}
                <View style={s.statsRow}>
                    {STATS.map(({ Icon, label, value, color }, i) => (
                        <View key={i} style={s.statItem}>
                            <View style={[s.statIcon, { backgroundColor: color + '18' }]}>
                                <Icon color={color} size={16} />
                            </View>
                            <Text style={s.statValue}>{value}</Text>
                            <Text style={s.statLabel}>{label}</Text>
                        </View>
                    ))}
                </View>

                {/* Available Datasets */}
                <Text style={s.sectionTitle}>Available Datasets</Text>
                <Text style={s.sectionSub}>{DATASETS.length} datasets available • Click any dataset to browse its records</Text>

                {DATASETS.map((ds, i) => (
                    <TouchableOpacity key={i} style={s.card} activeOpacity={0.75}>
                        {/* Card header */}
                        <View style={s.cardTop}>
                            <View style={[s.tableIcon, { backgroundColor: ds.color + '18' }]}>
                                <Table2 color={ds.color} size={18} />
                            </View>
                            <View style={[s.tagBadge, { backgroundColor: ds.color + '18' }]}>
                                <Text style={[s.tagText, { color: ds.color }]}>{ds.tag}</Text>
                            </View>
                        </View>

                        <Text style={s.cardTitle}>{ds.label}</Text>
                        <Text style={s.cardDesc}>{ds.description}</Text>

                        {ds.rows > 0 && (
                            <View style={s.metaRow}>
                                <Text style={s.metaItem}>⊞ {ds.rows.toLocaleString()} rows</Text>
                                <Text style={s.metaItem}>⊟ {ds.cols} cols</Text>
                            </View>
                        )}

                        <View style={s.cardFooter}>
                            <Text style={s.tableName}>{ds.label.toLowerCase().replace(/ /g, '_')}</Text>
                            <Text style={s.viewLink}>View Data →</Text>
                        </View>
                    </TouchableOpacity>
                ))}

                {/* Supabase note */}
                <View style={s.supabaseNote}>
                    <Database color="#60a5fa" size={16} />
                    <View style={{ flex: 1 }}>
                        <Text style={s.supabaseTitle}>Powered by Supabase</Text>
                        <Text style={s.supabaseDesc}>All datasets are fetched live from the LaunchPulse Supabase PostgreSQL database. Data is read-only and updated in real time.</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#030712' },
    scroll: { paddingHorizontal: 20, paddingTop: 28, paddingBottom: 60 },

    // Hero
    hero: { marginBottom: 24 },
    badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(59,130,246,0.1)', borderWidth: 1, borderColor: 'rgba(59,130,246,0.2)', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, marginBottom: 16, gap: 6 },
    badgeText: { fontFamily: 'Inter_700Bold', color: '#60a5fa', fontSize: 10, letterSpacing: 2 },
    h1: { fontFamily: 'Inter_900Black', fontSize: 30, color: '#ffffff', marginBottom: 10, letterSpacing: -0.5 },
    sub: { fontFamily: 'Inter_400Regular', fontSize: 14, color: '#6b7280', lineHeight: 22 },

    // Stats — 4 chips in a row
    statsRow: { flexDirection: 'row', gap: 10, marginBottom: 28 },
    statItem: { flex: 1, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: 12, gap: 6 },
    statIcon: { width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    statValue: { fontFamily: 'Inter_700Bold', fontSize: 15, color: '#ffffff' },
    statLabel: { fontFamily: 'Inter_400Regular', fontSize: 10, color: '#6b7280', textAlign: 'center' },

    // Section
    sectionTitle: { fontFamily: 'Inter_700Bold', fontSize: 18, color: '#ffffff', marginBottom: 4 },
    sectionSub: { fontFamily: 'Inter_400Regular', fontSize: 13, color: '#4b5563', marginBottom: 16 },

    // Dataset cards — bg-white/5 border-white/10 rounded-[24px]
    card: { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 20, padding: 18, marginBottom: 12 },
    cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    tableIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
    tagBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
    tagText: { fontFamily: 'Inter_600SemiBold', fontSize: 11 },
    cardTitle: { fontFamily: 'Inter_700Bold', fontSize: 15, color: '#ffffff', marginBottom: 4 },
    cardDesc: { fontFamily: 'Inter_400Regular', fontSize: 13, color: '#6b7280', lineHeight: 20, marginBottom: 10 },
    metaRow: { flexDirection: 'row', gap: 14, marginBottom: 10 },
    metaItem: { fontFamily: 'Inter_400Regular', fontSize: 12, color: '#4b5563' },
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.06)', paddingTop: 10 },
    tableName: { fontFamily: 'Inter_400Regular', fontSize: 11, color: '#374151' },
    viewLink: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: '#60a5fa' },

    // Supabase note — bg-blue-500/10 border-blue-500/20
    supabaseNote: { flexDirection: 'row', gap: 12, backgroundColor: 'rgba(59,130,246,0.08)', borderWidth: 1, borderColor: 'rgba(59,130,246,0.2)', borderRadius: 16, padding: 16, alignItems: 'flex-start', marginTop: 4 },
    supabaseTitle: { fontFamily: 'Inter_700Bold', fontSize: 13, color: '#60a5fa', marginBottom: 4 },
    supabaseDesc: { fontFamily: 'Inter_400Regular', fontSize: 12, color: '#3b82f6', lineHeight: 18 },
});

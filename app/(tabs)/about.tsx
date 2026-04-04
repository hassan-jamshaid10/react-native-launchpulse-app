// Converted 1:1 from e:\LaunchPulse\nextjs-launchpulse\src\app\about\page.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { Code, Heart, Rocket, ShieldCheck, Sparkles } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// from-blue-600 to-indigo-700 | from-violet-600 to-purple-700 | from-emerald-500 to-teal-600 | from-orange-500 to-amber-600
const TEAM = [
    { name: 'Hassan Jamshaid', role: 'Lead Engineer', desc: "Lead engineer behind the project (AI + web full stack). The visionary architect behind LaunchPulse's core evaluation engine.", initials: 'HJ', colors: ['#2563eb', '#4338ca'] as [string, string] },
    { name: 'Talha Badar', role: 'Web Full Stack Developer', desc: 'Expert web full stack developer specializing in high-performance web applications and seamless user experiences.', initials: 'TB', colors: ['#7c3aed', '#6d28d9'] as [string, string] },
    { name: 'Abdullah Sadiq', role: 'QA & Support Lead', desc: 'Documentation, QA, SQA, and support lead ensuring platform stability and comprehensive user guidance.', initials: 'AS', colors: ['#10b981', '#0d9488'] as [string, string] },
    { name: 'Salman Hammeed', role: 'Mobile App Developer', desc: "Mobile app full stack specialist bringing LaunchPulse's intelligence to mobile devices with native performance.", initials: 'SH', colors: ['#f97316', '#d97706'] as [string, string] },
];

const CORE_VALUES = [Sparkles, Code, ShieldCheck, Heart];

export default function AboutPage() {
    return (
        <View style={s.root}>
            {/* bg-[#030712] — exact same as getting-started */}
            <LinearGradient colors={['#030712', '#030712']} style={StyleSheet.absoluteFill} />

            {/* Exact same blobs as getting-started: blue top-left, violet bottom-right */}
            <View style={[s.blob, { top: 0, left: -60 }]}>
                <LinearGradient colors={['rgba(59,130,246,0.08)', 'transparent']} style={[StyleSheet.absoluteFill, { borderRadius: 999 }]} />
            </View>
            <View style={[s.blob, s.blobSm, { bottom: 0, right: -40 }]}>
                <LinearGradient colors={['rgba(139,92,246,0.08)', 'transparent']} style={[StyleSheet.absoluteFill, { borderRadius: 999 }]} />
            </View>

            <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

                {/* Hero — bg-blue-500/10 border border-blue-500/20 pill badge */}
                <View style={s.hero}>
                    <View style={s.badge}>
                        <Rocket color="#60a5fa" size={14} />
                        <Text style={s.badgeText}>OUR MISSION</Text>
                    </View>

                    {/* h1 — font-black text-white + gradient italic span */}
                    <Text style={s.h1}>
                        Empowering the next{'\n'}
                        <Text style={s.h1Gradient}>billion-dollar </Text>
                        <Text style={s.h1}>ideas.</Text>
                    </Text>

                    <Text style={s.heroSub}>
                        At LaunchPulse, we believe that great startups aren't just born — they're built on data. Our team of engineers and visionaries are dedicated to removing the guesswork from entrepreneurship.
                    </Text>
                </View>

                {/* Meet the Engineers */}
                <View style={s.section}>
                    <Text style={s.h2}>Meet the Engineers</Text>
                    {/* Underline bar */}
                    <LinearGradient colors={['#3b82f6', '#8b5cf6']} style={s.underlineBar} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />

                    {/* bg-white/5 border border-white/10 rounded-[32px] p-8 */}
                    {TEAM.map((m, i) => (
                        <View key={i} style={s.card}>
                            <LinearGradient colors={m.colors} style={s.avatar}>
                                <Text style={s.avatarText}>{m.initials}</Text>
                            </LinearGradient>
                            <Text style={s.memberName}>{m.name}</Text>
                            {/* text-[10px] font-black uppercase tracking-[0.2em] text-blue-500/80 */}
                            <Text style={s.memberRole}>{m.role}</Text>
                            <Text style={s.memberDesc}>{m.desc}</Text>
                        </View>
                    ))}
                </View>

                {/* Culture Section */}
                <View style={s.section}>
                    <Text style={s.h2}>Built by Developers,{'\n'}for Founders</Text>
                    <Text style={s.cultureSub}>
                        We are a distributed team of engineers who have faced the challenges of launching products first-hand. LaunchPulse is our answer to the noise — a precise, data-driven utility for the modern builder.
                    </Text>

                    {/* Pakistan & Global — text-5xl font-black */}
                    <View style={s.statsRow}>
                        <View style={s.statItem}>
                            <Text style={s.statVal}>Pakistan</Text>
                            <Text style={[s.statLabel, { color: '#3b82f6' }]}>BASE OPERATIONS</Text>
                        </View>
                        <View style={s.divider} />
                        <View style={s.statItem}>
                            <Text style={s.statVal}>Global</Text>
                            <Text style={[s.statLabel, { color: '#8b5cf6' }]}>VENTURE REACH</Text>
                        </View>
                    </View>

                    {/* Core values grid — bg-white/5 border border-white/10 p-10 rounded-[40px] */}
                    <View style={s.valuesGrid}>
                        {CORE_VALUES.map((Icon, i) => (
                            <View key={i} style={s.valueCard}>
                                <Icon color="#60a5fa" size={28} />
                                <Text style={s.valueLabel}>CORE VALUE {i + 1}</Text>
                            </View>
                        ))}
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#030712' },
    scroll: { paddingHorizontal: 20, paddingTop: 32, paddingBottom: 60 },
    blob: { position: 'absolute', width: 340, height: 220, borderRadius: 999, overflow: 'hidden' },
    blobSm: { width: 220, height: 220 },

    // Hero
    hero: { alignItems: 'center', marginBottom: 48 },
    badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(59,130,246,0.1)', borderWidth: 1, borderColor: 'rgba(59,130,246,0.2)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999, marginBottom: 24, gap: 8 },
    badgeText: { fontFamily: 'Inter_700Bold', color: '#60a5fa', fontSize: 10, letterSpacing: 2 },
    h1: { fontFamily: 'Inter_900Black', fontSize: 40, color: '#ffffff', textAlign: 'center', lineHeight: 48, marginBottom: 20, letterSpacing: -1 },
    h1Gradient: { fontFamily: 'Inter_900Black', color: '#818cf8', fontStyle: 'italic' },
    heroSub: { fontFamily: 'Inter_500Medium', fontSize: 15, color: '#9ca3af', textAlign: 'center', lineHeight: 24 },

    // Section
    section: { marginBottom: 48 },
    h2: { fontFamily: 'Inter_900Black', fontSize: 28, color: '#ffffff', textAlign: 'center', marginBottom: 12, letterSpacing: -0.5 },
    underlineBar: { height: 6, width: 64, borderRadius: 999, alignSelf: 'center', marginBottom: 28 },

    // Team cards — bg-white/5 border-white/10 rounded-[32px]
    card: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 32, padding: 28, marginBottom: 16 },
    avatar: { width: 64, height: 64, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
    avatarText: { fontFamily: 'Inter_700Bold', color: '#ffffff', fontSize: 22 },
    memberName: { fontFamily: 'Inter_900Black', fontSize: 18, color: '#ffffff', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
    memberRole: { fontFamily: 'Inter_700Bold', fontSize: 10, color: 'rgba(99,160,250,0.8)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 },
    memberDesc: { fontFamily: 'Inter_500Medium', fontSize: 13, color: '#9ca3af', lineHeight: 20 },

    // Culture
    cultureSub: { fontFamily: 'Inter_400Regular', fontSize: 15, color: '#9ca3af', lineHeight: 24, marginBottom: 28 },
    statsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 28, gap: 24 },
    statItem: { alignItems: 'center' },
    statVal: { fontFamily: 'Inter_900Black', fontSize: 32, color: '#ffffff', letterSpacing: -1 },
    statLabel: { fontFamily: 'Inter_700Bold', fontSize: 9, letterSpacing: 2, marginTop: 4, textTransform: 'uppercase' },
    divider: { width: 1, height: 48, backgroundColor: 'rgba(255,255,255,0.1)' },

    // Core values — bg-white/5 border-white/10 rounded-[40px]
    valuesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    valueCard: { flex: 1, minWidth: '45%', backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 24, padding: 28, alignItems: 'center', gap: 12 },
    valueLabel: { fontFamily: 'Inter_700Bold', fontSize: 9, color: '#4b5563', letterSpacing: 3, textTransform: 'uppercase' },
});

// Converted 1:1 from e:\LaunchPulse\nextjs-launchpulse\src\app\getting-started\page.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, Lightbulb, MapPin, Target, UserPlus, Zap } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Exact STEPS data from web source
const STEPS = [
    { id: 1, title: 'Create an Account', desc: 'Sign up in seconds and access your personalized dashboard.', Icon: UserPlus },
    { id: 2, title: 'Submit your Idea', desc: 'Describe your startup vision using our structured onboarding.', Icon: Lightbulb },
    { id: 3, title: 'AI Evaluation Engine', desc: 'Let our proprietary AI analyze the market, competitors, and potential.', Icon: Zap },
    { id: 4, title: 'Receive Full Report', desc: 'Download your 40-page investor-ready analysis with strategic steps.', Icon: Target },
];

export default function GettingStartedPage() {
    return (
        <View style={s.root}>
            {/* bg-[#030712] */}
            <LinearGradient colors={['#030712', '#030712']} style={StyleSheet.absoluteFill} />

            {/* Ambient blobs — blue-500/5 top-left, violet-500/5 bottom-right */}
            <View style={[s.blob, { top: 0, left: -60 }]}>
                <LinearGradient colors={['rgba(59,130,246,0.08)', 'transparent']} style={StyleSheet.absoluteFill} borderRadius={999} />
            </View>
            <View style={[s.blob, s.blobSm, { bottom: 0, right: -40 }]}>
                <LinearGradient colors={['rgba(139,92,246,0.08)', 'transparent']} style={StyleSheet.absoluteFill} borderRadius={999} />
            </View>

            <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

                {/* Hero — text-center mb-24 */}
                <View style={s.hero}>
                    {/* bg-blue-500/10 border border-blue-500/20 pill */}
                    <View style={s.badge}>
                        <MapPin color="#60a5fa" size={14} />
                        <Text style={s.badgeText}>LAUNCH CHECKLIST</Text>
                    </View>

                    {/* h1 font-black */}
                    <Text style={s.h1}>
                        The path to <Text style={s.h1Gradient}>Launch.</Text>
                    </Text>

                    <Text style={s.subtitle}>
                        From zero to a data-backed venture strategy in under 15 minutes. Follow this guide to maximize your success on LaunchPulse.
                    </Text>
                </View>

                {/* Roadmap steps — bg-white/5 border-white/10 rounded-[40px] */}
                <View style={s.stepsContainer}>
                    {STEPS.map((step, i) => (
                        <View key={step.id} style={s.stepRow}>
                            <View style={s.stepCard}>
                                {/* w-14 h-14 bg-white/5 rounded-2xl */}
                                <View style={s.iconBox}>
                                    <step.Icon color="#60a5fa" size={28} />
                                </View>
                                {/* text-2xl font-black uppercase */}
                                <Text style={s.stepTitle}>{step.title}</Text>
                                <Text style={s.stepDesc}>{step.desc}</Text>
                            </View>

                            {/* Step number circle — from-gray-900 via-blue-950 to-violet-950 */}
                            <LinearGradient
                                colors={['#111827', '#172554', '#2e1065']}
                                style={s.stepNum}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            >
                                <Text style={s.stepNumText}>{step.id}</Text>
                            </LinearGradient>
                        </View>
                    ))}
                </View>

                {/* CTA Banner — from-blue-600 via-indigo-700 to-violet-800 rounded-[56px] */}
                <View style={s.ctaBanner}>
                    <LinearGradient
                        colors={['#2563eb', '#4338ca', '#6d28d9']}
                        style={StyleSheet.absoluteFill}
                        borderRadius={40}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    />
                    <Text style={s.ctaTitle}>
                        Ready to evaluate your{'\n'}
                        <Text style={s.ctaTitleItalic}>billion-dollar</Text> idea?
                    </Text>
                    <Text style={s.ctaSub}>Join 12,000+ founders using AI to build with conviction.</Text>

                    {/* Buttons — white bg text-blue-600 | white/10 bg white text */}
                    <TouchableOpacity style={s.ctaBtnPrimary}>
                        <Text style={s.ctaBtnPrimaryText}>Start Free Evaluation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.ctaBtnSecondary}>
                        <Text style={s.ctaBtnSecondaryText}>Explore Dashboard</Text>
                        <ArrowRight color="#ffffff" size={16} />
                    </TouchableOpacity>
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
    // text-5xl sm:text-7xl font-black tracking-tight text-white
    h1: { fontFamily: 'Inter_900Black', fontSize: 42, color: '#ffffff', textAlign: 'center', lineHeight: 50, marginBottom: 16, letterSpacing: -1 },
    // bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 italic underline
    h1Gradient: { fontFamily: 'Inter_900Black', color: '#818cf8', fontStyle: 'italic', textDecorationLine: 'underline' },
    subtitle: { fontFamily: 'Inter_500Medium', fontSize: 15, color: '#9ca3af', textAlign: 'center', lineHeight: 24 },

    // Steps — bg-white/5 border-white/10 rounded-[40px] p-10
    stepsContainer: { gap: 24, marginBottom: 40 },
    stepRow: { position: 'relative' },
    stepCard: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 32, padding: 28 },
    iconBox: { width: 56, height: 56, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
    stepTitle: { fontFamily: 'Inter_900Black', fontSize: 22, color: '#ffffff', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 },
    stepDesc: { fontFamily: 'Inter_400Regular', fontSize: 14, color: '#9ca3af', lineHeight: 22 },
    // Number circle — from-gray-900 via-blue-950 to-violet-950
    stepNum: { position: 'absolute', bottom: -16, right: 16, width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#030712' },
    stepNumText: { fontFamily: 'Inter_900Black', color: '#ffffff', fontSize: 16 },

    // CTA Banner — from-blue-600 via-indigo-700 to-violet-800 rounded-[56px]
    ctaBanner: { borderRadius: 40, overflow: 'hidden', padding: 40, alignItems: 'center', position: 'relative' },
    ctaTitle: { fontFamily: 'Inter_900Black', fontSize: 30, color: '#ffffff', textAlign: 'center', lineHeight: 38, marginBottom: 12, letterSpacing: -0.5 },
    ctaTitleItalic: { fontFamily: 'Inter_900Black', fontStyle: 'italic', textDecorationLine: 'underline' },
    ctaSub: { fontFamily: 'Inter_500Medium', fontSize: 14, color: 'rgba(219,234,254,0.7)', textAlign: 'center', marginBottom: 28, lineHeight: 22 },
    // White bg blue text
    ctaBtnPrimary: { backgroundColor: '#ffffff', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 16, marginBottom: 12, width: '100%', alignItems: 'center' },
    ctaBtnPrimaryText: { fontFamily: 'Inter_700Bold', fontSize: 15, color: '#2563eb' },
    // White/10 bg white text with arrow
    ctaBtnSecondary: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 16, width: '100%', justifyContent: 'center', gap: 8 },
    ctaBtnSecondaryText: { fontFamily: 'Inter_700Bold', fontSize: 15, color: '#ffffff' },
});

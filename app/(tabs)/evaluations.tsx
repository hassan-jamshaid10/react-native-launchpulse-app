import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    Activity,
    ArrowRight,
    ChevronDown,
    FileText,
    Lightbulb,
    Shapes,
    Wallet,
} from 'lucide-react-native';
import { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useColorScheme,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export default function EvaluationsScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const [ideaTitle, setIdeaTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [revenueModel, setRevenueModel] = useState('Marketplace');

    const colors = {
        background: isDark ? '#1a1d21' : '#f7f9fb',
        headerBg: isDark ? '#0f172a' : '#ffffff',
        textPrimary: isDark ? '#ffffff' : '#110031',
        textSecondary: isDark ? '#9ca3af' : '#47464f', // on-surface-variant
        cardSub: isDark ? '#818cf8' : '#5b598c',
        surfaceLowest: isDark ? '#2d3133' : '#ffffff', // bg-surface-container-lowest
        surfaceLow: isDark ? '#3d4143' : '#f2f4f6', // bg-surface-container-low
        surfaceContainer: isDark ? '#4b5563' : '#eceef0', // bg-surface-container
        surfaceHigh: isDark ? '#6b7280' : '#e6e8ea',
        tint: '#732ee4',
        btnGradStart: '#732ee4',
        btnGradEnd: '#2d0069',
        border: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(200,197,208,0.15)',
    };

    const REVENUE_MODELS = ['Subscription', 'Marketplace', 'Freemium', 'Licensing'];

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
                <View style={styles.headerLeft}>
                    <Activity color={colors.tint} size={24} />
                    <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Evaluator Pro</Text>
                </View>
                <TouchableOpacity style={styles.avatarWrap} activeOpacity={0.8} onPress={() => router.push('/settings')}>
                    <Image
                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0aK7hqLNLf4pG-DfANA7mQc9R_p9eYN718txgOr80digIwOkgyp2K3VH65ufAyFREM2WjepVALlyYHrFETdylAA4cblMQIBFedX4k1brcqkQvlDfMdpaFHfnuh1cqNKGKTLAcNSuG0mIew1TqitmJThXv7nma5vSqDvC7J5X5R3010MEdfXAQniYD0fdD3W4fHBRYKHNr3krEx8tkwoWUWxQYaPkHMja34vL_DQ3-CxthqAmgdz9B-R7gVIDDhyFwTKduIAhczdU' }}
                        style={styles.avatarImage}
                    />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.kav}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Step Indicator */}
                    <View style={styles.stepHeader}>
                        <View style={styles.stepMeta}>
                            <Text style={[styles.stepEyebrow, { color: colors.cardSub }]}>STEP 02 OF 04</Text>
                            <Text style={[styles.stepTitle, { color: colors.textPrimary }]}>Concept Definition</Text>
                        </View>
                        <View style={styles.progressRingWrap}>
                            <Svg height="48" width="48" viewBox="0 0 48 48">
                                <Circle 
                                    cx="24" cy="24" r="20" 
                                    stroke={colors.surfaceHigh} 
                                    strokeWidth="3" 
                                    fill="transparent" 
                                />
                                <Circle 
                                    cx="24" cy="24" r="20" 
                                    stroke={colors.tint} 
                                    strokeWidth="3" 
                                    fill="transparent" 
                                    strokeDasharray="125.6" 
                                    strokeDashoffset="62.8" 
                                    strokeLinecap="round"
                                    rotation="-90" 
                                    origin="24, 24" 
                                />
                            </Svg>
                            <Text style={[styles.progressText, { color: colors.textPrimary }]}>50%</Text>
                        </View>
                    </View>

                    {/* Form Section */}
                    <View style={styles.formContainer}>
                        {/* Bento Card: Idea Title */}
                        <View style={[styles.bentoCard, { backgroundColor: colors.surfaceLowest, borderColor: colors.border }]}>
                            <View style={styles.cardHeader}>
                                <View style={[styles.iconBox, { backgroundColor: colors.surfaceLow }]}>
                                    <Lightbulb color={colors.tint} size={20} />
                                </View>
                                <Text style={[styles.cardLabel, { color: colors.textPrimary }]}>Idea Title</Text>
                            </View>
                            <TextInput
                                style={[styles.input, { backgroundColor: colors.surfaceLow, color: colors.textPrimary }]}
                                placeholder="e.g. NextGen Supply Chain AI"
                                placeholderTextColor="rgba(113,113,128,0.5)"
                                value={ideaTitle}
                                onChangeText={setIdeaTitle}
                            />
                        </View>

                        <View style={styles.gridCards}>
                            {/* Target Industry */}
                            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceLowest, borderColor: colors.border }]}>
                                <View style={styles.cardHeader}>
                                    <View style={[styles.iconBox, { backgroundColor: colors.surfaceLow }]}>
                                        <Shapes color={colors.tint} size={20} />
                                    </View>
                                    <Text style={[styles.cardLabel, { color: colors.textPrimary }]}>Target Industry</Text>
                                </View>
                                {/* Fake Dropdown */}
                                <TouchableOpacity style={[styles.dropdownBtn, { backgroundColor: colors.surfaceLow }]} activeOpacity={0.7}>
                                    <Text style={[styles.dropdownText, { color: colors.textPrimary }]}>SaaS & Enterprise Software</Text>
                                    <ChevronDown color={colors.textSecondary} size={18} />
                                </TouchableOpacity>
                            </View>

                            {/* Revenue Model */}
                            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceLowest, borderColor: colors.border }]}>
                                <View style={styles.cardHeader}>
                                    <View style={[styles.iconBox, { backgroundColor: colors.surfaceLow }]}>
                                        <Wallet color={colors.tint} size={20} />
                                    </View>
                                    <Text style={[styles.cardLabel, { color: colors.textPrimary }]}>Revenue Model</Text>
                                </View>
                                <View style={styles.revGrid}>
                                    {REVENUE_MODELS.map((model) => {
                                        const isActive = revenueModel === model;
                                        return (
                                            <TouchableOpacity
                                                key={model}
                                                style={[
                                                    styles.revBtn, 
                                                    { backgroundColor: isActive ? colors.tint : colors.surfaceLow }
                                                ]}
                                                onPress={() => setRevenueModel(model)}
                                                activeOpacity={0.7}
                                            >
                                                <Text style={[
                                                    styles.revText, 
                                                    { color: isActive ? '#ffffff' : colors.textPrimary }
                                                ]}>
                                                    {model}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>
                        </View>

                        {/* Executive Summary */}
                        <View style={[styles.bentoCardAsym, { backgroundColor: colors.surfaceLowest, borderColor: colors.border }]}>
                            <View style={[styles.asymBlob, { backgroundColor: 'rgba(115,46,228,0.05)' }]} />
                            <View style={styles.relativeZ}>
                                <View style={styles.cardHeader}>
                                    <View style={[styles.iconBox, { backgroundColor: colors.surfaceLow }]}>
                                        <FileText color={colors.tint} size={20} />
                                    </View>
                                    <Text style={[styles.cardLabel, { color: colors.textPrimary }]}>Executive Summary</Text>
                                </View>
                                <TextInput
                                    style={[styles.textArea, { backgroundColor: colors.surfaceLow, color: colors.textPrimary }]}
                                    placeholder="Provide a high-level overview of the problem and your architectural solution..."
                                    placeholderTextColor="rgba(113,113,128,0.5)"
                                    multiline
                                    textAlignVertical="top"
                                    value={summary}
                                    onChangeText={setSummary}
                                />
                                <View style={styles.areaFooter}>
                                    <Text style={[styles.areaMeta, { color: colors.textSecondary }]}>MIN. 150 WORDS RECOMMENDED</Text>
                                    <Text style={styles.areaCount}>{summary.length}/500</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Actions */}
                    <View style={styles.actionsBox}>
                        <TouchableOpacity activeOpacity={0.8}>
                            <LinearGradient
                                colors={[colors.btnGradStart, colors.btnGradEnd]}
                                style={styles.continueBtn}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.continueText}>Continue</Text>
                                <ArrowRight color="#fff" size={16} />
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.draftBtn} activeOpacity={0.7}>
                            <Text style={[styles.draftText, { color: colors.cardSub }]}>Save Draft and Exit</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    kav: { flex: 1 },

    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 15,
        elevation: 3,
        zIndex: 50,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 18,
        letterSpacing: -0.5,
    },
    avatarWrap: {
        height: 32,
        width: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(200,197,208,0.3)',
        overflow: 'hidden',
    },
    avatarImage: { width: '100%', height: '100%', resizeMode: 'cover' },

    // Main Layout (similar max-width to Web max-w-md design)
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 140, // for bottom nav bar spacing
        maxWidth: 448,
        alignSelf: 'center',
        width: '100%',
    },

    // Step Indicator
    stepHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    stepMeta: { flex: 1 },
    stepEyebrow: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        letterSpacing: 2,
        marginBottom: 4,
    },
    stepTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 24,
        letterSpacing: -0.5,
    },
    progressRingWrap: {
        position: 'relative',
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressText: {
        position: 'absolute',
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
    },

    // Form
    formContainer: { gap: 24 },
    relativeZ: { zIndex: 10 },

    bentoCard: {
        padding: 24,
        borderRadius: 16,
        borderWidth: 1,
        shadowColor: '#191c1e',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        letterSpacing: -0.2,
    },
    input: {
        fontFamily: 'Inter_400Regular',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 14,
    },
    
    gridCards: { gap: 24 }, // on web it uses grid, stacking vertically on mobile

    dropdownBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    dropdownText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
    },

    revGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    revBtn: {
        width: '48%', // mimics 2 columns
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    revText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
    },

    bentoCardAsym: {
        position: 'relative',
        padding: 24,
        borderRadius: 16,
        borderWidth: 1,
        overflow: 'hidden',
        shadowColor: '#191c1e',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 1,
    },
    asymBlob: {
        position: 'absolute',
        top: -40,
        right: -40,
        width: 128,
        height: 128,
        borderRadius: 64,
    },
    textArea: {
        fontFamily: 'Inter_400Regular',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
        fontSize: 14,
        minHeight: 120,
    },
    areaFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    areaMeta: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 10,
        letterSpacing: 0.5,
    },
    areaCount: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        color: '#732ee4',
    },

    // Actions
    actionsBox: {
        marginTop: 40,
        paddingHorizontal: 8,
        gap: 16,
    },
    continueBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        borderRadius: 16,
        gap: 8,
        shadowColor: '#732ee4',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.25,
        shadowRadius: 24,
        elevation: 6,
    },
    continueText: {
        fontFamily: 'Inter_700Bold',
        color: '#ffffff',
        fontSize: 15,
        letterSpacing: 0.5,
    },
    draftBtn: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    draftText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 14,
    },
});

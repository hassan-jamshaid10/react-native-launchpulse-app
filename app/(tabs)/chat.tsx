import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    Activity,
    Bell,
    Bot,
    Search,
    Send,
    Sparkles,
    User,
} from 'lucide-react-native';
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

export default function AIChatScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const colors = {
        background: isDark ? '#1a1d21' : '#f7f9fb',
        headerBg: isDark ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.85)',
        textPrimary: isDark ? '#ffffff' : '#110031',
        textSecondary: isDark ? '#9ca3af' : '#47464f',
        textOnPrimary: '#ffffff',
        surfaceLowest: isDark ? '#2d3133' : '#ffffff',
        surfaceLow: isDark ? '#3d4143' : '#f2f4f6',
        surfaceContainerHigh: isDark ? '#4b5563' : '#e6e8ea',
        surfaceContainerHighest: isDark ? '#6b7280' : '#e0e3e5',
        tint: '#732ee4',
        btnGradStart: '#732ee4',
        btnGradEnd: '#2d0069',
        border: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(200,197,208,0.2)',
        primary: isDark ? '#2d0069' : '#110031',
        primaryContainer: '#2d0069',
        onPrimaryContainer: '#9d6bff',
        secondary: isDark ? '#818cf8' : '#5b598c',
        onSecondary: '#ffffff',
        outline: '#787680',
    };

    const QUICK_ACTIONS = [
        'Analyze Pitch Deck',
        'Market Sentiment',
        'Risk Assessment',
    ];

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
            {/* TopAppBar */}
            <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
                <View style={styles.headerLeft}>
                    <Search color={colors.textPrimary} size={20} />
                    <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Meridian Analyst</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Bell color={colors.textPrimary} size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.avatarWrap, { borderColor: colors.border }]}
                        onPress={() => router.push('/settings')}
                    >
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGjc-Iok8ge3pqj1tVSO2Czep7bwvoUV5LL8uDwXvMSXuVbdexRi60vIpvWLzFqK3ACLQBrvWtpurc-ZGh2ZI_lcw3De55st1mIQaiY-UaTILBB7xEm4jcDkbr8FNF3mCYZGCfZP64a6fDONzQujvER_NfpIE49I7Zj8iVttsWYeZ7cx9zoZ8CfakDrMhZacjktLL_4nnIu3KLKvLGLrrQ3YswLdSot-1Eq4lo7Tx_Hkv8aIJcFPMFWsNfT5YJWNgKlQU7nmI6WX4' }}
                            style={styles.avatarImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <KeyboardAvoidingView 
                style={styles.keyboardFlex} 
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={90}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    
                    {/* Thread */}
                    <View style={styles.threadContainer}>
                        
                        {/* AI Message 1 */}
                        <View style={styles.msgLeftWrapper}>
                            <View style={[styles.aiAvatar, { backgroundColor: colors.primaryContainer }]}>
                                <Sparkles color={colors.onPrimaryContainer} size={16} />
                            </View>
                            <View style={styles.msgLeftBox}>
                                <View style={[styles.msgBubbleLeft, { backgroundColor: colors.surfaceLowest, borderColor: colors.border }]}>
                                    <Text style={[styles.msgTextRightLeft, { color: colors.textSecondary }]}>
                                        Hello! I've analyzed your latest portfolio performance. The tech sector is showing strong momentum. How would you like to proceed today?
                                    </Text>
                                    <Text style={[styles.msgMeta, { color: colors.outline }]}>Assistant • 09:41 AM</Text>
                                </View>
                            </View>
                        </View>

                        {/* User Message */}
                        <View style={styles.msgRightWrapper}>
                            <View style={styles.msgRightBox}>
                                <View style={[styles.msgBubbleRight, { backgroundColor: colors.primary }]}>
                                    <Text style={[styles.msgTextRight, { color: colors.textOnPrimary }]}>
                                        Can you run a quick risk assessment on the new Series A hardware pitch? I'm concerned about their manufacturing lead times.
                                    </Text>
                                    <Text style={[styles.msgMetaRight, { color: colors.textOnPrimary }]}>You • 09:42 AM</Text>
                                </View>
                            </View>
                            <View style={[styles.userAvatar, { backgroundColor: colors.secondary }]}>
                                <User color={colors.onSecondary} size={16} />
                            </View>
                        </View>

                        {/* AI Message 2 with Analysis */}
                        <View style={styles.msgLeftWrapper}>
                            <View style={[styles.aiAvatar, { backgroundColor: colors.primaryContainer }]}>
                                <Sparkles color={colors.onPrimaryContainer} size={16} />
                            </View>
                            <View style={styles.msgLeftBox}>
                                <View style={[styles.msgBubbleLeft, { backgroundColor: colors.surfaceLowest, borderColor: colors.border }]}>
                                    <Text style={[styles.msgTextRightLeft, { color: colors.textSecondary }]}>
                                        Starting analysis on "Project Vulcan." I'm cross-referencing their supply chain data with current global logistics benchmarks.
                                    </Text>

                                    {/* Analysis Progress Box */}
                                    <View style={[styles.analysisBox, { backgroundColor: colors.surfaceLow, borderLeftColor: colors.tint }]}>
                                        <View style={styles.analysisHeader}>
                                            <Activity color={colors.tint} size={16} />
                                            <Text style={[styles.analysisTitle, { color: colors.primary }]}>Supply Chain Risk: Moderate</Text>
                                        </View>
                                        <View style={[styles.progressBarTrack, { backgroundColor: colors.surfaceContainerHighest }]}>
                                            <View style={[styles.progressBarFill, { backgroundColor: colors.tint, width: '66%' }]} />
                                        </View>
                                    </View>

                                    <Text style={[styles.msgMeta, { color: colors.outline }]}>Assistant • 09:43 AM</Text>
                                </View>
                            </View>
                        </View>

                    </View>

                </ScrollView>

                {/* Bottom Input Area */}
                <View style={[styles.bottomInputWrap, { backgroundColor: 'rgba(255,255,255,0.85)' }]}>
                    
                    {/* Quick Actions Scroll */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActionsScroll}>
                        {QUICK_ACTIONS.map((action, idx) => (
                            <TouchableOpacity key={idx} style={[styles.chipBox, { backgroundColor: colors.surfaceLowest, borderColor: colors.border }]}>
                                <Text style={[styles.chipText, { color: colors.primary }]}>{action}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Input Layout */}
                    <View style={styles.inputOuterContainer}>
                        <View style={[styles.inputInnerContainer, { backgroundColor: colors.surfaceLowest, borderColor: colors.border }]}>
                            <Sparkles color={colors.tint} size={20} />
                            <TextInput 
                                style={[styles.textInput, { color: colors.textPrimary }]} 
                                placeholder="Ask AI anything..." 
                                placeholderTextColor={colors.outline}
                            />
                            <TouchableOpacity style={styles.sendBtn}>
                                <LinearGradient
                                    colors={[colors.btnGradStart, colors.btnGradEnd]}
                                    style={styles.sendGradient}
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                                >
                                    <Send color="#ffffff" size={18} />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        height: 64,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        zIndex: 50,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerTitle: {
        fontFamily: 'Inter_900Black', // Standard app styling
        fontSize: 18,
        letterSpacing: -0.5,
        textTransform: 'uppercase',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconBtn: { padding: 4 },
    avatarWrap: {
        width: 32,
        height: 32,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
    },
    avatarImage: { width: '100%', height: '100%', resizeMode: 'cover' },

    keyboardFlex: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 40,
        maxWidth: 700,
        alignSelf: 'center',
        width: '100%',
    },

    threadContainer: {
        gap: 24,
        paddingBottom: 24,
    },

    // AI Message
    msgLeftWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    aiAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    msgLeftBox: {
        maxWidth: '85%',
    },
    msgBubbleLeft: {
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 2,
        elevation: 1,
    },
    msgTextRightLeft: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 22,
    },
    msgMeta: {
        fontFamily: 'Inter_500Medium',
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginTop: 12,
    },

    analysisBox: {
        marginTop: 16,
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 4,
    },
    analysisHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    analysisTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
    },
    progressBarTrack: {
        height: 6,
        borderRadius: 3,
        overflow: 'hidden',
        width: '100%',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },

    // User Message
    msgRightWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        gap: 12,
    },
    userAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    msgRightBox: {
        maxWidth: '85%',
        alignItems: 'flex-end',
    },
    msgBubbleRight: {
        padding: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    msgTextRight: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 22,
    },
    msgMetaRight: {
        fontFamily: 'Inter_500Medium',
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginTop: 12,
        opacity: 0.8,
    },

    // Bottom Input Section
    bottomInputWrap: {
        paddingTop: 8,
        paddingBottom: 100, // accommodate bottom nav bar natively
        paddingHorizontal: 0,
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: 'rgba(200,197,208,0.2)',
    },
    quickActionsScroll: {
        paddingHorizontal: 16,
        gap: 8,
        paddingBottom: 16,
    },
    chipBox: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 2,
        elevation: 1,
    },
    chipText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 12,
    },

    inputOuterContainer: {
        paddingHorizontal: 16,
        maxWidth: 700,
        alignSelf: 'center',
        width: '100%',
    },
    inputInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        paddingLeft: 20,
        paddingRight: 6,
        paddingVertical: 6,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 3,
        gap: 12,
    },
    textInput: {
        flex: 1,
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        minHeight: 40,
    },
    sendBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#732ee4',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    sendGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

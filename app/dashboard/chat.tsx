import { LinearGradient } from 'expo-linear-gradient';
import {
    Activity,
    Send,
    Sparkles,
    User
} from 'lucide-react-native';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
/* ── Stitch Colors ── */
const C = {
    primary: '#110031',
    tint: '#732ee4',
    tintEnd: '#2d0069',
    secondary: '#5b598c',
    onSurfaceVariant: '#47464f',
    surface: '#f7f9fb',
    surfaceLow: '#f2f4f6',
    surfaceContainer: '#eceef0',
    white: '#ffffff',
    outline: '#c8c5d0',
};

export default function AIChatScreen() {
    const QUICK_ACTIONS = [
        'Analyze Pitch Deck',
        'Market Sentiment',
        'Risk Assessment',
    ];

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: C.surface }]} edges={['bottom']}>

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
                            <View style={[styles.aiAvatar, { backgroundColor: C.tintEnd }]}>
                                <Sparkles color={C.white} size={16} />
                            </View>
                            <View style={styles.msgLeftBox}>
                                <View style={[styles.msgBubbleLeft, { backgroundColor: C.white, borderColor: C.outline }]}>
                                    <Text style={[styles.msgTextRightLeft, { color: C.onSurfaceVariant }]}>
                                        Hello! I've analyzed your latest portfolio performance. The tech sector is showing strong momentum. How would you like to proceed today?
                                    </Text>
                                    <Text style={[styles.msgMeta, { color: C.secondary }]}>Assistant • 09:41 AM</Text>
                                </View>
                            </View>
                        </View>

                        {/* User Message */}
                        <View style={styles.msgRightWrapper}>
                            <View style={styles.msgRightBox}>
                                <View style={[styles.msgBubbleRight, { backgroundColor: C.primary }]}>
                                    <Text style={[styles.msgTextRight, { color: C.white }]}>
                                        Can you run a quick risk assessment on the new Series A hardware pitch? I'm concerned about their manufacturing lead times.
                                    </Text>
                                    <Text style={[styles.msgMetaRight, { color: C.white }]}>You • 09:42 AM</Text>
                                </View>
                            </View>
                            <View style={[styles.userAvatar, { backgroundColor: C.secondary }]}>
                                <User color={C.white} size={16} />
                            </View>
                        </View>

                        {/* AI Message 2 with Analysis */}
                        <View style={styles.msgLeftWrapper}>
                            <View style={[styles.aiAvatar, { backgroundColor: C.tintEnd }]}>
                                <Sparkles color={C.white} size={16} />
                            </View>
                            <View style={styles.msgLeftBox}>
                                <View style={[styles.msgBubbleLeft, { backgroundColor: C.white, borderColor: C.outline }]}>
                                    <Text style={[styles.msgTextRightLeft, { color: C.onSurfaceVariant }]}>
                                        Starting analysis on "Project Vulcan." I'm cross-referencing their supply chain data with current global logistics benchmarks.
                                    </Text>

                                    {/* Analysis Progress Box */}
                                    <View style={[styles.analysisBox, { backgroundColor: C.surfaceLow, borderLeftColor: C.tint }]}>
                                        <View style={styles.analysisHeader}>
                                            <Activity color={C.tint} size={16} />
                                            <Text style={[styles.analysisTitle, { color: C.primary }]}>Supply Chain Risk: Moderate</Text>
                                        </View>
                                        <View style={[styles.progressBarTrack, { backgroundColor: C.surfaceContainer }]}>
                                            <View style={[styles.progressBarFill, { backgroundColor: C.tint, width: '66%' }]} />
                                        </View>
                                    </View>

                                    <Text style={[styles.msgMeta, { color: C.secondary }]}>Assistant • 09:43 AM</Text>
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
                            <TouchableOpacity key={idx} style={[styles.chipBox, { backgroundColor: C.white, borderColor: C.outline }]}>
                                <Text style={[styles.chipText, { color: C.primary }]}>{action}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Input Layout */}
                    <View style={styles.inputOuterContainer}>
                        <View style={[styles.inputInnerContainer, { backgroundColor: C.white, borderColor: C.outline }]}>
                            <Sparkles color={C.tint} size={20} />
                            <TextInput
                                style={[styles.textInput, { color: C.primary }]}
                                placeholder="Ask AI anything..."
                                placeholderTextColor={C.onSurfaceVariant}
                            />
                            <TouchableOpacity style={styles.sendBtn}>
                                <LinearGradient
                                    colors={[C.tint, C.tintEnd]}
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
        fontFamily: 'Manrope_800ExtraBold', // Standard app styling
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
        fontFamily: 'Manrope_400Regular',
        fontSize: 14,
        lineHeight: 22,
    },
    msgMeta: {
        fontFamily: 'Manrope_500Medium',
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
        fontFamily: 'Manrope_700Bold',
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
        fontFamily: 'Manrope_400Regular',
        fontSize: 14,
        lineHeight: 22,
    },
    msgMetaRight: {
        fontFamily: 'Manrope_500Medium',
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
        fontFamily: 'Manrope_600SemiBold',
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
        fontFamily: 'Manrope_400Regular',
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

import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { trpc } from '@/utils/api';
// We'll simulate authentication state internally for the UI, as the actual backend auth logic depends on session management.
// For now, we simulate a successful login and route to workspaces.

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
    error: '#ba1a1a',
    errorContainer: '#ffdad6',
};

export default function AuthScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isTablet = width >= 768;

    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [terms, setTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setError('');
        if (!email || !password || (!isLogin && !name)) {
            setError('Please fill in all required fields.');
            return;
        }
        if (!isLogin && !terms) {
            setError('You must agree to the Terms of Service.');
            return;
        }

        setLoading(true);
        // Simulate network delay
        setTimeout(() => {
            setLoading(false);
            // On successful login or signup, route to workspaces screen
            router.replace('/workspaces');
        }, 1500);
    };

    return (
        <View style={s.root}>
            {isTablet && (
                <View style={s.leftPanel}>
                    {/* Background decorations */}
                    <View style={[s.decorativeCircle, { backgroundColor: '#2d0069', width: 600, height: 600, top: -100, right: -100 }]} />
                    <View style={[s.decorativeCircle, { backgroundColor: '#732ee4', width: 400, height: 400, bottom: -50, left: -50, opacity: 0.1 }]} />

                    <View style={s.leftContent}>
                        <View style={s.brandRow}>
                            <View style={s.brandIconBox}>
                                <MaterialIcons name="token" size={24} color="#fff" />
                            </View>
                            <Text style={s.brandTextWhite}>LaunchPulse</Text>
                        </View>

                        <View style={s.leftHero}>
                            <Text style={s.leftTitle}>Startup Success Evaluator</Text>
                            <Text style={s.leftSub}>
                                Quantify risk and amplify returns with comprehensive AI-driven startup evaluations and benchmark analysis.
                            </Text>
                        </View>

                        <View style={s.testimonialBox}>
                            <View style={s.testimonialHeader}>
                                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDegN21UGZupxSo5927j7zp87UbTAk0Wbhip0Vm5F0b43tZeH48k_lZ3J519WTz9jUNpovgx-eUBIRXysRqmURkfgM9va0g_mroxaAE-lNxUWrVvkwyWCLO88ldkzyi-eVyzRyQNqlndXjr4Vrc_0dzHoXWnwaEwidFhiGunIerz4FLsPmZgB1OdHFq818Kj-bH1lLdmNsOCh3AilGqiG_MuCcb92WE_vaQySVPlJb54uCWGbwb37xfxD0i9SFthooZNHo5cVjh4ao' }} style={s.testimonialAvatar} />
                                <View>
                                    <Text style={s.testimonialName}>Marcus Sterling</Text>
                                    <Text style={s.testimonialRole}>Principal Architect @ Meridian</Text>
                                </View>
                            </View>
                            <Text style={s.testimonialQuote}>
                                "Precision isn't just a goal; it's our foundational requirement for every clinical evaluation we perform."
                            </Text>
                        </View>
                    </View>
                </View>
            )}

            <KeyboardAvoidingView style={s.rightPanel} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
                    
                    {!isTablet && (
                        <View style={s.mobileBrandRow}>
                            <View style={s.mobileBrandIconBox}>
                                <MaterialIcons name="token" size={20} color={C.tint} />
                            </View>
                            <Text style={s.brandTextDark}>LaunchPulse</Text>
                        </View>
                    )}

                    <View style={s.formHeader}>
                        <Text style={s.formTitle}>{isLogin ? 'Welcome Back' : 'Create your account'}</Text>
                        <Text style={s.formSub}>
                            {isLogin ? 'Enter your credentials to access the Dashboard.' : 'Start building your architecture today.'}
                        </Text>
                    </View>

                    {error ? (
                        <View style={s.errorBox}>
                            <Text style={s.errorText}>{error}</Text>
                        </View>
                    ) : null}

                    <View style={s.formGroup}>
                        {!isLogin && (
                            <View style={s.inputWrapper}>
                                <Text style={s.inputLabel}>FULL NAME</Text>
                                <TextInput
                                    style={s.input}
                                    placeholder="Jonathan Edwards"
                                    placeholderTextColor={C.outline}
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>
                        )}

                        <View style={s.inputWrapper}>
                            <Text style={s.inputLabel}>WORK EMAIL</Text>
                            <TextInput
                                style={s.input}
                                placeholder={isLogin ? "name@company.com" : "j.edwards@architect.io"}
                                placeholderTextColor={C.outline}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View style={s.inputWrapper}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={s.inputLabel}>{isLogin ? 'PASSWORD' : 'CREATE PASSWORD'}</Text>
                                {isLogin && (
                                    <TouchableOpacity>
                                        <Text style={s.forgotText}>Forgot?</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View style={s.passwordWrapper}>
                                <TextInput
                                    style={[s.input, { flex: 1, paddingRight: 40 }]}
                                    placeholder={isLogin ? "••••••••" : "••••••••••••"}
                                    placeholderTextColor={C.outline}
                                    secureTextEntry={!showPass}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity style={s.eyeBtn} onPress={() => setShowPass(!showPass)}>
                                    <MaterialIcons name={showPass ? 'visibility-off' : 'visibility'} size={20} color={C.onSurfaceVariant} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {isLogin ? (
                            <View style={s.checkboxRow}>
                                <TouchableOpacity style={[s.checkbox, terms && s.checkboxActive]} onPress={() => setTerms(!terms)}>
                                    {terms && <MaterialIcons name="check" size={14} color="#fff" />}
                                </TouchableOpacity>
                                <Text style={s.checkboxLabel}>Keep me signed in</Text>
                            </View>
                        ) : (
                            <View style={s.checkboxRow}>
                                <TouchableOpacity style={[s.checkbox, terms && s.checkboxActive]} onPress={() => setTerms(!terms)}>
                                    {terms && <MaterialIcons name="check" size={14} color="#fff" />}
                                </TouchableOpacity>
                                <Text style={s.checkboxLabel}>
                                    I agree to the <Text style={s.link}>Terms of Service</Text> and <Text style={s.link}>Privacy Policy</Text>.
                                </Text>
                            </View>
                        )}

                        <TouchableOpacity style={s.submitBtn} activeOpacity={0.8} onPress={handleSubmit} disabled={loading}>
                            <LinearGradient colors={[C.tint, C.tintEnd]} style={StyleSheet.absoluteFill} start={{ x:0, y:0 }} end={{ x:1, y:1 }} borderRadius={8} />
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <>
                                    <Text style={s.submitText}>{isLogin ? 'Login to Dashboard' : 'Create Account'}</Text>
                                    <MaterialIcons name="arrow-forward" size={18} color="#fff" />
                                </>
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={s.dividerContainer}>
                        <View style={s.dividerLine} />
                        <Text style={s.dividerText}>OR CONTINUE WITH</Text>
                        <View style={s.dividerLine} />
                    </View>

                    <View style={s.socialRow}>
                        <TouchableOpacity style={s.socialBtn} activeOpacity={0.7}>
                            <Text style={s.socialText}>Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.socialBtn} activeOpacity={0.7}>
                            <Text style={s.socialText}>SSO</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={s.footer}>
                        <Text style={s.footerText}>
                            {isLogin ? 'New to LaunchPulse? ' : 'Already have an account? '}
                        </Text>
                        <TouchableOpacity onPress={() => { setIsLogin(!isLogin); setError(''); setTerms(false); }}>
                            <Text style={s.link}>{isLogin ? 'Request access' : 'Log in'}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, flexDirection: 'row', backgroundColor: C.surface },
    
    // Left Panel
    leftPanel: { flex: 1, backgroundColor: C.primary, overflow: 'hidden', padding: 40 },
    decorativeCircle: { position: 'absolute', borderRadius: 9999, opacity: 0.3 },
    leftContent: { flex: 1, justifyContent: 'space-between', zIndex: 10 },
    brandRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    brandIconBox: { width: 40, height: 40, backgroundColor: C.tint, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
    brandTextWhite: { fontFamily: 'Manrope_800ExtraBold', fontSize: 24, color: '#fff', letterSpacing: -0.5 },
    leftHero: { marginVertical: 40, paddingBottom: 60 },
    leftTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 48, color: '#fff', leadingHeight: 56, marginBottom: 16 },
    leftSub: { fontFamily: 'Manrope_500Medium', fontSize: 16, color: '#9d6bff', lineHeight: 26 },
    
    testimonialBox: { backgroundColor: 'rgba(45,0,105,0.2)', padding: 24, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(200,197,208,0.1)' },
    testimonialHeader: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
    testimonialAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: C.surfaceLow },
    testimonialName: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: '#fff' },
    testimonialRole: { fontFamily: 'Manrope_500Medium', fontSize: 12, color: '#c4c1fb' },
    testimonialQuote: { fontFamily: 'Manrope_500Medium', fontSize: 14, color: '#9d6bff', fontStyle: 'italic', lineHeight: 22 },

    // Right Panel
    rightPanel: { flex: 1, backgroundColor: C.surface, justifyContent: 'center' },
    scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 32, paddingVertical: 40, maxWidth: 480, width: '100%', alignSelf: 'center' },
    
    mobileBrandRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 32 },
    mobileBrandIconBox: { width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    brandTextDark: { fontFamily: 'Manrope_800ExtraBold', fontSize: 20, color: C.primary, letterSpacing: -0.5 },

    formHeader: { marginBottom: 32 },
    formTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 32, color: C.primary, letterSpacing: -0.5, marginBottom: 8 },
    formSub: { fontFamily: 'Manrope_500Medium', fontSize: 14, color: C.onSurfaceVariant },

    errorBox: { backgroundColor: C.errorContainer, padding: 12, borderRadius: 8, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(186,26,26,0.1)' },
    errorText: { fontFamily: 'Manrope_600SemiBold', fontSize: 13, color: C.error },

    formGroup: { gap: 16 },
    inputWrapper: { gap: 6 },
    inputLabel: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.primary, letterSpacing: 1, textTransform: 'uppercase' },
    input: { backgroundColor: C.surfaceLow, paddingHorizontal: 16, paddingVertical: 14, borderRadius: 8, fontFamily: 'Manrope_500Medium', fontSize: 14, color: C.primary, borderWidth: 1, borderColor: 'transparent' },
    passwordWrapper: { position: 'relative' },
    eyeBtn: { position: 'absolute', right: 12, top: 12, padding: 4 },
    forgotText: { fontFamily: 'Manrope_700Bold', fontSize: 12, color: C.tint },
    
    checkboxRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginTop: 4, paddingRight: 20 },
    checkbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 1, borderColor: C.outline, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
    checkboxActive: { backgroundColor: C.tint, borderColor: C.tint },
    checkboxLabel: { flex: 1, fontFamily: 'Manrope_600SemiBold', fontSize: 12, color: C.onSurfaceVariant, lineHeight: 18 },
    link: { color: C.tint, fontFamily: 'Manrope_700Bold' },

    submitBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 8, marginTop: 8 },
    submitText: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: '#fff' },

    dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 32 },
    dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(200,197,208,0.3)' },
    dividerText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.outline, paddingHorizontal: 16, letterSpacing: 1 },

    socialRow: { flexDirection: 'row', gap: 12 },
    socialBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 14, backgroundColor: C.surfaceLow, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(200,197,208,0.2)' },
    socialText: { fontFamily: 'Manrope_700Bold', fontSize: 13, color: C.primary },

    footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 32 },
    footerText: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: C.onSurfaceVariant },
});

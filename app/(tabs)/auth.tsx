// Auth page — non-scrollable, form embedded on dark bg
import { trpc } from '@/utils/api';
import * as Google from 'expo-auth-session/providers/google';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import {
    ArrowRight,
    Chrome,
    Eye,
    EyeOff,
    Lock,
    Mail,
} from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function AuthPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Animated blobs — same as getting-started
    const blob1 = useRef(new Animated.Value(0.08)).current;
    const blob2 = useRef(new Animated.Value(0.08)).current;
    useEffect(() => {
        const p1 = Animated.loop(Animated.sequence([
            Animated.timing(blob1, { toValue: 0.22, duration: 2500, useNativeDriver: true }),
            Animated.timing(blob1, { toValue: 0.08, duration: 2500, useNativeDriver: true }),
        ]));
        const p2 = Animated.loop(Animated.sequence([
            Animated.delay(1000),
            Animated.timing(blob2, { toValue: 0.22, duration: 2500, useNativeDriver: true }),
            Animated.timing(blob2, { toValue: 0.08, duration: 2500, useNativeDriver: true }),
        ]));
        p1.start(); p2.start();
        return () => { p1.stop(); p2.stop(); };
    }, []);

    const loginMutation = (trpc as any).auth.login.useMutation();
    const registerMutation = (trpc as any).auth.register.useMutation();
    const googleMutation = (trpc as any).auth.mobileGoogleLogin?.useMutation?.();

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
        androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    });

    useEffect(() => {
        if (response?.type === 'success' && response.authentication?.idToken) {
            handleGoogle(response.authentication.idToken);
        }
    }, [response]);

    const handleGoogle = async (idToken: string) => {
        setLoading(true);
        try {
            const res = await googleMutation?.mutateAsync?.({ idToken });
            const data = res?.json ?? res?.result?.data?.json ?? res;
            if (data?.token) {
                await SecureStore.setItemAsync('user-token', data.token);
                router.replace('/dashboard');
            }
        } catch (e: any) { Alert.alert('Error', e.message ?? 'Google sign-in failed'); }
        finally { setLoading(false); }
    };

    const handleSubmit = async () => {
        if (!email || !password) { Alert.alert('Error', 'Please fill in all fields'); return; }
        if (!isLogin && !name) { Alert.alert('Error', 'Please enter your name'); return; }
        setLoading(true);
        try {
            if (isLogin) {
                const res = await loginMutation.mutateAsync({ email, password });
                const data = res?.json ?? res?.result?.data?.json ?? res;
                if (data?.token) {
                    await SecureStore.setItemAsync('user-token', data.token);
                    await SecureStore.setItemAsync('user-info', JSON.stringify(data.user ?? data));
                    router.replace('/dashboard');
                } else { Alert.alert('Error', 'Invalid email or password'); }
            } else {
                const res = await registerMutation.mutateAsync({ email, password, name });
                const data = res?.json ?? res?.result?.data?.json ?? res;
                if (data?.id || data?.email) {
                    Alert.alert('Success', 'Account created! You can now sign in.');
                    setIsLogin(true);
                } else { Alert.alert('Error', 'Registration failed'); }
            }
        } catch (e: any) {
            Alert.alert('Error', e.message ?? (isLogin ? 'Login failed' : 'Registration failed'));
        } finally { setLoading(false); }
    };

    return (
        // bg-[#030712] — same on all pages
        <View style={s.root}>
            <LinearGradient colors={['#030712', '#030712']} style={StyleSheet.absoluteFill} />

            {/* Ambient blob top-left — blue */}
            <Animated.View style={[s.blob, s.blobTL, { opacity: blob1 }]}>
                <LinearGradient colors={['rgba(59,130,246,1)', 'transparent']} style={StyleSheet.absoluteFill} borderRadius={999} />
            </Animated.View>
            {/* Ambient blob bottom-right — violet */}
            <Animated.View style={[s.blob, s.blobBR, { opacity: blob2 }]}>
                <LinearGradient colors={['rgba(139,92,246,1)', 'transparent']} style={StyleSheet.absoluteFill} borderRadius={999} />
            </Animated.View>

            {/* KeyboardAvoidingView so inputs don't get hidden — but NO ScrollView */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={s.kav}
            >
                <View style={s.inner}>
                    {/* Page title */}
                    <Text style={s.pageTitle}>{isLogin ? 'Welcome Back' : 'Get Started'}</Text>
                    <Text style={s.pageSub}>{isLogin ? 'Sign in to your account' : 'Create your free account'}</Text>

                    {/* Google — glassmorphic pill */}
                    <TouchableOpacity
                        style={s.googleBtn}
                        onPress={() => promptAsync()}
                        disabled={loading || !request}
                    >
                        <Chrome color="#ffffff" size={18} />
                        <Text style={s.googleBtnText}>Continue with Google</Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={s.divider}>
                        <View style={s.dividerLine} />
                        <Text style={s.dividerText}>Or continue with email</Text>
                        <View style={s.dividerLine} />
                    </View>

                    {/* Name — sign up only */}
                    {!isLogin && (
                        <View style={s.field}>
                            <Text style={s.label}>Full Name</Text>
                            <TextInput
                                style={s.input}
                                placeholder="John Doe"
                                value={name}
                                onChangeText={setName}
                                placeholderTextColor="rgba(255,255,255,0.3)"
                            />
                        </View>
                    )}

                    {/* Email */}
                    <View style={s.field}>
                        <Text style={s.label}>Email Address</Text>
                        <View style={s.inputWrap}>
                            <Mail size={16} color="rgba(255,255,255,0.35)" style={s.inputIcon} />
                            <TextInput
                                style={[s.input, { paddingLeft: 44 }]}
                                placeholder="you@example.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholderTextColor="rgba(255,255,255,0.3)"
                            />
                        </View>
                    </View>

                    {/* Password */}
                    <View style={s.field}>
                        <Text style={s.label}>Password</Text>
                        <View style={s.inputWrap}>
                            <Lock size={16} color="rgba(255,255,255,0.35)" style={s.inputIcon} />
                            <TextInput
                                style={[s.input, { paddingLeft: 44, paddingRight: 46 }]}
                                placeholder="••••••••"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                placeholderTextColor="rgba(255,255,255,0.3)"
                            />
                            <TouchableOpacity style={s.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
                                {showPassword
                                    ? <EyeOff size={16} color="rgba(255,255,255,0.35)" />
                                    : <Eye size={16} color="rgba(255,255,255,0.35)" />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Remember & Forgot — login only */}
                    {isLogin && (
                        <View style={s.optionsRow}>
                            <View style={s.checkRow}>
                                <View style={s.checkbox} />
                                <Text style={s.checkText}>Remember me</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={s.forgotText}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Submit */}
                    <TouchableOpacity onPress={handleSubmit} disabled={loading} style={{ marginTop: 8 }}>
                        <LinearGradient
                            colors={['#111827', '#172554', '#2e1065']}
                            style={s.submitBtn}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Text style={s.submitBtnText}>
                                {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
                            </Text>
                            {!loading && <ArrowRight color="#fff" size={16} />}
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Toggle */}
                    <View style={s.toggleRow}>
                        <Text style={s.toggleText}>{isLogin ? "Don't have an account? " : 'Already have an account? '}</Text>
                        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                            <Text style={s.toggleAction}>{isLogin ? 'Sign Up' : 'Sign In'}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Terms */}
                    <Text style={s.terms}>
                        By continuing, you agree to our <Text style={s.termsLink}>Terms of Service</Text> and <Text style={s.termsLink}>Privacy Policy</Text>
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#030712' },

    blob: { position: 'absolute', borderRadius: 999, overflow: 'hidden' },
    blobTL: { top: -80, left: -60, width: 360, height: 240 },
    blobBR: { bottom: -60, right: -60, width: 240, height: 240 },

    // KeyboardAvoidingView fills the screen
    kav: { flex: 1 },
    // inner — centred, non-scrolling
    inner: { flex: 1, justifyContent: 'center', paddingHorizontal: 24, paddingBottom: 16 },

    // Page title
    pageTitle: { fontFamily: 'Inter_900Black', fontSize: 34, color: '#ffffff', marginBottom: 6, letterSpacing: -0.8 },
    pageSub: { fontFamily: 'Inter_400Regular', fontSize: 15, color: '#6b7280', marginBottom: 24 },

    // Google
    googleBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 13, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', borderRadius: 999, marginBottom: 22, gap: 10, backgroundColor: 'rgba(255,255,255,0.05)' },
    googleBtnText: { fontFamily: 'Inter_500Medium', color: '#ffffff', fontSize: 14 },

    // Divider
    divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
    dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.08)' },
    dividerText: { fontFamily: 'Inter_400Regular', color: '#4b5563', fontSize: 12, marginHorizontal: 12 },

    // Inputs
    field: { marginBottom: 14 },
    label: { fontFamily: 'Inter_500Medium', fontSize: 13, color: '#d1d5db', marginBottom: 7 },
    inputWrap: { position: 'relative', justifyContent: 'center' },
    input: {
        fontFamily: 'Inter_400Regular',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 14,
        color: '#ffffff',
    },
    inputIcon: { position: 'absolute', left: 14, zIndex: 1 },
    eyeBtn: { position: 'absolute', right: 14, zIndex: 1 },

    // Options row
    optionsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
    checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    checkbox: { width: 15, height: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', borderRadius: 4 },
    checkText: { fontFamily: 'Inter_400Regular', fontSize: 13, color: '#9ca3af' },
    forgotText: { fontFamily: 'Inter_500Medium', fontSize: 13, color: '#60a5fa' },

    // Submit
    submitBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 999, gap: 8 },
    submitBtnText: { fontFamily: 'Inter_600SemiBold', color: '#ffffff', fontSize: 15 },

    // Toggle
    toggleRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 18 },
    toggleText: { fontFamily: 'Inter_400Regular', fontSize: 13, color: '#6b7280' },
    toggleAction: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: '#60a5fa' },

    // Terms
    terms: { fontFamily: 'Inter_400Regular', textAlign: 'center', color: '#4b5563', fontSize: 11, marginTop: 14, lineHeight: 18 },
    termsLink: { color: '#60a5fa' },
});

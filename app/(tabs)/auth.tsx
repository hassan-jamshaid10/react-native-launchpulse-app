// Auth page — 'Evaluator Pro' redesign
import { trpc } from '@/utils/api';
import * as Google from 'expo-auth-session/providers/google';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import {
    Activity, // for analytics icon
    Apple,
    Lock,
    Mail,
    User,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useColorScheme,
} from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function AuthPage() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const loginMutation = (trpc as any).auth.login.useMutation();
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
        setLoading(true);
        try {
            const res = await loginMutation.mutateAsync({ email, password });
            const data = res?.json ?? res?.result?.data?.json ?? res;
            if (data?.token) {
                await SecureStore.setItemAsync('user-token', data.token);
                await SecureStore.setItemAsync('user-info', JSON.stringify(data.user ?? data));
                router.replace('/dashboard');
            } else { Alert.alert('Error', 'Invalid email or password'); }
        } catch (e: any) {
            Alert.alert('Error', e.message ?? 'Login failed');
        } finally { setLoading(false); }
    };

    // Colors matching the provided HTML config
    const colors = {
        background: isDark ? '#1a1d21' : '#f7f9fb', // surface
        headerBg: isDark ? '#0f172a' : '#ffffff',
        textPrimary: isDark ? '#ffffff' : '#110031',
        textSecondary: isDark ? '#9ca3af' : '#47464f', // on-surface-variant
        inputBg: isDark ? '#2d3133' : '#f2f4f6', // surface-container-low
        inputFocus: isDark ? '#3d4143' : '#ffffff', // surface-container-lowest
        border: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(200,197,208,0.3)', // outline-variant/30
        tint: '#732ee4',
        btnText: '#ffffff',
    };

    return (
        <View style={[styles.root, { backgroundColor: colors.background }]}>
            {/* Header matches Evaluator Pro design */}
            <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
                <View style={styles.headerLeft}>
                    <Activity color={colors.tint} size={24} />
                    <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Evaluator Pro</Text>
                </View>
                <View style={styles.avatarWrap}>
                    <User size={14} color="#47464f" />
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.kav}
            >
                <View style={styles.main}>
                    <View style={styles.titleWrap}>
                        <Text style={[styles.title, { color: colors.textPrimary }]}>Welcome Back</Text>
                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                            Please enter your clinical credentials to access your architecture dashboard.
                        </Text>
                    </View>

                    <View style={styles.formContainer}>
                        {/* Email Input */}
                        <View style={styles.field}>
                            <Text style={[styles.label, { color: colors.textPrimary }]}>WORK EMAIL</Text>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    style={[styles.input, { backgroundColor: colors.inputBg, color: colors.textPrimary }]}
                                    placeholder="name@company.com"
                                    placeholderTextColor="rgba(113,113,128,0.5)"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                <Mail size={20} color="rgba(113,113,128,0.4)" style={styles.inputIcon} />
                            </View>
                        </View>

                        {/* Password Input */}
                        <View style={styles.field}>
                            <Text style={[styles.label, { color: colors.textPrimary }]}>SECURITY KEY</Text>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    style={[styles.input, { backgroundColor: colors.inputBg, color: colors.textPrimary }]}
                                    placeholder="••••••••"
                                    placeholderTextColor="rgba(113,113,128,0.5)"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                />
                                <Lock size={20} color="rgba(113,113,128,0.4)" style={styles.inputIcon} />
                            </View>
                        </View>

                        {/* Forgot Credentials */}
                        <View style={styles.forgotWrap}>
                            <TouchableOpacity>
                                <Text style={[styles.forgotText, { color: colors.tint }]}>Forgot credentials?</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Primary Button */}
                        <TouchableOpacity onPress={handleSubmit} disabled={loading} activeOpacity={0.8}>
                            <LinearGradient
                                colors={['#732ee4', '#2d0069']}
                                style={styles.submitBtn}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.submitBtnText}>
                                    {loading ? 'Accessing...' : 'Login to Dashboard'}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Divider */}
                        <View style={styles.dividerWrap}>
                            <View style={[styles.divider, { backgroundColor: colors.border }]} />
                            <Text style={[styles.dividerText, { color: colors.textSecondary }]}>AUTHORIZED SSO</Text>
                            <View style={[styles.divider, { backgroundColor: colors.border }]} />
                        </View>

                        {/* SSO Buttons */}
                        <View style={styles.ssoGrid}>
                            <TouchableOpacity
                                style={[styles.ssoBtn, { backgroundColor: colors.headerBg, borderColor: colors.border }]}
                                onPress={() => promptAsync()}
                                disabled={loading || !request}
                            >
                                <Image 
                                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSlSWcKnCzudRyUBZAfo5Qt7nTR48zdK8NDd0RhnXMUjsef5ZzRkrhnJN1OADpxtB510pIG8GnwZgTrqu1NQbJbVHYYOgcKFQ9DuBsA63MPRlqErmgziaep2UJLGSm9DvXCozIohwGJm0NANTD-uOsIdpILCYcTwsbqeZoQkUA33ykijY8xa9E88P_NXsVybuPeTB8M7e_z3QvtVXnauzaihFcL7cBVDnMO-wDzFyruvy5hJ71b9yZlyHTSS0xp-UJOYuOHJLdKFM' }} 
                                    style={{ width: 20, height: 20, resizeMode: 'contain' }} 
                                />
                                <Text style={[styles.ssoBtnText, { color: colors.textPrimary }]}>Google</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.ssoBtn, { backgroundColor: colors.headerBg, borderColor: colors.border }]}>
                                <Apple size={20} color={colors.textPrimary} />
                                <Text style={[styles.ssoBtnText, { color: colors.textPrimary }]}>Apple</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Footer Links */}
                    <View style={styles.footerLinkWrap}>
                        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                            New to the platform?{' '}
                            <Text style={[styles.footerLink, { color: colors.tint }]}>Request Access</Text>
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
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
        backgroundColor: '#eceef0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    kav: {
        flex: 1,
    },
    main: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 48,
        paddingBottom: 96,
        alignItems: 'center',
        maxWidth: 448,
        alignSelf: 'center',
        width: '100%',
    },
    titleWrap: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontFamily: 'Inter_900Black',
        fontSize: 30,
        marginBottom: 8,
        letterSpacing: -0.6,
    },
    subtitle: {
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
    formContainer: {
        width: '100%',
    },
    field: {
        marginBottom: 16,
    },
    label: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
        marginBottom: 8,
        marginLeft: 4,
        letterSpacing: 0.5,
    },
    inputWrap: {
        position: 'relative',
        justifyContent: 'center',
    },
    input: {
        fontFamily: 'Inter_400Regular',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 16,
        paddingRight: 48,
        fontSize: 14,
    },
    inputIcon: {
        position: 'absolute',
        right: 16,
    },
    forgotWrap: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 24,
    },
    forgotText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
    },
    submitBtn: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 4,
    },
    submitBtnText: {
        fontFamily: 'Inter_700Bold',
        color: '#ffffff',
        fontSize: 14,
        letterSpacing: 0.5,
    },
    dividerWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
        gap: 16,
    },
    divider: {
        flex: 1,
        height: 1,
    },
    dividerText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        letterSpacing: 1,
    },
    ssoGrid: {
        flexDirection: 'row',
        gap: 16,
    },
    ssoBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        gap: 12,
    },
    ssoBtnText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
    },
    footerLinkWrap: {
        marginTop: 'auto',
        paddingTop: 48,
    },
    footerText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
    },
    footerLink: {
        fontFamily: 'Inter_700Bold',
    },
});


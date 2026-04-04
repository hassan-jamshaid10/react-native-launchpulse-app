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
    Sparkles
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View
} from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function AuthPage() {
    const router = useRouter();
    const { height } = useWindowDimensions();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    // tRPC Mutations
    const mobileGoogleLoginMutation = (trpc as any).auth.mobileGoogleLogin.useMutation();
    const loginMutation = (trpc as any).auth.login.useMutation();
    const registerMutation = (trpc as any).auth.register.useMutation();

    // Google Auth Request
    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
        androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            if (authentication?.idToken) {
                handleBackendSync(authentication.idToken);
            }
        }
    }, [response]);

    const handleBackendSync = async (idToken: string) => {
        setLoading(true);
        try {
            const responseData = await mobileGoogleLoginMutation.mutateAsync({ idToken });

            // Log for debug
            console.log("LOGIN RESPONSE: ", JSON.stringify(responseData));

            // Depending on TRPC/superjson version, it might be nested
            const data = responseData?.json || responseData?.result?.data?.json || responseData;

            if (data?.token) {
                await SecureStore.setItemAsync('user-token', data.token);
                if (data.user) {
                    await SecureStore.setItemAsync('user-info', JSON.stringify(data.user));
                }
                router.replace('/dashboard');
            } else {
                console.error("Token missing in response", data);
                Alert.alert("Debug Info", "Token not found! Response: " + JSON.stringify(data).substring(0, 100));
            }
        } catch (error: any) {
            console.error('Login Failed', error);
            Alert.alert('Login Failed', error.message || 'Could not verify with server.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        promptAsync();
    };

    const handleSubmit = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password.');
            return;
        }
        if (!isLogin && !name) {
            Alert.alert('Error', 'Please enter your name.');
            return;
        }

        setLoading(true);
        try {
            if (isLogin) {
                // Call TRPC Login
                const responseData = await loginMutation.mutateAsync({ email, password });
                const data = responseData?.json || responseData?.result?.data?.json || responseData;

                // Usually your Next.js auth returns the user, but we need the JWT token for mobile!
                if (data?.token) {
                    await SecureStore.setItemAsync('user-token', data.token);
                    await SecureStore.setItemAsync('user-info', JSON.stringify(data.user || data));
                    router.replace('/dashboard');
                } else if (data?.id || data?.email) {
                    Alert.alert('Backend Update Required', 'Login verified, but the server did not return a JWT token for mobile sessions! Please update your NextJS login trpc endpoint to return a JWT.');
                } else {
                    Alert.alert('Silent Fail Debug', `Payload returned: ${JSON.stringify(responseData).substring(0, 200)}`);
                }
            } else {
                // Call TRPC Register
                const responseData = await registerMutation.mutateAsync({ email, password, name });
                const data = responseData?.json || responseData?.result?.data?.json || responseData;

                if (data?.id || data?.email) {
                    Alert.alert('Success', 'Account created! You can now sign in.');
                    setIsLogin(true); // Switch user to the login tab
                } else {
                    Alert.alert('Silent Fail Debug', `Payload returned: ${JSON.stringify(responseData).substring(0, 200)}`);
                }
            }
        } catch (error: any) {
            console.error('Auth Failed', error);
            Alert.alert('Error', error.message || (isLogin ? 'Login Failed' : 'Registration Failed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient
            colors={['#111827', '#172554', '#2e1065']} // from-gray-900 via-blue-950 to-violet-950
            style={{ flex: 1 }}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={[styles.container, { minHeight: height }]}>
                        {/* Decoration Circles */}
                        <LinearGradient
                            colors={['rgba(59, 130, 246, 0.2)', 'rgba(59, 130, 246, 0.0)']}
                            style={[styles.floatingCircle, { top: 40, left: -40 }]}
                        />
                        <LinearGradient
                            colors={['rgba(139, 92, 246, 0.2)', 'rgba(139, 92, 246, 0.0)']}
                            style={[styles.floatingCircle, { bottom: 40, right: -40, width: 250, height: 250 }]}
                        />

                        <View style={styles.contentContainer}>
                            <Text style={styles.heading}>
                                Validate Your Ideas{'\n'}
                                <Text style={styles.headingGradient}>With AI Power</Text>
                            </Text>

                            {/* Form Container */}
                            <View style={styles.card}>
                                {/* Mobile Logo */}
                                <View style={styles.mobileLogoContainer}>
                                    <LinearGradient
                                        colors={['#111827', '#172554', '#2e1065']}
                                        style={styles.logoIconBg}
                                    >
                                        <Sparkles color="#fff" size={16} />
                                    </LinearGradient>
                                    <Text style={styles.brandName}>LaunchPulse</Text>
                                </View>

                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardTitle}>
                                        {isLogin ? 'Welcome Back' : 'Get Started'}
                                    </Text>
                                    <Text style={styles.cardSubtitle}>
                                        {isLogin ? 'Sign in to your account' : 'Create your account'}
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    style={styles.googleButton}
                                    onPress={() => handleGoogleSignIn()}
                                    disabled={loading || !request}
                                >
                                    <Chrome color="#374151" size={20} />
                                    <Text style={styles.googleButtonText}>Continue with Google</Text>
                                </TouchableOpacity>

                                <View style={styles.divider}>
                                    <View style={styles.dividerLine} />
                                    <Text style={styles.dividerText}>Or continue with email</Text>
                                    <View style={styles.dividerLine} />
                                </View>

                                {/* Name Input (Sign Up Only) */}
                                {!isLogin && (
                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>Full Name</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="John Doe"
                                            value={name}
                                            onChangeText={setName}
                                            placeholderTextColor="#9ca3af"
                                        />
                                    </View>
                                )}

                                {/* Email Input */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Email Address</Text>
                                    <View style={styles.inputWrapper}>
                                        <Mail size={18} color="#9ca3af" style={styles.inputIcon} />
                                        <TextInput
                                            style={[styles.input, { paddingLeft: 42 }]}
                                            placeholder="you@example.com"
                                            value={email}
                                            onChangeText={setEmail}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            placeholderTextColor="#9ca3af"
                                        />
                                    </View>
                                </View>

                                {/* Password Input */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Password</Text>
                                    <View style={styles.inputWrapper}>
                                        <Lock size={18} color="#9ca3af" style={styles.inputIcon} />
                                        <TextInput
                                            style={[styles.input, { paddingLeft: 42, paddingRight: 42 }]}
                                            placeholder="••••••••"
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry={!showPassword}
                                            placeholderTextColor="#9ca3af"
                                        />
                                        <TouchableOpacity
                                            onPress={() => setShowPassword(!showPassword)}
                                            style={styles.eyeIcon}
                                        >
                                            {showPassword ? (
                                                <EyeOff size={18} color="#9ca3af" />
                                            ) : (
                                                <Eye size={18} color="#9ca3af" />
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {isLogin && (
                                    <View style={styles.optionsRow}>
                                        <TouchableOpacity style={styles.checkboxContainer}>
                                            <View style={styles.checkbox} />
                                            <Text style={styles.rememberText}>Remember me</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Text style={styles.forgotText}>Forgot password?</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}

                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    disabled={loading}
                                    style={{ marginTop: 8 }}
                                >
                                    <LinearGradient
                                        colors={['#111827', '#172554', '#2e1065']}
                                        style={styles.submitButton}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        <Text style={styles.submitButtonText}>
                                            {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
                                        </Text>
                                        {!loading && <ArrowRight color="#fff" size={18} />}
                                    </LinearGradient>
                                </TouchableOpacity>

                                <View style={styles.switchRow}>
                                    <Text style={styles.switchText}>
                                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                                    </Text>
                                    <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                                        <Text style={styles.switchAction}>
                                            {isLogin ? 'Sign Up' : 'Sign In'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.termsText}>
                                    By continuing, you agree to our Terms of Service and Privacy Policy
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        marginBottom: 40,
    },
    floatingCircle: {
        position: 'absolute',
        width: 192,
        height: 192,
        borderRadius: 999,
        opacity: 0.8,
    },
    contentContainer: {
        width: '100%',
        maxWidth: 420,
        alignSelf: 'center',
        zIndex: 10,
    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 28,
        color: '#ffffff',
        lineHeight: 40,
    },
    headingGradient: {
        color: '#60a5fa', // blue-400 equivalent for plain text
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 28,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 8,
    },
    mobileLogoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        gap: 8,
    },
    logoIconBg: {
        width: 32,
        height: 32,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    brandName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
        letterSpacing: -0.5,
    },
    cardHeader: {
        marginBottom: 20,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },
    cardSubtitle: {
        color: '#4b5563',
        fontSize: 14,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#e5e7eb',
        borderRadius: 999,
        marginBottom: 20,
        gap: 8,
    },
    googleButtonText: {
        color: '#374151',
        fontWeight: '500',
        fontSize: 14,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e5e7eb',
    },
    dividerText: {
        marginHorizontal: 12,
        color: '#6b7280',
        fontSize: 13,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 6,
    },
    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 999,
        paddingVertical: 10,
        paddingHorizontal: 16,
        fontSize: 14,
        color: '#111827',
    },
    inputIcon: {
        position: 'absolute',
        left: 14,
        zIndex: 1,
    },
    eyeIcon: {
        position: 'absolute',
        right: 14,
        zIndex: 1,
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    checkbox: {
        width: 14,
        height: 14,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 3,
    },
    rememberText: {
        color: '#374151',
        fontSize: 13,
    },
    forgotText: {
        color: '#2563eb',
        fontWeight: '500',
        fontSize: 13,
    },
    submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 11,
        borderRadius: 999,
        gap: 8,
    },
    submitButtonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 14,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    switchText: {
        color: '#4b5563',
        fontSize: 13,
    },
    switchAction: {
        color: '#2563eb',
        fontWeight: '600',
        fontSize: 13,
    },
    termsText: {
        textAlign: 'center',
        color: '#6b7280',
        fontSize: 10,
        marginTop: 16,
        lineHeight: 16,
    },
});

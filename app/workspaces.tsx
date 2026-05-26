import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
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

export default function WorkspacesScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isTablet = width >= 768;

    const [newWorkspaceName, setNewWorkspaceName] = useState('');
    
    const { data: workspaces, isLoading } = trpc.workspace.getAll.useQuery(undefined, { refetchOnWindowFocus: false });

    // Mock mutation for creating workspace
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = () => {
        if (!newWorkspaceName.trim()) return;
        setIsCreating(true);
        setTimeout(() => {
            setIsCreating(false);
            router.push('/dashboard');
        }, 1000);
    };

    const selectWorkspace = (id: number) => {
        router.push('/dashboard');
    };

    if (isLoading) {
        return (
            <View style={s.loadingRoot}>
                <ActivityIndicator size="large" color={C.tint} />
            </View>
        );
    }

    return (
        <SafeAreaView style={s.root}>
            
            {/* TopAppBar */}
            <View style={s.header}>
                <View style={s.brandRow}>
                    <LinearGradient colors={[C.tint, C.tintEnd]} style={s.brandIconBox} start={{x:0, y:0}} end={{x:1, y:1}}>
                        <MaterialIcons name="token" size={20} color="#fff" />
                    </LinearGradient>
                    <View>
                        <Text style={s.brandTitle}>LaunchPulse</Text>
                        <Text style={s.brandSub}>STARTUP SUCCESS EVALUATOR</Text>
                    </View>
                </View>
                <View style={s.headerRight}>
                    {isTablet && (
                        <View style={s.navRow}>
                            <Text style={s.navLinkActive}>Workspaces</Text>
                            <Text style={s.navLink}>Support</Text>
                        </View>
                    )}
                    <View style={s.userAvatar}>
                        <Text style={s.userAvatarText}>U</Text>
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* Hero Branding */}
                <View style={s.heroBox}>
                    <Text style={s.heroTitle}>Welcome back to LaunchPulse</Text>
                    <Text style={s.heroSub}>
                        Select an existing evaluation environment or initialize a new workspace cluster.
                    </Text>
                </View>

                {/* Main Content Split */}
                <View style={[s.mainSplit, isTablet && s.mainSplitTablet]}>
                    
                    {/* Left: Active Workspaces */}
                    <View style={[s.leftCol, isTablet && { flex: 7 }]}>
                        <View style={s.sectionHeaderRow}>
                            <Text style={s.sectionEyebrow}>Active Workspaces</Text>
                            <View style={s.badgeBox}>
                                <Text style={s.badgeText}>{workspaces?.length || 0} Available</Text>
                            </View>
                        </View>

                        <View style={s.workspaceList}>
                            {workspaces && workspaces.length > 0 ? (
                                workspaces.map((ws) => (
                                    <TouchableOpacity 
                                        key={ws.id} 
                                        style={s.wsCard} 
                                        activeOpacity={0.7}
                                        onPress={() => selectWorkspace(ws.id)}
                                    >
                                        <View style={s.wsInfoRow}>
                                            <View style={s.wsAvatar}>
                                                <Text style={s.wsAvatarText}>{ws.name.substring(0, 2).toUpperCase()}</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={s.wsName}>{ws.name}</Text>
                                                <View style={s.wsMetaRow}>
                                                    <MaterialIcons name="group" size={14} color={C.onSurfaceVariant} />
                                                    <Text style={s.wsMetaText}>1 Member</Text>
                                                    <Text style={s.wsMetaDot}>•</Text>
                                                    <Text style={s.wsMetaText}>Active recently</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <MaterialIcons name="chevron-right" size={24} color={C.outline} />
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <View style={s.emptyBox}>
                                    <Text style={s.emptyText}>No active workspaces found. Create one to get started!</Text>
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Right: Create Workspace Form */}
                    <View style={[s.rightCol, isTablet && { flex: 5 }]}>
                        <View style={s.createCard}>
                            <View style={s.createIconBox}>
                                <MaterialIcons name="add-box" size={20} color="#fff" />
                            </View>
                            <Text style={s.createTitle}>Create Workspace</Text>
                            <Text style={s.createSub}>Establish a new isolated environment for your next startup venture.</Text>

                            <View style={s.formGroup}>
                                <Text style={s.inputLabel}>WORKSPACE NAME</Text>
                                <TextInput
                                    style={s.input}
                                    placeholder="e.g. Zenith Analytics"
                                    placeholderTextColor={'rgba(120,118,128,0.6)'}
                                    value={newWorkspaceName}
                                    onChangeText={setNewWorkspaceName}
                                />
                                
                                <TouchableOpacity 
                                    style={s.createBtn} 
                                    activeOpacity={0.8}
                                    onPress={handleCreate}
                                    disabled={isCreating || !newWorkspaceName.trim()}
                                >
                                    <LinearGradient colors={[C.tint, C.tintEnd]} style={StyleSheet.absoluteFill} start={{x:0,y:0}} end={{x:1,y:1}} borderRadius={8} />
                                    {isCreating ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <>
                                            <Text style={s.createBtnText}>Create Workspace</Text>
                                            <MaterialIcons name="arrow-forward" size={18} color="#fff" />
                                        </>
                                    )}
                                </TouchableOpacity>
                            </View>

                            <View style={s.termsBox}>
                                <Text style={s.termsText}>
                                    By creating a workspace, you agree to the <Text style={s.termsLink}>Terms of Service</Text> and <Text style={s.termsLink}>Privacy Policy</Text>.
                                </Text>
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    loadingRoot: { flex: 1, backgroundColor: C.surface, alignItems: 'center', justifyContent: 'center' },
    root: { flex: 1, backgroundColor: C.surface },
    
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16, backgroundColor: C.white, borderBottomWidth: 1, borderBottomColor: C.surfaceLow, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 2, elevation: 2, zIndex: 10 },
    brandRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    brandIconBox: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    brandTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 18, color: C.primary, letterSpacing: -0.5, lineHeight: 20 },
    brandSub: { fontFamily: 'Manrope_700Bold', fontSize: 9, color: C.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.8 },
    
    headerRight: { flexDirection: 'row', alignItems: 'center', gap: 24 },
    navRow: { flexDirection: 'row', alignItems: 'center', gap: 32 },
    navLinkActive: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: C.primary },
    navLink: { fontFamily: 'Manrope_600SemiBold', fontSize: 14, color: C.onSurfaceVariant },
    userAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: C.surfaceContainer, alignItems: 'center', justifyContent: 'center' },
    userAvatarText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 12, color: C.primary },

    scrollContent: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 60, maxWidth: 1200, width: '100%', alignSelf: 'center' },
    
    heroBox: { alignItems: 'center', marginBottom: 40 },
    heroTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 32, color: C.primary, letterSpacing: -0.5, textAlign: 'center', marginBottom: 12 },
    heroSub: { fontFamily: 'Manrope_500Medium', fontSize: 16, color: C.onSurfaceVariant, textAlign: 'center', maxWidth: 600 },

    mainSplit: { flexDirection: 'column', gap: 32 },
    mainSplitTablet: { flexDirection: 'row', alignItems: 'flex-start' },

    leftCol: { width: '100%' },
    sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingHorizontal: 8 },
    sectionEyebrow: { fontFamily: 'Manrope_800ExtraBold', fontSize: 12, color: C.secondary, textTransform: 'uppercase', letterSpacing: 1.5 },
    badgeBox: { backgroundColor: '#e6e8ea', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
    badgeText: { fontFamily: 'Manrope_700Bold', fontSize: 11, color: C.onSurfaceVariant },

    workspaceList: { gap: 16 },
    wsCard: { backgroundColor: C.white, padding: 24, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 1 },
    wsInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 20, flex: 1 },
    wsAvatar: { width: 56, height: 56, borderRadius: 12, backgroundColor: C.surfaceContainer, alignItems: 'center', justifyContent: 'center' },
    wsAvatarText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 20, color: C.primary },
    wsName: { fontFamily: 'Manrope_800ExtraBold', fontSize: 20, color: C.primary, marginBottom: 6 },
    wsMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    wsMetaText: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: C.onSurfaceVariant },
    wsMetaDot: { fontFamily: 'Manrope_500Medium', fontSize: 10, color: C.outline },
    
    emptyBox: { backgroundColor: C.white, padding: 32, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: C.surfaceLow },
    emptyText: { fontFamily: 'Manrope_600SemiBold', fontSize: 14, color: C.onSurfaceVariant },

    rightCol: { width: '100%' },
    createCard: { backgroundColor: C.white, padding: 32, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 24, elevation: 4 },
    createIconBox: { width: 40, height: 40, backgroundColor: '#2d0069', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
    createTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 24, color: C.primary, marginBottom: 8 },
    createSub: { fontFamily: 'Manrope_500Medium', fontSize: 14, color: C.onSurfaceVariant, marginBottom: 24 },
    
    formGroup: { gap: 8 },
    inputLabel: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.secondary, letterSpacing: 1.5, marginLeft: 4 },
    input: { backgroundColor: C.surfaceLow, padding: 16, borderRadius: 8, fontFamily: 'Manrope_500Medium', fontSize: 14, color: C.primary },
    
    createBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 8, marginTop: 8 },
    createBtnText: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: '#fff' },

    termsBox: { marginTop: 24, paddingTop: 24, borderTopWidth: 1, borderTopColor: C.surfaceContainer },
    termsText: { fontFamily: 'Manrope_500Medium', fontSize: 12, color: C.onSurfaceVariant, textAlign: 'center', lineHeight: 18 },
    termsLink: { fontFamily: 'Manrope_700Bold', color: C.tint },
});

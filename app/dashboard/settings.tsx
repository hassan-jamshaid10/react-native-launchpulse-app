import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    Camera, CheckCircle, ChevronRight, Lock, LogOut,
    Monitor, Bell, Shield, PersonStanding, CreditCard
} from 'lucide-react-native';
import { useState } from 'react';
import {
    ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,
    View, useWindowDimensions, Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/* ── Stitch Design System ── */
const C = {
    primary: '#110031',
    primaryContainer: '#2d0069',
    tint: '#732ee4',
    secondary: '#5b598c',
    onSurfaceVariant: '#47464f',
    surface: '#f7f9fb',
    surfaceLow: '#f2f4f6',
    surfaceContainer: '#eceef0',
    white: '#ffffff',
    outline: '#c8c5d0',
    green: '#10b981',
    error: '#ba1a1a',
    redBg: '#ffdad6',
};

const TABS = [
    { id: 'profile', label: 'Profile', icon: PersonStanding },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
];

export default function SettingsPage() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isTablet = width >= 768;

    const [activeTab, setActiveTab] = useState('profile');
    const [notifState, setNotifState] = useState({
        email: true, weekly: true, updates: false, complete: true
    });

    // Mock User Data
    const user = { name: 'Hassan Jamshaid', email: 'hassan@launchpulse.com', role: 'Member' };
    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    return (
        <SafeAreaView style={s.root} edges={['bottom']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
                
                {/* ── Header ── */}
                <View style={s.header}>
                    <Text style={s.pageTitle}>Account Settings</Text>
                    <Text style={s.pageSub}>Manage your data preferences, profile and security protocols.</Text>
                </View>

                {/* ── Tabs ── */}
                <View style={s.tabsRow}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 16 }}>
                        {TABS.map(tab => {
                            const active = activeTab === tab.id;
                            return (
                                <TouchableOpacity 
                                    key={tab.id} 
                                    onPress={() => setActiveTab(tab.id)}
                                    style={[s.tabBtn, active && s.tabBtnActive]}
                                >
                                    <tab.icon size={16} color={active ? C.tint : C.onSurfaceVariant} />
                                    <Text style={[s.tabText, active && s.tabTextActive]}>{tab.label}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* ── Tab Content: Profile ── */}
                {activeTab === 'profile' && (
                    <View style={isTablet ? s.rowContainer : null}>
                        {/* Identity Card */}
                        <View style={[s.card, s.identityCard, isTablet && { width: '35%', marginRight: 16 }]}>
                            <View style={s.avatarWrap}>
                                <LinearGradient colors={[C.tint, C.primaryContainer]} style={s.avatar} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                                    <Text style={s.avatarText}>{initials}</Text>
                                </LinearGradient>
                                <View style={s.cameraIcon}>
                                    <Camera size={14} color="#fff" />
                                </View>
                            </View>
                            <Text style={s.identityName}>{user.name}</Text>
                            <Text style={s.identityRole}>{user.role}</Text>
                            
                            <View style={s.identityStats}>
                                <View style={s.statRow}>
                                    <Text style={s.statLabel}>STATUS</Text>
                                    <Text style={s.statValActive}>Active</Text>
                                </View>
                                <View style={s.statRow}>
                                    <Text style={s.statLabel}>PLAN</Text>
                                    <Text style={s.statVal}>Pro</Text>
                                </View>
                            </View>
                        </View>

                        {/* Form */}
                        <View style={[s.card, isTablet && { flex: 1 }]}>
                            <Text style={s.cardSectionTitle}>PERSONAL INFORMATION</Text>
                            
                            <View style={s.inputGroup}>
                                <Text style={s.inputLabel}>FULL NAME</Text>
                                <TextInput style={s.input} value={user.name} />
                            </View>
                            <View style={s.inputGroup}>
                                <Text style={s.inputLabel}>EMAIL ADDRESS</Text>
                                <View style={s.inputWithIcon}>
                                    <TextInput style={[s.input, { flex: 1, borderWidth: 0 }]} value={user.email} editable={false} />
                                    <CheckCircle size={16} color={C.green} style={{ marginRight: 12 }} />
                                </View>
                            </View>
                            <View style={s.inputGroup}>
                                <Text style={s.inputLabel}>ROLE</Text>
                                <TextInput style={[s.input, { backgroundColor: C.surfaceContainer, color: C.onSurfaceVariant }]} value={user.role} editable={false} />
                            </View>
                        </View>
                    </View>
                )}

                {/* ── Tab Content: Notifications ── */}
                {activeTab === 'notifications' && (
                    <View style={s.card}>
                        <View style={s.cardHeaderRow}>
                            <Text style={s.cardSectionTitle}>NOTIFICATION PREFERENCES</Text>
                            <View style={s.activeBadge}><Text style={s.activeBadgeText}>ACTIVE</Text></View>
                        </View>

                        {[
                            { key: 'email', label: 'Email Notifications', desc: 'Receive platform updates via email' },
                            { key: 'weekly', label: 'Weekly Reports', desc: 'Summary of your activity every week' },
                            { key: 'updates', label: 'Product Updates', desc: 'New features and platform improvements' },
                            { key: 'complete', label: 'Evaluation Complete', desc: 'Notified when your report is ready' }
                        ].map((item, i) => (
                            <View key={item.key} style={s.toggleRow}>
                                <View style={{ flex: 1 }}>
                                    <Text style={s.toggleTitle}>{item.label}</Text>
                                    <Text style={s.toggleDesc}>{item.desc}</Text>
                                </View>
                                <Switch 
                                    value={notifState[item.key as keyof typeof notifState]} 
                                    onValueChange={(val) => setNotifState(prev => ({ ...prev, [item.key]: val }))} 
                                    trackColor={{ false: C.outline, true: C.tint }} 
                                    thumbColor={C.white}
                                />
                            </View>
                        ))}
                    </View>
                )}

                {/* ── Tab Content: Security ── */}
                {activeTab === 'security' && (
                    <View>
                        <View style={s.card}>
                            <View style={s.cardHeaderRow}>
                                <Text style={s.cardSectionTitle}>AUTHENTICATION</Text>
                                <View style={s.activeBadge}><Text style={s.activeBadgeText}>SECURE</Text></View>
                            </View>
                            <View style={s.actionRow}>
                                <View style={s.actionIconBox}><Lock size={20} color={C.primary} /></View>
                                <View style={{ flex: 1 }}>
                                    <Text style={s.actionTitle}>Change Password</Text>
                                    <Text style={s.actionSub}>Last updated 14 days ago</Text>
                                </View>
                                <TouchableOpacity style={s.btnSmall}><Text style={s.btnSmallText}>Update</Text></TouchableOpacity>
                            </View>
                            <View style={s.actionRow}>
                                <View style={s.actionIconBox}><Shield size={20} color={C.primary} /></View>
                                <View style={{ flex: 1 }}>
                                    <Text style={s.actionTitle}>Two-Factor Auth</Text>
                                    <Text style={s.actionSub}>Mobile app and SMS verification</Text>
                                </View>
                                <Switch value={true} trackColor={{ true: C.tint }} thumbColor={C.white} />
                            </View>
                        </View>

                        <View style={s.card}>
                            <Text style={s.cardSectionTitle}>ACTIVE SESSIONS</Text>
                            <View style={s.actionRow}>
                                <View style={s.actionIconBox}><Monitor size={20} color={C.onSurfaceVariant} /></View>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                        <Text style={s.actionTitle}>iPhone 14 Pro Max</Text>
                                        <View style={s.currentBadge}><Text style={s.currentBadgeText}>CURRENT</Text></View>
                                    </View>
                                    <Text style={s.actionSub}>Lahore, Pakistan · Active now</Text>
                                </View>
                            </View>
                        </View>
                        
                        <View style={[s.card, { borderColor: C.redBg, borderWidth: 2 }]}>
                            <Text style={[s.cardSectionTitle, { color: C.error }]}>DANGER ZONE</Text>
                            <TouchableOpacity style={s.dangerBtn}>
                                <View>
                                    <Text style={s.dangerTitle}>Sign Out All Devices</Text>
                                    <Text style={s.dangerDesc}>End all active sessions immediately</Text>
                                </View>
                                <LogOut size={20} color={C.outline} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* ── Tab Content: Billing ── */}
                {activeTab === 'billing' && (
                    <View>
                        <View style={s.card}>
                            <Text style={s.cardSectionTitle}>CURRENT PLAN</Text>
                            <LinearGradient colors={[C.tint, C.primaryContainer]} style={s.planCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                                <View>
                                    <Text style={s.planLabel}>ACTIVE PLAN</Text>
                                    <Text style={s.planTitle}>Pro Plan</Text>
                                    <Text style={s.planSub}>$49 / month · Renews June 1, 2026</Text>
                                </View>
                                <TouchableOpacity style={s.planBtn}><Text style={s.planBtnText}>Manage</Text></TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </View>
                )}

            </ScrollView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: C.surface },
    scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },

    header: { marginBottom: 24 },
    pageTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 28, color: C.primary, letterSpacing: -0.5 },
    pageSub: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: C.onSurfaceVariant, marginTop: 4 },

    tabsRow: { borderBottomWidth: 1, borderBottomColor: 'rgba(200,197,208,0.2)', marginBottom: 24 },
    tabBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20 },
    tabBtnActive: { backgroundColor: 'rgba(115,46,228,0.08)' },
    tabText: { fontFamily: 'Manrope_700Bold', fontSize: 13, color: C.onSurfaceVariant },
    tabTextActive: { color: C.tint },

    rowContainer: { flexDirection: 'row', alignItems: 'flex-start' },

    card: {
        backgroundColor: C.white, borderRadius: 16, padding: 20, marginBottom: 20,
        shadowColor: '#191c1e', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.04, shadowRadius: 16, elevation: 2,
    },
    
    identityCard: { alignItems: 'center' },
    avatarWrap: { position: 'relative', marginBottom: 16 },
    avatar: { width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#fff' },
    avatarText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 28, color: '#fff' },
    cameraIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: C.primary, width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' },
    identityName: { fontFamily: 'Manrope_700Bold', fontSize: 18, color: C.primary, marginBottom: 2 },
    identityRole: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: C.onSurfaceVariant, marginBottom: 24 },
    identityStats: { width: '100%', borderTopWidth: 1, borderTopColor: C.surfaceLow, paddingTop: 16, gap: 12 },
    statRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    statLabel: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.onSurfaceVariant, letterSpacing: 1 },
    statVal: { fontFamily: 'Manrope_700Bold', fontSize: 12, color: C.primary },
    statValActive: { fontFamily: 'Manrope_700Bold', fontSize: 12, color: C.tint },

    cardSectionTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.primary, letterSpacing: 1, marginBottom: 20 },
    cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    activeBadge: { backgroundColor: 'rgba(115,46,228,0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
    activeBadgeText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, color: C.tint, letterSpacing: 0.5 },

    inputGroup: { marginBottom: 16 },
    inputLabel: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.onSurfaceVariant, letterSpacing: 1, marginBottom: 6 },
    input: { backgroundColor: C.surfaceLow, borderRadius: 10, paddingHorizontal: 16, height: 48, fontFamily: 'Manrope_600SemiBold', fontSize: 13, color: C.primary },
    inputWithIcon: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.surfaceLow, borderRadius: 10 },

    toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.surfaceLow },
    toggleTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, color: C.primary, marginBottom: 2 },
    toggleDesc: { fontFamily: 'Manrope_500Medium', fontSize: 11, color: C.onSurfaceVariant },

    actionRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, backgroundColor: C.surfaceLow, borderRadius: 12, paddingHorizontal: 16, marginBottom: 12 },
    actionIconBox: { width: 40, height: 40, borderRadius: 10, backgroundColor: C.surfaceContainer, alignItems: 'center', justifyContent: 'center' },
    actionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, color: C.primary, marginBottom: 2 },
    actionSub: { fontFamily: 'Manrope_500Medium', fontSize: 11, color: C.onSurfaceVariant },
    btnSmall: { backgroundColor: C.surfaceContainer, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
    btnSmallText: { fontFamily: 'Manrope_700Bold', fontSize: 11, color: C.primary },
    
    currentBadge: { backgroundColor: 'rgba(16,185,129,0.1)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
    currentBadgeText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, color: C.green },

    dangerBtn: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
    dangerTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, color: C.primary, marginBottom: 2 },
    dangerDesc: { fontFamily: 'Manrope_500Medium', fontSize: 11, color: C.onSurfaceVariant },

    planCard: { padding: 20, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    planLabel: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: 'rgba(255,255,255,0.7)', letterSpacing: 1, marginBottom: 4 },
    planTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 24, color: '#fff', marginBottom: 4 },
    planSub: { fontFamily: 'Manrope_500Medium', fontSize: 12, color: 'rgba(255,255,255,0.8)' },
    planBtn: { backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
    planBtnText: { fontFamily: 'Manrope_700Bold', fontSize: 12, color: C.primary },
});

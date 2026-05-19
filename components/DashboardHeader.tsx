import { LinearGradient } from 'expo-linear-gradient';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Bell, Menu, Zap } from 'lucide-react-native';
import { useState } from 'react';
import {
    Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity,
    TouchableWithoutFeedback, View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/* ── Stitch Design System ── */
const C = {
    primary: '#110031',
    tint: '#732ee4',
    tintEnd: '#2d0069',
    secondary: '#5b598c',
    onSurfaceVariant: '#47464f',
    surfaceLow: '#f2f4f6',
    surfaceContainer: '#eceef0',
    white: '#ffffff',
    outline: '#c8c5d0',
    muted: '#787680',
};

interface Props {
    user?: { name?: string | null; email?: string | null; role?: string | null };
}

export default function DashboardHeader({ user = { name: 'User', email: 'user@example.com', role: 'Member' } }: Props) {
    const navigation = useNavigation();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [notifOpen, setNotifOpen] = useState(false);

    const notifications = [
        { id: 1, title: 'New Prediction Ready', msg: 'Your startup analysis is complete', time: '5m ago', unread: true },
        { id: 2, title: 'Document Uploaded', msg: 'Pitch deck successfully processed', time: '1h ago', unread: true },
        { id: 3, title: 'Market Trend Alert', msg: 'New opportunity in your industry', time: '3h ago', unread: false },
    ];
    const unread = notifications.filter(n => n.unread).length;



    const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());

    return (
        <View style={[s.header, { paddingTop: insets.top }]}>
            <View style={s.content}>
                {/* Left — brand */}
                <View style={s.left}>
                    <View style={s.brand}>
                        <LinearGradient colors={[C.tint, C.tintEnd]} style={s.brandIcon} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                            <MaterialIcons name="token" size={16} color="#fff" />
                        </LinearGradient>
                        <Text style={s.brandName}>LaunchPulse</Text>
                    </View>
                </View>

                {/* Right — notif, menu */}
                <View style={s.right}>
                    {/* Notifications */}
                    <TouchableOpacity onPress={() => setNotifOpen(true)} style={s.iconBtn} activeOpacity={0.7}>
                        <Bell size={22} color={C.onSurfaceVariant} />
                        {unread > 0 && (
                            <View style={s.badge}>
                                <Text style={s.badgeText}>{unread}</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <View style={s.divider} />

                    <TouchableOpacity onPress={toggleDrawer} style={s.menuBtn} activeOpacity={0.7}>
                        <Menu size={22} color={C.onSurfaceVariant} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* ── Notification Modal ── */}
            <Modal visible={notifOpen} transparent animationType="fade" onRequestClose={() => setNotifOpen(false)}>
                <TouchableWithoutFeedback onPress={() => setNotifOpen(false)}>
                    <View style={s.overlay}>
                        <TouchableWithoutFeedback>
                            <View style={[s.dropdown, s.notifDrop]}>
                                <View style={s.dropHeader}>
                                    <Text style={s.dropTitle}>Notifications</Text>
                                    <View style={s.newBadge}>
                                        <Text style={s.newBadgeText}>{unread} new</Text>
                                    </View>
                                </View>
                                <ScrollView style={{ maxHeight: 300 }}>
                                    {notifications.map(n => (
                                        <View key={n.id} style={[s.notifItem, n.unread && { backgroundColor: 'rgba(242,244,246,0.5)' }]}>
                                            <View style={[s.notifIcon, { backgroundColor: n.unread ? C.tint : C.surfaceContainer }]}>
                                                <Zap size={14} color={n.unread ? '#fff' : C.muted} />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={s.notifTitle}>{n.title}</Text>
                                                <Text style={s.notifMsg}>{n.msg}</Text>
                                                <Text style={s.notifTime}>{n.time}</Text>
                                            </View>
                                            {n.unread && <View style={s.unreadDot} />}
                                        </View>
                                    ))}
                                </ScrollView>
                                <TouchableOpacity style={s.viewAll}>
                                    <Text style={s.viewAllText}>View all notifications →</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>


        </View>
    );
}

const s = StyleSheet.create({
    header: {
        backgroundColor: C.white,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.04)',
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 2, elevation: 2,
        zIndex: 50,
    },
    content: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, height: 56,
    },
    left: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    menuBtn: { padding: 8, borderRadius: 8 },
    brand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    brandIcon: { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    brandName: { fontFamily: 'Manrope_800ExtraBold', fontSize: 15, color: C.primary, letterSpacing: -0.3 },

    right: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    createBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 8, gap: 4 },
    iconBtn: { padding: 8, position: 'relative' },
    badge: {
        position: 'absolute', top: 2, right: 2,
        width: 18, height: 18, borderRadius: 9,
        backgroundColor: C.tint, alignItems: 'center', justifyContent: 'center',
        borderWidth: 2, borderColor: C.white,
    },
    badgeText: { fontFamily: 'Manrope_700Bold', color: '#fff', fontSize: 9 },
    divider: { width: 1, height: 28, backgroundColor: 'rgba(200,197,208,0.2)' },
    userBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    avatar: {
        width: 34, height: 34, borderRadius: 17,
        backgroundColor: C.surfaceContainer,
        alignItems: 'center', justifyContent: 'center',
        borderWidth: 2, borderColor: C.white,
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 2,
    },
    avatarText: { fontFamily: 'Manrope_800ExtraBold', color: C.primary, fontSize: 11 },

    overlay: {
        flex: 1, backgroundColor: 'rgba(0,0,0,0.25)',
        justifyContent: 'flex-start', alignItems: 'flex-end',
        paddingTop: Platform.OS === 'ios' ? 100 : 80, paddingRight: 16,
    },
    dropdown: {
        backgroundColor: C.white, borderRadius: 16,
        shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 24, elevation: 10,
        borderWidth: 1, borderColor: 'rgba(200,197,208,0.2)', overflow: 'hidden',
    },
    notifDrop: { width: 320 },
    dropHeader: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, paddingVertical: 12,
        borderBottomWidth: 1, borderBottomColor: C.surfaceLow,
    },
    dropTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: C.primary },
    dropSectionLabel: { fontFamily: 'Manrope_700Bold', fontSize: 10, color: C.muted, letterSpacing: 1.5, textTransform: 'uppercase' },
    newBadge: { backgroundColor: C.surfaceLow, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
    newBadgeText: { fontFamily: 'Manrope_700Bold', fontSize: 11, color: C.secondary },

    notifItem: {
        flexDirection: 'row', alignItems: 'flex-start', gap: 12,
        paddingHorizontal: 16, paddingVertical: 14,
        borderBottomWidth: 1, borderBottomColor: C.surfaceLow,
    },
    notifIcon: { width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
    notifTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, color: C.primary },
    notifMsg: { fontFamily: 'Manrope_400Regular', fontSize: 12, color: C.onSurfaceVariant, marginTop: 2 },
    notifTime: { fontFamily: 'Manrope_400Regular', fontSize: 11, color: C.muted, marginTop: 4 },
    unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.tint, marginTop: 8 },
    viewAll: { paddingVertical: 12, alignItems: 'center', backgroundColor: C.surfaceLow },
    viewAllText: { fontFamily: 'Manrope_700Bold', fontSize: 12, color: C.tint },

    createItem: { paddingHorizontal: 16, paddingVertical: 12 },
    createItemText: { fontFamily: 'Manrope_600SemiBold', fontSize: 14, color: C.primary },

    userHeader: {
        flexDirection: 'row', alignItems: 'center', gap: 12,
        padding: 16, borderBottomWidth: 1, borderBottomColor: C.surfaceLow,
    },
    userAvatar: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    userAvatarText: { fontFamily: 'Manrope_700Bold', color: '#fff', fontSize: 14 },
    userName: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: C.primary },
    userEmail: { fontFamily: 'Manrope_400Regular', fontSize: 12, color: C.muted, marginTop: 2 },
    userMenuItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 12 },
    userMenuText: { fontFamily: 'Manrope_500Medium', fontSize: 14, color: C.onSurfaceVariant },
    userMenuDivider: { height: 1, backgroundColor: C.surfaceLow },
});

import { trpc } from '@/utils/api';

import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { 
    Clock, Folder, Globe, Mail, MessageSquare, MoreVertical, 
    PieChart, Send, Trash, UserPlus, Users, FileText, CloudUpload 
} from 'lucide-react-native';
import { useState } from 'react';
import {
    ActivityIndicator, Modal, ScrollView, StyleSheet, Text,
    TextInput, TouchableOpacity, TouchableWithoutFeedback, View,
    useWindowDimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/* ── Stitch Colors ── */
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
    error: '#ba1a1a',
    errorBg: '#ffdad6',
};

const ROLE_META: Record<string, { label: string; access: string }> = {
    admin: { label: 'Admin', access: 'Full Access' },
    member: { label: 'Member', access: 'Workspace Only' },
    viewer: { label: 'Viewer', access: 'Read Only' },
    owner: { label: 'Owner', access: 'Owner' },
};

function getInitials(name: string | null | undefined, email: string) {
    if (name) return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    return email.slice(0, 2).toUpperCase();
}

export default function TeamPage() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isTablet = width >= 768;
    const activeWorkspace = { id: 1, name: 'Default Workspace' };
    const trpcUtils = trpc.useUtils();

    const [inviteOpen, setInviteOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('member');

    const [chatMsg, setChatMsg] = useState('');

    const teamQuery = trpc.team.getTeamByWorkspace.useQuery(
        { workspaceId: activeWorkspace?.id ?? 0 },
        { enabled: !!activeWorkspace }
    );
    const activeTeam = teamQuery.data;

    const membersQuery = trpc.team.getMembers.useQuery(
        { teamId: activeTeam?.id ?? 0 },
        { enabled: !!activeTeam }
    );
    const invitesQuery = trpc.team.getInvites.useQuery(
        { teamId: activeTeam?.id ?? 0 },
        { enabled: !!activeTeam }
    );

    const members = membersQuery.data ?? [];
    const invites = invitesQuery.data ?? [];
    const canManage = activeTeam?.role === 'owner' || activeTeam?.role === 'admin';

    const createTeam = trpc.team.createTeam.useMutation({
        onSuccess: () => teamQuery.refetch()
    });
    
    const inviteMutation = trpc.team.inviteMember.useMutation({
        onSuccess: () => {
            setInviteOpen(false);
            setInviteEmail('');
            trpcUtils.team.getInvites.invalidate();
        }
    });

    const revokeMutation = trpc.team.revokeInvite.useMutation({
        onSuccess: () => trpcUtils.team.getInvites.invalidate()
    });

    const removeMutation = trpc.team.removeMember.useMutation({
        onSuccess: () => trpcUtils.team.getMembers.invalidate()
    });

    if (!activeWorkspace || teamQuery.isLoading) {
        return (
            <SafeAreaView style={s.root} edges={['bottom']}>
                <View style={s.loadingBox}>
                    <ActivityIndicator size="large" color={C.tint} />
                </View>
            </SafeAreaView>
        );
    }

    if (!activeTeam) {
        return (
            <SafeAreaView style={s.root} edges={['bottom']}>
                <View style={s.centerBox}>
                    <View style={s.iconBadge}>
                        <LinearGradient colors={[C.tint, C.primaryContainer]} style={s.iconGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                            <Users size={28} color="#fff" />
                        </LinearGradient>
                    </View>
                    <Text style={s.pageTitle}>Create your Team</Text>
                    <Text style={[s.pageSub, { textAlign: 'center', marginBottom: 24 }]}>
                        Form a team in this workspace to collaborate with your analysts and manage startup evaluations together.
                    </Text>
                    <TouchableOpacity 
                        style={s.btnPrimary} 
                        onPress={() => createTeam.mutate({ name: 'Default Team', workspaceId: activeWorkspace.id })}
                        disabled={createTeam.isPending}
                    >
                        <LinearGradient colors={[C.tint, C.primaryContainer]} style={s.btnGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                            <Text style={s.btnText}>{createTeam.isPending ? 'Creating...' : 'Create Team'}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={s.root} edges={['bottom']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

                {/* ── Header ── */}
                <View style={s.header}>
                    <View style={{ flex: 1 }}>
                        <Text style={s.pageTitle}>Team & Collaboration</Text>
                        <Text style={s.pageSub}>Manage permissions and monitor shared analyst workflows.</Text>
                    </View>
                    {canManage && (
                        <TouchableOpacity style={s.btnPrimary} onPress={() => setInviteOpen(true)}>
                            <LinearGradient colors={[C.tint, C.primaryContainer]} style={s.btnGradSm} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                                <UserPlus size={16} color="#fff" />
                                <Text style={s.btnText}>Invite</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={isTablet ? s.rowContainer : null}>
                    
                    {/* ── Left Column ── */}
                    <View style={isTablet ? { flex: 2, marginRight: 16 } : null}>
                        
                        {/* Members Card */}
                        <View style={s.card}>
                            <View style={s.cardHeader}>
                                <Text style={s.cardTitle}>Current Members</Text>
                                <View style={s.countBadge}>
                                    <Text style={s.countText}>{members.length} ACTIVE</Text>
                                </View>
                            </View>

                            {membersQuery.isLoading ? (
                                <ActivityIndicator size="small" color={C.tint} style={{ padding: 20 }} />
                            ) : members.length === 0 ? (
                                <Text style={s.emptyText}>No members yet.</Text>
                            ) : (
                                members.map(m => (
                                    <View key={m.id} style={s.memberRow}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, gap: 12 }}>
                                            <LinearGradient colors={[C.tint, C.primaryContainer]} style={s.avatar} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                                                <Text style={s.avatarText}>{getInitials(m.name, m.email)}</Text>
                                            </LinearGradient>
                                            <View>
                                                <Text style={s.memberName}>{m.name ?? m.email.split('@')[0]}</Text>
                                                <Text style={s.memberEmail}>{m.email}</Text>
                                            </View>
                                        </View>
                                        <View style={{ alignItems: 'flex-end', gap: 2, marginRight: 12 }}>
                                            <Text style={s.memberRole}>{ROLE_META[m.role]?.label || m.role}</Text>
                                            <Text style={s.memberAccess}>{ROLE_META[m.role]?.access || 'Access'}</Text>
                                        </View>
                                        {canManage && m.role !== 'owner' && (
                                            <TouchableOpacity onPress={() => removeMutation.mutate({ teamId: activeTeam.id, userId: m.userId })} style={s.iconBtn}>
                                                <Trash size={16} color={C.onSurfaceVariant} />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                ))
                            )}

                            {invites.length > 0 && (
                                <View style={s.invitesSection}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                                        <Clock size={12} color={C.onSurfaceVariant} />
                                        <Text style={s.sectionSubTitle}>PENDING INVITATIONS ({invites.length})</Text>
                                    </View>
                                    {invites.map(inv => (
                                        <View key={inv.id} style={s.inviteRow}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, gap: 12 }}>
                                                <View style={s.inviteIcon}><Mail size={14} color={C.onSurfaceVariant} /></View>
                                                <View>
                                                    <Text style={s.inviteEmail}>{inv.email}</Text>
                                                    <Text style={s.inviteRole}>{inv.role} · Expires {new Date(inv.expires_at).toLocaleDateString()}</Text>
                                                </View>
                                            </View>
                                            {canManage && (
                                                <TouchableOpacity onPress={() => revokeMutation.mutate({ teamId: activeTeam.id, inviteId: inv.id })} style={s.revokeBtn}>
                                                    <Text style={s.revokeText}>Revoke</Text>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>

                        {/* Shared Workspace */}
                        <View style={s.card}>
                            <Text style={s.cardTitle}>Shared Workspace</Text>
                            <View style={s.folderGrid}>
                                {[
                                    { title: 'Series-A Pipeline', sub: '12 Active Evaluations', icon: Folder, col: C.tint },
                                    { title: 'Market Benchmarks', sub: 'Updated 2h ago', icon: PieChart, col: C.secondary },
                                    { title: 'Legal Due Diligence', sub: 'Requires Review', icon: FileText, col: C.error },
                                    { title: 'Pitch Decks', sub: '85 Documents', icon: CloudUpload, col: C.primaryContainer },
                                ].map((f, i) => (
                                    <View key={i} style={[s.folderCard, isTablet && { width: '48%' }]}>
                                        <f.icon size={24} color={f.col} style={{ marginBottom: 12 }} />
                                        <Text style={s.folderTitle}>{f.title}</Text>
                                        <Text style={s.folderSub}>{f.sub}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>

                    {/* ── Right Column ── */}
                    <View style={isTablet ? { flex: 1 } : null}>
                        
                        {/* Team Discussion */}
                        <View style={[s.card, { padding: 0, height: 380, overflow: 'hidden' }]}>
                            <View style={s.chatHeader}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                    <View style={s.onlineDot} />
                                    <Text style={s.chatTitle}>Team Discussion</Text>
                                </View>
                            </View>
                            <ScrollView style={s.chatArea} contentContainerStyle={{ padding: 16 }}>
                                <View style={s.msgWrapLeft}>
                                    <View style={s.msgHeader}><Text style={s.msgName}>Sarah Jenkins</Text><Text style={s.msgTime}>10:24 AM</Text></View>
                                    <View style={s.msgBubbleLeft}><Text style={s.msgTextLeft}>Has anyone finalized the revenue projection for the SaaS platform eval?</Text></View>
                                </View>
                                
                                <View style={s.msgWrapRight}>
                                    <View style={[s.msgHeader, { justifyContent: 'flex-end' }]}><Text style={s.msgTime}>10:28 AM</Text><Text style={[s.msgName, { color: C.tint }]}>You</Text></View>
                                    <View style={s.msgBubbleRight}><Text style={s.msgTextRight}>Almost done. Just verifying the churn rate benchmarks against the industry average.</Text></View>
                                </View>

                                <View style={s.msgWrapLeft}>
                                    <View style={s.msgHeader}><Text style={s.msgName}>Alex Thorne</Text><Text style={s.msgTime}>10:30 AM</Text></View>
                                    <View style={s.msgBubbleLeft}><Text style={s.msgTextLeft}>Good. Let's touch base at 2 PM. I've uploaded the competitor analysis.</Text></View>
                                </View>
                            </ScrollView>
                            <View style={s.chatInputWrap}>
                                <TextInput 
                                    style={s.chatInput} 
                                    placeholder="Type a message..." 
                                    value={chatMsg} 
                                    onChangeText={setChatMsg} 
                                />
                                <TouchableOpacity style={s.sendBtn}><Send size={16} color={C.tint} /></TouchableOpacity>
                            </View>
                        </View>

                        {/* Recent Activity */}
                        <View style={s.card}>
                            <Text style={s.sectionSubTitle}>RECENT ACTIVITY</Text>
                            <View style={{ marginTop: 16, gap: 16 }}>
                                {[
                                    { dot: C.tint, name: 'Sarah', text: 'updated the "FinTech Alpha" evaluation.', time: '12 minutes ago' },
                                    { dot: C.secondary, name: 'Alex', text: 'left a comment on "Market Benchmarks".', time: '1 hour ago' },
                                    { dot: C.primaryContainer, name: 'You', text: 'invited a new collaborator to the team.', time: 'Today' },
                                ].map((act, i) => (
                                    <View key={i} style={{ flexDirection: 'row', gap: 12 }}>
                                        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: act.dot, marginTop: 4 }} />
                                        <View style={{ flex: 1 }}>
                                            <Text style={s.actText}><Text style={{ fontFamily: 'Manrope_700Bold' }}>{act.name}</Text> {act.text}</Text>
                                            <Text style={s.actTime}>{act.time}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>

                    </View>
                </View>

            </ScrollView>

            {/* Invite Modal */}
            <Modal visible={inviteOpen} transparent animationType="fade" onRequestClose={() => setInviteOpen(false)}>
                <TouchableWithoutFeedback onPress={() => setInviteOpen(false)}>
                    <View style={s.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={s.modalBox}>
                                <View style={s.modalHeader}>
                                    <Text style={s.modalTitle}>Invite Member</Text>
                                </View>
                                <View style={s.modalBody}>
                                    <Text style={s.inputLabel}>EMAIL ADDRESS</Text>
                                    <TextInput 
                                        style={s.input} 
                                        placeholder="colleague@company.com" 
                                        value={inviteEmail} 
                                        onChangeText={setInviteEmail} 
                                        autoCapitalize="none"
                                    />
                                    
                                    <Text style={[s.inputLabel, { marginTop: 20 }]}>ROLE</Text>
                                    {['admin', 'member', 'viewer'].map(r => (
                                        <TouchableOpacity 
                                            key={r} 
                                            style={[s.roleOption, inviteRole === r && s.roleOptionActive]} 
                                            onPress={() => setInviteRole(r)}
                                        >
                                            <View style={[s.radio, inviteRole === r && s.radioActive]}>
                                                {inviteRole === r && <View style={s.radioInner} />}
                                            </View>
                                            <View>
                                                <Text style={s.roleName}>{ROLE_META[r].label}</Text>
                                                <Text style={s.roleAccess}>{ROLE_META[r].access}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <View style={s.modalFooter}>
                                    <TouchableOpacity style={s.modalBtnCancel} onPress={() => setInviteOpen(false)}>
                                        <Text style={s.modalBtnCancelText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={[s.modalBtnSubmit, !inviteEmail && { opacity: 0.5 }]} 
                                        disabled={!inviteEmail || inviteMutation.isPending}
                                        onPress={() => inviteMutation.mutate({ teamId: activeTeam.id, email: inviteEmail, role: inviteRole as any })}
                                    >
                                        <Text style={s.modalBtnSubmitText}>{inviteMutation.isPending ? 'Sending...' : 'Send Invite'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: C.surface },
    scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
    loadingBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    centerBox: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },

    iconBadge: { marginBottom: 24, borderRadius: 20, overflow: 'hidden' },
    iconGrad: { width: 64, height: 64, alignItems: 'center', justifyContent: 'center' },
    
    header: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 },
    pageTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 28, color: C.primary, letterSpacing: -0.5 },
    pageSub: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: C.onSurfaceVariant, marginTop: 4 },

    btnPrimary: { overflow: 'hidden', borderRadius: 10 },
    btnGrad: { paddingHorizontal: 24, paddingVertical: 14 },
    btnGradSm: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingVertical: 10 },
    btnText: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: '#fff' },

    rowContainer: { flexDirection: 'row', alignItems: 'flex-start' },

    card: {
        backgroundColor: C.white, borderRadius: 16, padding: 20, marginBottom: 20,
        shadowColor: '#191c1e', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.04, shadowRadius: 16, elevation: 2,
    },
    cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
    cardTitle: { fontFamily: 'Manrope_700Bold', fontSize: 18, color: C.primary },
    countBadge: { backgroundColor: C.surfaceContainer, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
    countText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, color: C.secondary, letterSpacing: 1 },

    memberRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.surfaceLow },
    avatar: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    avatarText: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: '#fff' },
    memberName: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: C.primary, marginBottom: 2 },
    memberEmail: { fontFamily: 'Manrope_500Medium', fontSize: 12, color: C.onSurfaceVariant },
    memberRole: { fontFamily: 'Manrope_700Bold', fontSize: 12, color: C.primary },
    memberAccess: { fontFamily: 'Manrope_800ExtraBold', fontSize: 9, color: C.onSurfaceVariant, letterSpacing: 0.5, textTransform: 'uppercase' },
    iconBtn: { padding: 6, backgroundColor: C.surfaceLow, borderRadius: 8 },

    invitesSection: { marginTop: 24, paddingTop: 20, borderTopWidth: 1, borderTopColor: C.surfaceLow },
    sectionSubTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.onSurfaceVariant, letterSpacing: 1 },
    inviteRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.surfaceLow, padding: 12, borderRadius: 12, marginBottom: 8 },
    inviteIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: C.surfaceContainer, alignItems: 'center', justifyContent: 'center' },
    inviteEmail: { fontFamily: 'Manrope_700Bold', fontSize: 13, color: C.primary, marginBottom: 2 },
    inviteRole: { fontFamily: 'Manrope_500Medium', fontSize: 11, color: C.onSurfaceVariant, textTransform: 'capitalize' },
    revokeBtn: { backgroundColor: C.errorBg, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
    revokeText: { fontFamily: 'Manrope_700Bold', fontSize: 10, color: C.error },

    emptyText: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: C.onSurfaceVariant, textAlign: 'center', paddingVertical: 20 },

    folderGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 16 },
    folderCard: { width: '100%', backgroundColor: C.surfaceLow, padding: 16, borderRadius: 12 },
    folderTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: C.primary, marginBottom: 4 },
    folderSub: { fontFamily: 'Manrope_500Medium', fontSize: 11, color: C.onSurfaceVariant },

    chatHeader: { padding: 16, borderBottomWidth: 1, borderBottomColor: C.surfaceLow, backgroundColor: 'rgba(242,244,246,0.5)' },
    onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.green },
    chatTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, color: C.primary },
    chatArea: { flex: 1 },
    msgWrapLeft: { marginBottom: 16, alignItems: 'flex-start' },
    msgWrapRight: { marginBottom: 16, alignItems: 'flex-end' },
    msgHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
    msgName: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.primary },
    msgTime: { fontFamily: 'Manrope_500Medium', fontSize: 9, color: C.onSurfaceVariant },
    msgBubbleLeft: { backgroundColor: C.surfaceLow, padding: 12, borderTopRightRadius: 12, borderBottomRightRadius: 12, borderBottomLeftRadius: 12, maxWidth: '85%' },
    msgBubbleRight: { backgroundColor: C.primary, padding: 12, borderTopLeftRadius: 12, borderBottomRightRadius: 12, borderBottomLeftRadius: 12, maxWidth: '85%' },
    msgTextLeft: { fontFamily: 'Manrope_500Medium', fontSize: 12, color: C.onSurfaceVariant, lineHeight: 18 },
    msgTextRight: { fontFamily: 'Manrope_500Medium', fontSize: 12, color: C.white, lineHeight: 18 },
    chatInputWrap: { flexDirection: 'row', alignItems: 'center', padding: 12, borderTopWidth: 1, borderTopColor: C.surfaceLow },
    chatInput: { flex: 1, backgroundColor: C.surfaceLow, height: 40, borderRadius: 20, paddingHorizontal: 16, fontFamily: 'Manrope_500Medium', fontSize: 12 },
    sendBtn: { position: 'absolute', right: 20, padding: 4 },

    actText: { fontFamily: 'Manrope_500Medium', fontSize: 12, color: C.primary, lineHeight: 16 },
    actTime: { fontFamily: 'Manrope_500Medium', fontSize: 10, color: C.onSurfaceVariant, marginTop: 2 },

    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', padding: 20 },
    modalBox: { width: '100%', maxWidth: 400, backgroundColor: C.white, borderRadius: 20, overflow: 'hidden' },
    modalHeader: { padding: 20, borderBottomWidth: 1, borderBottomColor: C.surfaceLow },
    modalTitle: { fontFamily: 'Manrope_800ExtraBold', fontSize: 18, color: C.primary },
    modalBody: { padding: 20 },
    inputLabel: { fontFamily: 'Manrope_800ExtraBold', fontSize: 10, color: C.onSurfaceVariant, letterSpacing: 1, marginBottom: 8 },
    input: { backgroundColor: C.surfaceLow, height: 48, borderRadius: 12, paddingHorizontal: 16, fontFamily: 'Manrope_600SemiBold', fontSize: 14 },
    roleOption: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, borderRadius: 12, borderWidth: 2, borderColor: C.surfaceContainer, marginBottom: 8 },
    roleOptionActive: { borderColor: C.tint, backgroundColor: 'rgba(115,46,228,0.05)' },
    radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: C.outline, alignItems: 'center', justifyContent: 'center' },
    radioActive: { borderColor: C.tint, backgroundColor: C.tint },
    radioInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.white },
    roleName: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: C.primary },
    roleAccess: { fontFamily: 'Manrope_500Medium', fontSize: 11, color: C.onSurfaceVariant },
    modalFooter: { flexDirection: 'row', padding: 20, borderTopWidth: 1, borderTopColor: C.surfaceLow, gap: 12 },
    modalBtnCancel: { flex: 1, backgroundColor: C.surfaceLow, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    modalBtnCancelText: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: C.onSurfaceVariant },
    modalBtnSubmit: { flex: 1, backgroundColor: C.tint, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    modalBtnSubmitText: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: C.white },
});

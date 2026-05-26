import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    Bell,
    Clock,
    Mail,
    MoreVertical,
    Search,
    UserPlus,
} from 'lucide-react-native';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useColorScheme,
} from 'react-native';

export default function TeamWorkspaceMembersScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const colors = {
        background: isDark ? '#1a1d21' : '#f7f9fb',
        headerBg: isDark ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.85)',
        textPrimary: isDark ? '#ffffff' : '#110031',
        textSecondary: isDark ? '#9ca3af' : '#5b598c',
        textTertiary: isDark ? '#64748b' : '#47464f',
        surfaceLowest: isDark ? '#2d3133' : '#ffffff',
        surfaceLow: isDark ? '#3d4143' : '#f2f4f6',
        surfaceContainerHigh: isDark ? '#4b5563' : '#e6e8ea',
        surfaceContainerHighest: isDark ? '#6b7280' : '#e0e3e5',
        tint: '#732ee4',
        btnGradStart: '#732ee4',
        btnGradEnd: '#2d0069',
        border: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(200,197,208,0.15)',
        primaryContainer: '#2d0069',
        onPrimaryContainer: '#9d6bff',
        outlineVariant: '#c8c5d0',
        error: '#ba1a1a',
    };

    const ACTIVE_TEAM = [
        {
            id: '1',
            name: 'Marcus Reed',
            email: 'marcus.r@launchpulse.io',
            role: 'Admin',
            lastActive: '2h ago',
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUlYNBB5hjt0XHFxXWBzRH6X6D1rSB4JxO8Z-UCVAVxZFaduBmnXhnMi7b5vrsE22yXrb1C0W8qU5Siuv7d220401GPGT2szEvB5nAsMgi9mGPVJQ9CeW9gbFv10dvEClgYkMx264Ya4nomIqCeUN_K3lJeDnRcJzkaXI6D6yz92TFeelUMRZxSrIeZJPdLxtEgzpup6tyNw1J__dT6VIacJzO_z2W4h6c1JOD4CajjO69TVFGbPktNv72F6gqW8BIfmySNyQyovM',
            isAdmin: true,
        },
        {
            id: '2',
            name: 'Elena Rostova',
            email: 'elena.r@launchpulse.io',
            role: 'Lead Analyst',
            lastActive: 'Today',
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi1r3U2Tj_zM9VscOG1Xmh0PcZQmI1mXLbuOtEbL-Xs0Uu6cn-H7RTNIGAb7FGLqWDggh142a2ZOdTeqpQMw8PFbWxFukfXKLB8E2OxrgRaxZFGtWeCOq9cY4_3heCWQsp1RIJjZUol3TtrGCZWUO_7uD3fRqj8IC87XhY-CcqPqGb-H0-36nolnrUivcznYSIR8zlHSUU70FvWVX2iIc1sE46sRoTFABHOgBOy5quL_IPW2jAziZKiTelvmjmKc6wHhgMekf-uhU',
            isAdmin: false,
        },
        {
            id: '3',
            name: 'James Doe',
            email: 'james.d@launchpulse.io',
            role: 'Editor',
            lastActive: '2d ago',
            avatarText: 'JD',
            isAdmin: false,
        },
    ];

    const PENDING_INVITES = [
        {
            id: 'p1',
            email: 'alex.chen@external.com',
            status: 'Invited to be Analyst • Sent 2 days ago',
        },
        {
            id: 'p2',
            email: 't.williams@launchpulse.io',
            status: 'Invited to be Editor • Sent today',
        },
    ];

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
            {/* TopAppBar Standardised */}
            <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
                <View style={styles.headerLeft}>
                    <Search color={colors.textPrimary} size={20} />
                    <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Meridian Analyst</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
                        <Bell color={colors.textPrimary} size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.avatarWrap, { borderColor: colors.border }]}
                        activeOpacity={0.8}
                        onPress={() => router.push('/settings')}
                    >
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGjc-Iok8ge3pqj1tVSO2Czep7bwvoUV5LL8uDwXvMSXuVbdexRi60vIpvWLzFqK3ACLQBrvWtpurc-ZGh2ZI_lcw3De55st1mIQaiY-UaTILBB7xEm4jcDkbr8FNF3mCYZGCfZP64a6fDONzQujvER_NfpIE49I7Zj8iVttsWYeZ7cx9zoZ8CfakDrMhZacjktLL_4nnIu3KLKvLGLrrQ3YswLdSot-1Eq4lo7Tx_Hkv8aIJcFPMFWsNfT5YJWNgKlQU7nmI6WX4' }}
                            style={styles.avatarImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* Header Section */}
                <View style={styles.sectionTopRow}>
                    <View style={styles.headerTextGroup}>
                        <Text style={[styles.pageTitle, { color: colors.textPrimary }]}>Workspace Members</Text>
                        <Text style={[styles.pageSubtitle, { color: colors.textTertiary }]}>Manage team access and roles for the LaunchPulse workspace.</Text>
                    </View>

                    <TouchableOpacity style={styles.inviteBtnWrap} activeOpacity={0.9}>
                        <LinearGradient
                            colors={[colors.btnGradStart, colors.btnGradEnd]}
                            style={styles.inviteBtnGradient}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        >
                            <UserPlus color="#ffffff" size={20} />
                            <Text style={styles.inviteBtnText}>Invite Member</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Active Team */}
                <View style={styles.sectionWrap}>
                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Active Team</Text>
                    
                    <View style={styles.gridContainer}>
                        {ACTIVE_TEAM.map((member) => (
                            <TouchableOpacity
                                key={member.id}
                                style={[
                                    styles.memberCard,
                                    { backgroundColor: colors.surfaceLowest, borderColor: colors.border }
                                ]}
                                activeOpacity={0.8}
                            >
                                {member.isAdmin && (
                                    <View style={[styles.adminBar, { backgroundColor: colors.tint }]} />
                                )}

                                <View style={styles.cardHeader}>
                                    <View style={styles.cardIdentity}>
                                        <View style={[styles.memberAvatarWrap, { backgroundColor: colors.surfaceLow }]}>
                                            {member.imageUrl ? (
                                                <Image source={{ uri: member.imageUrl }} style={styles.memberAvatarImg} />
                                            ) : (
                                                <Text style={[styles.memberAvatarText, { color: colors.textPrimary }]}>{member.avatarText}</Text>
                                            )}
                                        </View>
                                        <View>
                                            <Text style={[styles.memberName, { color: colors.textPrimary }]}>{member.name}</Text>
                                            <Text style={[styles.memberEmail, { color: colors.textTertiary }]}>{member.email}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={styles.moreBtn}>
                                        <MoreVertical color={colors.textTertiary} size={20} />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.cardFooter}>
                                    <View style={[
                                        styles.roleBadge,
                                        member.isAdmin ? { backgroundColor: colors.primaryContainer } : { backgroundColor: colors.surfaceLow, borderWidth: 1, borderColor: colors.border }
                                    ]}>
                                        <Text style={[
                                            styles.roleText,
                                            member.isAdmin ? { color: colors.onPrimaryContainer } : { color: colors.textSecondary }
                                        ]}>
                                            {member.role}
                                        </Text>
                                    </View>
                                    
                                    <View style={styles.activityRow}>
                                        <Clock color={colors.textTertiary} size={12} />
                                        <Text style={[styles.activityText, { color: colors.textTertiary }]}>Last active: {member.lastActive}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Pending Invitations */}
                <View style={[styles.sectionWrap, styles.mtLarge]}>
                    <View style={styles.pendingHeaderRow}>
                        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Pending Invitations</Text>
                        <View style={[styles.countBadge, { backgroundColor: colors.surfaceLow }]}>
                            <Text style={[styles.countBadgeText, { color: colors.textTertiary }]}>{PENDING_INVITES.length}</Text>
                        </View>
                    </View>

                    <View style={[styles.pendingContainer, { backgroundColor: colors.surfaceLowest, borderColor: colors.border }]}>
                        {PENDING_INVITES.map((invite, index) => (
                            <View key={invite.id}>
                                <View style={styles.pendingRow}>
                                    <View style={styles.pendingLeft}>
                                        <View style={[styles.mailIconWrap, { backgroundColor: colors.background, borderColor: colors.outlineVariant }]}>
                                            <Mail color={colors.textTertiary} size={20} />
                                        </View>
                                        <View>
                                            <Text style={[styles.pendingEmail, { color: colors.textPrimary }]}>{invite.email}</Text>
                                            <Text style={[styles.pendingStatus, { color: colors.textTertiary }]}>{invite.status}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.pendingActions}>
                                        <TouchableOpacity style={styles.pendingBtn}>
                                            <Text style={[styles.pendingBtnText, { color: colors.textSecondary }]}>Resend</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.pendingBtn}>
                                            <Text style={[styles.pendingBtnText, { color: colors.error }]}>Revoke</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                
                                {index < PENDING_INVITES.length - 1 && (
                                    <View style={styles.dividerWrap}>
                                        <View style={[styles.dividerLine, { backgroundColor: colors.surfaceContainerHighest }]} />
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
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
        zIndex: 40,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerTitle: {
        fontFamily: 'Inter_900Black', // Standard App styling
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

    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 32,
        paddingBottom: 140, // bottom nav clearance
        maxWidth: 1024,
        alignSelf: 'center',
        width: '100%',
    },

    sectionTopRow: {
        flexDirection: 'column',
        gap: 24,
        marginBottom: 32,
    },
    headerTextGroup: {
        gap: 8,
    },
    pageTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 30,
        letterSpacing: -0.5,
    },
    pageSubtitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 20,
    },
    inviteBtnWrap: {
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#732ee4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
        alignSelf: 'flex-start',
    },
    inviteBtnGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    inviteBtnText: {
        color: '#ffffff',
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
    },

    sectionWrap: {
        gap: 16,
    },
    mtLarge: {
        marginTop: 32,
    },
    sectionTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 18,
        letterSpacing: -0.5,
    },

    gridContainer: {
        flexDirection: 'column', // mimicking mobile list, wrap in row for web/tablet if we used flexWrap but this handles 100% properly for native.
        gap: 16,
    },
    memberCard: {
        position: 'relative',
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        flexDirection: 'column',
        gap: 16,
        overflow: 'hidden',
    },
    adminBar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardIdentity: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    memberAvatarWrap: {
        width: 48,
        height: 48,
        borderRadius: 24,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    memberAvatarImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    memberAvatarText: {
        fontFamily: 'Inter_900Black',
        fontSize: 18,
    },
    memberName: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        letterSpacing: -0.2,
    },
    memberEmail: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
    },
    moreBtn: {
        padding: 4,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 'auto',
    },
    roleBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    roleText: {
        fontFamily: 'Inter_900Black',
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    activityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    activityText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
    },

    pendingHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    countBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    countBadgeText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
    },
    pendingContainer: {
        borderRadius: 12,
        borderWidth: 1,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },
    pendingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 8,
    },
    pendingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        flex: 1,
    },
    mailIconWrap: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pendingEmail: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        letterSpacing: -0.2,
    },
    pendingStatus: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        marginTop: 2,
    },
    pendingActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    pendingBtn: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    pendingBtnText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
    },
    dividerWrap: {
        alignItems: 'center',
        paddingVertical: 4,
    },
    dividerLine: {
        height: 4,
        width: '98%',
        borderRadius: 2,
        opacity: 0.5,
    },
});

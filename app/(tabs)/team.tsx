import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    BadgeCheck,
    Bell,
    ChevronRight,
    Filter,
    Search,
    UserPlus,
} from 'lucide-react-native';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useColorScheme,
} from 'react-native';

export default function TeamScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const colors = {
        background: isDark ? '#1a1d21' : '#f7f9fb',
        headerBg: isDark ? '#0f172a' : '#ffffff',
        textPrimary: isDark ? '#ffffff' : '#110031',
        textSecondary: isDark ? '#9ca3af' : '#5b598c',
        textTertiary: isDark ? '#64748b' : '#47464f',
        surfaceLowest: isDark ? '#2d3133' : '#ffffff',
        surfaceLow: isDark ? '#3d4143' : '#f2f4f6',
        surfaceContainer: isDark ? '#4b5563' : '#eceef0',
        tint: '#732ee4',
        btnGradStart: '#732ee4',
        btnGradEnd: '#2d0069',
        border: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(200,197,208,0.2)',
        positive: '#10b981',
        mutedBadge: '#cbd5e1',
        secondaryContainer: isDark ? '#3730a3' : '#c7c3fe',
        onSecondaryContainer: isDark ? '#e0e7ff' : '#2e1b65',
    };

    const TEAM_MEMBERS = [
        {
            id: 1,
            name: 'Julian Draper',
            role: 'Lead Analyst',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC-8gI-F57NVv19tpioWxnpzjxqRgNRUIeyFE9UNQVG_Ow2pCEn10TnaU0HvJEhjw4UAryQozxcEFYQqANPairHpSmVAiNzNNkYKRgFKKQhNifS6RFazFnJveHsA2U09ZcE0xrHzmP252ARU2NtvTa8HWI_l8tyYw282SJ9wbAIY1lp_HIZvkSBHhh0E-jJ8Mq2b6IOB_uBdoQOnGeGmsttgR_iO-CLRi_-hh9dMiByW6NR5RtzQ_fM36nJNy5J9o_oWX5DRHIZNc',
            active: true,
        },
        {
            id: 2,
            name: 'Aria Mendoza',
            role: 'Investment Principal',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8hB5Zsg0x6K-2AF3q3oIqrC03OuPKoSgQ7QCediooB7YeMTzXoDgJJdQfi373rQdFRmQKXZ70VzXr5n3JbeLQ60w5MLOOYGFLY7vK3t-RQJWVCLqVDdaaY1nslFdtg4SB6bvC7a1WveWrgcNVPl5hv2NXMqDKBUrOR4_4pgMakvKMgU4lU1HxqjPu26O24gPfKEtL6C99FiQCSz3N1SWTbId4o5Pn3BaFKJEZrAaC3uCRKWZaaoJAA9XtedIyWm4gd37wgocJ4vg',
            active: true,
        },
        {
            id: 3,
            name: 'Soren Kvist',
            role: 'Risk Assessment',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBu-c-YPtYAh-apWX0uMJZ8THkwFIrT12kKCIj1A5bPm-kwqD76SDl2Mze3JgmQEVyDiujg5jcYIWTiOcL8sFBiJY8fpkm0J2xgD6YmKtf6xd2CHA_S7H8MNvMNBp5mRITkm1S20JnK7oNbdJS5ZMkqa-mUrH7Tij0IWhpXoYSsPZifY6-rOvI3Fvyh71hkwfxJCfZzS5L8S4EjNE68ZHomvfa0eBnO0YRmU4O1q2fiYAIBpRPS-bXGIsuvm43OBvqP6bDuBN4NPAw',
            active: false,
        },
        {
            id: 4,
            name: 'Elena Lowery',
            role: 'Market Researcher',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-sq44W7kr4QsJ00DQnJcqyCiJfpPaoqsQuyrhlsHjhqwB1c78n3A0MikvGDdPE518Pt6ZCh4kOdsjsBsZLSawUJKgSzemjRco-XM5_wUGckvp-RDlBh1vD8v9LGF4GucjeZdFsxB6oyEBGzOufjQYIsV6tpEzD-zYZ_ch0noWvQfkzlk5vQNaLzf4-7BkmaYD4bU6rkISmyQ9Pnyq12IvpE3mfQF2EyjPf5CElNWJRGQU6XAMkqjgx3HlhTYm08GVSRvj1JYLknE',
            active: true,
        },
        {
            id: 5,
            name: 'Rian Thorne',
            role: 'Data Scientist',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZDFKmPHwoFLukH-1mtqWUwhklAz1OP5J8CLXifdlw6cqlWptMiPpFNbxBWS2dfECebRPjNa9Tp_JBOwm8tHmhRQhL4aXOPQFBX_jzv1D0DJF4E90z8Ybc54-bUNGNisrWGJcVEKhqUjR1-RALtA0wIZVyh5SgnJ0kspd-Hh76fa_ADV6UfjBxWtV9MWRcUnK_hGmlpFS3ETN1_RrtC9ILXAcbIvPVXzopFXsq0t4ae5Y88JWK1rJryc3Ojloz6rhrQVmnmB084CI',
            active: true,
        },
    ];

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
            {/* Context Header */}
            <View style={[styles.header, { backgroundColor: isDark ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.85)' }]}>
                <View style={styles.headerLeft}>
                    <Search color={colors.textPrimary} size={20} />
                    <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Meridian Analyst</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
                        <Bell color={colors.textPrimary} size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.avatarWrap, { borderColor: colors.border }]} activeOpacity={0.8} onPress={() => router.push('/settings')}>
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBA6x7M8L2eyzJtoBHalvxqPFsYKzMC2XjJSXhGRJQbJj-ilrxfvGBu9Q-XY1CMwpECeLFEiH0JuFxqa2AQ5rTo7D4JpD2dvEw1BtyFUPZBhLn1559lEqe849OoZISs_A2M7Hbab-qWHVmKSUWt7yTJP5n0KnZKG4wJ5mN9KvzWsSZhF751gHdE7Jst47MuUFsAEyLZA1MKVU2LMUAv8kQxq1rQFFg05EmNE8FeksEw-uwacyEY6er13bbaAGez4ZwKh95ep4Y3OZ4' }}
                            style={styles.avatarImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>Team</Text>
                    <Text style={[styles.heroSub, { color: colors.textTertiary }]}>12 Members active in Ivory Meridian</Text>

                    <View style={styles.statsGrid}>
                        <View style={[styles.statBox, { backgroundColor: colors.surfaceLowest }]}>
                            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>TOTAL SEATS</Text>
                            <Text style={[styles.statValue, { color: colors.textPrimary }]}>15</Text>
                        </View>
                        <View style={[styles.statBox, { backgroundColor: colors.surfaceLowest }]}>
                            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>AVAILABLE</Text>
                            <Text style={[styles.statValue, { color: colors.tint }]}>03</Text>
                        </View>
                    </View>
                </View>

                {/* Search & Filter Array */}
                <View style={styles.searchRow}>
                    <View style={[styles.searchInputWrap, { backgroundColor: colors.surfaceLow }]}>
                        <Search color={colors.textTertiary} size={18} style={styles.searchIcon} />
                        <TextInput
                            style={[styles.searchInput, { color: colors.textPrimary }]}
                            placeholder="Search members..."
                            placeholderTextColor={colors.textTertiary}
                        />
                    </View>
                    <TouchableOpacity style={[styles.filterBtn, { backgroundColor: colors.surfaceLow }]} activeOpacity={0.7}>
                        <Filter color={colors.textTertiary} size={20} />
                    </TouchableOpacity>
                </View>

                {/* Team Roster */}
                <View style={styles.listContainer}>
                    {TEAM_MEMBERS.map((member) => (
                        <TouchableOpacity key={member.id} style={[styles.memberCard, { backgroundColor: colors.surfaceLowest }]} activeOpacity={0.8}>
                            <View style={styles.memberLeft}>
                                <View style={styles.memberAvatarBox}>
                                    <Image source={{ uri: member.image }} style={styles.memberAvatar} />
                                    <View style={[styles.statusDot, { 
                                        backgroundColor: member.active ? colors.positive : colors.mutedBadge,
                                        borderColor: colors.surfaceLowest
                                    }]} />
                                </View>
                                <View>
                                    <Text style={[styles.memberName, { color: colors.textPrimary }]}>{member.name}</Text>
                                    <Text style={[styles.memberRole, { color: colors.textTertiary }]}>{member.role}</Text>
                                </View>
                            </View>
                            <ChevronRight color={colors.textTertiary} size={20} opacity={0.5} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Admin Roles Box */}
                <View style={styles.adminSection}>
                    <View style={styles.adminHeader}>
                        <Text style={[styles.adminTitle, { color: colors.textSecondary }]}>ADMIN ROLES</Text>
                        <View style={[styles.managerBadge, { backgroundColor: colors.secondaryContainer }]}>
                            <Text style={[styles.managerBadgeText, { color: colors.onSecondaryContainer }]}>Manager View</Text>
                        </View>
                    </View>
                    
                    <View style={[styles.adminCard, { backgroundColor: colors.surfaceLow, borderColor: colors.border }]}>
                        <View style={styles.adminCardTop}>
                            <View>
                                <Text style={[styles.adminName, { color: colors.textPrimary }]}>Marcus Holloway</Text>
                                <Text style={[styles.adminRole, { color: colors.textTertiary }]}>Account Owner</Text>
                            </View>
                            <BadgeCheck color={colors.tint} size={24} />
                        </View>
                        <View style={styles.adminCardBottom}>
                            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.surfaceLowest }]} activeOpacity={0.7}>
                                <Text style={[styles.actionBtnText, { color: colors.textPrimary }]}>Manage Permissions</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ScrollView>

            {/* Fab Button */}
            <TouchableOpacity style={styles.fab} activeOpacity={0.9}>
                <LinearGradient
                    colors={[colors.btnGradStart, colors.btnGradEnd]}
                    style={styles.fabGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <UserPlus color="#ffffff" size={24} />
                </LinearGradient>
            </TouchableOpacity>

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
        fontFamily: 'Inter_900Black', // Maps to extrabold uppercase from HTML
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
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 140, // accommodate bottom navigation and FAB
        maxWidth: 512,
        alignSelf: 'center',
        width: '100%',
    },

    heroSection: {
        marginBottom: 32,
    },
    heroTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 32,
        letterSpacing: -0.5,
    },
    heroSub: {
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
        marginTop: 4,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 24,
    },
    statBox: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1,
    },
    statLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        letterSpacing: 1,
        marginBottom: 6,
    },
    statValue: {
        fontFamily: 'Inter_900Black',
        fontSize: 24,
    },

    searchRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 24,
    },
    searchInputWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    searchIcon: { marginRight: 8 },
    searchInput: {
        flex: 1,
        paddingVertical: 14,
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
    },
    filterBtn: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    listContainer: {
        gap: 16,
    },
    memberCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 8,
        elevation: 1,
    },
    memberLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    memberAvatarBox: {
        position: 'relative',
    },
    memberAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    statusDot: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 2,
    },
    memberName: {
        fontFamily: 'Inter_700Bold',
        fontSize: 15,
        marginBottom: 2,
    },
    memberRole: {
        fontFamily: 'Inter_500Medium',
        fontSize: 12,
    },

    adminSection: {
        marginTop: 40,
    },
    adminHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    adminTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 10,
        letterSpacing: 1,
    },
    managerBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    managerBadgeText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
    },
    adminCard: {
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
    },
    adminCardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    adminName: {
        fontFamily: 'Inter_700Bold',
        fontSize: 15,
        marginBottom: 2,
    },
    adminRole: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
    },
    adminCardBottom: {
        marginTop: 16,
        flexDirection: 'row',
        gap: 8,
    },
    actionBtn: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    actionBtnText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
    },

    fab: {
        position: 'absolute',
        bottom: 95, // Above standard bottom nav offset
        right: 24,
        width: 56,
        height: 56,
        shadowColor: '#732ee4',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
        borderRadius: 28,
        zIndex: 50,
    },
    fabGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

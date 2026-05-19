import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    Bell,
    ChevronRight,
    Hourglass,
    Plus,
    Search,
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

export default function StartupsScreen() {
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
        tint: '#732ee4',
        btnGradStart: '#732ee4',
        btnGradEnd: '#2d0069',
        border: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(200,197,208,0.2)',
        indigo: isDark ? '#818cf8' : '#4f46e5',
    };

    const STARTUPS = [
        {
            id: '1',
            name: 'QuantumFlow',
            sector: 'Fintech',
            score: '8.4',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeZ4xsyoh5iCQ45O1OFdmzg7ZFxEv8BIIoP6aQ2voAH6-C_TZ-n2yUaTaHbjovbkWdRYSI3AFXgQbLoK_id-ObmyJpRMPZDrZfM9_qyrJU73isy5Koc8touhm8A9sBkq7SZXZwJR0E88ndMlboizYfPnhS4U0vfMW1HeqnChmx_7h6YMCuJvkYi8cHx0Y9RrMAoOAU35hRnb2sFHktSVSZkqDoYvdMarFIy0JzPgL_iWqENr1SKSGwCSLhFYlhe6RuN3zpA0SQKa8',
            status: 'active',
        },
        {
            id: '2',
            name: 'BioGenix',
            sector: 'HealthTech',
            score: '9.1',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAgKQZGcJcOKe3iu23UzfgpDdL4JVnwRYyqRZ2ukV8T7FsIhWOshr7Q96rBnuZZwMqpH3XB4yCpcrpkLQSL94K1WV2_JqS0xtjqykPTlfULUvW6K1nF2G5nUVKm8089FkxACXTMuF6aSySfZBU85CctAQXZ2SOCMN5rQAi7BJOLbeJiu-gYojcDj6nInOTEycfmxUuTGJsgtgRvkXoQY3Ka-lB3ruq6d18VyNKIBsF_oL1gnhp3IB7qANe8XJgBHdAZSdRX8rNMSY',
            status: 'active',
        },
        {
            id: '3',
            name: 'UrbanEdge',
            sector: 'PropTech',
            score: '7.2',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5jCXngYBr4CoJfu6VcP7CMPzkME_aqtHuybJP7kVRzhAwDVYR7wV5iTCi3QnVcOvMq6987UIeDLcgNJMrGpH1VzMnsfN1nQrhEQdPZIc4vfvo0U2YwRcT8e1ZUYJYCHOeBx853uVqUFQo8IHwympKOu5qpmtSIHzKeQeUQ6b8KtRwNgmx_qRn4NZWoqv-6wTuzT6lm_StiWScQxV5TpoQx-ozAi3hup_dQUrAku6tG3AzPvlo-uPBejTDWPsmO0l7eNtnfeMJ-To',
            status: 'active',
        },
        {
            id: '4',
            name: 'NeuralLink',
            sector: 'AI/ML',
            score: '8.8',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSRuNMRu5oGVKWAkk9Icr0b-_MShOB7eJUuhVN51cvQbuZQk5zPIuBxWiD7GtXPofbubNJ48PfX9HPoX2LQ_0dRrOG6iYBd-Sfg9Qe_BWDs1AQyjaaIBB45bzoebneCZ9FOzAaODaxNsuc2FS_5RcL7SZgl-_CCzS_J4XRuDaesB6qQnTjzIabCkqxIavScORDL9_TWCEnXvTj_4K-IIDFSQe9miUo1TTmFg0-RXt5JEBVcYWkS8xMIacWh62hvS9J6aip4HAfH6k',
            status: 'active',
        },
        {
            id: '5',
            name: 'SkyGrid',
            sector: 'Logistics',
            score: 'Pending',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbTFn_IYg-Qu4PAtXcjusdJ2TQfDE9sCKah68oWxJlvsVUZNpCEderq8tuaHj7UjY_NJraKmqqGiXbMDasIgY9zrssRVeMbkuBhq5bx5vR9_0AoTgHQQNC49ENy5quIh3jFdB2ucqRTw8-nCuOhWtEMAmGzLAFjFtsDDWQ5EmWQGlOY8dONukm2v1FVb08pqJdARLQjSy3MIN8fdneIvGDIomP-PL8a1uiiRRoZmOq8VzRwFMue461hbk3DnvbmhBf6tCgWs_4Ub0',
            status: 'pending',
        },
    ];

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
            {/* TopAppBar */}
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
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5aCKXGg2zOcACsiZEPM0plI8p_91f9aiQ73Lw4Q09z1ucF6eKkNR_BRUkntjcTNV1LQeSWypFhQ6FhKoygeuFJSYWs01iFLmLpgtuQavf2cRCQX4S2q8gnP93d38nDyjj-Z_2RxDVAgfWibIVl0aO45YOBneOBQ-vFCJZ_XDxXgQmDGa3X3u63_3lJVEfZjIwAqN1gJ6O4Du_HJPOvb9EM2cVWv3qR6NeYHUINe3ETRIu7rwnKKHMlemNPA_nCwcY5eQSSgVbGRA' }}
                            style={styles.avatarImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* Hero Headers */}
                <View style={styles.heroSection}>
                    <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>My Startups</Text>
                    <Text style={[styles.heroSub, { color: colors.textTertiary }]}>Managing 12 active evaluations</Text>
                </View>

                {/* Vertical Startup List */}
                <View style={styles.listContainer}>
                    {STARTUPS.map((startup) => {
                        const isPending = startup.status === 'pending';
                        
                        return (
                            <TouchableOpacity
                                key={startup.id}
                                activeOpacity={0.8}
                                style={[
                                    styles.card,
                                    { backgroundColor: colors.surfaceLowest, borderColor: colors.border },
                                    isPending && { opacity: 0.6 }
                                ]}
                            >
                                <View style={styles.cardLeft}>
                                    <View style={[styles.imageWrap, { backgroundColor: colors.surfaceLow }]}>
                                        <Image 
                                            source={{ uri: startup.image }} 
                                            style={[styles.startupImage, isPending && { opacity: 0.5, tintColor: 'gray' }]} 
                                        />
                                    </View>
                                    <View>
                                        <Text style={[styles.startupName, { color: colors.textPrimary }]}>{startup.name}</Text>
                                        <Text style={[styles.startupSector, { color: colors.textSecondary }]}>{startup.sector}</Text>
                                    </View>
                                </View>

                                <View style={styles.cardRight}>
                                    <View style={styles.scoreCol}>
                                        <Text style={[styles.scoreLabel, { color: colors.textTertiary }]}>SCORE</Text>
                                        <Text style={[
                                            styles.scoreValue,
                                            { color: isPending ? colors.textTertiary : colors.indigo },
                                            isPending && { fontSize: 16 } // Smaller font specifically for 'Pending'
                                        ]}>
                                            {startup.score}
                                        </Text>
                                    </View>
                                    <View style={styles.actionIconBox}>
                                        {isPending ? (
                                            <Hourglass color={colors.textPrimary} size={20} />
                                        ) : (
                                            <ChevronRight color={colors.textPrimary} size={20} />
                                        )}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
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
                    <Plus color="#ffffff" size={28} />
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
        fontFamily: 'Inter_900Black', // Standardized visual branding
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
        paddingBottom: 140, // Accommodate FAB and bottom nav
        maxWidth: 768,
        alignSelf: 'center',
        width: '100%',
    },

    heroSection: {
        marginBottom: 24,
    },
    heroTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 32,
        letterSpacing: -0.5,
        marginBottom: 4,
    },
    heroSub: {
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
    },

    listContainer: {
        gap: 16,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 20,
        elevation: 2,
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    imageWrap: {
        width: 56,
        height: 56,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    startupImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    startupName: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        lineHeight: 20,
    },
    startupSector: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 12,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        marginTop: 4,
    },

    cardRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    scoreCol: {
        alignItems: 'flex-end',
    },
    scoreLabel: {
        fontFamily: 'Inter_900Black',
        fontSize: 10,
        letterSpacing: -0.5,
        textTransform: 'uppercase',
        opacity: 0.6,
    },
    scoreValue: {
        fontFamily: 'Inter_900Black',
        fontSize: 24,
        letterSpacing: -0.5,
    },
    actionIconBox: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },

    fab: {
        position: 'absolute',
        bottom: 95,
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

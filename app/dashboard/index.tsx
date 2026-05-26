import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    ArrowRight,
    BarChart3,
    CheckCircle2,
    Clock,
    FileText,
    Globe,
    LayoutDashboard,
    Lightbulb,
    MessageCircle,
    Rocket,
    Sparkles,
    Target,
    TrendingDown,
    TrendingUp,
} from 'lucide-react-native';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function DashboardPage() {
    const router = useRouter();

    // Mock data
    const session = { user: { name: 'John Doe' } };

    const stats = [
        {
            name: 'Total Evaluations',
            value: '12',
            change: '+3 this month',
            icon: Rocket,
            color: '#2563eb', // blue-600
            bgColor: '#dbeafe', // blue-100
        },
        {
            name: 'Success Rate',
            value: '87%',
            change: '+5% from last month',
            icon: Target,
            color: '#16a34a', // green-600
            bgColor: '#dcfce7', // green-100
        },
        {
            name: 'In Progress',
            value: '3',
            change: '2 pending review',
            icon: Clock,
            color: '#9333ea', // purple-600
            bgColor: '#f3e8ff', // purple-100
        },
        {
            name: 'Completed',
            value: '9',
            change: 'All reports ready',
            icon: CheckCircle2,
            color: '#ea580c', // orange-600
            bgColor: '#ffedd5', // orange-100
        },
    ];

    const quickActions = [
        {
            name: 'New Evaluation',
            description: 'Start evaluating a new business idea',
            icon: Lightbulb,
            href: '/dashboard/new-evaluation',
            color: '#3b82f6', // blue-500
        },
        {
            name: 'AI Assistant',
            description: 'Get help from our AI advisor',
            icon: MessageCircle,
            href: '/dashboard/chat',
            color: '#a855f7', // purple-500
        },
        {
            name: 'View Analytics',
            description: 'Deep dive into your metrics',
            icon: BarChart3,
            href: '/dashboard/analytics',
            color: '#22c55e', // green-500
        },
        {
            name: 'Download Reports',
            description: 'Access all evaluation reports',
            icon: FileText,
            href: '/dashboard/reports',
            color: '#f97316', // orange-500
        },
    ];

    const recentEvaluations = [
        {
            id: 1,
            name: 'AI-Powered Marketing Platform',
            date: '2 days ago',
            status: 'Completed',
            successRate: 85,
            stage: 'Review',
        },
        {
            id: 2,
            name: 'Sustainable Fashion Marketplace',
            date: '5 days ago',
            status: 'Completed',
            successRate: 78,
            stage: 'Analysis',
        },
        {
            id: 3,
            name: 'HealthTech Wearable Device',
            date: '1 week ago',
            status: 'In Progress',
            successRate: 0,
            stage: 'Data Collection',
        },
    ];

    const topGlobalStartups = [
        {
            id: 1,
            name: 'QuantumAI Labs',
            industry: 'Artificial Intelligence',
            country: 'USA',
            successScore: 96,
            funding: '$45M',
            trend: 'up',
        },
        {
            id: 2,
            name: 'BioHealth Innovations',
            industry: 'Healthcare',
            country: 'Germany',
            successScore: 94,
            funding: '$38M',
            trend: 'up',
        },
        {
            id: 3,
            name: 'GreenEnergy Solutions',
            industry: 'Clean Energy',
            country: 'Singapore',
            successScore: 92,
            funding: '$52M',
            trend: 'up',
        },
        {
            id: 4,
            name: 'EduTech Global',
            industry: 'Education',
            country: 'UK',
            successScore: 89,
            funding: '$29M',
            trend: 'down',
        },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

            {/* Sub-Header / Welcome */}
            <View style={styles.welcomeSection}>
                <View style={styles.welcomeHeader}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logoBox}>
                            <LayoutDashboard color="#ffffff" size={24} strokeWidth={2.5} />
                        </View>
                        <View>
                            <Text style={styles.pageTitle}>Dashboard</Text>
                            <View style={styles.aiBadge}>
                                <Sparkles size={14} color="#2563eb" />
                                <Text style={styles.aiBadgeText}>AI-Powered Insights & Analytics</Text>
                            </View>
                        </View>
                    </View>

                    {/* Date display usually hidden on mobile/small screens in the web version, 
                but we can keep a simplified version or just the greeting */}
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greetingText}>
                            Welcome back, {session?.user?.name?.split(' ')[0] || 'there'}! 👋
                        </Text>
                        <Text style={styles.dateText}>
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Stats Grid */}
            <View style={styles.gridContainer}>
                {stats.map((stat, index) => (
                    <View key={index} style={styles.statCard}>
                        <View style={styles.statHeader}>
                            <View style={[styles.statIconBox, { backgroundColor: stat.bgColor }]}>
                                <stat.icon size={20} color={stat.color} />
                            </View>
                        </View>
                        <Text style={styles.statValue}>{stat.value}</Text>
                        <Text style={styles.statName}>{stat.name}</Text>
                        <Text style={styles.statChange}>{stat.change}</Text>
                    </View>
                ))}
            </View>

            {/* Quick Actions */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.gridContainer}>
                    {quickActions.map((action, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.actionCard, { backgroundColor: action.color }]}
                            onPress={() => router.push(action.href as any)}
                        >
                            <action.icon size={28} color="#ffffff" style={styles.actionIcon} />
                            <Text style={styles.actionName}>{action.name}</Text>
                            <Text style={styles.actionDesc}>{action.description}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Lists Container */}
            <View style={styles.listsContainer}>

                {/* Recent Evaluations */}
                <View style={styles.contentCard}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Recent Evaluations</Text>
                        <TouchableOpacity onPress={() => router.push('/dashboard/history')}>
                            <View style={styles.viewAll}>
                                <Text style={styles.viewAllText}>View all</Text>
                                <ArrowRight size={14} color="#2563eb" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cardContent}>
                        {recentEvaluations.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.listItem}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.itemTitle} numberOfLines={1}>{item.name}</Text>
                                    <View style={styles.itemMeta}>
                                        <Text style={styles.metaText}>{item.date}</Text>
                                        <Text style={styles.metaDot}>•</Text>
                                        <Text style={styles.metaText}>{item.stage}</Text>
                                    </View>
                                </View>
                                <View style={styles.itemStatus}>
                                    {item.status === 'Completed' ? (
                                        <View style={styles.successBadge}>
                                            <View>
                                                <Text style={styles.successRate}>{item.successRate}%</Text>
                                                <Text style={styles.successLabel}>Success</Text>
                                            </View>
                                            <CheckCircle2 size={18} color="#16a34a" />
                                        </View>
                                    ) : (
                                        <View style={styles.wipBadge}>
                                            <Text style={styles.wipText}>In Progress</Text>
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Top Startups */}
                <View style={styles.contentCard}>
                    <View style={styles.cardHeader}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Globe size={18} color="#111827" />
                            <Text style={styles.cardTitle}>Top Global Startups</Text>
                        </View>
                        <Text style={styles.cardSubtitle}>This Month</Text>
                    </View>
                    <View style={styles.cardContent}>
                        {topGlobalStartups.map((startup, index) => (
                            <TouchableOpacity key={startup.id} style={styles.listItem}>
                                <View style={styles.rankBox}>
                                    <Text style={styles.rankText}>{index + 1}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.itemTitle} numberOfLines={1}>{startup.name}</Text>
                                    <View style={styles.itemMeta}>
                                        <Text style={styles.metaText}>{startup.industry}</Text>
                                        <Text style={styles.metaDot}>•</Text>
                                        <Text style={styles.metaText}>{startup.country}</Text>
                                    </View>
                                </View>
                                <View style={styles.trendBox}>
                                    <View>
                                        <Text style={styles.scoreText}>{startup.successScore}</Text>
                                        <Text style={styles.fundingText}>{startup.funding}</Text>
                                    </View>
                                    {startup.trend === 'up' ? (
                                        <TrendingUp size={16} color="#16a34a" />
                                    ) : (
                                        <TrendingDown size={16} color="#dc2626" />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

            </View>

            {/* Progress Section */}
            <View style={styles.contentCard}>
                <Text style={styles.cardTitle}>Your Evaluation Progress</Text>
                <View style={{ marginTop: 16 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={styles.progressLabel}>Overall Completion</Text>
                        <Text style={styles.progressValue}>75%</Text>
                    </View>
                    <View style={styles.progressBarBackground}>
                        <LinearGradient
                            colors={['#3b82f6', '#2563eb']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[styles.progressBarFill, { width: '75%' }]}
                        />
                    </View>
                </View>

                <View style={styles.progressStatsGrid}>
                    <View style={[styles.progressStatBox, { backgroundColor: '#eff6ff' }]}>
                        <Text style={[styles.pStatValue, { color: '#2563eb' }]}>9</Text>
                        <Text style={styles.pStatLabel}>Completed</Text>
                    </View>
                    <View style={[styles.progressStatBox, { backgroundColor: '#faf5ff' }]}>
                        <Text style={[styles.pStatValue, { color: '#9333ea' }]}>3</Text>
                        <Text style={styles.pStatLabel}>In Progress</Text>
                    </View>
                    <View style={[styles.progressStatBox, { backgroundColor: '#f0fdf4' }]}>
                        <Text style={[styles.pStatValue, { color: '#16a34a' }]}>85%</Text>
                        <Text style={styles.pStatLabel}>Avg Rate</Text>
                    </View>
                </View>
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6', // gray-100
    },
    contentContainer: {
        padding: 16,
    },
    welcomeSection: {
        marginBottom: 24,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    welcomeHeader: {
        gap: 16,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    logoBox: {
        width: 48,
        height: 48,
        backgroundColor: '#000000',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
    },
    aiBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2,
    },
    aiBadgeText: {
        fontSize: 12,
        color: '#4b5563',
    },
    greetingContainer: {
        marginTop: 4,
    },
    greetingText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    dateText: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 2,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
    },
    statCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        width: (width - 32 - 12) / 2, // 2 columns
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    statHeader: {
        marginBottom: 12,
    },
    statIconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
    },
    statName: {
        fontSize: 13,
        fontWeight: '500',
        color: '#111827',
        marginTop: 4,
    },
    statChange: {
        fontSize: 11,
        color: '#6b7280',
        marginTop: 2,
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 12,
    },
    actionCard: {
        width: (width - 32 - 12) / 2,
        padding: 16,
        borderRadius: 16,
        height: 140,
        justifyContent: 'center',
    },
    actionIcon: {
        marginBottom: 16,
    },
    actionName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 4,
    },
    actionDesc: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.9)',
    },
    listsContainer: {
        gap: 24,
        marginBottom: 24,
    },
    contentCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        padding: 16,
        marginBottom: 24,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    viewAll: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    viewAllText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2563eb',
    },
    cardSubtitle: {
        fontSize: 12,
        color: '#6b7280',
    },
    cardContent: {
        gap: 12,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        gap: 12,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    itemMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: 11,
        color: '#6b7280',
    },
    metaDot: {
        fontSize: 11,
        color: '#d1d5db',
    },
    itemStatus: {
        alignItems: 'flex-end',
    },
    successBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    successRate: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
        textAlign: 'right',
    },
    successLabel: {
        fontSize: 10,
        color: '#6b7280',
        textAlign: 'right',
    },
    wipBadge: {
        backgroundColor: '#fefce8',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
    },
    wipText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#ca8a04',
    },
    rankBox: {
        width: 32,
        height: 32,
        backgroundColor: '#111827',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rankText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    trendBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    scoreText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111827',
        textAlign: 'right',
    },
    fundingText: {
        fontSize: 10,
        color: '#6b7280',
        textAlign: 'right',
    },
    progressLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#111827',
    },
    progressValue: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#111827',
    },
    progressBarBackground: {
        height: 12,
        backgroundColor: '#e5e7eb',
        borderRadius: 999,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 999,
    },
    progressStatsGrid: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 16,
    },
    progressStatBox: {
        flex: 1,
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    pStatValue: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    pStatLabel: {
        fontSize: 11,
        color: '#4b5563',
    },
});

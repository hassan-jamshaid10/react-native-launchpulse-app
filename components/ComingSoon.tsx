import * as Icons from 'lucide-react-native';
import { Construction, Sparkles } from 'lucide-react-native';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

interface ComingSoonProps {
    iconName: keyof typeof Icons;
    title: string;
    tagline: string;
    description?: string;
}

const { width } = Dimensions.get('window');

export default function ComingSoon({
    iconName,
    title,
    tagline,
    description = "We're working hard to bring you this feature. Stay tuned!",
}: ComingSoonProps) {
    // Get icon component dynamically
    const IconComponent = Icons[iconName] as React.ElementType;

    if (!IconComponent) {
        return (
            <View style={styles.center}>
                <Text>Error: Icon "{String(iconName)}" not found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Sub-Header */}
            <View style={styles.headerCard}>
                <View style={styles.headerContent}>
                    {/* Logo Box */}
                    <View style={styles.logoBox}>
                        <IconComponent size={28} color="#ffffff" strokeWidth={2.5} />
                    </View>

                    {/* Title & Tagline */}
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>{title}</Text>
                        <View style={styles.taglineBox}>
                            <Sparkles size={14} color="#2563eb" />
                            <Text style={styles.taglineText}>{tagline}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
                <View style={styles.contentWrapper}>
                    {/* Construction Icon Circle */}
                    <View style={styles.constructionCircle}>
                        <Construction size={48} color="#9ca3af" />
                    </View>

                    {/* Main Text */}
                    <Text style={styles.mainTitle}>Coming Soon</Text>
                    <Text style={styles.descriptionText}>{description}</Text>

                    {/* Feature Highlights Grid */}
                    <View style={styles.gridContainer}>
                        {/* Highlight 1 */}
                        <View style={styles.featureCard}>
                            <View style={[styles.featureIconBox, { backgroundColor: '#dbeafe' }]}>
                                <Sparkles size={24} color="#2563eb" />
                            </View>
                            <Text style={styles.featureTitle}>AI-Powered</Text>
                            <Text style={styles.featureDesc}>Advanced analytics and predictions</Text>
                        </View>

                        {/* Highlight 2 */}
                        <View style={styles.featureCard}>
                            <View style={[styles.featureIconBox, { backgroundColor: '#dcfce7' }]}>
                                <IconComponent size={24} color="#16a34a" />
                            </View>
                            <Text style={styles.featureTitle}>Intuitive</Text>
                            <Text style={styles.featureDesc}>Easy-to-use interface</Text>
                        </View>

                        {/* Highlight 3 */}
                        <View style={styles.featureCard}>
                            <View style={[styles.featureIconBox, { backgroundColor: '#f3e8ff' }]}>
                                <Construction size={24} color="#9333ea" />
                            </View>
                            <Text style={styles.featureTitle}>In Progress</Text>
                            <Text style={styles.featureDesc}>Actively being developed</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 40,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24, // py-6 ~ 24
        marginBottom: 32,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    logoBox: {
        width: 56, // w-14
        height: 56, // h-14
        backgroundColor: '#000000',
        borderRadius: 12, // rounded-xl
        alignItems: 'center',
        justifyContent: 'center',
        // shadow-lg
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 24, // text-2xl
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },
    taglineBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    taglineText: {
        fontSize: 14, // text-sm
        color: '#4b5563',
    },
    mainContent: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 400, // min-h-[60vh] approx
    },
    contentWrapper: {
        width: '100%',
        maxWidth: 600,
        alignItems: 'center',
    },
    constructionCircle: {
        width: 96, // w-24
        height: 96, // h-24
        backgroundColor: '#f3f4f6', // bg-gray-100
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    mainTitle: {
        fontSize: 36, // text-4xl
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 16,
        textAlign: 'center',
    },
    descriptionText: {
        fontSize: 18, // text-lg
        color: '#4b5563',
        textAlign: 'center',
        marginBottom: 48,
        lineHeight: 28,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        justifyContent: 'center',
        width: '100%',
    },
    featureCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        alignItems: 'center',
        width: '100%', // Mobile first, can be adjusted
        // For "md:grid-cols-3" analog, we might want fixed width on larger screens, 
        // but flex basis is easier. Let's act like mobile-first: stack them.
        // Or if width allows, side-by-side.
        minWidth: 200,
        flex: 1,
    },
    featureIconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
    },
    featureDesc: {
        fontSize: 14,
        color: '#4b5563',
        textAlign: 'center',
    },
});

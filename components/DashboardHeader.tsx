import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Bell, ChevronDown, LogOut, Menu, Settings, Sparkles, User } from 'lucide-react-native';

import { useState } from 'react';
import {
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface DashboardHeaderProps {
    user?: {
        name?: string | null;
        email?: string | null;
        role?: string | null;
    };
}

export default function DashboardHeader({
    user = { name: 'User Name', email: 'user@example.com', role: 'Member' },
}: DashboardHeaderProps) {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);

    // Mock notifications
    const notifications = [
        {
            id: 1,
            title: 'New Prediction Ready',
            message: 'Your startup analysis is complete',
            time: '5m ago',
            unread: true,
        },
        {
            id: 2,
            title: 'Document Uploaded',
            message: 'Pitch deck successfully processed',
            time: '1h ago',
            unread: true,
        },
        {
            id: 3,
            title: 'Market Trend Alert',
            message: 'New opportunity in your industry',
            time: '3h ago',
            unread: false,
        },
    ];

    const unreadCount = notifications.filter((n) => n.unread).length;

    const getInitials = (name?: string | null) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const toggleDrawer = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    };

    return (
        <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
            <View style={styles.contentContainer}>
                {/* Left Section - Mobile Menu & Logo */}
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
                        <Menu size={24} color="#4B5563" />
                    </TouchableOpacity>

                    <View style={styles.logoContainer}>
                        <Sparkles size={24} color="#2563EB" />
                        <Text style={styles.logoText}>LaunchPulse</Text>
                    </View>
                </View>

                {/* Right Section */}
                <View style={styles.rightSection}>
                    {/* Notifications */}
                    <View style={styles.iconButtonContainer}>
                        <TouchableOpacity
                            onPress={() => setNotificationOpen(true)}
                            style={styles.iconButton}
                        >
                            <Bell size={24} color="#4B5563" />
                            {unreadCount > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{unreadCount}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* User Menu */}
                    <TouchableOpacity
                        onPress={() => setUserDropdownOpen(true)}
                        style={styles.userButton}
                    >
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{getInitials(user.name)}</Text>
                        </View>
                        <ChevronDown
                            size={16}
                            color="#4B5563"
                            style={userDropdownOpen ? styles.chevronRotated : undefined}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Notification Modal/Dropdown */}
            <Modal
                visible={notificationOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setNotificationOpen(false)}
            >
                <TouchableWithoutFeedback onPress={() => setNotificationOpen(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={[styles.dropdown, styles.notificationDropdown]}>
                                <View style={styles.dropdownHeader}>
                                    <Text style={styles.dropdownTitle}>Notifications</Text>
                                </View>
                                <ScrollView style={styles.notificationsList}>
                                    {notifications.map((notification) => (
                                        <TouchableOpacity
                                            key={notification.id}
                                            style={[
                                                styles.notificationItem,
                                                notification.unread && styles.notificationUnread,
                                            ]}
                                        >
                                            <View style={styles.notificationRow}>
                                                {notification.unread && (
                                                    <View style={styles.unreadDot} />
                                                )}
                                                <View style={styles.notificationContent}>
                                                    <Text style={styles.notificationTitle}>
                                                        {notification.title}
                                                    </Text>
                                                    <Text style={styles.notificationMessage}>
                                                        {notification.message}
                                                    </Text>
                                                    <Text style={styles.notificationTime}>
                                                        {notification.time}
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                                <TouchableOpacity style={styles.viewAllButton}>
                                    <Text style={styles.viewAllText}>View all notifications</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* User Modal/Dropdown */}
            <Modal
                visible={userDropdownOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setUserDropdownOpen(false)}
            >
                <TouchableWithoutFeedback onPress={() => setUserDropdownOpen(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={[styles.dropdown, styles.userDropdown]}>
                                <View style={styles.dropdownHeader}>
                                    <Text style={styles.dropdownTitle}>{user.name}</Text>
                                    <Text style={styles.dropdownSubtitle}>{user.email}</Text>
                                    <View style={styles.roleContainer}>
                                        <Text style={styles.dropdownRole}>{user.role}</Text>
                                    </View>
                                </View>
                                <View style={styles.dropdownSection}>
                                    <TouchableOpacity style={styles.dropdownItem}>
                                        <User size={20} color="#4B5563" />
                                        <Text style={styles.dropdownItemText}>Profile</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.dropdownItem}>
                                        <Settings size={20} color="#4B5563" />
                                        <Text style={styles.dropdownItemText}>Settings</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.dropdownSection, styles.borderTop]}>
                                    <TouchableOpacity style={styles.dropdownItem}>
                                        <LogOut size={20} color="#DC2626" />
                                        <Text style={[styles.dropdownItemText, styles.textRed]}>
                                            Sign Out
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        zIndex: 50,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        height: 64,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuButton: {
        padding: 8,
        marginRight: 8,
        borderRadius: 8,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2563EB', // Blue-600 fallback for gradient
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconButtonContainer: {
        position: 'relative',
    },
    iconButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'transparent',
    },
    badge: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: '#EF4444',
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    userButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
        borderRadius: 20,
        gap: 8,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#4F46E5', // Indigo-600
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatarText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
    },
    chevronRotated: {
        transform: [{ rotate: '180deg' }],
    },

    // Dropdown/Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: Platform.OS === 'ios' ? 100 : 80, // Approximate header height offset
        paddingRight: 16,
    },
    dropdown: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        overflow: 'hidden',
    },
    notificationDropdown: {
        width: 320,
        maxHeight: 480,
        marginRight: 60, // positioning relative to screen
    },
    userDropdown: {
        width: 240,
    },
    dropdownHeader: {
        padding: 16,
        backgroundColor: '#F9FAFB',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    dropdownTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    dropdownSubtitle: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    roleContainer: {
        marginTop: 8,
        alignSelf: 'flex-start',
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#DBEAFE',
    },
    dropdownRole: {
        fontSize: 11,
        fontWeight: '500',
        color: '#2563EB',
    },
    notificationsList: {
        maxHeight: 320,
    },
    notificationItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    notificationUnread: {
        backgroundColor: '#EFF6FF',
    },
    notificationRow: {
        flexDirection: 'row',
        gap: 12,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#2563EB',
        marginTop: 6,
    },
    notificationContent: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    notificationMessage: {
        fontSize: 14,
        color: '#4B5563',
        marginTop: 2,
    },
    notificationTime: {
        fontSize: 12,
        color: '#9CA3AF',
        marginTop: 4,
    },
    viewAllButton: {
        padding: 12,
        backgroundColor: '#F9FAFB',
        alignItems: 'center',
    },
    viewAllText: {
        color: '#2563EB',
        fontSize: 14,
        fontWeight: '500',
    },
    dropdownSection: {
        paddingVertical: 8,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        gap: 12,
    },
    dropdownItemText: {
        fontSize: 14,
        color: '#374151',
    },
    borderTop: {
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    textRed: {
        color: '#DC2626',
    },
});

import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface NavigationItem {
    id: string;
    name: string;
    route: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    permission?: string;
}

export const MAIN_NAVIGATION: NavigationItem[] = [
    {
        id: 'dashboard',
        name: 'Dashboard',
        route: '/dashboard',
        icon: 'view-dashboard-outline',
        permission: 'dashboard:view',
    },
    {
        id: 'new-evaluation',
        name: 'New Evaluation',
        route: '/dashboard/new-evaluation',
        icon: 'lightbulb-outline',
        permission: 'idea:submit',
    },
    {
        id: 'startups',
        name: 'My Startups',
        route: '/dashboard/startups',
        icon: 'rocket-launch-outline',
        permission: 'startup:view',
    },
    {
        id: 'history',
        name: 'History',
        route: '/dashboard/history',
        icon: 'history',
        permission: 'history:view',
    },
    {
        id: 'chat',
        name: 'AI Assistant',
        route: '/dashboard/chat',
        icon: 'chat-processing-outline',
        permission: 'chat:access',
    },
    {
        id: 'portfolio',
        name: 'Portfolio',
        route: '/dashboard/portfolio',
        icon: 'briefcase-outline',
        permission: 'portfolio:view',
    },
    {
        id: 'analytics',
        name: 'Analytics',
        route: '/dashboard/analytics',
        icon: 'chart-bar',
        permission: 'analytics:view',
    },
    {
        id: 'reports',
        name: 'Reports',
        route: '/dashboard/reports',
        icon: 'file-document-outline',
        permission: 'report:view',
    },
];

export const SETTINGS_NAVIGATION: NavigationItem[] = [
    {
        id: 'team',
        name: 'Team',
        route: '/dashboard/team',
        icon: 'account-group-outline',
        permission: 'team:view',
    },
    {
        id: 'settings',
        name: 'Settings',
        route: '/dashboard/settings',
        icon: 'cog-outline',
        permission: 'settings:view',
    },
];

export interface NavigationItem {
    id: string;
    name: string;
    route: string;
    icon: string;
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
        id: 'evaluations',
        name: 'Evaluations',
        route: '/dashboard/evaluations',
        icon: 'chart-line-variant',
        permission: 'evaluation:view',
    },
    {
        id: 'startups',
        name: 'My Startups',
        route: '/dashboard/startups',
        icon: 'office-building-outline',
        permission: 'startup:view',
    },
    {
        id: 'analytics',
        name: 'Analytics',
        route: '/dashboard/analytics',
        icon: 'google-analytics',
        permission: 'analytics:view',
    },
    {
        id: 'competitors',
        name: 'Competitors',
        route: '/dashboard/startup-comparisons',
        icon: 'compare-horizontal',
        permission: 'competitors:view',
    },
    {
        id: 'roadmap',
        name: 'Roadmap',
        route: '/dashboard/roadmap',
        icon: 'map-outline',
        permission: 'roadmap:view',
    },
    {
        id: 'chat',
        name: 'AI Assistant',
        route: '/dashboard/chat',
        icon: 'robot-outline',
        permission: 'chat:access',
    },
];

export const SETTINGS_NAVIGATION: NavigationItem[] = [
    {
        id: 'reports',
        name: 'Reports',
        route: '/dashboard/reports',
        icon: 'file-document-outline',
        permission: 'report:view',
    },
    {
        id: 'team',
        name: 'Teams',
        route: '/dashboard/team',
        icon: 'account-group-outline',
        permission: 'team:view',
    },
    {
        id: 'documentation',
        name: 'Documentation',
        route: '/dashboard/getting-started',
        icon: 'text-box-outline',
        permission: 'documentation:view',
    },
    {
        id: 'settings',
        name: 'Settings',
        route: '/dashboard/settings',
        icon: 'cog-outline',
        permission: 'settings:view',
    },
];

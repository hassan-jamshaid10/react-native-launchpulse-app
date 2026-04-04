// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const { resolver } = config;

// @tanstack/react-query v5 support
config.resolver.sourceExts.push('cjs');
config.resolver.sourceExts.push('mjs');

// 1. Enable package exports
config.resolver.unstable_enablePackageExports = true;

// 2. Add condition names to ensure we pick up the right entry point
config.resolver.unstable_conditionNames = ['react-native', 'browser', 'require', 'import', 'default'];

module.exports = config;

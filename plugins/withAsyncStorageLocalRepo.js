const { withProjectBuildGradle } = require("@expo/config-plugins");

/**
 * Expo Config Plugin to add local Maven repository for @react-native-async-storage/async-storage 3.0.0+
 * This is required for Gradle to find 'org.asyncstorage.shared_storage:storage-android:1.0.0'
 */
const withAsyncStorageLocalRepo = (config) => {
    return withProjectBuildGradle(config, (config) => {
        if (config.modResults.language === "groovy") {
            config.modResults.contents = addMavenRepo(config.modResults.contents);
        }
        return config;
    });
};

function addMavenRepo(content) {
    const repoLine = 'maven { url = uri("${rootProject.projectDir}/../node_modules/@react-native-async-storage/async-storage/android/local_repo") }';

    if (content.includes("@react-native-async-storage/async-storage/android/local_repo")) {
        return content;
    }

    // Locating the allprojects -> repositories block
    const repositoriesMatch = content.match(/allprojects\s*\{\s*repositories\s*\{/);

    if (repositoriesMatch) {
        return content.replace(
            /allprojects\s*\{\s*repositories\s*\{/,
            `allprojects {
    repositories {
        ${repoLine}`
        );
    } else {
        // Fallback if structure is slightly different, look for google() or mavenCentral() inside a repositories block
        return content.replace(
            /repositories\s*\{/,
            `repositories {
        ${repoLine}`
        );
    }
}

module.exports = withAsyncStorageLocalRepo;

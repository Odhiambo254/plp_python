const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add web support
config.resolver.platforms = ['ios', 'android', 'web'];

// Fix for React Native web bundling issues
config.resolver.alias = {
  'react-native': 'react-native-web',
};

// Ensure proper resolution of utilities
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config;
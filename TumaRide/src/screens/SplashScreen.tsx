import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, spacing } from '../utils/theme';

const SplashScreen = () => {
  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Ionicons name="car" size={80} color={colors.white} />
          <Text style={styles.appName}>TumaRide</Text>
          <Text style={styles.tagline}>Smart Logistics for Kenya</Text>
        </View>
        
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.white} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Connecting Travelers & Senders</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  appName: {
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  tagline: {
    fontSize: fontSize.lg,
    color: colors.white,
    marginTop: spacing.sm,
    textAlign: 'center',
    opacity: 0.9,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  loadingText: {
    fontSize: fontSize.base,
    color: colors.white,
    marginTop: spacing.md,
    opacity: 0.8,
  },
  footer: {
    paddingBottom: spacing.xl,
  },
  footerText: {
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.7,
    textAlign: 'center',
  },
});

export default SplashScreen;
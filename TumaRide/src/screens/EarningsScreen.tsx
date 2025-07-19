import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { colors, fontSize, fontWeight, spacing } from '../utils/theme';

const EarningsScreen = () => {
  const mockEarnings = {
    totalEarnings: 15750,
    thisMonth: 3250,
    lastMonth: 4100,
    pendingPayouts: 850,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Earnings</Text>
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Earnings Summary</Text>
          <View style={styles.earningsGrid}>
            <View style={styles.earningItem}>
              <Text style={styles.earningValue}>KES {mockEarnings.totalEarnings.toLocaleString()}</Text>
              <Text style={styles.earningLabel}>Total Earned</Text>
            </View>
            <View style={styles.earningItem}>
              <Text style={styles.earningValue}>KES {mockEarnings.thisMonth.toLocaleString()}</Text>
              <Text style={styles.earningLabel}>This Month</Text>
            </View>
            <View style={styles.earningItem}>
              <Text style={styles.earningValue}>KES {mockEarnings.lastMonth.toLocaleString()}</Text>
              <Text style={styles.earningLabel}>Last Month</Text>
            </View>
            <View style={styles.earningItem}>
              <Text style={styles.earningValue}>KES {mockEarnings.pendingPayouts.toLocaleString()}</Text>
              <Text style={styles.earningLabel}>Pending</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.emptyState}>
          <Ionicons name="wallet-outline" size={64} color={colors.gray400} />
          <Text style={styles.emptyTitle}>Transaction History</Text>
          <Text style={styles.emptyDescription}>
            Your payment history and earnings breakdown will appear here
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  summaryCard: {
    marginBottom: spacing.lg,
    backgroundColor: colors.primary,
  },
  summaryTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.md,
  },
  earningsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  earningItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
  },
  earningValue: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  earningLabel: {
    fontSize: fontSize.xs,
    color: colors.white,
    opacity: 0.8,
    marginTop: spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginTop: spacing.md,
  },
  emptyDescription: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});

export default EarningsScreen;
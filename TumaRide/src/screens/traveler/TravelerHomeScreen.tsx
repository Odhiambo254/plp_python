import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { colors, fontSize, fontWeight, spacing, borderRadius } from '../../utils/theme';
import { RootStackParamList } from '../../navigation/AppNavigator';

type TravelerHomeNavigationProp = StackNavigationProp<RootStackParamList>;

const TravelerHomeScreen = () => {
  const navigation = useNavigation<TravelerHomeNavigationProp>();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleCreateTrip = () => {
    navigation.navigate('CreateTrip');
  };

  // Mock earnings data
  const earnings = {
    totalEarnings: 15750,
    thisMonth: 3250,
    completedDeliveries: 24,
    rating: 4.8,
  };

  const quickActions = [
    {
      title: 'Create Trip',
      description: 'Register your travel route',
      icon: 'add-circle',
      action: handleCreateTrip,
      color: colors.primary,
    },
    {
      title: 'Find Parcels',
      description: 'Browse available deliveries',
      icon: 'search',
      action: () => {},
      color: colors.secondary,
    },
    {
      title: 'My Earnings',
      description: 'View payment history',
      icon: 'wallet',
      action: () => {},
      color: colors.success,
    },
  ];

  const availableParcels = [
    {
      id: '1',
      from: 'Nairobi CBD',
      to: 'Mombasa',
      price: 450,
      weight: 2,
      type: 'Small Box',
      deadline: '2024-01-20',
    },
    {
      id: '2',
      from: 'Westlands',
      to: 'Kisumu',
      price: 350,
      weight: 0.5,
      type: 'Documents',
      deadline: '2024-01-18',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name?.split(' ')[0]}!</Text>
          <Text style={styles.subtitle}>Ready to earn on your next trip?</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications" size={24} color={colors.white} />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Earnings Overview */}
        <Card style={styles.earningsCard}>
          <Text style={styles.earningsTitle}>Your Earnings</Text>
          <View style={styles.earningsGrid}>
            <View style={styles.earningItem}>
              <Text style={styles.earningValue}>KES {earnings.totalEarnings.toLocaleString()}</Text>
              <Text style={styles.earningLabel}>Total Earned</Text>
            </View>
            <View style={styles.earningItem}>
              <Text style={styles.earningValue}>KES {earnings.thisMonth.toLocaleString()}</Text>
              <Text style={styles.earningLabel}>This Month</Text>
            </View>
            <View style={styles.earningItem}>
              <Text style={styles.earningValue}>{earnings.completedDeliveries}</Text>
              <Text style={styles.earningLabel}>Deliveries</Text>
            </View>
            <View style={styles.earningItem}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color={colors.secondary} />
                <Text style={styles.earningValue}>{earnings.rating}</Text>
              </View>
              <Text style={styles.earningLabel}>Rating</Text>
            </View>
          </View>
        </Card>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionCard}
                onPress={action.action}
                activeOpacity={0.8}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon as any} size={24} color={colors.white} />
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionDescription}>{action.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Create Trip CTA */}
        <Card style={styles.ctaCard}>
          <View style={styles.ctaContent}>
            <Ionicons name="car" size={60} color={colors.primary} />
            <View style={styles.ctaText}>
              <Text style={styles.ctaTitle}>Register Your Next Trip</Text>
              <Text style={styles.ctaDescription}>
                Add your travel plans and earn money by delivering parcels along your route
              </Text>
            </View>
          </View>
          <Button
            title="Create Trip"
            onPress={handleCreateTrip}
            fullWidth
          />
        </Card>

        {/* Available Parcels */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Parcels</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.parcelsList}>
            {availableParcels.map((parcel) => (
              <Card key={parcel.id} style={styles.parcelCard}>
                <View style={styles.parcelHeader}>
                  <View style={styles.parcelRoute}>
                    <Text style={styles.parcelLocation}>{parcel.from}</Text>
                    <Ionicons name="arrow-forward" size={16} color={colors.gray400} />
                    <Text style={styles.parcelLocation}>{parcel.to}</Text>
                  </View>
                  <Text style={styles.parcelPrice}>KES {parcel.price}</Text>
                </View>
                
                <View style={styles.parcelDetails}>
                  <View style={styles.parcelDetailItem}>
                    <Ionicons name="cube" size={16} color={colors.gray400} />
                    <Text style={styles.parcelDetailText}>
                      {parcel.type} • {parcel.weight}kg
                    </Text>
                  </View>
                  <View style={styles.parcelDetailItem}>
                    <Ionicons name="time" size={16} color={colors.gray400} />
                    <Text style={styles.parcelDetailText}>
                      By {new Date(parcel.deadline).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
                
                <Button
                  title="Accept Delivery"
                  onPress={() => {}}
                  fullWidth
                  size="small"
                  style={styles.acceptButton}
                />
              </Card>
            ))}
          </View>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.9,
    marginTop: spacing.xs,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.error,
    borderRadius: borderRadius.full,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadgeText: {
    fontSize: 10,
    color: colors.white,
    fontWeight: fontWeight.bold,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  earningsCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
  },
  earningsTitle: {
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  section: {
    marginVertical: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  seeAllText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...require('../../utils/theme').shadows.sm,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  quickActionTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  quickActionDescription: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 14,
  },
  ctaCard: {
    marginVertical: spacing.lg,
  },
  ctaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  ctaText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  ctaTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  ctaDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  parcelsList: {
    gap: spacing.md,
  },
  parcelCard: {
    marginBottom: 0,
  },
  parcelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  parcelRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  parcelLocation: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.text,
    marginHorizontal: spacing.xs,
  },
  parcelPrice: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  parcelDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  parcelDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  parcelDetailText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  acceptButton: {
    marginTop: spacing.sm,
  },
});

export default TravelerHomeScreen;
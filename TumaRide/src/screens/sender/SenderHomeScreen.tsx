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
import { Parcel } from '../../types';

type SenderHomeNavigationProp = StackNavigationProp<RootStackParamList>;

const SenderHomeScreen = () => {
  const navigation = useNavigation<SenderHomeNavigationProp>();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  // Mock data - in a real app, this would come from an API
  const [recentParcels] = useState<Parcel[]>([
    {
      id: '1',
      senderId: user?.id || '',
      type: 'small',
      weight: 2,
      pickup: {
        id: '1',
        name: 'Nairobi CBD',
        county: 'Nairobi',
        coordinates: { latitude: -1.2921, longitude: 36.8219 },
      },
      dropoff: {
        id: '2',
        name: 'Mombasa Town',
        county: 'Mombasa',
        coordinates: { latitude: -4.0435, longitude: 39.6682 },
      },
      price: 450,
      status: 'in_transit',
      createdAt: new Date('2024-01-15'),
      paymentMethod: 'pay_on_delivery',
      distance: 480,
    },
    {
      id: '2',
      senderId: user?.id || '',
      type: 'documents',
      weight: 0.5,
      pickup: {
        id: '3',
        name: 'Westlands',
        county: 'Nairobi',
        coordinates: { latitude: -1.2676, longitude: 36.8108 },
      },
      dropoff: {
        id: '4',
        name: 'Kisumu City',
        county: 'Kisumu',
        coordinates: { latitude: -0.0917, longitude: 34.7680 },
      },
      price: 350,
      status: 'delivered',
      createdAt: new Date('2024-01-10'),
      paymentMethod: 'pay_on_delivery',
      distance: 350,
    },
  ]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleCreateParcel = () => {
    navigation.navigate('CreateParcel');
  };

  const handleParcelPress = (parcelId: string) => {
    navigation.navigate('ParcelDetails', { parcelId });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return colors.warning;
      case 'accepted': return colors.primary;
      case 'picked': return colors.primaryLight;
      case 'in_transit': return colors.secondary;
      case 'delivered': return colors.success;
      case 'cancelled': return colors.error;
      default: return colors.gray400;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Finding Traveler';
      case 'accepted': return 'Traveler Assigned';
      case 'picked': return 'Picked Up';
      case 'in_transit': return 'In Transit';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const quickActions = [
    {
      title: 'Send Parcel',
      description: 'Create a new delivery request',
      icon: 'cube',
      action: handleCreateParcel,
      color: colors.primary,
    },
    {
      title: 'Price Calculator',
      description: 'Calculate delivery costs',
      icon: 'calculator',
      action: () => {},
      color: colors.secondary,
    },
    {
      title: 'Track Parcel',
      description: 'Check delivery status',
      icon: 'location',
      action: () => {},
      color: colors.success,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name?.split(' ')[0]}!</Text>
          <Text style={styles.subtitle}>Ready to send a parcel?</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications" size={24} color={colors.white} />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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

        {/* Create Parcel CTA */}
        <Card style={styles.ctaCard}>
          <View style={styles.ctaContent}>
            <Ionicons name="add-circle" size={60} color={colors.primary} />
            <View style={styles.ctaText}>
              <Text style={styles.ctaTitle}>Send Your First Parcel</Text>
              <Text style={styles.ctaDescription}>
                Connect with trusted travelers and get your package delivered safely
              </Text>
            </View>
          </View>
          <Button
            title="Create Parcel"
            onPress={handleCreateParcel}
            fullWidth
          />
        </Card>

        {/* Recent Parcels */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Parcels</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {recentParcels.length === 0 ? (
            <Card style={styles.emptyState}>
              <Ionicons name="cube-outline" size={48} color={colors.gray400} />
              <Text style={styles.emptyStateText}>No parcels yet</Text>
              <Text style={styles.emptyStateDescription}>
                Create your first parcel to get started
              </Text>
            </Card>
          ) : (
            <View style={styles.parcelsList}>
              {recentParcels.map((parcel) => (
                <TouchableOpacity
                  key={parcel.id}
                  onPress={() => handleParcelPress(parcel.id)}
                  activeOpacity={0.8}
                >
                  <Card style={styles.parcelCard}>
                    <View style={styles.parcelHeader}>
                      <View style={styles.parcelRoute}>
                        <Text style={styles.parcelLocation}>{parcel.pickup.name}</Text>
                        <Ionicons name="arrow-forward" size={16} color={colors.gray400} />
                        <Text style={styles.parcelLocation}>{parcel.dropoff.name}</Text>
                      </View>
                      <View style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(parcel.status) }
                      ]}>
                        <Text style={styles.statusText}>{getStatusText(parcel.status)}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.parcelDetails}>
                      <View style={styles.parcelDetailItem}>
                        <Ionicons name="cube" size={16} color={colors.gray400} />
                        <Text style={styles.parcelDetailText}>
                          {parcel.type} • {parcel.weight}kg
                        </Text>
                      </View>
                      <View style={styles.parcelDetailItem}>
                        <Ionicons name="calendar" size={16} color={colors.gray400} />
                        <Text style={styles.parcelDetailText}>
                          {parcel.createdAt.toLocaleDateString()}
                        </Text>
                      </View>
                      <View style={styles.parcelDetailItem}>
                        <Ionicons name="cash" size={16} color={colors.gray400} />
                        <Text style={styles.parcelPriceText}>KES {parcel.price}</Text>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          )}
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
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    fontSize: fontSize.xs,
    color: colors.white,
    fontWeight: fontWeight.medium,
  },
  parcelDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  parcelPriceText: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: fontWeight.semibold,
    marginLeft: spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyStateText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    color: colors.text,
    marginTop: spacing.md,
  },
  emptyStateDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});

export default SenderHomeScreen;
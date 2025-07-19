import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { colors, fontSize, fontWeight, spacing, borderRadius } from '../../utils/theme';

const RoleSelectionScreen = () => {
  const { updateUser } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'sender' | 'traveler' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    {
      id: 'sender' as const,
      title: 'I want to Send Parcels',
      description: 'Send packages and documents to destinations across Kenya through trusted travelers',
      icon: 'cube',
      benefits: [
        'Affordable delivery rates',
        'Real-time tracking',
        'Secure & insured deliveries',
        'Flexible pickup & dropoff',
      ],
    },
    {
      id: 'traveler' as const,
      title: 'I want to Earn as a Traveler',
      description: 'Earn money by delivering parcels on your existing travel routes',
      icon: 'car',
      benefits: [
        'Earn extra income',
        'Flexible schedule',
        'Use existing travel plans',
        'Build your reputation',
      ],
    },
  ];

  const handleRoleSelection = (role: 'sender' | 'traveler') => {
    setSelectedRole(role);
  };

  const handleContinue = async () => {
    if (!selectedRole) {
      Alert.alert('Please select a role', 'Choose whether you want to send parcels or earn as a traveler');
      return;
    }

    setIsLoading(true);
    try {
      await updateUser({ role: selectedRole });
    } catch (error) {
      Alert.alert('Error', 'Failed to update your role. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoSymbol}>
            <View style={styles.logoArrow} />
            <Text style={styles.logoText}>T</Text>
          </View>
          <Text style={styles.appName}>TumaRide</Text>
          <Text style={styles.subtitle}>How would you like to use TumaRide?</Text>
        </View>

        {/* Role Options */}
        <View style={styles.rolesContainer}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={[
                styles.roleCard,
                selectedRole === role.id && styles.selectedRoleCard,
              ]}
              onPress={() => handleRoleSelection(role.id)}
              activeOpacity={0.8}
            >
              <Card style={
                selectedRole === role.id 
                  ? [styles.cardContent, styles.selectedCardContent]
                  : styles.cardContent
              }>
                <View style={styles.roleHeader}>
                  <View style={[
                    styles.iconContainer,
                    selectedRole === role.id && styles.selectedIconContainer,
                  ]}>
                    <Ionicons
                      name={role.icon as any}
                      size={32}
                      color={selectedRole === role.id ? colors.white : colors.primary}
                    />
                  </View>
                  <View style={styles.roleInfo}>
                    <Text style={[
                      styles.roleTitle,
                      selectedRole === role.id && styles.selectedRoleTitle,
                    ]}>
                      {role.title}
                    </Text>
                    <Text style={[
                      styles.roleDescription,
                      selectedRole === role.id && styles.selectedRoleDescription,
                    ]}>
                      {role.description}
                    </Text>
                  </View>
                </View>

                <View style={styles.benefitsList}>
                  {role.benefits.map((benefit, index) => (
                    <View key={index} style={styles.benefitItem}>
                      <Ionicons
                        name="checkmark-circle"
                        size={16}
                        color={selectedRole === role.id ? colors.white : colors.success}
                        style={styles.benefitIcon}
                      />
                      <Text style={[
                        styles.benefitText,
                        selectedRole === role.id && styles.selectedBenefitText,
                      ]}>
                        {benefit}
                      </Text>
                    </View>
                  ))}
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Button */}
        <View style={styles.footer}>
          <Button
            title="Continue"
            onPress={handleContinue}
            loading={isLoading}
            disabled={!selectedRole}
            fullWidth
            size="large"
          />
          
          <Text style={styles.footerNote}>
            Don't worry, you can change this later in your profile settings
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  logoSymbol: {
    width: 70,
    height: 70,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    position: 'relative',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  logoArrow: {
    position: 'absolute',
    width: 42,
    height: 5,
    backgroundColor: colors.primary,
    borderRadius: 3,
    top: 24,
    left: 14,
    transform: [{ skewY: '15deg' }],
  },
  logoText: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  appName: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: colors.primary,
    marginTop: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  rolesContainer: {
    flex: 1,
    gap: spacing.lg,
  },
  roleCard: {
    flex: 1,
  },
  selectedRoleCard: {
    transform: [{ scale: 1.02 }],
  },
  cardContent: {
    borderWidth: 2,
    borderColor: colors.gray200,
  },
  selectedCardContent: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  selectedIconContainer: {
    backgroundColor: colors.primaryLight,
  },
  roleInfo: {
    flex: 1,
  },
  roleTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  selectedRoleTitle: {
    color: colors.white,
  },
  roleDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  selectedRoleDescription: {
    color: colors.white,
    opacity: 0.9,
  },
  benefitsList: {
    gap: spacing.sm,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitIcon: {
    marginRight: spacing.sm,
  },
  benefitText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    flex: 1,
  },
  selectedBenefitText: {
    color: colors.white,
    opacity: 0.9,
  },
  footer: {
    paddingVertical: spacing.xl,
  },
  footerNote: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});

export default RoleSelectionScreen;
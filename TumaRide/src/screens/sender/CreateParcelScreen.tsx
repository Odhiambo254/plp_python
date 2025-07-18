import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Card } from '../../components/Card';
import { colors, fontSize, fontWeight, spacing, borderRadius } from '../../utils/theme';
import { PARCEL_TYPES, calculatePrice, getPriceBreakdown } from '../../utils/pricing';
import { ParcelType } from '../../types';

const CreateParcelScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    type: '' as ParcelType | '',
    weight: '',
    pickup: '',
    dropoff: '',
    description: '',
    distance: 150, // Mock distance for demo
  });
  const [showPricing, setShowPricing] = useState(false);

  const parcelTypes = Object.entries(PARCEL_TYPES).map(([key, value]) => ({
    id: key as ParcelType,
    ...value,
  }));

  const canCalculatePrice = formData.type && formData.weight && parseFloat(formData.weight) > 0;
  
  const priceBreakdown = canCalculatePrice 
    ? getPriceBreakdown(formData.type as ParcelType, parseFloat(formData.weight), formData.distance)
    : null;

  const handleSubmit = () => {
    if (!formData.type || !formData.weight || !formData.pickup || !formData.dropoff) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    Alert.alert('Success', 'Parcel created successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Card>
          <Text style={styles.title}>Create New Parcel</Text>
          
          {/* Parcel Type Selection */}
          <Text style={styles.label}>Parcel Type *</Text>
          <View style={styles.typeGrid}>
            {parcelTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeCard,
                  formData.type === type.id && styles.selectedTypeCard,
                ]}
                onPress={() => setFormData(prev => ({ ...prev, type: type.id }))}
              >
                <Ionicons 
                  name="cube" 
                  size={24} 
                  color={formData.type === type.id ? colors.white : colors.primary} 
                />
                <Text style={[
                  styles.typeTitle,
                  formData.type === type.id && styles.selectedTypeTitle,
                ]}>
                  {type.label}
                </Text>
                <Text style={[
                  styles.typeDescription,
                  formData.type === type.id && styles.selectedTypeDescription,
                ]}>
                  Max {type.maxWeight}kg
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Input
            label="Weight (kg) *"
            value={formData.weight}
            onChangeText={(value) => setFormData(prev => ({ ...prev, weight: value }))}
            placeholder="Enter weight in kg"
            keyboardType="numeric"
          />
          
          <Input
            label="Pickup Location *"
            value={formData.pickup}
            onChangeText={(value) => setFormData(prev => ({ ...prev, pickup: value }))}
            placeholder="Enter pickup address"
            leftIcon="location"
          />
          
          <Input
            label="Dropoff Location *"
            value={formData.dropoff}
            onChangeText={(value) => setFormData(prev => ({ ...prev, dropoff: value }))}
            placeholder="Enter dropoff address"
            leftIcon="location"
          />
          
          <Input
            label="Description (Optional)"
            value={formData.description}
            onChangeText={(value) => setFormData(prev => ({ ...prev, description: value }))}
            placeholder="Describe your parcel"
            multiline
          />
        </Card>

        {/* Price Calculation */}
        {canCalculatePrice && priceBreakdown && (
          <Card style={styles.pricingCard}>
            <View style={styles.pricingHeader}>
              <Text style={styles.pricingTitle}>Estimated Cost</Text>
              <Text style={styles.totalPrice}>KES {priceBreakdown.total}</Text>
            </View>
            
            <View style={styles.priceBreakdown}>
              <View style={styles.priceItem}>
                <Text style={styles.priceLabel}>Base Price</Text>
                <Text style={styles.priceValue}>KES {priceBreakdown.basePrice}</Text>
              </View>
              {priceBreakdown.weightCharge > 0 && (
                <View style={styles.priceItem}>
                  <Text style={styles.priceLabel}>Weight Excess</Text>
                  <Text style={styles.priceValue}>KES {priceBreakdown.weightCharge}</Text>
                </View>
              )}
              <View style={styles.priceItem}>
                <Text style={styles.priceLabel}>Distance ({formData.distance}km)</Text>
                <Text style={styles.priceValue}>KES {priceBreakdown.distanceCharge}</Text>
              </View>
            </View>
            
            <View style={styles.priceNote}>
              <Ionicons name="information-circle" size={16} color={colors.primary} />
              <Text style={styles.priceNoteText}>
                Always cheaper than traditional courier services
              </Text>
            </View>
          </Card>
        )}
        
        <Button
          title="Create Parcel"
          onPress={handleSubmit}
          fullWidth
          style={styles.submitButton}
          disabled={!canCalculatePrice}
        />
      </ScrollView>
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
    paddingTop: spacing.lg,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  typeCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray200,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
  selectedTypeCard: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  selectedTypeTitle: {
    color: colors.white,
  },
  typeDescription: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  selectedTypeDescription: {
    color: colors.white,
    opacity: 0.9,
  },
  pricingCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.gray50,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  pricingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  pricingTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  totalPrice: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  priceBreakdown: {
    marginBottom: spacing.md,
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  priceLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  priceValue: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.text,
  },
  priceNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    gap: spacing.xs,
  },
  priceNoteText: {
    fontSize: fontSize.xs,
    color: colors.white,
    flex: 1,
  },
  submitButton: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
});

export default CreateParcelScreen;
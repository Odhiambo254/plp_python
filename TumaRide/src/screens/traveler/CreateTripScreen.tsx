import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Card } from '../../components/Card';
import { colors, fontSize, fontWeight, spacing } from '../../utils/theme';

const CreateTripScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    availableSpace: '',
    pricePerKg: '',
  });

  const handleSubmit = () => {
    Alert.alert('Success', 'Trip created successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Card>
          <Text style={styles.title}>Register New Trip</Text>
          
          <Input
            label="From"
            value={formData.from}
            onChangeText={(value) => setFormData(prev => ({ ...prev, from: value }))}
            placeholder="Starting location"
          />
          
          <Input
            label="To"
            value={formData.to}
            onChangeText={(value) => setFormData(prev => ({ ...prev, to: value }))}
            placeholder="Destination"
          />
          
          <Input
            label="Travel Date"
            value={formData.date}
            onChangeText={(value) => setFormData(prev => ({ ...prev, date: value }))}
            placeholder="Select travel date"
          />
          
          <Input
            label="Available Space (kg)"
            value={formData.availableSpace}
            onChangeText={(value) => setFormData(prev => ({ ...prev, availableSpace: value }))}
            placeholder="Available cargo space in kg"
            keyboardType="numeric"
          />
          
          <Input
            label="Price per kg (KES)"
            value={formData.pricePerKg}
            onChangeText={(value) => setFormData(prev => ({ ...prev, pricePerKg: value }))}
            placeholder="Your rate per kg"
            keyboardType="numeric"
          />
          
          <Button
            title="Register Trip"
            onPress={handleSubmit}
            fullWidth
            style={styles.submitButton}
          />
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
  submitButton: {
    marginTop: spacing.lg,
  },
});

export default CreateTripScreen;
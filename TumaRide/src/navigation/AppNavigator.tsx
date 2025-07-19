import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../context/AuthContext';
import { colors } from '../utils/theme';

// Import screens (we'll create these next)
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';
import SenderHomeScreen from '../screens/sender/SenderHomeScreen';
import TravelerHomeScreen from '../screens/traveler/TravelerHomeScreen';
import CreateParcelScreen from '../screens/sender/CreateParcelScreen';
import CreateTripScreen from '../screens/traveler/CreateTripScreen';
import DeliveriesScreen from '../screens/DeliveriesScreen';
import EarningsScreen from '../screens/EarningsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ParcelDetailsScreen from '../screens/sender/ParcelDetailsScreen';
import TripDetailsScreen from '../screens/traveler/TripDetailsScreen';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
  Login: undefined;
  Register: undefined;
  RoleSelection: undefined;
  CreateParcel: undefined;
  CreateTrip: undefined;
  ParcelDetails: { parcelId: string };
  TripDetails: { tripId: string };
};

export type TabParamList = {
  Home: undefined;
  Deliveries: undefined;
  Earnings: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  const { user } = useAuth();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Deliveries') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'Earnings') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray400,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.gray200,
          paddingBottom: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={user?.role === 'sender' ? SenderHomeScreen : TravelerHomeScreen} />
      <Tab.Screen name="Deliveries" component={DeliveriesScreen} />
      {user?.role === 'traveler' && (
        <Tab.Screen name="Earnings" component={EarningsScreen} />
      )}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
  </Stack.Navigator>
);

export const AppNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen 
              name="CreateParcel" 
              component={CreateParcelScreen}
              options={{ 
                headerShown: true,
                title: 'Create Parcel',
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.white,
              }}
            />
            <Stack.Screen 
              name="CreateTrip" 
              component={CreateTripScreen}
              options={{ 
                headerShown: true,
                title: 'Create Trip',
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.white,
              }}
            />
            <Stack.Screen 
              name="ParcelDetails" 
              component={ParcelDetailsScreen}
              options={{ 
                headerShown: true,
                title: 'Parcel Details',
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.white,
              }}
            />
            <Stack.Screen 
              name="TripDetails" 
              component={TripDetailsScreen}
              options={{ 
                headerShown: true,
                title: 'Trip Details',
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.white,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
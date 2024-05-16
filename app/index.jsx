import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MapsScreen from './MapsPage';
import HomeScreen from './HomePage';
import ProfileScreen from './ProfilePage';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Tab.Navigator
      initialRouteName="Maps" // Set initialRouteName to 'Home'
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Maps') {
            iconName = 'location-outline';
          } else if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'gold',
        tabBarInactiveTintColor: '#FFC0CB',
        tabBarStyle: {
          backgroundColor: 'maroon',
          display: 'flex',
        },
      })}
    >
      <Tab.Screen name="Maps" component={MapsScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default App;

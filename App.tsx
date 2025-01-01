import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import layar
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';
import DetailScreen from './screens/Detail';
import NewsScreen from './screens/News';

// Konstanta untuk nama rute
const ROUTES = {
  HOME: 'Home',
  PROFILE: 'Profile',
  DETAIL: 'Detail',
  NEWS: 'News',
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTES.HOME}>
        <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
        <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
        <Stack.Screen name={ROUTES.DETAIL} component={DetailScreen} />
        <Stack.Screen name={ROUTES.NEWS} component={NewsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
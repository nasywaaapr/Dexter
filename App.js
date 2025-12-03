// App.js
import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from "./src/screens/SplashScreen";
import LandingScreen from "./src/screens/LandingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import MainScreen from "./src/screens/MainScreen";
import ModeBelajarScreen from "./src/screens/ModeBelajarScreen";
import DetailScreen from "./src/screens/DetailScreen";
import DetectionScreen from "./src/screens/DetectionScreen";


const Stack = createStackNavigator();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [user, setUser] = useState(null);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (showLanding) {
    return <LandingScreen onStart={() => setShowLanding(false)} />;
  }

  if (!user) {
    return <LoginScreen onLogin={(userData) => setUser(userData)} />;
  }

  // Setelah login, tampilkan MainScreen dengan navigation
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main">
          {(props) => <MainScreen {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="ModeBelajar" component={ModeBelajarScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="DetectionScreen" component={DetectionScreen} options={{ headerShown: false }}
/>
        {/* Nanti bisa tambah screen lain di sini */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
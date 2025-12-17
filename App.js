// App.js
import React, { useState, useEffect } from "react";
import { Text, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// TensorFlow
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

// Screens
import SplashScreen from "./src/screens/SplashScreen";
import LandingScreen from "./src/screens/LandingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import MainScreen from "./src/screens/MainScreen";
import ModeBelajarScreen from "./src/screens/ModeBelajarScreen";
import DetailScreen from "./src/screens/DetailScreen";
import DetectionScreen from "./src/screens/DetectionScreen";
import RiwayatScreen from "./src/screens/RiwayatScreen";

// Fonts
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const Stack = createStackNavigator();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [user, setUser] = useState(null);
  const [tfReady, setTfReady] = useState(false);

  // Load fonts
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // Initialize TensorFlow
  useEffect(() => {
    async function initTF() {
      try {
        await tf.ready();
        console.log('✅ TensorFlow.js ready');
        console.log('Backend:', tf.getBackend());
        setTfReady(true);
      } catch (error) {
        console.error('❌ Error initializing TensorFlow:', error);
      }
    }
    initTF();
  }, []);

  if (!fontsLoaded) return null;

  // SET FONT GLOBAL TANPA HOOK (100% aman)
  if (Text.defaultProps == null) Text.defaultProps = {};
  Text.defaultProps.style = { fontFamily: "Poppins_400Regular" };

  if (TextInput.defaultProps == null) TextInput.defaultProps = {};
  TextInput.defaultProps.style = { fontFamily: "Poppins_400Regular" };

  // Splash
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // Landing
  if (showLanding) {
    return <LandingScreen onStart={() => setShowLanding(false)} />;
  }

  // Login
  if (!user) {
    return <LoginScreen onLogin={(userData) => setUser(userData)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main">
          {(props) => <MainScreen {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="ModeBelajar" component={ModeBelajarScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Riwayat" component={RiwayatScreen} />
        <Stack.Screen
          name="DetectionScreen"
          component={DetectionScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
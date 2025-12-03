// App.js
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SplashScreen from "./src/screens/SplashScreen";
import LandingScreen from "./src/screens/LandingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import DashboardApp from "./src/screens/DashboardScreen";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [user, setUser] = useState(null);

  // 1. Splash Screen
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // 2. Landing Screen
  if (showLanding) {
    return <LandingScreen onStart={() => setShowLanding(false)} />;
  }

  // 3. Login Screen
  if (!user) {
    return <LoginScreen onLogin={(userData) => setUser(userData)} />;
  }

  // 4. Setelah login berhasil
  return <DashboardApp user={user} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2B438D",
  },
  welcome: {
    fontSize: 20,
    color: "#333",
    marginBottom: 30,
  },
  infoBox: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 10,
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    marginBottom: 5,
  },
  success: {
    fontSize: 16,
    color: "#22c55e",
    fontWeight: "600",
    textAlign: "center",
  },
});
// src/screens/MainScreen.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import BottomNavbar from '../components/BottomNavbar';

// Import semua screen
import DashboardScreen from './DashboardScreen';
import ModeBelajarScreen from './ModeBelajarScreen';
import DetectionScreen from './DetectionScreen';
import QuizScreen from './QuizScreen';
import ProfileScreen from './ProfileScreen';
import RiwayatScreen from './RiwayatScreen';

export default function MainScreen({ user, navigation }) {
  const [activeTab, setActiveTab] = useState("Home");
  const [showNavbar, setShowNavbar] = useState(true);

  // Render konten sesuai tab aktif
  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return (
          <DashboardScreen 
            user={user} 
            navigation={navigation} 
            onTabChange={setActiveTab}
          />
        );
        
      case "Belajar":
        return <ModeBelajarScreen navigation={navigation} />;
      
      case "Deteksi":
        return <DetectionScreen navigation={navigation} onTabChange={setActiveTab} />;
      
      case "Quiz":
        return (
          <QuizScreen 
            navigation={navigation} 
            onNavbarVisibilityChange={setShowNavbar}
          />
        );
        
      case "Riwayat": 
        return <RiwayatScreen navigation={navigation} />;
      
      case "Profile":
        return <ProfileScreen user={user} navigation={navigation} />;
      
      default:
        return (
          <DashboardScreen 
            user={user} 
            navigation={navigation} 
            onTabChange={setActiveTab} 
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Konten sesuai tab aktif */}
      {renderContent()}

      {/* Navbar - Sembunyikan saat di DetectionScreen atau Quiz tertentu */}
      {activeTab !== "Deteksi" && showNavbar && (
        <BottomNavbar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
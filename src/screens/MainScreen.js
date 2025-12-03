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

export default function MainScreen({ user, navigation }) {
  const [activeTab, setActiveTab] = useState("Home");

  // Render konten sesuai tab aktif
  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return (
          <DashboardScreen 
            user={user} 
            navigation={navigation} 
            onTabChange={setActiveTab}  // 🔥 Tambahkan ini!
          />
        );
        
      case "Belajar":
        return <ModeBelajarScreen navigation={navigation} />;
      
      case "Deteksi":
        return <DetectionScreen navigation={navigation} />;
      
      case "Quiz":
        return <QuizScreen navigation={navigation} />;
      
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

      {/* Navbar di bawah */}
      <BottomNavbar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

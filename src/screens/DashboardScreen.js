import React, { useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView
} from "react-native";

export default function DashboardApp({ user }) {
  const [activeTab, setActiveTab] = useState('home');

  const features = [
    {
      id: 'deteksi',
      title: 'Deteksi',
      description: 'Gunakan camera untuk mendekteksi komponen hardware secara real-time dengan AI',
      bgColor: '#E8FD94', 
      icon: '📷'
    },
    {
      id: 'belajar',
      title: 'Belajar',
      description: 'Akses semua Materi Pembelajaran tentang komponen hardware.',
      bgColor: '#B5A8FF', 
      icon: '📚'
    },
    {
      id: 'quiz',
      title: 'Quiz',
      description: 'Uji pemahaman Anda dengan kuis interaktif dan mendapatkan skor',
      bgColor: '#FFBCF9', 
      icon: '🧠'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.avatar} />
          <Text style={styles.headerText}>
            Hi, {user ? user.name : 'User name'}
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {features.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            style={[styles.featureCard, { backgroundColor: feature.bgColor }]}
            activeOpacity={0.7}
          >
            <View style={styles.cardContent}>
              <Text style={styles.iconText}>{feature.icon}</Text>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{feature.title}</Text>
                <Text style={styles.cardDescription}>{feature.description}</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Mulai</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('home')}
        >
          <Text style={[styles.navIcon, activeTab === 'home' && styles.navIconActive]}>
            🏠
          </Text>
          {activeTab === 'home' && <View style={styles.navDot} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('belajar')}
        >
          <Text style={[styles.navIcon, activeTab === 'belajar' && styles.navIconActive]}>
            📚
          </Text>
          {activeTab === 'belajar' && <View style={styles.navDot} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('deteksi')}
        >
          <Text style={[styles.navIcon, activeTab === 'deteksi' && styles.navIconActive]}>
            📷
          </Text>
          {activeTab === 'deteksi' && <View style={styles.navDot} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('quiz')}
        >
          <Text style={[styles.navIcon, activeTab === 'quiz' && styles.navIconActive]}>
            🧠
          </Text>
          {activeTab === 'quiz' && <View style={styles.navDot} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('search')}
        >
          <Text style={[styles.navIcon, activeTab === 'search' && styles.navIconActive]}>
            🔍
          </Text>
          {activeTab === 'search' && <View style={styles.navDot} />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#818cf8', // indigo-400
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    backgroundColor: '#d1d5db',
    borderRadius: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 100, // Space for bottom nav
  },
  featureCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    gap: 20,
  },
  iconText: {
    fontSize: 48,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 16,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#1f2937',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
  },
  navIcon: {
    fontSize: 24,
    opacity: 0.4,
  },
  navIconActive: {
    opacity: 1,
  },
  navDot: {
    width: 6,
    height: 6,
    backgroundColor: '#818cf8',
    borderRadius: 3,
    marginTop: 4,
  },
});
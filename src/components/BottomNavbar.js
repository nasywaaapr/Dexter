import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BottomNavbar({ activeTab, onTabChange }) {
  const insets = useSafeAreaInsets();

  const tabs = [
    { id: 'Home', icon: 'home-outline', iconActive: 'home' },
    { id: 'Belajar', icon: 'book-outline', iconActive: 'book' },
    { id: 'Deteksi', icon: 'scan', iconActive: 'scan' },
    { id: 'Quiz', icon: 'brain', iconActive: 'brain' },
    { id: 'Riwayat', icon: 'document-text-outline', iconActive: 'document-text' }
  ];

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 12 }]}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabItem}
            onPress={() => onTabChange(tab.id)}
          >
            {tab.id === 'Quiz' ? (
              <MaterialCommunityIcons
                name="brain"
                size={26}
                color={isActive ? '#818cf8' : '#9ca3af'}
              />
            ) : (
              <Ionicons
                name={isActive ? tab.iconActive : tab.icon}
                size={26}
                color={isActive ? '#818cf8' : '#9ca3af'}
              />
            )}
            {isActive && <View style={styles.activeDot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    elevation: 10,
  },
  tabItem: {
    alignItems: 'center',
    padding: 8,
  },
  activeDot: {
    width: 6,
    height: 6,
    backgroundColor: '#818cf8',
    borderRadius: 3,
    marginTop: 4,
  },
});

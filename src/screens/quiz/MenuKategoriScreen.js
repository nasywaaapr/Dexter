import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default function MenuKategoriScreen({ navigate }) {
  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        {/* Left empty (flex 1) */}
        <View style={styles.headerSide} />

        {/* Title */}
        <Text style={styles.headerTitle}>Quiz</Text>

        {/* Right empty (flex 1) */}
        <View style={styles.headerSide} />

      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Image 
            source={require('../../../assets/images/logo.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={[styles.menuButton, styles.yellowButton]}
            onPress={() => navigate('quizTebakGambar')}
          >
            <Text style={styles.menuButtonText}>Tebak Gambar Hardware</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuButton, styles.purpleButton]}
            onPress={() => navigate('quizTebakFungsi')}
          >
            <Text style={styles.menuButtonText}>Tebak Fungsi Hardware</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuButton, styles.pinkButton]}
            onPress={() => navigate('quizKlasifikasi')}
          >
            <Text style={styles.menuButtonText}>Klasifikasi Hardware</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    backgroundColor: "#88A2FF",
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  /* Kolom kiri & kanan kosong */
  headerSide: {
    flex: 1,
  },

  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },

  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  icon: {
    width: 200,
    height: 250,
  },

  menuContainer: {
    gap: 20,
    paddingBottom: 250,
  },

  menuButton: {
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },

  yellowButton: {
    backgroundColor: '#E8FD94',
  },

  purpleButton: {
    backgroundColor: '#B5A8FF',
  },

  pinkButton: {
    backgroundColor: '#FFBCF9',
  },

  menuButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2B2B2B',
  },
});

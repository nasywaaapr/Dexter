import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from "../../components/CustomText";

export default function MenuKategoriScreen({ navigate }) {
  return (
    <View style={styles.container}>

      {/* HEADER - SAMA KAYAK MODE BELAJAR */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quiz</Text>
      </View>

      {/* CONTENT */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
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
      </ScrollView>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // HEADER BARU - SAMA PERSIS KAYAK MODE BELAJAR
  header: {
    backgroundColor: "#88A2FF",
    height: 110,
    paddingTop: Constants.statusBarHeight + 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerTitle: {
    fontSize: 22,
    fontFamily: 'Poppins_700Bold', // Ganti fontWeight jadi ini
    color: '#FFFFFF',
  },

  scrollView: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 40,
  },

  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  icon: {
    width: 150,
    height: 200,
  },

  menuContainer: {
    gap: 20,
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
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
    color: '#2B2B2B',
  },
});
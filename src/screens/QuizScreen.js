// src/screens/QuizScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

// Import semua quiz screens
import MenuKategoriScreen from './quiz/MenuKategoriScreen';
import QuizTebakGambarScreen from './quiz/QuizTebakGambarScreen';
import QuizTebakFungsiScreen from './quiz/QuizTebakFungsiScreen';
import QuizKlasifikasiScreen from './quiz/QuizKlasifikasiScreen';
import ResultScreen from './quiz/ResultScreen';

export default function QuizScreen({ navigation, onNavbarVisibilityChange }) {
  const [currentScreen, setCurrentScreen] = useState('menuKategori');
  const [quizResult, setQuizResult] = useState(null);

  // List screen yang TIDAK perlu navbar
  const screensWithoutNavbar = ['quizTebakGambar', 'quizTebakFungsi', 'quizKlasifikasi', 'result'];

  useEffect(() => {
    // Notify MainScreen apakah navbar harus ditampilkan atau tidak
    if (onNavbarVisibilityChange) {
      const shouldHideNavbar = screensWithoutNavbar.includes(currentScreen);
      onNavbarVisibilityChange(!shouldHideNavbar);
    }
  }, [currentScreen]);

  const navigate = (screen, data = null) => {
    setCurrentScreen(screen);
    if (data) setQuizResult(data);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'menuKategori':
        return <MenuKategoriScreen navigate={navigate} />;
      case 'quizTebakGambar':
        return <QuizTebakGambarScreen navigate={navigate} />;
      case 'quizTebakFungsi':
        return <QuizTebakFungsiScreen navigate={navigate} />;
      case 'quizKlasifikasi':
        return <QuizKlasifikasiScreen navigate={navigate} />;
      case 'result':
        return <ResultScreen navigate={navigate} result={quizResult} />;
      default:
        return <MenuKategoriScreen navigate={navigate} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
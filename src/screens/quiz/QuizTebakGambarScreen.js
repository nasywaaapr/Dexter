import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import Text from "../../components/CustomText";

const quizData = [
  {
    id: 1,
    question: 'Perangkat apa yang ditampilkan pada gambar di atas?',
    image: require('../../../assets/images/ssd.png'),
    options: ['Hard Disk Drive (HDD)', 'Solid State Drive (SSD)', 'Random Access Memory (RAM)', 'Graphics Processing Unit (GPU)'],
    correct: 1
  },
  {
    id: 2,
    question: 'Perangkat apa yang ditampilkan pada gambar di atas?',
    image: require('../../../assets/images/mouse.png'),
    options: ['Keyboard', 'Touchpad', 'Mouse', 'Scanner'],
    correct: 2
  },
  {
    id: 3,
    question: 'Perangkat apa yang ditampilkan pada gambar di atas?',
    image: require('../../../assets/images/cpu.png'),
    options: ['Graphics Card', 'Motherboard', 'Central Processing Unit (CPU)', 'Power Supply Unit (PSU)'],
    correct: 2
  },
  {
    id: 4,
    question: 'Perangkat apa yang ditampilkan pada gambar di atas?',
    image: require('../../../assets/images/printer.png'),
    options: ['Touchpad', 'Read Only Memory (ROM)', 'Monitor', 'Printer'],
    correct: 3
  },
  {
    id: 5,
    question: 'Perangkat apa yang ditampilkan pada gambar di atas?',
    image: require('../../../assets/images/monitor.png'),
    options: ['Web Cam', 'Monitor', 'Laptop', 'Cooling Fan'],
    correct: 1
  },
];

export default function QuizTebakFungsiScreen({ navigate }) {
  const insets = useSafeAreaInsets(); // Tambah ini

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answersState, setAnswersState] = useState(
    Array(quizData.length).fill(null).map(() => ({
      selectedAnswer: null,
      answered: false
    }))
  );

  const handleAnswer = (index) => {
    if (answersState[currentQuestion].answered) return;

    const newState = [...answersState];
    newState[currentQuestion] = {
      selectedAnswer: index,
      answered: true,
    };
    setAnswersState(newState);
  };

  const handleNext = () => {
    const isLast = currentQuestion === quizData.length - 1;

    if (!isLast) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    }

    const score = answersState.filter(
      (item, idx) => item.selectedAnswer === quizData[idx].correct
    ).length;

    navigate("result", {
      score,
      total: quizData.length,
      percentage: Math.round((score / quizData.length) * 100),
      category: "Tebak Fungsi Hardware",
    });
  };

  const handleBackQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleBackToMenu = () => navigate("menuKategori"); // Udah bener

  const getOptionStyle = (index) => {
    const { selectedAnswer, answered } = answersState[currentQuestion];

    if (!answered) return styles.option;

    const correctIndex = quizData[currentQuestion].correct;

    if (index === correctIndex) return [styles.option, styles.correctOption];
    if (index === selectedAnswer) return [styles.option, styles.wrongOption];

    return styles.option;
  };

  const { answered } = answersState[currentQuestion];

  return (
    <View style={styles.container}>

      {/* HEADER - SAMA KAYAK MODE BELAJAR & QUIZ */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackToMenu} style={styles.headerBackBtn}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Quiz Tebak Gambar</Text>
      </View>

      <ScrollView 
        style={styles.scrollContent}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        <View style={styles.content}>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${((currentQuestion + 1) / quizData.length) * 100}%` }
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {currentQuestion + 1}/{quizData.length}
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={quizData[currentQuestion].image}
              style={styles.quizImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {quizData[currentQuestion].question}
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            {quizData[currentQuestion].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={getOptionStyle(index)}
                onPress={() => handleAnswer(index)}
                disabled={answered}
              >
                <Text style={styles.optionLabel}>
                  {String.fromCharCode(65 + index)}. {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </ScrollView>

      {/* BUTTON CONTAINER - TAMBAH SAFEAREA */}
      <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + 20 }]}>

        {currentQuestion > 0 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackQuestion}
          >
            <Text style={styles.backButtonText}>Kembali</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.nextButton, !answered && styles.disabledButton]}
          onPress={handleNext}
          disabled={!answered}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestion === quizData.length - 1 ? "Selesai" : "Selanjutnya"}
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // HEADER BARU - SAMA KAYAK MODE BELAJAR & QUIZ
  header: {
    backgroundColor: '#88A2FF',
    height: 110,
    paddingTop: Constants.statusBarHeight + 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
  },

  headerBackBtn: {
    position: 'absolute',
    left: 20,
    top: Constants.statusBarHeight + 28, // Sesuaikan posisi
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },

  scrollContent: { flex: 1 },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },

  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#6B8EC8',
  },

  progressText: {
    color: '#2B4C7E',
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },

  imageContainer: {
    backgroundColor: '#F0F7FF',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    minHeight: 180,
  },

  quizImage: {
    width: 150,
    height: 150,
  },

  questionContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 25,
    marginBottom: 25,
  },

  questionText: {
    color: '#2B4C7E',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
  },

  optionsContainer: {
    gap: 12,
    marginBottom: 10,
  },

  option: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  correctOption: {
    backgroundColor: '#D1FAE5',
    borderColor: '#10B981',
  },

  wrongOption: {
    backgroundColor: '#FEE2E2',
    borderColor: '#EF4444',
  },

  optionLabel: {
    fontSize: 14,
    color: '#2B4C7E',
    fontFamily: 'Poppins_500Medium',
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  backButton: {
    flex: 1,
    backgroundColor: '#6B8EC8',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },

  nextButton: {
    flex: 1,
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },

  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
});
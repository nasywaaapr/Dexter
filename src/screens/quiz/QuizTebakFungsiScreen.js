import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const quizData = [
  {
    id: 1,
    question: 'Apa fungsi utama dari CPU (Central Processing Unit)?',
    options: [
      'Menyimpan data secara permanen',
      'Memproses instruksi dan melakukan kalkulasi',
      'Menampilkan gambar ke layar',
      'Menghubungkan perangkat ke internet'
    ],
    correct: 1
  },
  {
    id: 2,
    question: 'Apa fungsi dari RAM (Random Access Memory)?',
    options: [
      'Menyimpan data sementara yang sedang diproses',
      'Menyimpan sistem operasi secara permanen',
      'Mendinginkan komponen komputer',
      'Menghasilkan output suara'
    ],
    correct: 0
  },
  {
    id: 3,
    question: 'Apa fungsi dari SSD?',
    options: [
      'Memproses data grafis',
      'Menyimpan data permanen dengan kecepatan tinggi',
      'Menghubungkan komputer ke jaringan',
      'Mengatur daya listrik komputer'
    ],
    correct: 1
  },
  {
    id: 4,
    question: 'Apa fungsi dari Mouse sebagai perangkat input?',
    options: [
      'Mengetik dokumen teks',
      'Mencetak dokumen',
      'Menggerakkan kursor dan memilih objek di layar',
      'Menyimpan file data'
    ],
    correct: 2
  },
  {
    id: 5,
    question: 'Apa fungsi dari Motherboard?',
    options: [
      'Menghubungkan dan mengintegrasikan semua komponen hardware',
      'Menyimpan data user',
      'Menampilkan video dan gambar',
      'Menghasilkan output audio'
    ],
    correct: 0
  },
];

export default function QuizTebakFungsiScreen({ navigate }) {

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

  const handleBackToMenu = () => navigate("menuKategori");

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

      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackToMenu} style={styles.headerBackBtn}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Quiz Tebak Fungsi</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.content}>

          {/* PROGRESS BAR */}
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

      <View style={styles.buttonContainer}>

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

  header: {
    backgroundColor: '#88A2FF',
    paddingTop: 40, 
    paddingBottom: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  headerBackBtn: {
    position: 'absolute',
    left: 15,
    top: 40,
  },

  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
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
    fontWeight: '600',
  },

  questionContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 25,
    marginBottom: 25,
    justifyContent: 'center',
  },

  questionText: {
    color: '#2B4C7E',
    fontSize: 18,
    fontWeight: '600',
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
    fontSize: 15,
    color: '#2B4C7E',
    fontWeight: '500',
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 25,
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
    fontSize: 16,
    fontWeight: '600',
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
    fontSize: 16,
    fontWeight: '600',
  },

  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
});

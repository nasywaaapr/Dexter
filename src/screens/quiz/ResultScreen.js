import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Text from "../../components/CustomText";

export default function ResultScreen({ navigate, result }) {
  const { score, total, percentage, category } = result || { score: 0, total: 5, percentage: 0, category: 'Quiz' };
  const wrong = total - score;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.trophyIcon}>🏆</Text>
        </View>

        <Text style={styles.title}>QUIZ SELESAI!!</Text>

        <Text style={styles.percentage}>{percentage}%</Text>

        <Text style={styles.subtitle}>{score} dari {total} jawaban benar</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{score}</Text>
            <Text style={styles.statLabel}>Benar</Text>
          </View>

          <View style={[styles.statBox, styles.wrongStatBox]}>
            <Text style={styles.statNumber}>{wrong}</Text>
            <Text style={styles.statLabel}>Salah</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => navigate('menuKategori')}
          >
            <Text style={styles.retryButtonText}>Coba lagi</Text>
          </TouchableOpacity>

          <TouchableOpacity 
  style={styles.finishButton}
  onPress={() => navigate('menuKategori')}
>
  <Text style={styles.finishButtonText}>Selesai</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  trophyIcon: {
    fontSize: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B4C7E',
    marginBottom: 30,
  },
  percentage: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 50,
  },
  statBox: {
    backgroundColor: '#D1FAE5',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 100,
  },
  wrongStatBox: {
    backgroundColor: '#FEE2E2',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2B4C7E',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
    width: '100%',
  },
  retryButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#6B8EC8',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#6B8EC8',
    fontSize: 16,
    fontWeight: '600',
  },
  finishButton: {
    flex: 1,
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  finishButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

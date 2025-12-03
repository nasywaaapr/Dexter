import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function QuizScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🧠 Quiz Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 80,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
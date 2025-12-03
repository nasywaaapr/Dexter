import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetectionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📷 Detection Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 80, // Space untuk navbar
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
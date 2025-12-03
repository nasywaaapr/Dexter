import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen({ user }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>👤 Profile</Text>
      <Text style={styles.name}>{user?.name || 'User'}</Text>
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
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    color: '#666',
  },
});
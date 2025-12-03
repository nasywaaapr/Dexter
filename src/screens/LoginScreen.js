// src/screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { createUser } from '../services/supabaseService';
export default function LoginScreen({ onLogin }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Validasi input
    if (!name.trim()) {
      Alert.alert("Error", "Silakan masukkan nama Anda");
      return;
    }

    setLoading(true);
    
    try {
      // Simpan user ke Supabase
      const user = await createUser(name.trim());
      
      if (user) {
        console.log('✅ User berhasil disimpan ke database:', user);
        // Panggil callback dengan data user dari database
        onLogin(user);
      } else {
        Alert.alert("Error", "Gagal menyimpan data. Silakan coba lagi.");
      }
    } catch (error) {
      console.error('❌ Error saat login:', error);
      Alert.alert("Error", "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Bubbles */}
      <View style={[styles.bubble, styles.b1]} />
      <View style={[styles.bubble, styles.b2]} />
      <View style={[styles.bubble, styles.b3]} />
      <View style={[styles.bubble, styles.b4]} />
      <View style={[styles.bubble, styles.b5]} />
      <View style={[styles.bubble, styles.b6]} />

      {/* Semua konten di tengah layar */}
      <View style={styles.centerContent}>
        {/* USB + Speech Bubble */}
        <View style={styles.row}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.usb}
          />

          {/* Bubble + tail */}
          <View style={styles.bubbleWrapper}>
            <View style={styles.speechBubble}>
              <Text style={styles.speechText}>
                Yuk, kita jelajahi isi komputer bersama-sama!
              </Text>
            </View>

            {/* Tail (segitiga kecil) */}
            <View style={styles.tail} />
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nama Lengkap</Text>

          <TextInput
            placeholder="Masukkan nama anda"
            placeholderTextColor="#999"
            style={styles.input}
            value={name}
            onChangeText={setName}
            editable={!loading}
          />

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Mulai</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#88A2FF",
    width: "100%",
  },

  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },

  // Row USB + bubble
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  usb: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },

  /* Bubble */
  bubbleWrapper: {
    marginLeft: 10,
    alignItems: "flex-start",
  },

  speechBubble: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    maxWidth: 180,
  },

  speechText: {
    fontSize: 13,
    color: "#333",
  },

  tail: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "white",
    marginLeft: 15,
    marginTop: -5,
  },

  /* Form */
  formContainer: {
    width: "80%",
    marginTop: 10,
  },

  label: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "white",
    width: "100%",
    height: 45,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 25,
    borderWidth: 2,
    borderColor: "#00000030",
  },

  button: {
    backgroundColor: "#2B438D",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },

  /* Bubbles Background */
  bubble: {
    position: "absolute",
    backgroundColor: "#2B438D",
    borderRadius: 100,
    opacity: 0.8,
  },

  b1: { width: 120, height: 120, top: 20, right: -30 },
  b2: { width: 60, height: 60, top: 90, left: 10 },
  b3: { width: 40, height: 40, bottom: 180, right: 50 },
  b4: { width: 80, height: 80, bottom: 40, left: 40 },
  b5: { width: 55, height: 55, top: 260, right: 20 },
  b6: { width: 35, height: 35, bottom: 250, left: 25 },
});
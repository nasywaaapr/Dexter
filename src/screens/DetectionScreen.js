import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import Text from "../components/CustomText";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

export default function DetectionScreen({ navigation, onTabChange }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState("off");
  const [detecting, setDetecting] = useState(false);
  const [detectedHardware, setDetectedHardware] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const cameraRef = useRef(null);
  const detectionInterval = useRef(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  // Simulasi deteksi hardware (nanti diganti dengan Teachable Machine)
  useEffect(() => {
    if (permission?.granted) {
      startDetection();
    }
    
    return () => {
      if (detectionInterval.current) {
        clearInterval(detectionInterval.current);
      }
    };
  }, [permission]);

  const startDetection = () => {
    // Simulasi deteksi setiap 1 detik (nanti diganti dengan real detection)
    detectionInterval.current = setInterval(() => {
      // TODO: Implement Teachable Machine detection here
      simulateDetection();
    }, 1000);
  };

  const simulateDetection = () => {
    // Simulasi deteksi random (hapus ini nanti)
    const hardwares = ["Mouse", "Keyboard", "Monitor", "CPU", "RAM"];
    const randomHardware = hardwares[Math.floor(Math.random() * hardwares.length)];
    const randomConfidence = Math.floor(Math.random() * 40) + 60; // 60-100%
    
    setDetectedHardware(randomHardware);
    setConfidence(randomConfidence);
  };

  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // TODO: Process image dengan Teachable Machine
      console.log("Image selected:", result.assets[0].uri);
    }
  };

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Meminta izin kamera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="camera-outline" size={80} color="#999" />
        <Text style={styles.permissionText}>Izin kamera diperlukan</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Berikan Izin</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
        flash={flash}
      />

      <View style={styles.overlayContainer}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => onTabChange("Home")}
        >
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>

        {/* Instruction Text */}
        <View style={styles.topTextContainer}>
          <Text style={styles.topText}>
            Arahkan kamera ke perangkat keras
          </Text>
        </View>

        {/* Detection Frame - Kotak untuk scan */}
        <View style={styles.scannerFrame}>
          {/* Corner indicators */}
          <View style={styles.cornerTopLeft} />
          <View style={styles.cornerTopRight} />
          <View style={styles.cornerBottomLeft} />
          <View style={styles.cornerBottomRight} />
          
          {/* Scanning animation */}
          {detecting && (
            <View style={styles.scanLine} />
          )}
        </View>

        {/* Detection Result Label */}
        {detectedHardware && (
          <View style={styles.labelBox}>
            <Text style={styles.labelText}>{detectedHardware}</Text>
            <Text style={styles.confidenceText}>{confidence}%</Text>
          </View>
        )}

        {/* Bottom Buttons - Dikecilin jaraknya */}
        <View style={styles.bottomButtons}>
          {/* Flash Toggle */}
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setFlash(flash === "off" ? "on" : "off")}
          >
            <Ionicons
              name={flash === "off" ? "flash-off" : "flash"}
              size={28}
              color="white"
            />
          </TouchableOpacity>

          {/* Gallery Button */}
          <TouchableOpacity
            style={styles.controlButton}
            onPress={pickImageFromGallery}
          >
            <Ionicons name="images" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  permissionText: {
    color: "white",
    fontSize: 18,
    marginTop: 20,
    marginBottom: 30,
  },
  permissionButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  permissionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
  topTextContainer: {
    marginTop: 100,
    alignItems: "center",
  },
  topText: {
    backgroundColor: "rgba(255,255,255,0.9)",
    color: "#000",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 15,
    fontWeight: "600",
  },
  scannerFrame: {
    marginTop: 60,
    alignSelf: "center",
    width: 280,
    height: 280,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  // Corner indicators untuk scan frame
  cornerTopLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#00FF00",
    borderTopLeftRadius: 20,
  },
  cornerTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: "#00FF00",
    borderTopRightRadius: 20,
  },
  cornerBottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#00FF00",
    borderBottomLeftRadius: 20,
  },
  cornerBottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "#00FF00",
    borderBottomRightRadius: 20,
  },
  scanLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#00FF00",
    position: "absolute",
    animation: "scan 2s infinite",
  },
  labelBox: {
    position: "absolute",
    top: "58%",
    alignSelf: "center",
    backgroundColor: "rgba(0,255,0,0.9)",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  labelText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
  confidenceText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 14,
    opacity: 0.8,
  },
  bottomButtons: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 60,
  },
  controlButton: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 15,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
});
import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import Text from "../components/CustomText";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import * as tf from '@tensorflow/tfjs';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system/legacy';
import { supabase } from '../lib/supabase';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export default function DetectionScreen({ navigation, onTabChange }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState("off");
  const [detecting, setDetecting] = useState(false);
  const [detectedHardware, setDetectedHardware] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [model, setModel] = useState(null);
  const [modelLoading, setModelLoading] = useState(true);
  const cameraRef = useRef(null);
  const detectionInterval = useRef(null);

  // GANTI dengan URL model Teachable Machine kamu
  const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/TxYHpDQA9/';

  useEffect(() => {
    // Initialize TensorFlow
    const initTF = async () => {
      await tf.ready();
      console.log('TensorFlow ready');
    };
    initTF();

    if (!permission) {
      requestPermission();
    }
  }, []);

  // Load Teachable Machine Model
  useEffect(() => {
    loadModel();
  }, []);

  const loadModel = async () => {
    try {
      console.log('Loading model...');
      setModelLoading(true);

      await tf.ready();

      // Load model
      const loadedModel = await tf.loadLayersModel(MODEL_URL + 'model.json');
      
      // Load metadata untuk labels
      const metadataResponse = await fetch(MODEL_URL + 'metadata.json');
      const metadata = await metadataResponse.json();
      
      console.log('Model loaded successfully');
      console.log('Classes:', metadata.labels);
      
      setModel({ model: loadedModel, labels: metadata.labels });
      setModelLoading(false);
    } catch (error) {
      console.error('Error loading model:', error);
      setModelLoading(false);
    }
  };

  // Start detection setelah model loaded
  useEffect(() => {
    if (permission?.granted && model) {
      startDetection();
    }
    
    return () => {
      if (detectionInterval.current) {
        clearInterval(detectionInterval.current);
      }
    };
  }, [permission, model]);

  // Resume detection saat kembali ke screen ini
  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      console.log('🔄 Screen focused, resuming detection...');
      // Selalu resume detection saat screen focus, kecuali sedang navigating
      if (permission?.granted && model && !isNavigating) {
        // Clear interval lama jika ada
        if (detectionInterval.current) {
          clearInterval(detectionInterval.current);
        }
        
        // Reset state dan start fresh
        setDetectedHardware(null);
        setConfidence(0);
        setShowWarning(false);
        setDetecting(false); // Set false dulu
        
        // Start detection dengan delay kecil
        setTimeout(() => {
          startDetection();
        }, 100);
      }
    });

    return unsubscribe;
  }, [navigation, model, permission, isNavigating]);

  const startDetection = () => {
    setDetecting(true);
    setIsNavigating(false); // Reset navigating state
    // Deteksi setiap 3 detik untuk mengurangi capture error
    detectionInterval.current = setInterval(() => {
      captureAndDetect();
    }, 3000); // Dari 2000ms jadi 3000ms
  };

  const captureAndDetect = async () => {
    if (!cameraRef.current || !model || isNavigating) return;

    try {
      // Ambil foto dari kamera dengan quality rendah untuk faster processing
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.3, // Naikkan sedikit dari 0.2
        base64: false,
        skipProcessing: true,
      });

      // Proses deteksi
      await detectHardware(photo.uri);
    } catch (error) {
      // Jangan log error capture yang terlalu sering
      // console.error('Capture error:', error);
    }
  };

  const detectHardware = async (imageUri) => {
    if (!model) return;

    try {
      // Resize image to 224x224 using expo-image-manipulator
      const manipResult = await manipulateAsync(
        imageUri,
        [{ resize: { width: 224, height: 224 } }],
        { compress: 0.7, format: SaveFormat.JPEG }
      );

      // ✅ FIX: Pakai Legacy API
      const base64 = await FileSystem.readAsStringAsync(manipResult.uri, {
        encoding: 'base64',
      });

      // Convert base64 to Uint8Array
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Decode JPEG to tensor
      let imageTensor;
      try {
        imageTensor = decodeJpeg(bytes);
      } catch (decodeError) {
        console.error('JPEG decode error:', decodeError);
        return;
      }

      // Resize tensor ke 224x224 jika belum
      const resized = tf.image.resizeBilinear(imageTensor, [224, 224]);
      
      // Normalize to [0, 1]
      const normalized = resized.div(255.0);
      const batched = normalized.expandDims(0);

      // Predict
      const predictions = model.model.predict(batched);
      const predictionArray = await predictions.data();
      
      // Get class dengan confidence tertinggi
      const maxIndex = predictionArray.indexOf(Math.max(...predictionArray));
      const maxConfidence = predictionArray[maxIndex];
      
      console.log('🎯 Detected:', model.labels[maxIndex], Math.round(maxConfidence * 100) + '%');

      // Show if confidence > 65% (threshold lebih ketat)
      if (maxConfidence > 0.65) {
        setDetectedHardware(model.labels[maxIndex]);
        setConfidence(Math.round(maxConfidence * 100));
        setShowWarning(false);
      } else if (maxConfidence > 0.3) {
        // Confidence 30-65% = mungkin hardware tapi tidak yakin
        setDetectedHardware(null);
        setConfidence(0);
        setShowWarning(true);
      } else {
        // Confidence < 30% = bukan hardware sama sekali
        setDetectedHardware(null);
        setConfidence(0);
        setShowWarning(false);
      }

      // Cleanup tensors
      tf.dispose([imageTensor, resized, normalized, batched, predictions]);
      
    } catch (error) {
      console.error('Detection error:', error);
    }
  };

  const pickImageFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        // Pause auto detection sementara
        if (detectionInterval.current) {
          clearInterval(detectionInterval.current);
        }
        
        setDetecting(false);
        
        console.log('📷 Image picked from gallery:', result.assets[0].uri);
        
        // Detect gambar dari gallery
        await detectHardware(result.assets[0].uri);
        
        // Jangan auto-resume detection, biarkan user lihat hasil dulu
        console.log('✅ Detection from gallery complete');
      }
    } catch (error) {
      console.error('Gallery picker error:', error);
      alert('Gagal membuka galeri');
    }
  };

  // Handler untuk navigasi ke detail materi
  const handleNavigateToDetail = async () => {
    if (detectedHardware && navigation && !isNavigating) {
      // Prevent multiple taps
      setIsNavigating(true);
      
      // Stop detection
      if (detectionInterval.current) {
        clearInterval(detectionInterval.current);
      }
      setDetecting(false);
      
      try {
        console.log('🔍 Looking for hardware:', detectedHardware);
        
        // Set timeout 5 detik
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 5000)
        );
        
        const queryPromise = supabase
          .from("materi_belajar")
          .select("id, label")
          .eq("label", detectedHardware)
          .single();
        
        // Race antara query dan timeout
        const { data: result, error } = await Promise.race([
          queryPromise,
          timeoutPromise
        ]);

        if (error) {
          console.log('❌ Supabase Error:', error.message);
          throw error;
        }

        if (result && result.id) {
          console.log('✅ Found hardware:', result.label, '(ID:', result.id + ')');
          
          // Navigate ke detail screen dengan ID
          navigation.navigate('Detail', { 
            id: result.id 
          });
          
          // Reset state saat navigasi berhasil
          setIsNavigating(false);
        } else {
          console.log('❌ No data found for:', detectedHardware);
          alert('Materi untuk hardware ini belum tersedia');
          
          // Resume detection
          setIsNavigating(false);
          if (permission?.granted && model) {
            startDetection();
          }
        }
      } catch (error) {
        console.error('❌ Catch Error:', error.message);
        
        if (error.message === 'Timeout') {
          alert('Koneksi timeout. Cek internet kamu!');
        } else {
          alert(`Materi untuk "${detectedHardware}" belum ada di database`);
        }
        
        // Resume detection
        setIsNavigating(false);
        if (permission?.granted && model) {
          startDetection();
        }
      }
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

  if (modelLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00FF00" />
        <Text style={styles.loadingText}>Memuat model AI...</Text>
        <Text style={styles.loadingSubtext}>Mohon tunggu sebentar</Text>
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
          onPress={() => {
            if (detectionInterval.current) {
              clearInterval(detectionInterval.current);
            }
            onTabChange("Home");
          }}
        >
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>

        {/* Instruction Text */}
        <View style={styles.topTextContainer}>
          <Text style={styles.topText}>
            {detecting ? "🔍 Mendeteksi..." : "📱 Arahkan kamera ke hardware"}
          </Text>
        </View>

        {/* Detection Frame - Kotak untuk scan */}
        <View style={styles.scannerFrame}>
          {/* Corner indicators */}
          <View style={[styles.cornerTopLeft, detecting && styles.cornerActive]} />
          <View style={[styles.cornerTopRight, detecting && styles.cornerActive]} />
          <View style={[styles.cornerBottomLeft, detecting && styles.cornerActive]} />
          <View style={[styles.cornerBottomRight, detecting && styles.cornerActive]} />
          
          {/* Scanning animation */}
          {detecting && (
            <View style={styles.scanLine} />
          )}
        </View>

        {/* Detection Result Label - Clickable */}
        {detectedHardware && (
          <TouchableOpacity 
            style={[styles.labelBox, isNavigating && styles.labelBoxDisabled]}
            onPress={handleNavigateToDetail}
            activeOpacity={0.7}
            disabled={isNavigating}
          >
            <View style={styles.labelContent}>
              <View>
                <Text style={styles.labelText}>
                  {isNavigating ? 'Loading...' : detectedHardware}
                </Text>
                <Text style={styles.confidenceText}>
                  {isNavigating ? 'Mohon tunggu...' : `Akurasi: ${confidence}%`}
                </Text>
              </View>
              {!isNavigating && (
                <View style={styles.tapHint}>
                  <Ionicons name="information-circle" size={20} color="#000" />
                  <Text style={styles.tapHintText}>Tap untuk detail</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}

        {/* Warning: Not a Hardware */}
        {showWarning && !detectedHardware && (
          <View style={styles.warningBox}>
            <Ionicons name="warning" size={24} color="#FF9500" />
            <Text style={styles.warningText}>
              Benda ini bukan hardware yang terdaftar
            </Text>
            <Text style={styles.warningSubtext}>
              Arahkan kamera ke hardware komputer
            </Text>
          </View>
        )}

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          {/* Resume Detection Button - Show saat detection stopped */}
          {!detecting && (
            <TouchableOpacity
              style={[styles.controlButton, styles.resumeButton]}
              onPress={() => {
                if (permission?.granted && model) {
                  console.log('▶️ Manual resume detection');
                  setDetectedHardware(null);
                  setConfidence(0);
                  setShowWarning(false);
                  startDetection();
                }
              }}
            >
              <Ionicons name="play" size={28} color="white" />
            </TouchableOpacity>
          )}
          
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
  loadingSubtext: {
    color: "#999",
    marginTop: 5,
    fontSize: 14,
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
  cornerActive: {
    borderColor: "#00FF00",
    shadowColor: "#00FF00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  scanLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#00FF00",
    position: "absolute",
    shadowColor: "#00FF00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  labelBox: {
    position: "absolute",
    bottom: 150, // Ubah dari top ke bottom untuk lebih stabil
    alignSelf: "center",
    backgroundColor: "rgba(0,255,0,0.95)",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
    minWidth: 250,
    maxWidth: "85%",
    shadowColor: "#00FF00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  labelContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  },
  labelText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 2,
  },
  confidenceText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 13,
    opacity: 0.7,
  },
  tapHint: {
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
  tapHintText: {
    color: "#000",
    fontSize: 10,
    fontWeight: "600",
    opacity: 0.7,
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
  warningBox: {
    position: "absolute",
    bottom: 150, // Sama dengan labelBox, karena hanya salah satu yang muncul
    alignSelf: "center",
    backgroundColor: "rgba(255,149,0,0.95)",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    minWidth: 250,
    maxWidth: "85%",
    alignItems: "center",
    shadowColor: "#FF9500",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  warningText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 15,
    marginTop: 8,
    textAlign: "center",
  },
  warningSubtext: {
    color: "#000",
    fontWeight: "500",
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
    opacity: 0.8,
  },
  labelBoxDisabled: {
    opacity: 0.6,
  },
  resumeButton: {
    backgroundColor: "rgba(0,200,0,0.8)",
    borderColor: "#00FF00",
  },
});
// src/screens/DashboardScreen.js
// src/screens/DashboardScreen.js
import React from "react";
import { 
  View, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView
} from "react-native";
import Text from "../components/CustomText";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function DashboardScreen({ navigation, user, onTabChange }) {

  const features = [
    {
      id: "deteksi",
      title: "Deteksi",
      description:
        "Gunakan camera untuk mendeteksi komponen hardware secara real-time dengan AI",
      bgColor: "#E8FD94",
      icon: "📷",
    },
    {
      id: "belajar",
      title: "Belajar",
      description:
        "Akses semua Materi Pembelajaran tentang komponen hardware.",
      bgColor: "#B5A8FF",
      icon: "📚",
    },
    {
      id: "quiz",
      title: "Quiz",
      description:
        "Uji pemahaman Anda dengan kuis interaktif dan mendapatkan skor",
      bgColor: "#FFBCF9",
      icon: "🧠",
    },
  ];

  const goToPage = (id) => {
    if (id === "belajar") {
      onTabChange("Belajar");   // 🔥 ganti tab ke Mode Belajar
    } 
    else if (id === "deteksi") {
      onTabChange("Deteksi");   // bisa diarahkan ke tab Deteksi
    } 
    else if (id === "quiz") {
      onTabChange("Quiz");      // buka tab Quiz
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.avatar} />
          <Text style={styles.headerText}>
            Hi, {user ? user.name : "User"}
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {features.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            style={[styles.featureCard, { backgroundColor: feature.bgColor }]}
            activeOpacity={0.7}
            onPress={() => goToPage(feature.id)}
          >
            <View style={styles.cardContent}>
              <Text style={styles.iconText}>{feature.icon}</Text>

              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{feature.title}</Text>
                <Text style={styles.cardDescription}>
                  {feature.description}
                </Text>

                {/* Button Mulai */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => goToPage(feature.id)}
                >
                  <Text style={styles.buttonText}>Mulai</Text>
                </TouchableOpacity>

              </View>

            </View>

          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  header: {
    backgroundColor: "#88A2FF",
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: { flexDirection: "row", alignItems: "center", gap: 16 },
  avatar: { width: 64, height: 64, backgroundColor: "#d1d5db", borderRadius: 16 },
  headerText: { color: "white", fontSize: 22, fontWeight: "bold" },
  scrollView: { flex: 1 },
  contentContainer: { padding: 24, paddingBottom: 100 },
  featureCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
  },
  cardContent: { flexDirection: "row", gap: 20 },
  iconText: { fontSize: 40 },
  cardTextContainer: { flex: 1 },
  cardTitle: { fontSize: 20, fontWeight: "bold", color: "#1f2937" },
  cardDescription: {
    fontSize: 12,
    color: "#4b5563",
    marginBottom: 16,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#1f2937",
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignSelf: "flex-start",
    height: 35,
  },
  buttonText: { color: "white", fontSize: 12, fontWeight: "600" },
});
